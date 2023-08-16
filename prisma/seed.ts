import { SchoolTypes } from '@/lib/constants/schoolTypes';
import { PrismaClient } from '@prisma/client'
import * as argon2 from 'argon2';
import { posts, schoolCourses, schoolDegrees, schools, user_schools, users } from './data';
import { Publicities } from '../src/lib/constants/publicities';
import { FriendTypes } from '@/lib/constants/friendTypes';
const prisma = new PrismaClient()

async function main() {
  createUsers();

  createPublicities();
  createPosts();

  createSchoolTypes(); // need to be before createSchools();
  createSchools();
  createSchoolCourses();
  createSchoolDegrees();
  createUser_Schools();

  createFriendTypes();
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
      await prisma.schoolTypes.create({
        data: { name: schoolType }
      })
    } catch (e) { console.error(e) }
  })
}
function createSchools() {
  schools.forEach(async school => {
    try {
      const { type: typeName, name } = school;
      await prisma.schools.create({
        data: {
          name,
          type: { connect: { name: typeName }}
        }
      })
    } catch (e) { console.error(e) }
  })
}
function createSchoolCourses() {
  schoolCourses.forEach(async schoolCourse => {
    try {
      const { name } = schoolCourse;
      await prisma.schoolCourses.create({
        data: { name }
      })
    } catch (e) { console.error(e) }
  })
}
function createSchoolDegrees() {
  schoolDegrees.forEach(async schoolDegree => {
    try {
      const { name } = schoolDegree;
      await prisma.schoolDegrees.create({
        data: {
          name
        }
      })
    } catch (e) { console.error(e) }
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
    } catch (err) { console.error(err) }
  })
}
function createUser_Schools() {
  user_schools.forEach(async user_school => {
    try { 
      const { username, schoolName, schoolDegreeName, publicityName } = user_school;
      await prisma.user_Schools.create({
        data: {
          user: { connect: {username}},
          school: {connect: {name: schoolName}},
          schoolDegree: { connect: {name: schoolDegreeName }},
          publicity: { connect: {name: publicityName }}
        }
      })
    } catch (e) { console.error(e)}
  })
}
function createPosts() {
  const email = "testuser@gmail.com"
  for (let i = 0; i < 20; i++) {
    try {
      (async () => {
        await prisma.posts.create({
          data: {
            content: makeRandomString(100),
            image: '',
            publicity: { connect: { name: Publicities.PUBLIC } },
            user: {
              connect: {
                email: email,
              }
            }
          }
        })
      })();
    } catch (e) { console.error(e) }
  } 

  for (let i = 0; i < posts.length; i++) {
    const { content, image, authorEmail: email } = posts[i];
    try {
      (async () => {
        await prisma.posts.create({
          data: {
            content,
            image,
            publicity: { connect: { name: Publicities.PUBLIC } },
            user: {
              connect: {
                email: email,
              }
            }
          }
        })
      })();
    } catch (err) {
      console.error(err)
    }
  }
}
function createPublicities() {
  try {
    Object.values(Publicities).forEach(async (publicity) => {
      await prisma.publicities.create({
        data: { name: publicity }
      })
    })
  } catch (e) { console.error(e) }
}
function createFriendTypes() {
  try {
    Object.values(FriendTypes).forEach(async (type) => {
      await prisma.friendTypes.create({
        data: { name: type }
      })
    })
  } catch(e) {console.error(e)}
}