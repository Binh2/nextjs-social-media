import { Friends, User  } from '@prisma/client';

export type FriendType = Friends & {
  user1: User
  user2: User
}