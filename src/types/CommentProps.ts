import { Comment as CommentProps_ } from "@prisma/client"

export type CommentProps = CommentProps_ & {
  author: {
    image: string | null,
    name: string | null,
  }
}