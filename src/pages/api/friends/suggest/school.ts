import prisma from "@/lib/prisma";
import { NextApiHandler } from "next";
import { getServerSession } from 'next-auth';
import { authOptions } from "../../auth/[...nextauth]";
import { StatusCodes } from "http-status-codes";
import { User } from "@prisma/client";

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "GET") { 
    const session = await getServerSession(req, res, authOptions)
    const sessionUserId = session?.user.id;
    if (!sessionUserId) {res.status(StatusCodes.UNAUTHORIZED).end(); return;}
    
    const users: User[] = await prisma.$queryRaw`
      select * from "User" as u where 
        u.id<>${sessionUserId} and
        exists (
          select 1 from "User_Schools" as u_s1 where u.id=u_s1."userId" and u_s1."schoolId" in (
            select "schoolId" from "User_Schools" as u_s2 where u_s2."userId"=${sessionUserId}
          )
        ) and 
        not exists (
          select 1 from "Friends" as f where 
            (f."user1Id"=u.id and f."user2Id"=${sessionUserId}) or 
            (f."user2Id"=u.id and f."user1Id"=${sessionUserId})
        )
    `
    // const friendUsers = friends.map(friend => {
    //   return (session?.user?.email == friend.user1.email) ? friend.user2 : friend.user1;
    // })
    res.json(users);
  }
  res.status(StatusCodes.METHOD_NOT_ALLOWED)
}

export default handler;