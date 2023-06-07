import { useState } from "react";
import { ProfileImage } from "./ProfileImage";
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

  async function submit(e: React.SyntheticEvent) {
    e.preventDefault();

    try {
      const body = { content, imageUrl: '', postId }
      await fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      // await Router.reload()
      props.onReloadComments();
    }
    catch (error) {
      console.log(error);
    }
  }
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    console.log(event.key)
    if (event.key === 'Enter' && event.ctrlKey) {
      console.log('ctrl enter')
    }
  }

  return (<form onSubmit={submit} className="flex">
    <ProfileImage size={32} />
    <textarea placeholder="Write a comment..." value={content} onChange={(e) => setContent(e.target.value)} 
      className="h-5 focus:h-10 box-content w-[100%] outline-none transition-all" 
    />
    <button onKeyDown={e => handleKeyDown(e)} className="h-auto">
      <FontAwesomeIcon icon={faPaperPlane} className="fa-solid fa-paper-plane text-teal-500" />
    </button>
  </form>);
}