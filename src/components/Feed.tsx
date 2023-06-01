import prisma from "@/lib/prisma";
import { GetStaticProps } from "next";
import Post, { PostProps } from "./Post";
// import { Post as PostProps } from "@prisma/client"

type Props = {
  feed: PostProps[] | undefined
}

export function Feed(props: Props) {
  return (<div>
    {
      props.feed &&
      props.feed.map(post => (<div key={post.id}>
        <Post post={post}></Post>
      </div>))
    }
  </div>)
}