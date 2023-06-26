import Image from "next/image"
import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import UploadedImage from "../common/UploadedImage";
import { formatDate } from "@/lib/functions";
import { WriteComment } from "./comments/WriteComment";
import { CommentSection } from "./comments/CommentSection";
import prisma from "@/lib/prisma";
import { PostProps } from "@/types/PostProps";
import { CommentProps } from "@/types/CommentProps";
import { ReactionPicker } from "./reactions/ReactionPicker";
import { Reactions } from "./reactions/Reactions";
import { useSession } from "next-auth/react";
import { ReactionTypes } from "@/lib/reactionTypes";
import { CommentCount } from "./comments/CommentCount";

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  const router = useRouter();
  const { status, data: session } = useSession()
  return (
    // <div onClick={() => router.push("/p/[id]", `/p/${post.id}`)}>


    <div className="p-5 bg-white rounded-lg">
      <div className="flex">
        <div className="inline-grid grid-cols-[48px_1fr] grid-rows-2 row-gap-2">
          {
            post.author?.image ?
              <Image src={post.author?.image} alt="Author's image" width={48} height={48} className="rounded-[100%] row-span-2" /> :
              <Image src="/blank-profile.svg" alt="Blank profile pic" width={48} height={48} className='rounded-[100%] row-span-2'></Image>
          }
          <p className="ml-2">{authorName}</p>
          <p className="ml-2 text-xs">{formatDate(post.createdAt)}</p>
        </div>
        <div className="flex items-center ml-auto">
          <Image src="/save-post-icon.svg" alt="Save post" width={0} height={0} style={{ width: "auto", height: "18px" }} className="mr-2" />
          <Image src="/ellipsis-icon.svg" alt="More" width={0} height={0} style={{ width: "18px", height: "auto" }} />
        </div>
      </div>

      <p className="mt-2 break-all whitespacing-pre-wrap">{post.content}</p>
      <button onClick={() => router.push(`/post/${post.id}`)}>
        {post.image && <UploadedImage src={post.image} alt="Uploaded image" className="object-cover w-full h-[500px] mt-2 cursor-pointer" />}
      </button>

      <div className="flex">
        <Reactions postId={post.id}></Reactions>
        <div className="flex ml-auto">
          <p className="inline-block"><CommentCount postId={post.id}></CommentCount></p>
          <Image src="comment-icon.svg" alt="Comment" width={16} height={16} />
          <p className="inline-block">1</p>
          <Image src="share-icon.svg" alt="Share" width={16} height={16} />
        </div>
      </div>

      <hr className="pb-2 mt-2 border-gray-300" />

      <div className="flex content-between">
        {/* <div className="flex mx-auto">
          <Image src="like-icon--inside-filled.svg" alt="Like" width={16} height={16} />
          <p>Like</p>
        </div> */}
        <ReactionPicker postId={post.id} className="flex items-center mx-auto"></ReactionPicker>

        <div className="flex mx-auto" >
          <Image src="comment-icon.svg" alt="Comment" width={16} height={16} />
          <p>Comment</p>
        </div>
        <div className="flex mx-auto">
          <Image src="share-icon.svg" alt="Share" width={16} height={16} />
          <p>Share</p>
        </div>
      </div>
      <CommentSection postId={post.id}></CommentSection>
      <WriteComment postId={post.id}></WriteComment>
    </div>
  );
};

export default Post;
