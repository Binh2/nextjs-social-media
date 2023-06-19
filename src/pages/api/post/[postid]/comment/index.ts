import { getServerSession } from 'next-auth';
import { NextApiHandler } from 'next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import prisma from '@/lib/prisma';
import { StatusCodes } from 'http-status-codes';

const handle: NextApiHandler = async (req, res) => {
  if (req.method == "GET") {
    const postId = req.query.postid as string;
    const skip = parseInt(req.query.skip as string || '0');
    const result = await prisma.comment.findMany({
      take: 4,
      skip,
      where: {
        postId
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        }
      }
    })
    res.json(result);
  } else if (req.method == "POST" || req.method == "PUT") {
    const postId = req.query.postid as string;
    const { content, image } = req.body;
    const session = await getServerSession(req, res, authOptions);
    const result = await prisma.comment.create({
      data: {
        post: { connect: { id: postId }},
        content,
        image,
        author: { connect: { email: session?.user?.email || '' } },
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
      select: {
        content: true,
        image: true,
        author: {
          select: {
            name: true,
            image: true
          }
        }
      }
    });
    res.json(result);
  }
  res.status(StatusCodes.METHOD_NOT_ALLOWED);
}

export default handle;