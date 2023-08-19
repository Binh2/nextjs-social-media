import { StatusCodes } from "http-status-codes";
import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import * as Url from 'node:url'
import prisma from "@/lib/prisma";

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "POST" || req.method == "PUT") {
    const session = await getServerSession(req, res, authOptions);
    const { coverImage } = req.body;
    if (!session || !session.user.id) { res.status(StatusCodes.UNAUTHORIZED).end(); return; }
    try { new Url.URL(coverImage); }
    catch (e) { res.status(StatusCodes.UNPROCESSABLE_ENTITY).end(); return; }
    const user = await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        coverImage
      }
    })
    res.json(user);
  }
  res.status(StatusCodes.METHOD_NOT_ALLOWED)
}

export default handler;