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

  return (<form onSubmit={submit} className="flex">
    <ProfileImage size={32} />
    <textarea placeholder="Write a comment..." value={content} onChange={(e) => setContent(e.target.value)} 
      className="h-5 focus:h-10 box-content w-[100%] outline-none transition-all" 
      onKeyDown={e => handleKeyDown(e)}
    />
    <button className="h-auto" tabIndex={0}>
      <FontAwesomeIcon icon={faPaperPlane} className="fa-solid fa-paper-plane text-teal-500" />
    </button>
  </form>);
}