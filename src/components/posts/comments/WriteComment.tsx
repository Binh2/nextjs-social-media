import React, { useState } from "react";
import { ProfileImage } from "../../common/ProfileImage";
import { useUpload } from "@/lib/useUpload";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

type Props = {
  postId: string;
  onReloadComments: any;
}

export function WriteComment(props: Props) {
  const [content, setContent] = useState('');
  const postId = props.postId;
  // const { uploadState, imageUrl, handleFileInputChange } = useUpload()

  async function submit(e: React.SyntheticEvent | null = null) {
    if (e) e.preventDefault();

    try {
      const body = { content, imageUrl: '', postId }
      const res = await fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      const comment = await res.json();
      console.log(comment)
      props.onReloadComments();
    }
    catch (error) {
      console.log(error);
    }
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && event.ctrlKey) {
      submit()
    }
  }

  return (
    <div className="flex items-center">
      <ProfileImage size={32} />
      <form onSubmit={submit} className="flex items-center border rounded-lg px-2 py-1 bg-[#eee] ml-2 w-full">
        <textarea
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-grow h-8 px-2 py-1 outline-none resize-none bg-transparent"
          onKeyDown={handleKeyDown} />
        <button
          className="flex items-center justify-center w-8 h-8 text-teal-500 hover:text-teal-600 focus:outline-none"
          tabIndex={0}>
          <FontAwesomeIcon icon={faPaperPlane} className="fa-solid fa-paper-plane" />
        </button>
      </form>
    </div>


  );
}