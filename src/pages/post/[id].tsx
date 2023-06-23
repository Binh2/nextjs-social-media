import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';
import 'src/app/globals.css';
import Image from "next/image"
import { useRouter } from "next/router";
import { formatDate } from "@/lib/functions";
import prisma from "@/lib/prisma";
import { PostProps } from "@/types/PostProps";
import { CommentProps } from "@/types/CommentProps";
import { useSession } from "next-auth/react";
import { ReactionTypes } from "@/lib/reactionTypes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Reactions } from "@/components/posts/reactions/Reactions";
import { ReactionPicker } from "@/components/posts/reactions/ReactionPicker";
import { CommentSection } from "@/components/posts/comments/CommentSection";
import { WriteComment } from "@/components/posts/comments/WriteComment";
import { MenuUser } from "@/components/common/MenuUser";
import { ReactionProps } from '@/types/ReactionProps';

type Props = {
  className?: string;
  src: string;
  alt?: string;
  post: PostProps;
}

export default function Post() {
  const router = useRouter();
  const postId = router.query.id as string;
  console.log(postId)
  const { data }: {data: PostProps | undefined} = useQuery(['post', postId], {
    queryFn: () => {
      const result = axios.get(`/api/p/${postId}`).then(res => res.data);
      // console.log(result)
      return result; 
    },
  })
  const post = data;
  console.log(post)

  const { data: session, status } = useSession();
  const alt = 'Post image';
  return (
    // <div className="relative"> 
    //   <img className={props.className} src={post.image} alt={alt} />

    // </div>

    <div className="relative">
      <img
        className={` cursor-pointer`}
        src={post?.image || ''}
        alt={alt}
      />

      {/* {modalIsOpen && ( */}
        <div className="fixed w- inset-0 flex items-center justify-center z-50">
          <div className="modal-container bg-black  flex">
            <div className="modal-content w-3/4  fixed left-0 top-0 h-full flex justify-center items-center bg-black">
              <img
                className="object-contain max-w-full max-h-full"
                src={post?.image || ''}
                alt={alt}
              />
            </div>


            {/* Comment section */}
            <div className=" modal-sidebar bg-slate-50 w-1/4 fixed right-0 top-0 h-full overflow-y-scroll pl-2 pr-2">
              <div className="flex items-center justify-end">
                <button className="p-2 ml-2 text-gray-700 bg-gray-200 rounded-full">
                  <Image src="/messenger-icon.svg" alt="Messenger icon" width={24} height={24} />
                </button>
                <button className="p-2 ml-2 text-gray-700 bg-gray-200 rounded-full">
                  <Image src="/notifications-icon.svg" alt="Notification icon" width={24} height={24} />
                </button>

                <MenuUser />
              </div>
              <hr className="border-gray-300 pb-2" />

              <div className="flex items-center py-1 cursor-pointer hover:bg-gray-300 hover:rounded-lg pb-2">
                <div className="inline-grid grid-cols-[48px_1fr] grid-rows-2 row-gap-2">
                  {
                    post && post.author?.image ?
                      <Image src={post?.author?.image || ''} alt="Author's image" width={48} height={48} className="rounded-[100%] row-span-2" /> :
                      <Image src="/blank-profile.svg" alt="Blank profile pic" width={48} height={48} className='rounded-[100%] row-span-2'></Image>
                  }
                  <p className="ml-2">{session?.user?.name}</p>
                  <p className="ml-2 text-xs">{formatDate(post?.createdAt || '')}</p>
                </div>
              </div>

              <p>{post?.content || ''}</p>

              <div className="flex mt-2">
                <Reactions reactions={post?.reactions} count={post && post._count.reactions || 0} postId={postId}></Reactions>
                <div className="flex ml-auto">
                  <p className="inline-block">12</p>
                  <Image src="/comment-icon.svg" alt="Comment" width={16} height={16} />
                  <p className="inline-block">1</p>
                  <Image src="/share-icon.svg" alt="Share" width={16} height={16} />
                </div>
              </div>
              <hr className="border-gray-300 pb-2 mt-1" />
              {/* Rectioned */}
              <div className="flex content-between">
                <ReactionPicker postId={postId} type={
                  post && post.reactions.filter((reaction: ReactionProps) => reaction.authorEmail == session?.user?.email)[0]?.type || ReactionTypes.NONE
                } className="flex mx-auto items-center"></ReactionPicker>

                <div className="flex mx-auto" >
                  <Image src="/comment-icon.svg" alt="Comment" width={16} height={16} />
                  <p>Comment</p>
                </div>
                <div className="flex mx-auto">
                  <Image src="/share-icon.svg" alt="Share" width={16} height={16} />
                  <p>Share</p>
                </div>
              </div>



              <hr className="border-gray-300 pb-2 mt-2" />
              <CommentSection postId={postId}></CommentSection>
              <div className="sticky w-full bottom-0 bg-gray-100 h-15 pr-2">
                   <WriteComment postId={postId}></WriteComment>
              </div>
           

            </div>
            <button
              className="modal-close absolute top-4 left-4 text-gray-500 hover:text-gray-700 p-2 rounded-full bg-gray-200 mr-2"
            >
              <Image onClick={() => router.push('/')} src="/close-icon.svg" alt="Close" width={25} height={25} />
            </button>
          </div>
        </div>
      {/* )} */}
    </div>
  )
}