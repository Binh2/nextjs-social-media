import { Reaction } from "./Reaction";
import { ReactionTypes } from "@/lib/constants/reactionTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ReactionType } from "@/types/ReactionType";
import { transformResponse } from "@/lib/axiosBigint";
import Popup from "reactjs-popup";

type Props = {
  postId: string,
  type?: number,
  className?: string,
}

export function ReactionPicker({ postId, className = ''}: Props) {
  const queryClient = useQueryClient();
  const { data: reaction } = useQuery<ReactionType>(['posts', postId, 'reactions', 'self'], {
    queryFn: () => {
      const result = axios.get(`/api/posts/${postId}/reactions/self`, {transformResponse}).then(res => res.data)
      return result
    }
  })
  const mutation = useMutation({
    mutationKey: ['posts', postId, 'reactions', 'self'],
    mutationFn: (type: number) => {
      return axios.post(`/api/posts/${postId}/reactions`, {
        type: type
      }).then(res => res.data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts', postId, 'reactions'])
      queryClient.invalidateQueries(['posts', postId, 'reactions', 'self'])
    }
  })

  return (
    <div className={className}>
      <div className="relative">
        <Popup 
        trigger={ReactionButton({mutation, reaction})} 
        position="top center" on={['hover']}>
          <ol className="flex gap-2 transition-all duration-1000 opacity-100 px-2 py-1 bg-[#eee]">
            {[1, 2, 3, 4, 5, 6].map((reactionType) => (
              <li key={reactionType}>
                <button onClick={() => mutation.mutate(reactionType)} className="focus:outline-none">
                  <Reaction type={reactionType} className="w-6 h-6"></Reaction>
                </button>
              </li>
            ))}
          </ol>
        </Popup> 
      </div>
    </div>
  )
}

function ReactionButton({mutation, reaction}: {mutation: any, reaction?: ReactionType}) {
  return (
    <button
      onClick={() => mutation.mutate(ReactionTypes.LIKE)}
      className="flex items-center focus:outline-none"
    >
      <Reaction type={reaction?.type} className="w-6 h-6 mr-1"></Reaction>
      <p className="text-sm font-medium">Like</p>
    </button> 
  )
}