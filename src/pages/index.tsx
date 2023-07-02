import { Header } from '@/components/common/Header';
import { LeftSidebar } from '@/components/common/LeftSidebar';
import { RightSidebar } from '@/components/common/RightSidebar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ProfileImage } from '../components/common/ProfileImage';
import { GetStaticProps } from 'next';
import prisma from '../lib/prisma';
import { Feed } from '@/components/posts/Feed';
import Image from 'next/image';
import { PostPopup } from '@/components/posts/PostPopup';
import Head from 'next/head';

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
  const feed = JSON.parse(props.feed);
  // const [ feed, setFeed ] = useState<PostType[]>(JSON.parse(props.feed));

  return (<>
    <Head>
      <title>Homepage - SocialSphere</title>
    </Head>
    <Header />
    <div className="grid grid-cols-[27%_1fr_27%] bg-[#eee]">
      <LeftSidebar></LeftSidebar>
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