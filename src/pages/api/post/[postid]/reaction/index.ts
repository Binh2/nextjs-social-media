import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Reaction } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const handle: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'GET') {
    const session = await getServerSession(req, res, authOptions);
    const authorEmail = session?.user?.email || '';
    const postId = req.query.postid as string;
    const reactions = await prisma.reaction.findMany({
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
      },
    })
    const reactionCount = await prisma.reaction.count({
      where: {
        postId
      }
    })

    res.json({ reactions, count: reactionCount});
  }
  else if (req.method == 'PUT' || req.method == 'POST') {
    const session = await getServerSession(req, res, authOptions);
    const authorEmail = session?.user?.email || '';
    const postId = req.query.postid as string;
    const { type } = req.body;

    const reaction = await prisma.reaction.upsert({
      where: {
        postId_authorEmail: {
          postId,
          authorEmail,
        }
      },
      update: {
        type
      },
      create: {
        post: {
          connect: {
            id: postId
          }
        },
        author: {
          connect: {
            email: session?.user?.email || ''
          }
        },
        type
      },
      select: {
        postId: true,
        authorEmail: true,
        type: true,
      },
    })
    res.json(reaction)
  }
  res.status(StatusCodes.METHOD_NOT_ALLOWED);
}

export default handle;