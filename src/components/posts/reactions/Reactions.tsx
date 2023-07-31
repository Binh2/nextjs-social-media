import { Reaction } from "./Reaction";
import { ReactionType } from "@/types/ReactionType";
import { useSession } from "next-auth/react";
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { transformResponse } from "@/lib/axiosBigint";

type Props = {
  postId: string;
}

export function Reactions({ postId }: Props) {
  const queryClient = useQueryClient();
  const { data: session, status: sessionStatus } = useSession();
  const { isLoading, isError, data: reactions, error } = useQuery<ReactionType[]>(['posts', postId, 'reactions'], {
    queryFn: () => {
      const result = axios.get(`/api/posts/${postId}/reactions`, {transformResponse}).then(res => res.data); 
      return result;
    },
  })
  // console.log(reactions);
  const { data: count } = useQuery<number>(['posts', postId, 'reactions', 'count'], {
    queryFn: () => {
      return axios.get(`/api/posts/${postId}/reactions/count`, {transformResponse}).then(res => res.data)
    }
  })
  
  queryClient.prefetchQuery(['posts', postId, 'reactions'])
  const didSelfReact = reactions && reactions.map(reaction => reaction.authorEmail).includes(session?.user?.email || '')
  let othersCount = 0;
  if (count) othersCount = Math.max(count - (didSelfReact ? 1 : 0), 0);
  // console.log(othersCount)
  
  return (<div className="flex">
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
          <span>{othersCount} người khác</span>
        </p>
      }
    {/* </Suspense> */}
  </div>)
}
