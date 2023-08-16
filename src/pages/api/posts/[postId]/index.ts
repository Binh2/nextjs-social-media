import { Publicities } from "@/lib/constants/publicities";
import prisma from "@/lib/prisma";
import { StatusCodes } from "http-status-codes";
import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { Friends } from "@prisma/client";
import { FriendTypes } from "@/lib/constants/friendTypes";

const handle: NextApiHandler = async (req, res) => {
  if (req.method == "GET") {
    const session = await getServerSession(req, res, authOptions);
    const postId = parseInt(req.query.postId as string);
    if (isNaN(postId)) { res.status(StatusCodes.UNPROCESSABLE_ENTITY).end(); return; }
    if (!session || !session.user.id) { res.status(StatusCodes.UNAUTHORIZED).end(); return; }
    const friends: Pick<Friends, 'user1Id' | 'user2Id'>[] = await prisma.friends.findMany({
      where: { 
        OR: [
          { user1Id: session.user.id },
          { user2Id: session.user.id }
        ],
        type: { name: FriendTypes.FRIEND }
      },
      select: {
        user1Id: true,
        user2Id: true,
      }
    });
    const flatFriends = friends.flatMap(friend => [friend.user1Id, friend.user2Id]).filter(id => id == session.user.id)
    const post = await prisma.posts.findFirst({
      where: {
        id: postId,
        OR: [
          { publicity: { name: Publicities.PUBLIC } },
          { AND: {
            publicity: { name: Publicities.FRIENDS },
            userId: { in: flatFriends }
          }}
        ]
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        },
      }
    });
    res.json(post);
  }
  res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
}

export default handle;