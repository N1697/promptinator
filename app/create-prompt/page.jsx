"use client";

import React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

import Form from "@/components/Form";

const CreatePrompt = () => {
  //States
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  //Hooks
  const { data: session } = useSession();
  const router = useRouter();

  const createPrompt = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    try {
      //Fetch
      // const response = await fetch("/api/prompt/new", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     userId: session?.user.id,
      //     prompt: post.prompt,
      //     tag: post.tag,
      //   }),
      // });

      // if (response.ok) {
      //   router.push("/");
      // }

      //Axios
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/prompt/new",
        {
          userId: session?.user.id,
          prompt: post.prompt,
          tag: post.tag,
        },
        config
      );

      if (data) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      submitHandler={createPrompt}
    />
  );
};

export default CreatePrompt;
