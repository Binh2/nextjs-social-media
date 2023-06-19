import { isPropertySignature } from "typescript";
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import 'src/app/globals.css';
import { MenuUser } from "./MenuUser";
import Image from "next/image"
import Router, { useRouter } from "next/router";
import { formatDate } from "@/lib/functions";
import { WriteComment } from "../posts/comments/WriteComment";
import { CommentSection } from "../posts/comments/CommentSection";
import prisma from "@/lib/prisma";
import { PostProps } from "@/types/PostProps";
import { CommentProps } from "@/types/CommentProps";
import { ReactionPicker } from "../posts/reactions/ReactionPicker";
import { Reactions } from "../posts/reactions/Reactions";
import { useSession } from "next-auth/react";
import { ReactionTypes } from "@/lib/reactionTypes";
import { ProfileImage } from "./ProfileImage";


// type Props = {
//   className?: string;
//   src: string;
//   alt?: string;

// }

export default function UploadedImageView(props) {
  const { data: session, status } = useSession();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    const body = document.querySelector('body');

    if (modalIsOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
  }, [modalIsOpen]);
  const handleImageClick = () => {
    setModalIsOpen(true);
  };
  const posts = props.data;
  console.log('ob', posts)
  const [reactions, setReactions] = useState(posts.reactions);
  const [comments, setComments] = useState(posts.comments);
  async function reloadComments() {
    const res = await fetch(`api/comment/${posts.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const commentsTemp: CommentProps[] = await res.json()
    setComments(commentsTemp);
  }
  return (
    // <div className="relative"> 
    //   <img className={props.className} src={props.src} alt={props.alt} />

    // </div>

    <div className="relative">
      <img
        className={`${props.className} cursor-pointer`}
        src={props.src}
        alt={props.alt}
        onClick={handleImageClick}
      />

      {modalIsOpen && (
        <div className="fixed w- inset-0 flex items-center justify-center z-50">
          <div className="modal-container bg-black  flex">
            <div className="modal-content w-3/4  fixed left-0 top-0 h-full flex justify-center items-center bg-black">
              <img
                className="object-contain max-w-full max-h-full"
                src={props.src}
                alt={props.alt}
              />
            </div>


            {/* Comment section */}
            <div className=" modal-sidebar bg-slate-50 w-1/4 fixed right-0 top-0 h-full overflow-y-scroll pl-2 pr-2">
              <div className="flex items-center justify-end">
                <button className="p-2 ml-2 text-gray-700 bg-gray-200 rounded-full">
                  <img src="/messenger-icon.svg" alt="Messenger icon" width={24} height={24} />
                </button>
                <button className="p-2 ml-2 text-gray-700 bg-gray-200 rounded-full">
                  <img src="/notifications-icon.svg" alt="Notification icon" width={24} height={24} />
                </button>

                <MenuUser />
              </div>
              <hr className="border-gray-300 pb-2" />

              <div className="flex items-center py-1 cursor-pointer hover:bg-gray-300 hover:rounded-lg pb-2">
                <div className="inline-grid grid-cols-[48px_1fr] grid-rows-2 row-gap-2">
                  {
                    posts.author?.image ?
                      <Image src={posts.author?.image} alt="Author's image" width={48} height={48} className="rounded-[100%] row-span-2" /> :
                      <Image src="/blank-profile.svg" alt="Blank profile pic" width={48} height={48} className='rounded-[100%] row-span-2'></Image>
                  }
                  <p className="ml-2">{session?.user?.name}</p>
                  <p className="ml-2 text-xs">{formatDate(posts.createdAt)}</p>
                </div>
              </div>

              <p>{posts.content}</p>

              <div className="flex mt-2">
                <Reactions reactions={reactions} count={posts._count.reactions}></Reactions>
                <div className="flex ml-auto">
                  <p className="inline-block">12</p>
                  <Image src="comment-icon.svg" alt="Comment" width={16} height={16} />
                  <p className="inline-block">1</p>
                  <Image src="share-icon.svg" alt="Share" width={16} height={16} />
                </div>
              </div>
              <hr className="border-gray-300 pb-2 mt-1" />
              {/* Rectioned */}
              <div className="flex content-between">
                <ReactionPicker postId={posts.id} type={
                  reactions.filter(reaction => reaction.authorEmail == session?.user?.email)[0]?.type || ReactionTypes.NONE
                } className="flex mx-auto items-center"></ReactionPicker>

                <div className="flex mx-auto" >
                  <Image src="comment-icon.svg" alt="Comment" width={16} height={16} />
                  <p>Comment</p>
                </div>
                <div className="flex mx-auto">
                  <Image src="share-icon.svg" alt="Share" width={16} height={16} />
                  <p>Share</p>
                </div>
              </div>



              <hr className="border-gray-300 pb-2 mt-2" />
              <CommentSection comments={comments}></CommentSection>
              <div className="sticky w-full bottom-0 bg-gray-100 h-15 pr-2">
                   <WriteComment postId={posts.id} onReloadComments={reloadComments}></WriteComment>
              </div>
           

            </div>
            <button
              className="modal-close absolute top-4 left-4 text-gray-500 hover:text-gray-700 p-2 rounded-full bg-gray-200 mr-2"
              onClick={() => setModalIsOpen(false)}>
              <img src="/close-icon.svg" alt="Close" width={25} height={25} />
            </button>
          </div>
        </div>
      )}
    </div>








  )


}

// UploadedImage.defaultProps = {
//   className: "",
//   src: "",
//   alt: "",
// };
