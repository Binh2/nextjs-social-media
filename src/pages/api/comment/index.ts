// import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { NextApiHandler } from 'next';

const handle: NextApiHandler = async (req, res) => {
  const { content, image, postId } = req.body;

  const session = await getServerSession(req, res, authOptions);
  // const session = await getSession({ req });
  console.log(session)
  const result = await prisma.comment.create({
    data: {
      post: { connect: { id: postId }},
      content,
      image,
      author: { connect: { email: session?.user?.email || '' } },
      // createdAt: new Date(),
      // updatedAt: new Date(),
    },
  });
  res.json(result);
}

export default handle;