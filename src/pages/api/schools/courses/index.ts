import prisma from "@/lib/prisma";
import { StatusCodes } from "http-status-codes";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "GET") {
    const query = req.query.query as string;
    const degrees = await prisma.schoolCourses.findMany({
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
    const degree = await prisma.schoolCourses.create({
      data: { name }
    })
    res.json(degree)
  }
  res.status(StatusCodes.METHOD_NOT_ALLOWED).end()
}
export default handler;