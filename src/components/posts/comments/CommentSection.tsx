import { CommentProps } from "@/types/CommentProps"
import { Comment } from "./Comment"
import React, { useEffect, useState } from 'react'
import { WriteComment } from "./WriteComment"
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

type Props = {
  postId: string;
}

export function CommentSection({ postId }: Props) {
  const queryClient = useQueryClient();
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status, refetch } = 
  useInfiniteQuery<CommentProps[]>({
    queryKey: ['post', postId, 'comment'],
    queryFn: ({pageParam}) => fetchComments({postId},{pageParam}),
    getNextPageParam(lastPage, allPages) {
      return allPages.reduce((count, group) => count + group.length, 0);
    }
  })
  
  queryClient.prefetchQuery(['post', postId, 'comment'])

  const [isVisible, setVisible] = useState(true);
  return ( data && data.pages ? 
    (<div>
      {
        isVisible ?
          <button className="block" onClick={() => setVisible(false)}>Hide comment section</button> :
          <button className="block" onClick={() => setVisible(true)}>Show comment section</button>
      }
      {
        isVisible &&
        <ol>
          {data.pages.map((group, i) => <React.Fragment key={i}>
            {group.map((comment) => <li key={comment.id}>
              <Comment comment={comment}></Comment>
            </li>)}
          </React.Fragment>)}
        </ol>
        
      }
      <button onClick={() => fetchNextPage()}>View more comments</button>
      {
        isVisible ?
          <button className="block" onClick={() => setVisible(false)}>Hide comment section</button> :
          <button className="block" onClick={() => setVisible(true)}>Show comment section</button>
      }
    </div>) : 
    <></>)
}

function fetchComments({postId}: {postId:string}, { pageParam = 0 }) {
  return axios.get(`/api/post/${postId}/comment`, {
    params: {
      skip: pageParam
    }
  }).then(res => {
    return res.data;
  });
}