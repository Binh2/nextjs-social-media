import { Comment } from "@prisma/client"

export type CommentType = Comment & {
  author: {
    image: string | null,
    name: string | null,
  },
  comments: CommentType[]
}