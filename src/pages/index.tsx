// @refresh reset
import { Header } from '@/components/common/Header';
import { LeftSidebar } from '@/components/common/LeftSidebar';
import { RightSidebar } from '@/components/common/RightSidebar';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProfileImage } from '../components/common/ProfileImage';
import { GetServerSideProps, GetStaticProps, InferGetStaticPropsType, NextApiHandler } from 'next';
import prisma from '../lib/prisma';
import { PostProps } from '@/types/PostProps';
import { Feed } from '@/components/posts/Feed';
import Image from 'next/image';
import { PostPopup } from '@/components/posts/PostPopup';
import { PrismaClient } from '@prisma/client';
import Head from 'next/head';
import { authOptions } from './api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

type Props = {
  feed: string;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const feed = await fetchFeed();
  return {
    props: { feed: JSON.stringify(feed) },
    revalidate: 10,
  };
};

const Home = (props: Props) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [ feed, setFeed ] = useState<PostProps[]>(JSON.parse(props.feed));

  // Navigate to sign in page when user is not signed in
  useEffect(() => {
    if (status == 'unauthenticated') router.push('/signin')
  }, [status, router]);

  return (<>
    <Head>
      <title>Homepage - SocialSphere</title>
    </Head>

    <Header />
    <div className="grid grid-cols-[27%_1fr_27%] bg-[#eee]">

      {/* Left bar */}
      <LeftSidebar></LeftSidebar>

      {/* body */}
      <main className='min-h-[100vh]'>
        <div className="my-4 bg-white rounded-lg shadow">
          <div className="flex items-center flex-1 p-4">
            <ProfileImage />
            <PostPopup />
          </div>
          <hr className="pb-2 mt-2 border-gray-300" />

          <div className="flex justify-between px-3 mt-1 mb-1">
            <div className="flex items-center h-12 p-10 py-1 pl-5 mb-2 ml-2 space-x-1 cursor-pointer hover:bg-gray-200 hover:rounded-lg">
              <Image src="/livestream-icon.svg" alt="View all" width={32} height={32} />
              <button className="text-sm font-medium">Livestream</button>
            </div>
            <div className="flex items-center p-10 py-1 pl-5 mb-2 space-x-1 cursor-pointer hover:bg-gray-200 hover:rounded-lg">
              <Image src="/photo-icon.svg" alt="View all" width={32} height={32} />
              <button className="text-sm font-medium">Photo/Video</button>
            </div>
            <div className="flex items-center p-10 py-1 pl-5 mb-2 mr-2 space-x-1 cursor-pointer hover:bg-gray-200 hover:rounded-lg">
              <Image src="/flag-icon.svg" alt="View all" width={25} height={25} />
              <button className="text-sm font-medium">Life events</button>
            </div>
          </div>
        </div>

        <Feed feed={feed}></Feed>
      </main>

      {/* rigt bar */}
      <RightSidebar></RightSidebar>
    </div>
    {/* </main> */}
  </>
  
  
  
  );
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
Home.requiredAuth = true;
export default Home;