import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db";
import { users } from "@/db/schema/user";
import { userCredits } from "@/db/schema/userCredits";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    // 🔹 Google SSO
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // 🔹 Email/password
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await db.query.users.findFirst({
          where: (u, { eq }) => eq(u.email, credentials.email),
        });
        if (!user || !user.passwordHash) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );
        if (!isValid) return null;

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

callbacks: {
  async signIn({ user, account }) {
    try {
      console.log("🔹 signIn callback started")
      console.log("👉 Provider:", account?.provider)
      console.log("👉 User object:", user)

      if (!user.email) {
        console.error("❌ No email returned from provider")
        return false
      }

      let dbUser

      if (account?.provider === "google") {
        const googleId = String(account.providerAccountId)
        console.log("👉 Google ID:", googleId)

        dbUser = await db.query.users.findFirst({
          where: (u, { eq }) => eq(u.googleId, googleId),
        })

        if (!dbUser) {
          console.log("ℹ️ No DB user found, creating new one")

          const [newUser] = await db
            .insert(users)
            .values({
              id: crypto.randomUUID(),
              googleId,
              name: user.name ?? "Unknown",
              email: user.email!,
              passwordHash: null,
              createdAt: new Date(),
            })
            .returning()

          dbUser = newUser

          console.log("✅ New user inserted:", dbUser)

          await db.insert(userCredits).values({
            userId: dbUser.id,
            credits: 100,
            subscriptionActive: false,
          })

          console.log("✅ Credits row created")
        } else {
          console.log("✅ Existing user found:", dbUser.id)
        }
      } else {
        console.log("👉 Credentials login flow")
        dbUser = await db.query.users.findFirst({
          where: (u, { eq }) => eq(u.email, user.email!),
        })
      }

      if (!dbUser) {
        console.error("❌ Could not find or create DB user")
        return false
      }

      // Attach UUID to user so jwt/session can use it
      ;(user as any).id = dbUser.id

      console.log("✅ signIn success for user:", dbUser.id)
      return true
    } catch (err) {
      console.error("❌ signIn error:", err)
      return false
    }
  },
  
  async jwt({ token, user }) {
    // On first login, copy UUID from `user`
    if (user) {
      token.id = (user as any).id
    }
    return token
  },

  async session({ session, token }) {
    // Every request: ensure UUID is exposed in session
    if (token?.id) {
      session.user.id = token.id as string
    }
    return session
  },
}
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
