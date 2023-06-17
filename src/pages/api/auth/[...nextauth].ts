import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prisma';
import * as argon2 from "argon2";
import * as jwt from 'jsonwebtoken'

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

export const options = {
  site: process.env.NEXTAUTH_URL,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 // A day
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        type: {},
        // passwordMatched: {},
        // id: {},
        email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },

        firstName: { label: "First name", type: "text", placeholder: "John" },
        lastName: { label: "Last name", type: "text", placeholder: "Smith" },
        isMale: { label: "Gender", type: "boolean" },
        birthday: { label: "Birthday" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        
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
          });
          if (!user) return null;
          try {
            if (!user?.hashedPassword) return null;
            if (await argon2.verify(user.hashedPassword, credentials.password)) {
              return (({id, name, email}) => ({id, name, email}))(user);
            } else {
              console.log('password did not match')
              return null;
            }
          } catch (err) {
            console.log(err)
          }
          return user;
        } else if (credentials.type == "signup") {
          let user;
          try {
            let name = credentials.firstName + ' ' + credentials.lastName
            if (name == ' ') name = 'Anonymous';
            const hashedPassword = await argon2.hash(credentials.password);
            user = await prisma.user.create({
              data: {
                name,
                username: credentials.username,
                email: credentials.email,
                hashedPassword,
                birthday: credentials.birthday ? new Date(credentials.birthday) : null,
              },
              select: {
                id: true,
                email: true,
                name: true,
              }
            })
            return (({id, name, email}) => ({id, name, email}))(user);
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
