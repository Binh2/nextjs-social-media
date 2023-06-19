import Popup from "reactjs-popup";
import { Reaction } from "./Reaction";
import { useCallback, useEffect, useState } from "react";
import { ReactionTypes } from "@/lib/reactionTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  postId: string,
  type?: number,
  className?: string,
}

export function ReactionPicker({ postId, type, className = ''}: Props) {
  const [open, setOpen] = useState(false);
  const [opacity, setOpacity] = useState(0.0);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['post', postId, 'reaction'],
    mutationFn: (type: number) => {
      return axios.post(`/api/post/${postId}/reaction`, {
        type: type
      }).then(res => res.data)
    },
    onSuccess: () => {
      queryClient.refetchQueries(['post', postId, 'reaction'])
    }
  })

  const closePopup = useCallback(function () {
    if (!open) return;
    setOpacity(0.0);
    const timeout = setTimeout(() => setOpen(false), 800);
    return () => clearTimeout(timeout);
  }, [open, setOpacity])
  function openPopup() {
    setOpacity(1.0);
    setOpen(true);
  }
  useEffect(() => {
    closePopup()
  }, [open, closePopup])

  return (
    <div className={className}>
      <div className="relative">
        <button
          onClick={() => mutation.mutate(ReactionTypes.LIKE)}
          className="flex items-center focus:outline-none"
          onMouseEnter={openPopup}
        >
          <Reaction type={type} className="w-6 h-6 mr-2"></Reaction>
          <p className="text-sm font-medium">Like</p>
        </button>
        { open && <ol
          className="absolute bottom-5 -left-10 flex gap-2 transition-all duration-1000 opacity-100 px-2 py-1 bg-[#eee]"
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