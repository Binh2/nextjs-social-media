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

    <Header />
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
    {/* </main> */}
  </>);
}

export default Home;