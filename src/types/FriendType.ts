import { Friend, User  } from '@prisma/client';

export type FriendType = Friend & {
  user1: User
  user2: User
}