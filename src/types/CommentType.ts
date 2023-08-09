import { Comments } from "@prisma/client"

export type CommentType = Comments & {
  user: {
    image: string | null,
    name: string | null,
  },
  comments: CommentType[]
}