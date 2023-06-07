import Post, { PostProps } from "@/components/Post";
import prisma from "@/lib/prisma";
import { GetStaticProps } from "next";

type Props = {
  feed: PostProps[] | string;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  let feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { 
          name: true,
          image: true,
        },
      },
    },
  });
  feed = JSON.stringify(feed);
  
  return {
    props: { feed },
    revalidate: 10,
  };
};

export default function P(props: Props) {
  const feed = JSON.parse(props.feed)
  return <Post feed={feed}></Post>
}