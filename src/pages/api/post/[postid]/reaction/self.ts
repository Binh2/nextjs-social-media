
import prisma from "@/lib/prisma";
import { ReactionTypes } from "@/lib/reactionTypes";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Reaction } from "@prisma/client";
import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";

const handle: NextApiHandler = async (req, res) => {
  const postId = req.query.postid as string;
  const session = await getServerSession(req, res, authOptions);
  const reaction = await prisma.reaction.findFirst({
    where: {
      postId,
      author: {
        email: session?.user?.email || ''
      }     
    }
  })
  
  console.log(reaction)
  res.json(reaction)
} 

export default handle;