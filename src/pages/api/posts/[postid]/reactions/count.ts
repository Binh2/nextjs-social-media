import prisma from "@/lib/prisma";
import { StatusCodes } from "http-status-codes";
import { NextApiHandler } from "next";

const handle: NextApiHandler = async (req, res) => {
  if (req.method == "GET") {
    const postId = parseInt(req.query.postId as string);
    if (isNaN(postId)) { res.status(StatusCodes.UNPROCESSABLE_ENTITY).end(); }
    const count = await prisma.reactions.count({
      where: {
        postId
      }
    })
    res.json(count);
  }
  res.status(StatusCodes.METHOD_NOT_ALLOWED).end()
}

export default handle;