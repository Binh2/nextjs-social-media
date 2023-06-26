import prisma from "@/lib/prisma";
import { StatusCodes } from "http-status-codes";
import { NextApiHandler } from "next";

const handle: NextApiHandler = async (req, res) => {
  if (req.method == "GET") {
    const postId = req.query.postid as string;
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        published: true,
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          }
        },
      }
    });
    console.log(post)
    res.json(post);
  }
  res.status(StatusCodes.METHOD_NOT_ALLOWED)
}

export default handle;