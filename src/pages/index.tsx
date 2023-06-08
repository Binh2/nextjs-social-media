// @refresh reset
import { Header } from '@/components/Header';
import { LeftSidebar } from '@/components/LeftSidebar';
import { RightSidebar } from '@/components/RightSidebar';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProfileImage } from '../components/ProfileImage';
import { GetServerSideProps, GetStaticProps, InferGetStaticPropsType, NextApiHandler } from 'next';
import prisma from '../lib/prisma';
import { PostProps } from '@/types/PostProps';
import { Feed } from '@/components/Feed';
import Image from 'next/image';
import { PostPopup } from '@/components/PostPopup';
import { PrismaClient } from '@prisma/client';
import Head from 'next/head';
import { options as authOptions } from './api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

type Props = {
  feed: string;
}

export const getStaticProps: GetServerSideProps<Props> = async () => {
  // const session = await getServerSession(req, authOptions);
  let feed = await prisma.post.findMany({
    take: 4,
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
      },
      _count: {
        select: {
          reactions: true,
        }
      },
      reactions: {
        // where: {
        //   author: {
        //     // email: session?.user?.email || ''
        //     email: 'hgqbinh2002@gmail.com'
        //   }
        // },
        take: 100,
        select: {
          type: true,
        },
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
  const [ feed, setFeed ] = useState<PostProps[]>(JSON.parse(props.feed));
  // const [ feed, setFeed ] = useState<PostProps[]>([]);

  // useEffect(() => {
  //   (async function () {
  //     const res = await fetch(`/api/post?skip=${0}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     });
  //     const feedTemp = await res.json()
  //     setFeed(feedTemp);
  //   })()
  // }, [])
  // console.log(feed)

  // Navigate to sign in page when user is not signed in
  useEffect(() => {
    if (status == 'unauthenticated') router.push('/signin')
  }, [status, router]);

  return (<>
    <Head>
      <title>Homepage - SocialSphere</title>
    </Head>

    <div className="min-h-[100vh] bg-[#eee]">
      <Header></Header>
      <div className="grid grid-cols-[20%_1fr_20%]">
        <LeftSidebar></LeftSidebar>
        <main className=''>
          <div className='p-5 my-4 bg-white rounded-lg'>
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
    </div>
  </>);
}

export default Home;