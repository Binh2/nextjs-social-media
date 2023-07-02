import prisma from "@/lib/prisma";
import { NextApiHandler } from "next";
import { getServerSession } from 'next-auth';
import { authOptions } from "../../auth/[...nextauth]";
import { truncate } from "fs/promises";
import { FriendType } from "@/types/FriendType";

const handle: NextApiHandler = async (req, res) => {
  const session = await getServerSession(authOptions)
  const friends: FriendType[] = await prisma.friend.findMany({
    where: {
      OR: [
        { user1: { email: session?.user?.email || '' } },
        { user2: { email: session?.user?.email || '' } }
      ]
    },
    include: {
      user1: true,
      user2: true
    }
  })
  const friendUsers = friends.map(friend => {
    return (session?.user?.email == friend.user1.email) ? friend.user2 : friend.user1;
  })
  res.json(friendUsers);
}