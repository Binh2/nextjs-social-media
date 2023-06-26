import Popup from "reactjs-popup";
import { Reaction } from "./Reaction";
import { ReactionProps } from "@/types/ReactionProps";
import { useSession } from "next-auth/react";
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

type Props = {
  postId: string;
}

export function Reactions({ postId }: Props) {
  const queryClient = useQueryClient();
  const { data: session, status: sessionStatus } = useSession();
  const { isLoading, isError, data: reactions, error } = useQuery<ReactionProps[]>(['post', postId, 'reaction'], {
    queryFn: () => {
      const result = fetchReactions(postId);
      // console.log(result)
      return result;
    },
  })
  // console.log(reactions);
  const { data: count } = useQuery<number>(['post', postId, 'reaction', 'count'], {
    queryFn: () => {
      return axios.get(`/api/post/${postId}/reaction/count`)
    }
  })
  
  queryClient.prefetchQuery(['post', postId, 'reaction'])
  const didSelfReact = reactions && reactions.map(reaction => reaction.authorEmail).includes(session?.user?.email || '')
  
  return (<div>
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
      !count &&
      <p>
        { didSelfReact && <span>Bạn và </span> }
        { !count && <span>{(count || 0) - (didSelfReact ? 1 : 0)} người khác</span> }
      </p>
    }
  </div>)
}

function fetchReactions(postId: string) {
  return axios.get(`/api/post/${postId}/reaction`).then(res => res.data)
}