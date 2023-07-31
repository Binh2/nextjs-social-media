import prisma from "@/lib/prisma";
import { StatusCodes } from "http-status-codes";
import { NextApiHandler } from "next";

const handle: NextApiHandler = async (req, res) => {
  if (req.method == "GET") { 
    const postId = parseInt(req.query.postid as string);
    if (isNaN(postId)) res.status(StatusCodes.UNPROCESSABLE_ENTITY).end();
      const result = await prisma.comments.count({
        where: {
          postId
        }
    })
    res.json(result);
  }
  res.status(StatusCodes.METHOD_NOT_ALLOWED).end()
}

export default handle