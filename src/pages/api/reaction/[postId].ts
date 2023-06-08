import prisma from "@/lib/prisma";
import { NextApiHandler } from "next";

const handle: NextApiHandler = (req, res) => {
  if (typeof req.query.postId != 'string') return;
  const postId = req.query.postId;
  const reactions = prisma.reaction.findMany({
    take: 100,
    where: {
      postId
    },
    select: {
      type: true,
      author: {
        select: {
          email: true
        }
      },
    }
  });
  res.json(reactions);
}

export default handle;