//Homepage
import Feed from "@/components/Feed";
import React from "react";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="md:hidden" />
        <span className="bluish-violet_gradient text-center">
          {" "}
          AI-Powered Prompts
        </span>
      </h1>

      <p className="desc text-center">
        Promptinator: The open-source AI prompting tool designed for the modern
        world. Discover, create, and share creative prompts that inspire and
        fuel imagination
      </p>

      <Feed />
    </section>
  );
};

export default Home;
