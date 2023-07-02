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
      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
        {comment.author.image ? (
          <Image src={comment.author.image} alt="Commenter's profile image" width={40} height={40} />
        ) : (
          <div className="w-full h-full bg-gray-300"></div>
        )}
      </div>
      <div>
        <div className="bg-gray-100 rounded-lg p-2">
          <p className="font-semibold">{comment.author.name}</p>
          <p>{comment.content}</p>
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <button className="text-gray-500 hover:text-gray-700 text-sm font-bold ml-3">Like</button>
          <button className="text-gray-500 hover:text-gray-700 text-sm font-bold">Reply</button>
          <p className="text-gray-500 text-sm">{formatDateShort(comment.updatedAt)}</p>
        </div>
        {isReplyVisible ? (
          // <CommentSection postId={postId} />
          <></>
        ) : (
          <button
            className="text-gray-500 hover:text-gray-700 mt-1"
            onClick={() => setIsReplyVisible(true)}>
            View more replies
          </button>
        )}
      </div>
    </div>



  )
}