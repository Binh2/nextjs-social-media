// import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { options as authOptions } from '../auth/[...nextauth]';

export default async function handle(req: Request, res: Response) {
  const { content, image } = req.body;

  const session = await getServerSession(req, res, authOptions);
  // const session = await getSession({ req });
  console.log(session)
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