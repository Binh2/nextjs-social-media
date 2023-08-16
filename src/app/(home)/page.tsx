"use client";
import * as JSONbig from 'json-bigint'
import { Header } from '@/components/common/Header';
import { LeftSidebar } from '@/components/common/LeftSidebar';
import { RightSidebar } from '@/components/common/RightSidebar';
import { GetStaticProps } from 'next';
import prisma from '../../lib/prisma';
import { Feed } from '@/components/posts/Feed';
import Head from 'next/head';
import { CreatePost } from '@/components/posts/CreatePost';

const Home = () => {
  return (<>
    <Head>
      <title>Homepage - SocialSphere</title>
    </Head>
    <Header />
    <div className="grid grid-cols-[27%_1fr_27%] bg-[#eee]">
      <LeftSidebar></LeftSidebar>
      <main className='min-h-[100vh]'>
        <CreatePost></CreatePost> 
        <Feed></Feed>
      </main>

      <RightSidebar></RightSidebar>
    </div>
  </>);
}

export default Home;