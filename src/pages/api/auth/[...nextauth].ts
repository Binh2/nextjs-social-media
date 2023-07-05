import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { AuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
// import EmailProvider from 'next-auth/providers/email';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prisma';
import * as argon2 from "argon2";
import Cookies from 'cookies';
import { encode, decode } from 'next-auth/jwt';
import { User } from '@/types/next-auth';
import { AdapterUser } from 'next-auth/adapters';

let req: NextApiRequest, res: NextApiResponse;
const authHandler: NextApiHandler = (req_, res_) => {
  req = req_;
  res = res_;
  return NextAuth(req, res, authOptions);
}
export default authHandler;

export const authOptions: AuthOptions = {
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
        password: { label: "Password", type: "password" },

        firstName: { label: "First name", type: "text", placeholder: "John" },
        lastName: { label: "Last name", type: "text", placeholder: "Smith" },
        isMale: { label: "Gender", type: "boolean" },
        birthday: { label: "Birthday" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        
        if (credentials.type == "signin") {
          const user = await getUser(credentials.username, credentials.email);
          if (!user) return null;
          try {
            if (!user?.hashedPassword) return null;
            if (await argon2.verify(user.hashedPassword, credentials.password)) {
              return (({id, handle, name, email, image}) => ({id, handle, name, email, image}))(user);
            } else {
              console.log('password did not match')
              return null;
            }
          } catch (err) {
            console.log(err)
          }
        } else if (credentials.type == "signup") {
          try {
            const user = await createUser(credentials);
            if (!user) return null;
            return (({id, handle, name, email, image}) => ({id, handle, name, email, image}))(user);
          } catch (err) {
            console.log(err);
          }
        }
        return null;
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Check if this sign in callback is being called in the credentials authentication flow. If so, use the next-auth adapter to create a session entry in the database (SignIn is called after authorize so we can safely assume the user is valid and already authenticated).
      if (req.query.nextauth && req.query.nextauth.includes('callback') && req.query.nextauth.includes('credentials') && req.method === 'POST') {
        if (user) {
          const sessionToken = getToken() // Implement a function to generate the session token (you can use randomUUID as an example)
          const sessionExpiry = getNextMonth() // Implement a function to calculate the session cookie expiry date

          const session = await PrismaAdapter(prisma).createSession({
            sessionToken: sessionToken,
            userId: user.id,
            expires: sessionExpiry
          })

          const cookies = new Cookies(req, res)

          cookies.set('next-auth.session-token', sessionToken, {
              expires: sessionExpiry
          })
        }   
      }
 
      return true;
    },
    session: async ({session, user, token}) => {
      if (session?.user) {
        session.user.id = user.id;
        session.user.handle = (<User & AdapterUser>user).handle;
      }
      
      return session;
    },
  },
  jwt: {
    // Customize the JWT encode and decode functions to overwrite the default behaviour of storing the JWT token in the session cookie when using credentials providers. Instead we will store the session token reference to the session in the database.
    encode: async ({token, secret, maxAge}) => {
      if (req.query.nextauth && req.query.nextauth.includes('callback') && req.query.nextauth.includes('credentials') && req.method === 'POST') {
        const cookies = new Cookies(req,res)
        const cookie = cookies.get('next-auth.session-token')
        if(cookie) return cookie; else return '';
      }
      // Revert to default behaviour when not in the credentials provider callback flow
      return encode({token, secret, maxAge})
    },
    decode: async ({token, secret}) => {
      if (req.query.nextauth && req.query.nextauth.includes('callback') && req.query.nextauth.includes('credentials') && req.method === 'POST') {
        return null
      }
      // Revert to default behaviour when not in the credentials provider callback flow
      return decode({token, secret})
    }
  },
  pages: {
    signIn: '/signin',
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};

async function getUser(username: string, email: string) {
  return await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { username },
      ]
    },
    select: {
      id: true,
      handle: true,
      name: true,
      email: true,
      image: true,
      hashedPassword: true,
    }
  });
}
async function createUser(credentials: Record<"type" | "email" | "username" | "password" | "firstName" | "lastName" | "isMale" | "birthday", string> | undefined) {
  if (!credentials) return null;
  let name = credentials.firstName + ' ' + credentials.lastName
  if (name == ' ') name = 'Anonymous';
  const hashedPassword = await argon2.hash(credentials.password);
  return await prisma.user.create({
    data: {
      name,
      username: credentials.username,
      email: credentials.email,
      hashedPassword,
      birthday: credentials.birthday ? new Date(credentials.birthday) : null,
    },
    select: {
      id: true,
      handle: true,
      email: true,
      name: true,
      image: true,
    }
  })
}
function getNextMonth() {
  var now = new Date();
  let nextMonth;
  if (now.getMonth() == 12) {
    nextMonth = new Date(now.getFullYear() + 1, 0, now.getDate() - 1);
  } else {
    nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate() - 1);
  }
  return nextMonth;
}
var rand = function() {
  return Math.random().toString(36).substr(2); // remove `0.`
};
function getToken() {
  return rand() + rand(); // to make it longer
};