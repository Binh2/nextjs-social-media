import { Publicities } from "@/lib/constants/publicities"
import { SchoolTypes } from "../src/lib/constants/schoolTypes"

export const users = [
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
    image: "https://res.cloudinary.com/ddyd5lv06/image/upload/v1692174495/bunny_ear_lh1maa.jpg",
    password: "123456"
  },
  {
    name: "John Smith",
    username: "johnsmith",
    email: "johnsmith@gmail.com",
    image: "",
    password: "123456"
  },
  {
    name: "Jane Williams",
    username: "janewilliams",
    email: "janewilliam@gmail.com",
    image: "",
    password: "123456"
  }
]
export const user_schools = [
  { username: "saunt123", schoolName: "University of Information and Technology - Vietnam University", schoolDegreeName: "Bachelor of Computer Science", publicityName: Publicities.PUBLIC },
  { username: "testuser", schoolName: "University of Information and Technology - Vietnam University", schoolDegreeName: "Bachelor of Computer Science", publicityName: Publicities.PUBLIC },
]
export const schools = [
  { name: "University of Information and Technology - Vietnam University", type: SchoolTypes.UNIVERSITY },
  { name: "University of Engineering and Technology - Vietnam University", type: SchoolTypes.UNIVERSITY },
  { name: "University of Economics and Business - Vietnam University", type: SchoolTypes.UNIVERSITY },
]
export const posts = [
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
export const schoolCourses = [
  { name: "Computer science" },
  { name: "Information technology" },
  { name: "Marketing" },
]
export const schoolDegrees = [
  { name: "Bachelor of Computer Science" },
  { name: "Bachelor of Information Technology" },
  { name: "Bachelor of Business (Marketing)" },
]