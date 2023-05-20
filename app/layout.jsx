import React from "react";
import "@/styles/global.css";
import Provider from "@/components/Provider";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Promptinator",
  description: "Promptinator: The Ultimate AI Prompt Generator",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
