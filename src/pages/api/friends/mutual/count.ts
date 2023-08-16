import prisma from "@/lib/prisma";
import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { StatusCodes } from "http-status-codes";
import { FriendTypes } from "@/lib/constants/friendTypes";

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "GET") {
    const session = await getServerSession(req, res, authOptions);
    const sessionUserId = session?.user.id;
    const userId = req.query.userId as string | undefined;
    if (!sessionUserId) { res.status(StatusCodes.UNAUTHORIZED).end(); return; }
    if (!userId) { res.status(StatusCodes.UNPROCESSABLE_ENTITY).end()}
    const mutualFriendCount: [ {count: BigInt } ] = await prisma.$queryRaw`
      select count(*)
      from "Friends" as f1 
      inner join "Friends" as f2 
      on f1."user1Id"=f2."user1Id" or f1."user1Id"=f2."user2Id" or f1."user2Id"=f2."user1Id" or f1."user2Id"=f2."user2Id"
      inner join "FriendTypes" as ft
      on f1."typeId"=ft.id or f2."typeId"=ft.id
      where
        ft.name=${FriendTypes.FRIEND} and
        (f1."user1Id"=${sessionUserId} or f1."user2Id"=${sessionUserId}) and 
        (f2."user1Id"=${userId} or f2."user2Id"=${userId})
    `
    res.json(mutualFriendCount[0].count);
  }
  res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
}

export default handler