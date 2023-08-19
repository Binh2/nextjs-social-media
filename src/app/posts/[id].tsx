import React, { useState, useEffect } from 'react';
import Image from "next/image"
import { useRouter } from "next/router";
import { formatDate } from "@/lib/functions";
import { PostType } from "@/types/PostType";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Reactions } from "@/components/posts/reactions/Reactions";
import { ReactionPicker } from "@/components/posts/reactions/ReactionPicker";
import { CommentSection } from "@/components/posts/comments/CommentSection";
import { WriteComment } from "@/components/posts/comments/WriteComment";
import { MenuUser } from "@/components/common/Header/MenuUser";
import { transformResponse } from '@/lib/axiosBigint';
import { ProfileImage } from '@/components/common';

export default function Post() {
  const router = useRouter();
  const postId = router.query.id as string;
  const { data: post }: {data: PostType | undefined} = useQuery(['posts', postId], {
    queryFn: () => {
      const result = axios.get(`/api/posts/${postId}`, {transformResponse}).then(res => res.data);
      return result; 
    },
  })

  const { data: session, status } = useSession();
  const alt = 'Post image';
  return (
    <div className="relative">
      <Image className={` cursor-pointer`} src={post?.image || ''} alt={alt} 
      width={0} height={0} unoptimized />

      {/* {modalIsOpen && ( */}
      <div className="fixed inset-0 z-50 flex items-center justify-center w-">
        <div className="flex bg-black">
          <div className="fixed top-0 left-0 flex items-center justify-center w-3/4 h-full bg-black">
            <Image className="object-contain max-w-full max-h-full"
            src={post?.image || ''} alt={alt}
            width={0} height={0} unoptimized />
          </div>

          {/* Comment section */}
          <div className="fixed top-0 right-0 w-1/4 h-full pl-2 pr-2 overflow-y-scroll bg-slate-50">
            <div className="flex items-center justify-end">
              <button className="p-2 ml-2 text-gray-700 bg-gray-200 rounded-full">
                <Image src="/messenger-icon.svg" alt="Messenger icon" width={24} height={24} />
              </button>
              <button className="p-2 ml-2 text-gray-700 bg-gray-200 rounded-full">
                <Image src="/notifications-icon.svg" alt="Notification icon" width={24} height={24} />
              </button>

              <MenuUser />
            </div>
            <hr className="pb-2 border-gray-300" />

            <div className="flex items-center py-1 pb-2 cursor-pointer hover:bg-gray-300 hover:rounded-lg">
              <div className="inline-grid grid-cols-[48px_1fr] grid-rows-2 row-gap-2">
                <ProfileImage className={`row-span-2`} src={post?.user?.image}></ProfileImage>
                <p className="ml-2">{session?.user?.name}</p>
                <p className="ml-2 text-xs">{formatDate(post?.createdAt || '')}</p>
              </div>
            </div>

            <p>{post?.content || ''}</p>

            <div className="flex mt-2">
              <Reactions postId={postId}></Reactions>
              <div className="flex ml-auto">
                <p className="inline-block">12</p>
                <Image src="/comment-icon.svg" alt="Comment" width={16} height={16} />
                <p className="inline-block">1</p>
                <Image src="/share-icon.svg" alt="Share" width={16} height={16} />
              </div>
            </div>
            <hr className="pb-2 mt-1 border-gray-300" />
            {/* Rectioned */}
            <div className="flex content-between">
              <ReactionPicker postId={postId} className="flex items-center mx-auto"></ReactionPicker>

              <div className="flex mx-auto" >
                <Image src="/comment-icon.svg" alt="Comment" width={16} height={16} />
                <p>Comment</p>
              </div>
              <div className="flex mx-auto">
                <Image src="/share-icon.svg" alt="Share" width={16} height={16} />
                <p>Share</p>
              </div>
            </div>


            <hr className="pb-2 mt-2 border-gray-300" />
            <CommentSection postId={postId}></CommentSection>
            <div className="sticky bottom-0 w-full pr-2 bg-gray-100 h-15">
            <WriteComment postId={postId}></WriteComment>
            </div>
          
          </div>
          <button onClick={() => router.push('/')} 
            className="absolute p-2 mr-2 text-gray-500 bg-gray-200 rounded-full top-4 left-4 hover:text-gray-700"
          >
            <Image src="/close-icon.svg" alt="Close" width={24} height={25} />
          </button>
        </div>
      </div>
    </div>
  )
}