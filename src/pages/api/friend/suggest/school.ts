import prisma from "@/lib/prisma";
import { NextApiHandler } from "next";
import { getServerSession } from 'next-auth';
import { authOptions } from "../../auth/[...nextauth]";

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
      user1: { email: true },
      user2: { email: true }
    }
  })
  const friendEmails = friends.map()
}