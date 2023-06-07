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
// import { useFeed } from '@/hooks/useFeed';

type Props = {
  feed: PostProps[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  
  return {
    props: { feed },
    revalidate: 10,
  };
};

const Home = (props: Props) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Navigate to sign in page when user is not signed in
  useEffect(() => {
    if (status == 'unauthenticated') router.push('/signin')
  }, [status, router]);

  return (<>
    <LeftSidebar></LeftSidebar>
    <main className='float-left'>
      <div>
        <div className='flex'>
          <ProfileImage></ProfileImage>
          
          <PostPopup></PostPopup>
        </div>
        <div>
          <button>Livestream</button>
          <button>Photo/Video</button>
          <button>Life events</button>
        </div>
      </div>

      <Feed feed={props.feed}></Feed>
    </main>
    <RightSidebar></RightSidebar>
  </>);
}

export default Home;