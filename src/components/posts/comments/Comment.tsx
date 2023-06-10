import { formatDateShort } from '@/lib/functions';
import { CommentProps } from '@/types/CommentProps';
import Image from 'next/image'
import { useState } from 'react';
import { CommentSection } from './CommentSection';

type Props = {
  children?: JSX.Element,
  comment: CommentProps,
}
const defaultProps = {
  children: (<></>)
}
export function Comment(props: Props) {
  const comment = props.comment;
  const [isReplyVisible, setIsReplyVisible] = useState(false)
  return (<div className="flex">
    { comment.author.image && <Image className="rounded-[100%]"
      src={comment.author.image} alt="Commenter's profile image" width={32} height={32} style={{height: "auto"}} 
    /> }
    <div>
      <div className="px-3 py-1">
        <p>{comment.author.name}</p>
        <p>{comment.content}</p>
      </div>
      <div className="flex">
        <button>Like</button>
        <button>Reply</button>
        <p>{formatDateShort(comment.updatedAt)}</p>
      </div>
      { 
        isReplyVisible ? 
        <CommentSection comments={comment.comments}></CommentSection>:
        <button onClick={() => setIsReplyVisible(true)}>View more reply</button>
      }
    </div>
  </div>)
}

Comment.defaultProps = defaultProps