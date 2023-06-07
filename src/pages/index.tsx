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

    <Header></Header>
    <div className="grid grid-cols-[20%_1fr_20%] bg-[#eee]">
      <LeftSidebar></LeftSidebar>
      <main className=''>
        <div className='bg-white my-4 rounded-lg'>
          <div className='flex'>
            <ProfileImage></ProfileImage>
            
            <PostPopup></PostPopup>
          </div>
          <div>
            <button>
              <p>Livestream</p>
            </button>
            <button>Photo/Video</button>
            <button>Life events</button>
          </div>
        </div>

        <Feed feed={feed}></Feed>
      </main>
      <RightSidebar></RightSidebar>
    </div>
  </>);
}

export default Home;