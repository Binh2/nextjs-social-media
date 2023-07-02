import Popup from "reactjs-popup";
import { Reaction } from "./Reaction";
import { ReactionType } from "@/types/ReactionType";
import { useSession } from "next-auth/react";
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Suspense, useEffect } from "react";
import { Loading } from "@/components/common/Loading";

type Props = {
  postId: string;
}

export function Reactions({ postId }: Props) {
  const queryClient = useQueryClient();
  const { data: session, status: sessionStatus } = useSession();
  const { isLoading, isError, data: reactions, error } = useQuery<ReactionType[]>(['post', postId, 'reaction'], {
    queryFn: () => {
      const result = fetchReactions(postId);
      return result;
    },
  })
  // console.log(reactions);
  const { data: count } = useQuery<number>(['post', postId, 'reaction', 'count'], {
    queryFn: () => {
      return axios.get(`/api/post/${postId}/reaction/count`).then(res => res.data)
    }
  })
  
  queryClient.prefetchQuery(['post', postId, 'reaction'])
  const didSelfReact = reactions && reactions.map(reaction => reaction.authorEmail).includes(session?.user?.email || '')
  let othersCount = 0;
  if (count) othersCount = Math.max(count - (didSelfReact ? 1 : 0), 0);
  // console.log(othersCount)
  
  return (<div>
    {/* <Suspense fallback={<Loading />}> */}
      <ol>
        { !isLoading && reactions && reactions.filter((reaction, index, self) => {
          return self.findIndex(reactionTemp => reactionTemp.type == reaction.type) == index;
        }).map(reaction => (
          <li key={reaction.type}>
            <Reaction type={reaction.type}></Reaction>
          </li>
        ))}
      </ol>
      { 
        othersCount && (othersCount > 0) &&
        <p>
          { didSelfReact && <span>Bạn và </span> }
          { othersCount && (othersCount > 0) && <span>{othersCount} người khác</span> }
        </p>
      }
    {/* </Suspense> */}
  </div>)
}

function fetchReactions(postId: string) {
  return axios.get(`/api/post/${postId}/reaction`).then(res => res.data)
}