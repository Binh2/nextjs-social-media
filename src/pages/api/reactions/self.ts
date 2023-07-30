import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { StatusCodes } from "http-status-codes";
import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";

const handle: NextApiHandler = async (req, res) => {
  if (req.method == "GET") {
    const session = await getServerSession(req, res, authOptions);
    const userId = session?.user?.id;
    const postId = parseInt(req.query.postId as string);
    if (!userId) { res.status(StatusCodes.UNAUTHORIZED).end(); return; }
    if (isNaN(postId)) { res.status(StatusCodes.UNPROCESSABLE_ENTITY).end()}
    const reaction = await prisma.reaction.findFirst({
      where: {
        postId,
        userId
      }
    })
    
    res.json(reaction)
  }
  res.status(StatusCodes.METHOD_NOT_ALLOWED).end()
} 

export default handle;