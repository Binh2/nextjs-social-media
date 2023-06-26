import prisma from "@/lib/prisma";
import { NextApiHandler } from "next";

const handle: NextApiHandler = async (req, res) => {
  const postId = req.query.postid as string;
  const count = await prisma.reaction.count({
    where: {
      postId
    }
  })
  res.json(count);
}

export default handle;