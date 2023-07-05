import NextAuth from "next-auth"

type User = {
  id?: string | null,
  handle?: string | null,
  name?: string | null,
  email?: string | null,
  image?: string | null,
}
declare module "next-auth" {
  interface Session {
    user: User
  }
}