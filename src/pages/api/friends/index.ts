import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { StatusCodes } from "http-status-codes";
import prisma from "@/lib/prisma";
import { FriendTypes } from "@/lib/constants/friendTypes";

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "GET") {
    const type = req.query.type as string || FriendTypes.FRIEND
    const friends = await prisma.friends.findMany({
      where: {
        type: { name: type }
      }
    })
    res.json(friends);
  }
  else if (req.method == "POST" || req.method == "PUT") {
    const session = await getServerSession(req, res, authOptions);
    const sessionUserId = session?.user.id;
    const userId = req.body.userId as string | undefined;
    const type = req.body.type as string | undefined || FriendTypes.FRIEND;
    if (!sessionUserId) {res.status(StatusCodes.UNAUTHORIZED); return;}
    if (!userId) {res.status(StatusCodes.UNPROCESSABLE_ENTITY); return;}
    
    const orderedUserIds = sessionUserId.localeCompare(userId) == 1 ? [userId, sessionUserId]: [sessionUserId, userId];
    const friend = await prisma.friends.upsert({
      where: {
        user1Id_user2Id: {
          user1Id: orderedUserIds[0],
          user2Id: orderedUserIds[1],
        }
      },
      update: {
        type: { connect: { name: type }}
      },
      create: {
        user1: { connect: { id: orderedUserIds[0] }},
        user2: { connect: { id: orderedUserIds[1] }}, 
        type: { connect: { name: type } },
      }
    })
    res.json(friend)
  }
  res.status(StatusCodes.METHOD_NOT_ALLOWED)
}

export default handler;