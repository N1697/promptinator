"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

import Form from "@/components/Form";

const EditPrompt = () => {
  //States
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  //Hooks
  const router = useRouter();

  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  useEffect(() => {
    const getPromptDetails = async () => {
      //   //Fetch
      //   const response = await fetch(`/api/prompt/${promptId}`);
      //   const data = await response.json();
      //   setPost({
      //     prompt: data.prompt,
      //     tag: data.tag,
      //   });

      //Axios
      const { data } = await axios.get(`/api/prompt/${promptId}`);
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    promptId && getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    if (!promptId) return alert("Prompt ID not found");

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

      const { data } = await axios.patch(
        `/api/prompt/${promptId}`,
        {
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      submitHandler={updatePrompt}
    />
  );
};

export default EditPrompt;
