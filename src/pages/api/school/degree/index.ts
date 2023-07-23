import prisma from "@/lib/prisma";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "GET") {
    const query = req.query.query as string;
    const degrees = await prisma.schoolDegree.findMany({
      where: {
        name: {
          startsWith: query
        }
      },
      take: 4,
    })
    res.json(degrees);
  } else if (req.method == "POST" || req.method == "PUT") {
    const { name } = req.body;
    const degree = await prisma.schoolDegree.create({
      data: { name }
    })
    res.json(degree)
  }
}
export default handler;