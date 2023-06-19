import prisma from "@/lib/prisma";
import { GetStaticProps } from "next";
import Post from "./Post";
import { PostProps } from "@/types/PostProps";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from "react";

type Props = {
  feed: PostProps[] | undefined
}

export function Feed(props: Props) {
  const [feed, setFeed] = useState(props.feed);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  async function fetchMoreData() {
    const res = await fetch(`/api/post?skip=${skip}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const feedTemp = await res.json();
    console.log(feedTemp);
    if (feed) setFeed([...feed, ...feedTemp])
    else setFeed(feedTemp);
    if (feedTemp.length == 0) setHasMore(false);
    setSkip(skip + feedTemp.length);
  }

  return (<>
    {
      feed &&
      <InfiniteScroll
        className="flex flex-col gap-4"
        dataLength={feed.length +20} //+8
        pullDownToRefreshThreshold={10} //50
        next={fetchMoreData}
        // style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
        // inverse={true} 
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        // height={400}
        // scrollableTarget="scrollableDiv"
      >
        {feed.map((post) => (
          <Post key={post.id} post={post}></Post>
        ))}
      </InfiniteScroll>
    }
  </>)
}