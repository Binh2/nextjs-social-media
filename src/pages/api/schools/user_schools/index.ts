import prisma from "@/lib/prisma";
import { HttpStatusCode } from "axios";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method == "POST" || req.method == "PUT") {
    try {  
      const { schoolName, userHandle, from, to, graduated, description, undergraduate, schoolDegreeName, publicityName } = req.body;
      const { course1Name, course2Name, course3Name } = req.body as {course1Name?: string, course2Name?: string, course3Name?: string};

      // Remove duplicates among courses
      const coursesName = [course1Name, course2Name, course3Name].filter((item, pos, self) => item && self.indexOf(item) == pos)
      const userSchool = await prisma.user_Schools.create({
        data: {
          school: {connect: {name: schoolName as string}},
          user: {connect: {handle: userHandle as string}},
          from,
          to,
          graduated,
          description,
          undergraduate,
          course1: coursesName[0] && {connect: {name: coursesName[0]}} || undefined, 
          course2: coursesName[1] && {connect: {name: coursesName[1]}} || undefined,
          course3: coursesName[2] && {connect: {name: coursesName[2]}} || undefined,
          schoolDegree: {connect: {name: schoolDegreeName}},
          publicity: {connect: {name: publicityName}},
        }
      })
      res.json(userSchool)
    } catch (e) { res.status(HttpStatusCode.InternalServerError).send(e) }
  }
  res.status(HttpStatusCode.MethodNotAllowed).end()
}

export default handler;