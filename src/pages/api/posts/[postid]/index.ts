import prisma from "@/lib/prisma";
import { StatusCodes } from "http-status-codes";
import { NextApiHandler } from "next";

const handle: NextApiHandler = async (req, res) => {
  if (req.method == "GET") {
    const postId = parseInt(req.query.postId as string);
    if (isNaN(postId)) { res.status(StatusCodes.UNPROCESSABLE_ENTITY).end() }
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        published: true,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          }
        },
      }
    });
    res.json(post);
  }
  res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
}

export default handle;