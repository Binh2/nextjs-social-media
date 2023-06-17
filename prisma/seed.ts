import { PrismaClient } from '@prisma/client'
import * as argon2 from 'argon2';
const prisma = new PrismaClient()

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

async function main() {
  const email = "testuser@gmail.com";
  const password = "123456";
  const hashedPassword = await argon2.hash(password);
  const user = await prisma.user.create({
    data: {
      username: "testuser",
      email: email,
      hashedPassword: hashedPassword, // 123456
    }
  });
  const feed = []
  for (let i = 0; i < 20; i++) {
    const post = await prisma.post.create({
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
    feed.push(post);
  }
  console.log(feed);
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