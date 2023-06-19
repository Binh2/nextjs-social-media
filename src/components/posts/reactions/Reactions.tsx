import Popup from "reactjs-popup";
import { Reaction } from "./Reaction";
import { ReactionProps } from "@/types/ReactionProps";
import { useSession } from "next-auth/react";
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

type Props = {
  reactions: ReactionProps[];
  count: number | null;
  postId: string;
}

export function Reactions({ reactions = [], count = 0, postId }: Props) {
  const queryClient = useQueryClient();
  const { data: session, status: sessionStatus } = useSession();
  const { isLoading, isError, data, error } = useQuery(['post', postId, 'reaction'], {
    queryFn: ({pageParam}) => fetchReactions(postId, pageParam),
  })
  
  queryClient.prefetchQuery(['post', postId, 'reaction'])
  const { reactions: _reactions, _count }: {reactions: ReactionProps[], _count: number} = data || {reactions: reactions, count: count};
  const didSelfReact = _reactions && _reactions.map(reaction => reaction.authorEmail).includes(session?.user?.email || '')
  return (<div>
    <ol>
      {_reactions && _reactions.filter((reaction, index, self) => {
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

function fetchReactions(postId: string, pageParam: number) {
  return axios.get(`/api/post/${postId}/reaction`).then(res => res.data)
}