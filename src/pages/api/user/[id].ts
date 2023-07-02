import prisma from "@/lib/prisma";
import { NextApiHandler } from "next";
import { getServerSession } from "next-auth";

const handle: NextApiHandler = async (req, res) => {
  const session = await getServerSession();
  console.log(session);
  if (req.method == "GET") {
    const user = prisma.user.findFirst({
      where: {
        email: session?.user?.email || ''
      }
    })
    res.json(user);
  } else if (req.method == "POST") {
    prisma.user.update({
      where: {
        email: session?.user?.email || ''
      },
      data: {

      }
    })
  }
}

export default handle;