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

const users = [
  {
    name: "Test user",
    username: "testuser",
    email: "testuser@gmail.com",
    image: "https://res.cloudinary.com/ddyd5lv06/image/upload/v1687214769/274062289_1109173296538169_2618922202593783639_n.jpg_oj4pi9.jpg",
    password: "123456",
  },
  {
    name: "Atlassian",
    username: "atlassian",
    email: "atlassian@gmail.com",
    image: "https://res.cloudinary.com/ddyd5lv06/image/upload/v1687214757/352778336_3556828711306476_3311621240719828479_n.png_ljlzmf.png",
    password: "123456"
  },
  {
    name: "Nguyễn Thị Sáu",
    username: "saunt123",
    email: "saunt@gmail.com",
    image: "https://i.pinimg.com/736x/16/e1/d1/16e1d12cf49295519beac0270496923b.jpg",
    password: "123456"
  }
]
const posts = [
  {
    image: "https://res.cloudinary.com/ddyd5lv06/image/upload/v1687214685/8721900573438274616_gmmfrf.jpg",
    content: "này là làm nhạc vì đam mê chứ lời lãi gì 😵‍💫",
    authorEmail: "saunt@gmail.com"
  },
  {
    image: "https://res.cloudinary.com/ddyd5lv06/image/upload/v1687214737/332733108_23854404815810392_8809918604942217499_n.png_dachyu.jpg",
    content: "Nếu bạn muốn các bộ phận Vận hành CNTT, Lập trình và Kinh doanh đều ăn ý để phối hợp tốt hơn, bạn không cần tìm đâu xa. Hãy xem bản hướng dẫn này về Quản lý Dịch vụ Doanh nghiệp. Tải xuống ngay",
    authorEmail: "atlassian@gmail.com"
  }
]

async function main() {
  for (let i = 0; i < users.length; i++) {
    const { name, username, email, image, password } = users[i];
    const hashedPassword = await argon2.hash(password);
    try {
      const user = await prisma.user.create({
        data: {
          name,
          username,
          email,
          image,
          hashedPassword,
        }
      });
    } catch (err) {
      console.log(err)
    }
  }
  
  const feed = []
  const email = "testuser@gmail.com"
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

  for (let i = 0; i < posts.length; i++) {
    const { content, image, authorEmail: email } = posts[i];
    try {
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
    } catch (err) {
      console.log(err)
    }
  }
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