import { SchoolTypes } from '@/lib/constants/school';
import { PrismaClient } from '@prisma/client'
import * as argon2 from 'argon2';
import { posts, schoolCourses, schoolDegrees, schools, users } from './data';
import { Publicities } from '../src/lib/constants/publicity';
const prisma = new PrismaClient()

async function main() {
  createSchoolTypes(); // need to be before createSchools();
  createSchools();
  createSchoolCourses();
  createSchoolDegrees();
  createUsers();
  createPosts();
  createPublicities();
}
main()
.then(async () => {
  await prisma.$disconnect()
})
.catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})

function makeRandomString(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
function createSchoolTypes() {
  Object.values(SchoolTypes).forEach(async schoolType => {
    try {
      await prisma.schoolType.create({
        data: { name: schoolType }
      })
    } catch (e) { console.log(e) }
  })
}
function createSchools() {
  schools.forEach(async school => {
    try {
      const { type: typeName, name } = school;
      await prisma.school.create({
        data: {
          name,
          type: { connect: { name: typeName }}
        }
      })
    } catch (e) { console.log(e) }
  })
}
function createSchoolCourses() {
  schoolCourses.forEach(async schoolCourse => {
    try {
      const { name } = schoolCourse;
      await prisma.schoolCourse.create({
        data: { name }
      })
    } catch (e) { console.log(e) }
  })
}
function createSchoolDegrees() {
  schoolDegrees.forEach(async schoolDegree => {
    try {
      const { name } = schoolDegree;
      await prisma.schoolDegree.create({
        data: {
          name
        }
      })
    } catch (e) { console.log(e) }
  })
}
function createUsers() {
  users.forEach(async user => {
    const { name, username, email, image, password } = user;
    const hashedPassword = await argon2.hash(password);
    try {
      const user = await prisma.user.create({
        data: { name, username, email, image, hashedPassword }
      });
    } catch (err) { console.log(err) }
  })
}
function createPosts() {
  const email = "testuser@gmail.com"
  for (let i = 0; i < 20; i++) {
    try {
      (async () => {
        await prisma.post.create({
          data: {
            content: makeRandomString(100),
            image: '',
            published: true,
            author: {
              connect: {
                email: email,
              }
            }
          }
        })
      })();
    } catch (e) { console.log(e) }
  } 

  for (let i = 0; i < posts.length; i++) {
    const { content, image, authorEmail: email } = posts[i];
    try {
      (async () => {
        await prisma.post.create({
          data: {
            content,
            image,
            published: true,
            author: {
              connect: {
                email: email,
              }
            }
          }
        })
      })();
    } catch (err) {
      console.log(err)
    }
  }
}
function createPublicities() {
  try {
    Object.values(Publicities).forEach(async (publicity) => {
      await prisma.publicity.create({
        data: { name: publicity }
      })
    })
  } catch (e) { console.log(e) }
}