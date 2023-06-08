import { Reaction as ReactionProps_ } from '@prisma/client';

export type ReactionProps = ReactionProps_ & {
  author: {
    email: string,
  }
}