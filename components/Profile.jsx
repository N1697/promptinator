"use client";
import React from "react";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, editHandler, deleteHandler }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="bluish-violet_gradient">{name} Profile</span>
      </h1>

      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((prompt) => {
          return (
            <PromptCard
              key={prompt._id}
              prompt={prompt}
              editHandler={() => editHandler && editHandler(prompt)}
              deleteHandler={() => deleteHandler && deleteHandler(prompt)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Profile;
