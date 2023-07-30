import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { PostType } from '@/types/PostType';
import { StatusCodes } from 'http-status-codes';

const handle: NextApiHandler<PostType[]> = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'GET') {
    const skip = parseInt(req.query.skip as string) || 0;
    const take = parseInt(req.query.take as string) || 4;
    const feed = await prisma.post.findMany({
      skip,
      take,
      where: {
        published: true,
      },
      include: {
        user: {
          select: {
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
    const { content, image } = req.body;
    if (!userId) { res.status(StatusCodes.UNAUTHORIZED).end(); return; }
    const result = await prisma.post.create({
      data: {
        content: content,
        image,
        userId,
        published: true,
      },
    });
    res.json(result);
  }
  res.status(StatusCodes.METHOD_NOT_ALLOWED).end()
}

export default handle;