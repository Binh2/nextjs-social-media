// import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { PostProps } from '@/types/PostProps';

const handle: NextApiHandler<PostProps[]> = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'GET') {
    if (typeof req.query.skip != 'string') return;
    // const session = await getServerSession(req, res, authOptions);
    const skip = parseInt(req.query.skip as string || '0');
    const feed = await prisma.post.findMany({
      skip,
      take: 4,
      where: {
        published: true,
      },
      include: {
        author: {
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
  } else {
    const { content, image } = req.body;

    const session = await getServerSession(req, res, authOptions);
    const result = await prisma.post.create({
      data: {
        content: content,
        image,
        author: { connect: { email: session?.user?.email || '' } },
        published: true,
        // createdAt: new Date(),
        // updatedAt: new Date(),
      },
    });
    res.json(result);
  }
}

export default handle;