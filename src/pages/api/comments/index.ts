import { getServerSession } from 'next-auth';
import { NextApiHandler } from 'next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';
import { StatusCodes } from 'http-status-codes';

const handle: NextApiHandler = async (req, res) => {
  if (req.method == "GET") {
    const postId = parseInt(req.query.postid as string);
    const take = parseInt(req.query.take as string) || 4;
    const skip = parseInt(req.query.skip as string) || 0;
    if (isNaN(postId)) res.status(StatusCodes.UNPROCESSABLE_ENTITY).end();
    const result = await prisma.comments.findMany({
      take,
      skip,
      where: {
        postId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        }
      }
    })
    const count = await prisma.comments.count({
      where: {
        postId
      }
    })
    res.json(result);
  } else if (req.method == "POST" || req.method == "PUT") {
    const session = await getServerSession(req, res, authOptions);
    const postId = parseInt(req.query.postid as string);
    const userId = session?.user.id;
    const { content, image } = req.body;
    if (!userId) { res.status(StatusCodes.UNAUTHORIZED).end(); return; }
    if (isNaN(postId)) res.status(StatusCodes.UNPROCESSABLE_ENTITY).end()
    const result = await prisma.comments.create({
      data: {
        postId,
        userId,
        content,
        image,
      },
      select: {
        content: true,
        image: true,
        user: {
          select: {
            name: true,
            image: true
          }
        }
      }
    });
    res.json(result);
  }
  res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
}

export default handle;