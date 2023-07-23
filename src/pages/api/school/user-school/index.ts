import prisma from "@/lib/prisma";
import { HttpStatusCode } from "axios";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  // if (req.method == "GET") {

  // } else 
  if (req.method == "POST" || req.method == "PUT") {
    const { schoolName, userHandle, from, to, graduated, description, undergraduate, course1Name, course2Name, course3Name, schoolDegreeName, publicityName } = req.body;
    const userSchool = await prisma.user_School.create({
      data: {
        school: {connect: {name: schoolName} },
        user: {connect: {handle: userHandle} },
        from,
        to,
        graduated,
        description,
        undergraduate,
        course1: {connect: {name: course1Name}},
        course2: {connect: {name: course2Name}},
        course3: {connect: {name: course3Name}},
        schoolDegree: {connect: {name: schoolDegreeName}},
        publicity: {connect: {name: publicityName}},
      }
    })
    res.json(userSchool)
  }
  res.status(HttpStatusCode.MethodNotAllowed)
}

export default handler;