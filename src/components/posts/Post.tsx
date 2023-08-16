import Image from "next/image"
import React, { useState } from "react";
import Link from "next/link"
import UploadedImage from "../common/UploadedImage";
import { formatDate } from "@/lib/functions";
import { WriteComment } from "./comments/WriteComment";
import { CommentSection } from "./comments/CommentSection";
import { PostType } from "@/types/PostType";
import { ReactionPicker } from "./reactions/ReactionPicker";
import { Reactions } from "./reactions/Reactions";
import { CommentCount } from "./comments/CommentCount";
import { ProfileImage } from '@/components/common/ProfileImage'

export const Post: React.FC<{ post: PostType }> = ({ post }) => {
  const authorName = post.user ? post.user.name : "Unknown author";

  return (
    <div className="p-5 bg-white rounded-lg">
      <div className="flex">
        <div className="inline-grid grid-cols-[48px_1fr] grid-rows-2 row-gap-2">
          <ProfileImage src={post.image} className="row-span-2"></ProfileImage>
          <p className="ml-2">{authorName}</p>
          <p className="ml-2 text-xs">{formatDate(post.createdAt)}</p>
        </div>
        <div className="flex items-center ml-auto">
          <Image src="/save-post-icon.svg" alt="Save post" width={0} height={0} style={{ width: "auto", height: "18px" }} className="mr-2" />
          <Image src="/ellipsis-icon.svg" alt="More" width={0} height={0} style={{ width: "18px", height: "auto" }} />
        </div>
      </div>

      <p className="mt-2 break-all whitespacing-pre-wrap">{post.content}</p>
      <Link href={`/posts/${post.id}`}>
        {post.image && <UploadedImage src={post.image} alt="Uploaded image" className="object-contain w-full mt-2 cursor-pointer" />}
      </Link>

      <div className="flex">
        <Reactions postId={post.id.toString()}></Reactions>
        <div className="flex ml-auto">
          <p className="inline-block"><CommentCount postId={post.id.toString()}></CommentCount></p>
          <Image src="/comment-icon.svg" alt="Comment" width={16} height={16} />
          <p className="inline-block">1</p>
          <Image src="/share-icon.svg" alt="Share" width={16} height={16} />
        </div>
      </div>

      <hr className="pb-2 mt-2 border-gray-300" />

      <div className="flex content-between">
        <ReactionPicker postId={post.id.toString()} className="flex items-center mx-auto"></ReactionPicker>

        <div className="flex mx-auto">
          <Image src="/comment-icon.svg" alt="Comment" width={16} height={16} />
          <p>Comment</p>
        </div>
        <div className="flex mx-auto">
          <Image src="/share-icon.svg" alt="Share" width={16} height={16} />
          <p>Share</p>
        </div>
      </div>
      <CommentSection postId={post.id.toString()}></CommentSection>
      <WriteComment postId={post.id.toString()}></WriteComment>
    </div>
  );
};

export default Post;
