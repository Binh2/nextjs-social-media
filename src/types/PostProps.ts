import { Post as PostProps_ } from "@prisma/client";
import { CommentProps } from "./CommentProps";

export type PostProps = PostProps_ & {
  author: {
    name: string | null,
    image: string | null,
  } | null;
  comments: Array<CommentProps>
}