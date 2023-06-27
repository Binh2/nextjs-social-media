import prisma from "@/lib/prisma";
import { NextApiHandler } from "next";
import { getServerSession } from 'next-auth';
import { authOptions } from "../../auth/[...nextauth]";
import { truncate } from "fs/promises";

const handle: NextApiHandler = async (req, res) => {
  const session = await getServerSession(authOptions)
  const friends = await prisma.friend.findMany({
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
  // const friendEmails = friends.map()
}