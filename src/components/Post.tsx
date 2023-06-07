import Image from "next/image"
import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import UploadedImage from "./UploadedImage";
import { formatDate } from "@/lib/functions";
import { WriteComment } from "./WriteComment";
import { CommentSection } from "./CommentSection";
import prisma from "@/lib/prisma";
import { PostProps } from "@/types/PostProps";


// {
//   id: string;
//   title: string;
//   author: {
//     name: string;
//     // email: string;
//   } | null;
//   content: string;
//   published: boolean;
// };

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  const router = useRouter();
  const [ comments, setComments ] = useState(post.comments);
  console.log(comments)

  async function reloadComments() {
    console.log(prisma)
    const commentsTemp = await prisma.comment.findMany({
      where: {
        postId: post.id
      },
      include: {
        author: true,
        // content: true,
        // updatedAt: true,
      }
    });
    setComments(commentsTemp);
  }

  return (
    // <div onClick={() => router.push("/p/[id]", `/p/${post.id}`)}>
    <div className="p-5 rounded-lg bg-white">
      <div className="flex">
        <div className="inline-grid grid-cols-[48px_1fr] grid-rows-2 row-gap-2">
          { 
            post.author?.image ? 
            <Image src={post.author?.image} alt="Author's image" width={48} height={48} className="rounded-[100%] row-span-2" /> :
            <Image src="/blank-profile.svg" alt="Blank profile pic" width={48} height={48} className='rounded-[100%] row-span-2'></Image>
          }
          <p>{authorName}</p>
          <p>{formatDate(post.createdAt)}</p>
        </div>
        <div className="flex ml-auto">
          <Image src="/save-post-icon.svg" alt="Save post" width={0} height={0} style={{width: "auto", height: "32px"}} />
          <Image src="/ellipsis-icon.svg" alt="More" width={0} height={0} style={{width: "32px", height: "auto"}} />
        </div>
      </div>
      <p>{post.content}</p>
      { post.image && <UploadedImage src={post.image} alt="Uploaded image" className="w-[50%]" /> }
      <div className="flex">
        <div className="flex">
          <Image src="like-icon.svg" alt="Like" width={16} height={16} />
          <Image src="love-icon.svg" alt="Love" width={16} height={16} />
          <p className="inline-block">Bạn và 100 người khác</p>
        </div>
        <div className="flex ml-auto">
          <p className="inline-block">12</p>
          <Image src="comment-icon.svg" alt="Comment" width={16} height={16} />
          <p className="inline-block">1</p>
          <Image src="share-icon.svg" alt="Share" width={16} height={16} />
        </div>
      </div>
      <div className="flex content-between">
        <div className="flex mx-auto">
          <Image src="like-icon--inside-filled.svg" alt="Like" width={16} height={16} />
          <p>Like</p>
        </div>
        <div className="flex mx-auto">
          <Image src="comment-icon.svg" alt="Comment" width={16} height={16} />
          <p>Comment</p>
        </div>
        <div className="flex mx-auto">
          <Image src="share-icon.svg" alt="Share" width={16} height={16} />
          <p>Share</p>
        </div>
      </div>
      <CommentSection comments={comments}></CommentSection>
      <WriteComment postId={post.id} onReloadComments={reloadComments}></WriteComment>
    </div>
  );
};

export default Post;
