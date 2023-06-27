# Social media - The ripoff of Facebook

This is a school's project. Pretty fun. Learn a lot. Done with some of my friends

## Demo

https://github.com/Binh2/nextjs-social-media/assets/53990204/9587ff38-4b9c-4827-bb37-dbd102d3e274

## Features

- Sign in/Sign up with password
- Sign in with GitHub
- Create/update post/comment/reaction

### Missing features

- Friends and friend suggestion algorithm.

## Built with

- Typescript + NextJS + Nextauth
- TailwindCSS
- Prisma + React query
- SQL server/PostgreSQL

## Setup

1. Install all the packages `pnpm install`
2. Configure the .env correctly. There is a sample .env.sample at the root directory
3. Push the Prisma model to database that you configure in the .env file `npx prisma db push`
4. Generate Prisma Client `npx prisma generate`
5. Check if Prisma is connected with database correctly by starting a Prisma Studio `npx prisma studio`
6. Visit [http://localhost:5555](http://localhost:5555) to see the Prisma Studio
7. Start the local dev server `pnpm run dev`
8. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If you want to use https dev server for GitHub login (Slower than `pnpm run dev` btw) 

7. You will need to configure the SSL for localhost in the ssl-certificates folder you will need to make localhost.key and localhost.crt files (It will still display unsecured message but you can skip it)
8. Start the local https dev server with `pnpm run httpsdev`
9. Open [https://localhost:3000](https://localhost:3000) with your browser to see the result

## Author

- Frontend Mentor - [@Binh2](https://www.frontendmentor.io/profile/Binh2)
- Twitter - [@hgqbinh2002](https://twitter.com/hgqbinh2002)
- LinkedIn - [hgqbinh2002](https://www.linkedin.com/in/hgqbinh2002/)

## My recent works

### Chat app (Gave up because Firebase's not suitable for relationship-typed data)

- Source code: [View my code](https://github.com/Binh2/chat-app)
- Live site: [My live site](https://chat-app-binh2.vercel.app/)

### My portfolio

- Source URL: [See my source code](https://github.com/Binh2/portfolio/)
- Live Site URL: [Visit my live site](https://portfolio-binh2.vercel.app)

### A blog template

- The source code: [Checkout my source code](https://github.com/Binh2/brother-blog)
- Live Site URL: [My live webpage](https://binh2.github.io/brother-blog/)