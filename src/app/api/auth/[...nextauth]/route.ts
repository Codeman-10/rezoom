import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 🔹 Hardcoded user (replace later with DB lookup)
        const user = { id: "1", name: "Demo User", email: "demo@rezoom.com", password: "1234" }

        if (
          credentials?.email === user.email &&
          credentials.password === user.password
        ) {
          return { id: user.id, name: user.name, email: user.email }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
