// @refresh reset
import { Header } from '@/components/Header';
import { LeftSidebar } from '@/components/LeftSidebar';
import { RightSidebar } from '@/components/RightSidebar';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProfileImage } from '../components/ProfileImage';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import prisma from '../lib/prisma';
import { PostProps } from '@/components/Post';
import { Feed } from '@/components/Feed';
import Image from 'next/image';
import { PostPopup } from '@/components/PostPopup';
import { PrismaClient } from '@prisma/client';
import Head from 'next/head';

type Props = {
  feed: string;
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
      comments: {
        select: {
          author: true,
          content: true,
          updatedAt: true,
        }
      }
    },
  });

  return {
    props: { feed: JSON.stringify(feed) },
    revalidate: 10,
  };
};

const Home = (props: Props) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const feed: PostProps[] = JSON.parse(props.feed)
  // console.log(feed)

  // Navigate to sign in page when user is not signed in
  useEffect(() => {
    if (status == 'unauthenticated') router.push('/signin')
  }, [status, router]);

  return (<>
    <Head>
      <title>Homepage - SocialSphere</title>
    </Head>

    <div className="grid grid-cols-[27%_1fr_27%] bg-[#eee]">

      {/* Left bar */}
      <LeftSidebar></LeftSidebar>

      {/* body */}
      <main className=''>
        <div className="bg-white my-4 rounded-lg shadow">
          <div className="flex items-center p-4 flex-1">
            <ProfileImage />
            <PostPopup />
          </div>
          <hr className="border-gray-300 pb-2 mt-2" />

          <div className="flex justify-between mt-1 mb-1 px-3">
            <div className="h-12 flex items-center space-x-1 py-1 cursor-pointer hover:bg-gray-200 hover:rounded-lg pl-5 mb-2 ml-2 p-10">
              <Image src="/livestream-icon.svg" alt="View all" width={32} height={32} />
              <button className="text-sm font-medium">Livestream</button>
            </div>
            <div className="flex items-center space-x-1 py-1 cursor-pointer hover:bg-gray-200 hover:rounded-lg pl-5 mb-2 p-10">
              <Image src="/photo-icon.svg" alt="View all" width={32} height={32} />
              <button className="text-sm font-medium">Photo/Video</button>
            </div>
            <div className="flex items-center space-x-1 py-1 cursor-pointer hover:bg-gray-200 hover:rounded-lg pl-5 mb-2 p-10 mr-2">
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
  </>);
}

export default Home;