import Popup from "reactjs-popup";
import { Reaction } from "./Reaction";
import { useEffect, useState } from "react";
import { ReactionTypes } from "@/lib/reactionTypes";

type Props = {
  postId: string,
  type?: number,
  className?: string,
}

const defaultProps = {
  className: ''
}

export function ReactionPicker({ postId, type, className }: Props) {
  const [open, setOpen] = useState(false);
  const [opacity, setOpacity] = useState(0.0);

  function closePopup() {
    if (!open) return;
    setOpacity(0.0);
    const timeout = setTimeout(() => setOpen(false), 1000);
    return clearTimeout(timeout);
  }
  function openPopup() {
    setOpacity(1.0);
    setOpen(true);
  }
  function reactToPost(type: number) {
    fetch(`/api/reaction/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ type })
    })
  }
  useEffect(closePopup, [open])

  return (
    <div className={className}>
      <Popup
        trigger={(
          <button
            onClick={() => {
              openPopup();
              reactToPost(ReactionTypes.LIKE);
            }}
            className="flex items-center focus:outline-none"
            onMouseEnter={openPopup}
          >
            <Reaction type={type} className="w-6 h-6 mr-2"></Reaction>
            <p className="text-sm font-medium">Like</p>
          </button>
        )}
        open={open}
        position="top center"
        onClose={closePopup}
        closeOnDocumentClick
      >
        <ol
          className="flex gap-2 transition-all duration-1000 opacity-100"
          onMouseEnter={openPopup}
          onMouseLeave={closePopup}
        >
          {[1, 2, 3, 4, 5, 6].map((reactionType) => (
            <li key={reactionType}>
              <button onClick={() => reactToPost(reactionType)} className="focus:outline-none">
                <Reaction type={reactionType} className="w-6 h-6"></Reaction>
              </button>
            </li>
          ))}
        </ol>
      </Popup>
    </div>


  )
}

ReactionPicker.defaultProps = defaultProps;