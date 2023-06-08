import { CommentProps } from "@/types/CommentProps"
import { Comment } from "./Comment"
import { useState } from 'react'

type Props = {
  comments: CommentProps[]
}

export function CommentSection({ comments }: Props) {
  // console.log(comments)
  const [isCommentSectionVisible, setIsCommentSectionVisible] = useState(true);
  return (comments.length != 0 ? <div>
    {
      isCommentSectionVisible ?
      <button className="block" onClick={() => setIsCommentSectionVisible(false)}>Hide comment section</button>:
      <button className="block" onClick={() => setIsCommentSectionVisible(true)}>Show comment section</button>
    }
    
    {
      isCommentSectionVisible &&
      <ol>
        { comments.map(comment => <li key={comment.id}>
          <Comment comment={comment}></Comment>
        </li>) }
      </ol>
    }
    
    {
      isCommentSectionVisible ?
      <button className="block" onClick={() => setIsCommentSectionVisible(false)}>Hide comment section</button>:
      <button className="block" onClick={() => setIsCommentSectionVisible(true)}>Show comment section</button>
    }
  </div>: <></>)
}