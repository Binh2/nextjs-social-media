import prisma from "@/lib/prisma";
import { NextApiHandler } from "next";

const handle: NextApiHandler = async (req, res) => {
  const postId = req.query.postid as string;
  const result = await prisma.comment.count({
    where: {
      postId
    }
  })
  res.json(result);
}

export default handle