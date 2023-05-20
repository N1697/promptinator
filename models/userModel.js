import mongoose, { models } from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter your name."],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid. It should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  email: {
    type: String,
    required: [true, "Please enter your email."],
    unique: [true, "Email already exists!"],
  },
  image: {
    type: String,
  },
});

const User = models.User || mongoose.model("User", userSchema);

export default User;

// We would do this if we're working with a regular always on always running backend server:
// const User = mongoose.model("User", userSchema);

// But, in NextJS, the route is only gonna be created and running for the time when it's getting called
// so there's one check we have to make

// The 'models' object is provided by the Mongoose library and stores all the registered models
// If a model named 'User' already exists in the 'models' object, it assigns that existing model to the 'User' variable
// This prevents re-defining the model and ensures that the existing model is reused

// If a model named 'User' does not exist in the 'models' object, the 'model' function from Mongoose
// is called to create a new model
// The newly created model is then assigned to the 'User' variable.
