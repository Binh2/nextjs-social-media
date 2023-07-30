import prisma from "@/lib/prisma";
import { StatusCodes } from "http-status-codes";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "GET") {
    const query = req.query.query as string || '';
    const schools = await prisma.school.findMany({
      where: {
        name: {
          startsWith: query
        }
      },
      take: 4
    });
    res.json(schools);
  } else if (req.method == "POST" || req.method == "PUT") {
    const { name, type: typeName } = req.body as { name: string, type: string };
    const school = await prisma.school.create({
      data: {
        name,
        type: { connect: { name: typeName }}
      }
    })
    res.json(school);
  }
  res.status(StatusCodes.METHOD_NOT_ALLOWED).end()
}
export default handler;