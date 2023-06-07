import prisma from "@/lib/prisma";
import { GetStaticProps } from "next";
import Post from "./Post";
import { PostProps } from "@/types/PostProps";
// import { Post as PostProps } from "@prisma/client"

type Props = {
  feed: PostProps[] | undefined
}

export function Feed(props: Props) {
  return (<ol className="flex flex-col gap-4">
    {
      props.feed &&
      props.feed.map(post => (
        <li key={post.id} className="">
          <Post post={post}></Post>
        </li>
      ))
    }
  </ol>)
}