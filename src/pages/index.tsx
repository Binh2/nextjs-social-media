import * as JSONbig from 'json-bigint'
import { Header } from '@/components/common/Header';
import { LeftSidebar } from '@/components/common/LeftSidebar';
import { RightSidebar } from '@/components/common/RightSidebar';
import { GetStaticProps } from 'next';
import prisma from '../lib/prisma';
import { Feed } from '@/components/posts/Feed';
import Head from 'next/head';
import { CreatePost } from '@/components/posts/CreatePost';

type Props = {
  feed: string;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const feed = await fetchFeed();
  return {
    props: { feed: JSONbig.stringify(feed) },
    revalidate: 10,
  };
};

const Home = (props: Props) => {
  const feed = JSONbig.parse(props.feed);

  return (<>
    <Head>
      <title>Homepage - SocialSphere</title>
    </Head>
    <Header />
    <div className="grid grid-cols-[27%_1fr_27%] bg-[#eee]">
      <LeftSidebar></LeftSidebar>
      <main className='min-h-[100vh]'>
        <CreatePost></CreatePost> 
        <Feed feed={feed}></Feed>
      </main>

      <RightSidebar></RightSidebar>
    </div>
  </>);
}

async function fetchFeed() {
  let feed = await prisma.post.findMany({
    take: 4,
    where: { published: true },
    orderBy: {
      updatedAt: "desc"
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
  return feed;
}
Home.requireAuth = true;
export default Home;