import prisma from "@/lib/prisma";
import { GetStaticProps } from "next";
import Post from "./Post";
import { PostProps } from "@/types/PostProps";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import React from "react";
import axios from "axios";
// import { PostProps } from "@/types/PostProps"

type Props = {
  feed: PostProps[] | undefined
}

export function Feed(props: Props) {
  const [ hasMore, setHasMore ] = useState(true);
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = 
  useInfiniteQuery({
    queryKey: ['feed'],
    queryFn: fetchMoreData,
    getNextPageParam: (lastPage, pages) => {
      return pages.reduce((count, group) => count + group.length, 0);
    }
  });
  useEffect(() => {
    fetchNextPage();
  }, [])

  return (<>
    {
      data?.pages &&
      <InfiniteScroll
        className="flex flex-col gap-4"
        dataLength={data?.pages.length * 4 + 8}
        pullDownToRefreshThreshold={50}
        next={() => fetchNextPage()}
        // style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
        // inverse={true} 
        hasMore={hasMore}
        loader={<p>Loading...</p>}
        // height={400}
        // scrollableTarget="scrollableDiv"
      >
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((post: PostProps) => 
              <Post key={post.id} post={post}></Post>
            )}
          </React.Fragment>
        ))}
      </InfiniteScroll>
      
    }
  </>)
}

function fetchMoreData({pageParam = 0}) {
  // console.log(pageParam)
  const data = axios.get(`/api/post`, {
    params: {
      skip: pageParam
    }
  }).then(res => res.data)
  return data;
}