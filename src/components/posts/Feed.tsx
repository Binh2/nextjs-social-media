"use client";
import Post from "./Post";
import { PostType } from "@/types/PostType";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import React from "react";
import axios from "axios";
import { transformResponse } from "@/lib/axiosBigint";

type Props = {
  feed?: PostType[]
}

export function Feed(props: Props) {
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = 
  useInfiniteQuery<PostType[], Error, PostType[]>(['posts'], {
    initialData: () => {
      if (!props.feed) return;
      return {
        pages: [props.feed],
        pageParams: [undefined, props.feed.length]
      }
    },
    queryFn: ({pageParam}) => fetchMoreData({pageParam}),
    getNextPageParam: (lastPage, pages) => {
      return pages.reduce((count, group) => count + group.length, 0);
    }
  });
  useEffect(() => {
    if (data && data.pages.length != 0) return;
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
        hasMore={hasNextPage || true}
        loader={<p>Loading...</p>}
      >
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((post: PostType) => 
              <Post key={post.id.toString()} post={post}></Post>
            )}
          </React.Fragment>
        ))}
      </InfiniteScroll>
    }
  </>)
}

function fetchMoreData({pageParam = 0}) {
  const data = axios.get(`/api/posts`, {
    params: {
      skip: pageParam
    },
    transformResponse
  }).then(res => res.data)
  return data;
}