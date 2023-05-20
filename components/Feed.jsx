"use client";

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, searchText, tagClickHandler }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data
        .reverse()
        .filter(
          (filteredPrompt) =>
            filteredPrompt.prompt
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            filteredPrompt.tag
              .toLowerCase()
              .includes(searchText.toLowerCase()) ||
            filteredPrompt.creator.username
              .toLowerCase()
              .includes(searchText.toLowerCase())
        )
        .map((prompt) => {
          return (
            <PromptCard
              key={prompt._id}
              prompt={prompt}
              tagClickHandler={tagClickHandler}
            />
          );
        })}
    </div>
  );
};

const Feed = () => {
  //States
  const [searchText, setSearchText] = useState("");
  const [prompts, setPrompts] = useState([]);

  //Functionalities
  const onSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const tagClickHandler = (tag) => {
    const filteredPrompts = prompts.filter(
      (filteredPrompt) => filteredPrompt.tag === tag
    );
    setPrompts(filteredPrompts);
  };

  useEffect(() => {
    const fetchPrompts = async () => {
      //Fetch
      // const response = await fetch("/api/prompt");
      // const data = await response.json();
      // setPrompts(data);

      //Axios
      const { data } = await axios.get("/api/prompt");
      setPrompts(data);
    };

    fetchPrompts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a username, a tag or a prompt"
          value={searchText}
          onChange={onSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={prompts}
        searchText={searchText}
        tagClickHandler={tagClickHandler}
      />
    </section>
  );
};

export default Feed;
