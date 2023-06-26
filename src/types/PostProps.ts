import { Post as PostProps_ } from "@prisma/client";
import { CommentProps } from "./CommentProps";
import { ReactionProps } from "./ReactionProps";

export type PostProps = PostProps_ & {
  author: {
    id: string,
    name: string | null,
    image: string | null,
  }
}
// & {
//   author: {
//     name: string | null,
//     image: string | null,
//   } | null;
//   comments: CommentProps[],
//   reactions: ReactionProps[],
//   _count: {
//     reactions: number | null
//   }
// }