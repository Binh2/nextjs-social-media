import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { PostType } from '@/types/PostType';
import { StatusCodes } from 'http-status-codes';
import { Publicities } from '@/lib/constants/publicities';
import { FriendTypes } from '@/lib/constants/friendTypes';
import { Friends } from '@prisma/client';

const handle: NextApiHandler<PostType[]> = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'GET') {
    const skip = parseInt(req.query.skip as string) || 0;
    const take = parseInt(req.query.take as string) || 4;
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user.id) { res.status(StatusCodes.UNAUTHORIZED).end(); return; }
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

    const feed = await prisma.posts.findMany({
      skip,
      take,
      where: {
        OR: [
          { publicity: { name: Publicities.PUBLIC } },
          { AND: {
            publicity: {name: Publicities.FRIENDS},
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
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });
    res.json(feed);
  } else if (req.method == "POST" || req.method == "PUT") {
    const session = await getServerSession(req, res, authOptions);
    const userId = session?.user.id
    const { content, image, publicity } = req.body;
    if (!userId) { res.status(StatusCodes.UNAUTHORIZED).end(); return; }
    const result = await prisma.posts.create({
      data: {
        content,
        image,
        user: { connect: { id: userId } },
        publicity: { connect: { name: publicity } },
      },
    });
    res.json(result);
  }
  res.status(StatusCodes.METHOD_NOT_ALLOWED).end()
}

export default handle;