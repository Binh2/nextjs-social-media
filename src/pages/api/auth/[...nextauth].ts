import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prisma';
import * as argon2 from "argon2";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

export const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        type: {},
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        hashedPassword: { label: "Password", type: "password" },

        firstName: { label: "First name", type: "text", placeholder: "John" },
        lastName: { label: "Last name", type: "text", placeholder: "Smith" },
        isMale: { label: "Gender", type: "boolean" },
        birthday: { label: "Birthday" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        console.log(credentials)
        
        if (credentials.type == "signin") {
          const user = await prisma.user.findFirst({
            where: {
              OR: [
                { email: credentials.email },
                { username: credentials.username },
              ]
            },
            select: {
              id: true,
              name: true,
              email: true,
              hashedPassword: true,
            }
          })
          if (!user) return null;
          if (!user.hashedPassword) return null;
          try {
            if (!await argon2.verify(user.hashedPassword, credentials.password)) return null;
            return (({id, name, email}) => ({id, name, email}))(user);
          } catch (err) {
            console.log(err)
          }
        } else if (credentials.type == "signup") {
          const hashedPassword = await argon2.hash(credentials.password);
          let user;
          try {
            user = await prisma.user.create({
              data: {
                name: credentials.firstName + ' ' + credentials.lastName,
                username: credentials.username,
                email: credentials.email,
                hashedPassword: hashedPassword,
                birthday: new Date(credentials.birthday),
              }
            })
            console.log(user);
            return user;
          } catch (err) {
            console.log(err);
          }
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/signin',
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};
