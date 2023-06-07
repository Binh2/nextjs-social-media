import { CommentProps } from '@/types/CommentProps';
import Image from 'next/image'

type Props = {
  children?: JSX.Element,
  comment: CommentProps,
}
const defaultProps = {
  children: (<></>)
}
export function Comment(props: Props) {
  const comment = props.comment;
  return (<div className="flex">
    { comment.author.image && <Image src={comment.author.image} alt="Commenter's profile image" width={32} height={32} /> }
    <div>
      <div className="px-3 py-1">
        <p>{comment.author.name}</p>
        <p>{comment.content}</p>
      </div>
      <button>Like</button>
      <button>Reply</button>
    </div>
  </div>)
}

Comment.defaultProps = defaultProps