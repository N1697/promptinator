"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({
  prompt,
  tagClickHandler,
  editHandler,
  deleteHandler,
}) => {
  //States
  const [copied, setCopied] = useState("");

  //Hooks
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  //Functionalities
  const copyHandler = () => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  const checkProfileHandler = () => {
    router.push(
      `/profile?id=${prompt.creator._id}&username=${prompt.creator.username}&email=${prompt.creator.email}`
    );
  };

  return (
    <div className="prompt_card ">
      {/* Image, Name, Email, Copy Button */}
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex flex-1 justify-start items-center gap-3 cursor-pointer"
          onClick={checkProfileHandler}
        >
          <Image
            src={prompt.creator.image}
            alt="User Image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {prompt.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {prompt.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={copyHandler}>
          <Image
            src={
              copied === prompt.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="Copied"
            width={20}
            height={20}
          />
        </div>
      </div>

      {/* Prompt, Tag */}
      <p className="my-4 font-satoshi text-sm text-gray-700">{prompt.prompt}</p>
      <p
        className="font-inter text-sm bluish-violet_gradient cursor-pointer"
        onClick={() => tagClickHandler && tagClickHandler(prompt.tag)}
      >
        #{prompt.tag}
      </p>

      {/* Edit, Delete */}
      {session?.user.id === prompt.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t pt-3">
          <p
            className="font-inter text-sm blue_gradient cursor-pointer"
            onClick={editHandler}
          >
            Edit
          </p>

          <p
            className="font-inter text-sm red_gradient cursor-pointer"
            onClick={deleteHandler}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
