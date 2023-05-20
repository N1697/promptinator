"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

//signIn():
//Client Side: Yes
//Server Side: No
//Ensures the user ends back on the page they started on after completing a sign in flow.
//By default, when calling the signIn() method with no arguments, you will be redirected to the NextAuth.js sign-in page.
//If you want to skip that and get redirected to your provider's page immediately, call the signIn() method with the provider's id.

//signOut():
//Client Side: Yes
//Server Side: No
//Ensure the user ends back on the page they started on after completing the sign out flow.

//useSession():
//Client Side: Yes
//Server Side: No
//The useSession() React Hook in the NextAuth.js client is the easiest way to check if someone is signed in.
//Make sure that <SessionProvider> is added to pages/_app.js.
//useSession() returns an object containing two values: data and status:
//  data: This can be three values: Session / undefined / null.
//  when the session hasn't been fetched yet, data will be undefined
//  in case it failed to retrieve the session, data will be null
//  in case of success, data will be Session.
//  status: enum mapping to three possible session states: "loading" | "authenticated" | "unauthenticated"

//getProviders():
//Client Side: Yes
//Server Side: Yes
//The getProviders() method returns the list of providers currently configured for sign in.
//It calls [/api/auth/providers] and returns a list of the currently configured authentication providers.
//It can be useful if you are creating a dynamic custom sign in page.

const Nav = () => {
  //States
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  //Fetch the list of providers
  useEffect(() => {
    const setUpProviders = async () => {
      const providersList = await getProviders();

      setProviders(providersList);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex flex-center gap-2">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptinator Logo"
          width={30}
          height={30}
          className="object-contain"
        />

        <p className="logo_text">Promptinator</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Prompt
            </Link>

            <button type="button" className="outline_btn" onClick={signOut}>
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width="40"
                height="40"
                className="rounded-full"
                alt="Profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                //provider is an object contains these properties:
                /**
                 {
                  id: "google",
                  name: "Google",
                  signinUrl: "http://localhost:3000/api/auth/signin/google",
                  type: "oauth",
                  callbackUrl: "http://localhost:3000/api/auth/callback/google",
                 }
                 */
                <button
                  type="button"
                  key={provider.name}
                  className="black_btn"
                  onClick={() => signIn(provider.id)} //provider.id: google, github,twitter,...
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width="40"
              height="40"
              className="rounded-full"
              alt="Profile"
              onClick={() => setToggleDropdown((prevState) => !prevState)}
            />

            {/* Dropdown */}
            {toggleDropdown && (
              <div className="dropdown">
                {/* My Profile */}
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>

                {/* Create Prompt */}
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>

                {/* Sign Out */}
                <button
                  type="button"
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
