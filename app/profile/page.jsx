"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Profile from "@/components/Profile";
import axios from "axios";

const MyProfile = () => {
  //States
  const [prompts, setPrompts] = useState([]);
  const [name, setName] = useState("");

  //Hooks
  const { data: session } = useSession();
  const router = useRouter();

  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const userName = searchParams.get("username");
  const userEmail = searchParams.get("email");

  //Functionalities
  useEffect(() => {
    const fetchPrompts = async () => {
      // //Fetch
      // const response = await fetch(`/api/users/${session?.user.id}/prompts`);
      // const data = await response.json();
      // setPrompts(data);

      //Axios
      const { data } = await axios.get(
        `/api/users/${session ? session.user.id : userId}/prompts`
      );
      setPrompts(data);
    };

    //Only fetch the prompts if a user's logged-in
    if (session?.user.id || userId) fetchPrompts();
  }, [session?.user.id, userId]);

  const editHandler = (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };

  const deleteHandler = async (prompt) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await axios.delete(`/api/prompt/${prompt._id}`);

        const filteredPrompts = prompts.filter(
          (filteredPrompt) => filteredPrompt._id !== prompt._id
        );

        setPrompts(filteredPrompts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name={
        userName ? (userEmail === session?.user.email ? "My" : userName) : "My"
      }
      desc="Welcome to your personalized profile page"
      data={prompts}
      editHandler={editHandler}
      deleteHandler={deleteHandler}
    />
  );
};

export default MyProfile;
