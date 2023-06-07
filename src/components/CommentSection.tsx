import { CommentProps } from "@/types/CommentProps"
import { Comment } from "./Comment"

type Props = {
  comments: CommentProps[]
}

export function CommentSection({ comments }: Props) {
  return (<ol>
    { comments.map(comment => <li key={comment.id}>
      <Comment comment={comment}></Comment>
    </li>) }
  </ol>)
}