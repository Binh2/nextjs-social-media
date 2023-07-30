import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { StatusCodes } from "http-status-codes";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const handle: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'GET') {
    const postId = parseInt(req.query.postid as string);
    const take = parseInt(req.query.take as string) || 100;
    if (isNaN(postId)) res.status(StatusCodes.UNPROCESSABLE_ENTITY).end()
    const reactions = await prisma.reactions.findMany({
      take,
      where: {
        postId,
      },
    })

    res.json(reactions);
  }
  else if (req.method == 'PUT' || req.method == 'POST') {
    const session = await getServerSession(req, res, authOptions);
    const userId = session?.user?.id;
    const postId = parseInt(req.query.postId as string);
    const { type } = req.body;
    if (!userId) { res.status(StatusCodes.UNAUTHORIZED).end(); return; }
    if (isNaN(postId)) res.status(StatusCodes.UNPROCESSABLE_ENTITY).end()

    const reaction = await prisma.reactions.upsert({
      where: {
        postId_userId: {
          postId,
          userId,
        }
      },
      update: {
        type
      },
      create: {
        postId,
        userId,
        type
      },
    })
    res.json(reaction)
  }
  res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
}

export default handle;