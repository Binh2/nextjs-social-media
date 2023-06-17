import prisma from "@/lib/prisma";
import { Reaction } from "@prisma/client";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const handle: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'PUT' || req.method == 'POST') {
    if (typeof(req.query.params) != 'string') return;
    const session = await getServerSession(req, res, authOptions);
    const authorEmail = session?.user?.email || '';
    // console.log(req.body)
    const { type, postId } = JSON.parse(req.body);

    const reaction = prisma.reaction.upsert({
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
      }
    })
    res.json(reaction)
  }
}

export default handle;