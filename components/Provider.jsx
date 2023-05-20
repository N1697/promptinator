"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

//SessionProvider:
//Allows instances of useSession() to share the session object across components, by using React Context under the hood.
//It also takes care of keeping the session updated and synced between tabs/windows.

const Provider = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
