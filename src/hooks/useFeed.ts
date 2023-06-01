// import { PostProps } from "@/components/Post";
// import prisma from "@/lib/prisma";
// import { useEffect, useState } from "react"

// export const useFeed = () => {
//   const [ feed, setFeed ] = useState<PostProps[]>([]);

//   useEffect(() => {
//     prisma.post.findMany({
//       where: { published: true },
//       include: {
//         author: {
//           select: { name: true },
//         },
//       },
//     }).then((feedTemp) => {
//       setFeed(feedTemp);
//     }).catch((error) => {
//       console.log(error);
//     })
//   }, []);

//   return feed;
// }