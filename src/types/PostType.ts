import { Posts } from "@prisma/client";
import { CommentType } from "./CommentType";
import { ReactionType } from "./ReactionType";

export type PostType = Posts & {
  user: {
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
//   comments: CommentType[],
//   reactions: ReactionType[],
//   _count: {
//     reactions: number | null
//   }
// }