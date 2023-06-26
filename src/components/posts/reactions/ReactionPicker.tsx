import Popup from "reactjs-popup";
import { Reaction } from "./Reaction";
import { useCallback, useEffect, useState } from "react";
import { ReactionTypes } from "@/lib/reactionTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ReactionProps } from "@/types/ReactionProps";
import { useFadeAfter } from "@/components/common/useFadeAfter";

type Props = {
  postId: string,
  type?: number,
  className?: string,
}

export function ReactionPicker({ postId, className = ''}: Props) {
  const {open, setOpen, opacity} = useFadeAfter(false, 1000)
  const { data: reaction } = useQuery<ReactionProps>(['post', postId, 'reaction', 'self'], {
    queryFn: () => {
      const result = axios.get(`/api/post/${postId}/reaction/self`).then(res => res.data)
      return result
    }
  })
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['post', postId, 'reaction', 'self'],
    mutationFn: (type: number) => {
      return axios.post(`/api/post/${postId}/reaction`, {
        type: type
      }).then(res => res.data)
    },
    onSuccess: () => {
      queryClient.refetchQueries(['post', postId, 'reaction'])
      queryClient.refetchQueries(['post', postId, 'reaction', 'self'])
    }
  })

  function closePopup() { setOpen(false) }
  function openPopup() { setOpen(true) }

  return (
    <div className={className}>
      <div className="relative">
        <button
          onClick={() => mutation.mutate(ReactionTypes.LIKE)}
          className="flex items-center focus:outline-none"
          onMouseEnter={openPopup}
          onMouseLeave={closePopup}
        >
          <Reaction type={reaction?.type} className="w-6 h-6 mr-2"></Reaction>
          <p className="text-sm font-medium">Like</p>
        </button>
        { open && <ol
          className="absolute bottom-5 -left-10 flex gap-2 transition-all duration-1000 opacity-100 px-2 py-1 bg-[#eee]"
          style={{ opacity }}
          onMouseEnter={openPopup}
          onMouseLeave={closePopup}
        >
          {[1, 2, 3, 4, 5, 6].map((reactionType) => (
            <li key={reactionType}>
              <button onClick={() => mutation.mutate(reactionType)} className="focus:outline-none">
                <Reaction type={reactionType} className="w-6 h-6"></Reaction>
              </button>
            </li>
          ))}
        </ol>}
      </div>
    </div>


  )
}