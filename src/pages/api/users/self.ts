import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/lib/prisma";
import { StatusCodes } from "http-status-codes";

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session || !session.user.id) { res.status(StatusCodes.UNAUTHORIZED).end(); return; }
    const user = await prisma.user.findFirst({
      where: {
        id: session.user.id
      }
    })
    res.json(user);
  }
  res.status(StatusCodes.METHOD_NOT_ALLOWED).end(); 
}

export default handler;