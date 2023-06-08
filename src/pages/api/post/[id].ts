// pages/api/post/[id].ts

import { NextApiHandler } from 'next';
import prisma from '../../../lib/prisma';

// DELETE /api/post/:id
const handle: NextApiHandler = (req, res) => {
  const postId = req.query.id;
  if (req.method == 'DELETE') {
    // const post = await prisma.post.delete({
    //   where: { id: postId },
    // });
    // res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}

export default handle;