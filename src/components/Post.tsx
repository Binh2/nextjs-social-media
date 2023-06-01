import React from "react";
import Router from "next/router";
import { Post as PostProps_ } from "@prisma/client";

export type PostProps = PostProps_ & {
  author: {
    name: string | null
  } | null
}
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
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <p>{post.content}</p>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
