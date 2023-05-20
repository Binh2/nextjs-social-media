import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import prisma from '../../../lib/prisma';

const authHandler: NextApiHandler = (req, res) => {
  //Cannot destructure property 'nextauth' of 'req.query' as it is undefined.
  console.log(req);
  NextAuth(req, res, options);
}
export default authHandler;

const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};