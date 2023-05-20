import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/utils/database";
import User from "@/models/userModel";

//NextAuth takes in an 'options' object
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    //Session: Get the user data every single time to keep an existing and running session
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      //Update the id to make sure we always know which user is currently online
      session.user.id = sessionUser._id.toString();

      return session;
    },

    //Sign In
    async signIn({ profile }) {
      try {
        await connectDB();

        //Check if a user's already logged-in
        const userExists = await User.findOne({ email: profile.email });

        //If not, create a new user
        if (!userExists) {
          await User.create({
            username: profile.name.replace(" ", "").toLowerCase(), //Make sure the name has no spaces
            email: profile.email,
            image: profile.picture,
          });
        }

        return true;

        /**
         When using NextAuth.js with a database, the User object will be either a user object from the database (including the User ID)
         if the user has signed in before or a simpler prototype user object (i.e. name, email, image) for users who have not signed in before.
         
         When using NextAuth.js without a database, the user object will always be a prototype user object, with information extracted from the profile.
         */
      } catch (error) {
        console.log(`Error: ${error.message}`);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };

/**
- Every NextJS route is known as a serverless route
  which means it's a lambda function that opens up
  only when it gets called and it's gonna die
  once it's done its job, every time it gets called
  it needs to spin up the server and make a connection
  to the database, it makes it so that we don't have to
  keep our server running constantly:
  serverless -> lambda -> dynamodb
 */
