import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth-options"

declare module "next-auth" {
  interface Session {
    user: {
      id?: string | null | undefined
      plan?: string | null | undefined
      created?: string | null | undefined
      name?: string | null | undefined
      email?: string | null | undefined
    }
  }
  interface User {
    plan?: string | null | undefined
    created?: string | null | undefined
  }
}



const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
