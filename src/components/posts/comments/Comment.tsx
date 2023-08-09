import { formatDateShort } from '@/lib/functions';
import { CommentType } from '@/types/CommentType';
import Image from 'next/image'
import { useState } from 'react';
import { CommentSection } from './CommentSection';

type Props = {
  comment: CommentType,
}
export function Comment(props: Props) {
  const comment = props.comment;
  const [isReplyVisible, setIsReplyVisible] = useState(false)

  return (
    <div className="flex items-start space-x-2">
      <div className="flex-shrink-0 w-10 h-10 overflow-hidden rounded-full">
        {comment.user.image ? (
          <Image src={comment.user.image} alt="Commenter's profile image" width={40} height={40} />
        ) : (
          <div className="w-full h-full bg-gray-300"></div>
        )}
      </div>
      <div>
        <div className="p-2 bg-gray-100 rounded-lg">
          <p className="font-semibold">{comment.user.name}</p>
          <p>{comment.content}</p>
        </div>
        <div className="flex items-center mt-1 space-x-2">
          <button className="ml-3 text-sm font-bold text-gray-500 hover:text-gray-700">Like</button>
          <button className="text-sm font-bold text-gray-500 hover:text-gray-700">Reply</button>
          <p className="text-sm text-gray-500">{formatDateShort(comment.updatedAt)}</p>
        </div>
        {isReplyVisible ? (
          // <CommentSection postId={postId} />
          <></>
        ) : (
          <button
            className="mt-1 text-gray-500 hover:text-gray-700"
            onClick={() => setIsReplyVisible(true)}>
            View more replies
          </button>
        )}
      </div>
    </div>



  )
}