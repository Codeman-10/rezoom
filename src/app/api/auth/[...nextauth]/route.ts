import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "@/db"
import bcrypt from "bcrypt"
import { eq } from "drizzle-orm"
import { users } from "@/db/schema/user"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // 👇 define the input fields for TS
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null

        // lookup user in DB
        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email),
        })
        if (!user) return null

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash)
        if (!isValid) return null

        // what becomes session.user
        return { id: user.id, name: user.name, email: user.email }
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
