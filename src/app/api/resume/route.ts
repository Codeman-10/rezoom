import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { db } from "@/db"
import { resumes } from "@/db/schema/resumes"
import { eq, and } from "drizzle-orm"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { title, content, templateId } = await req.json()

  // 🔹 Count existing resumes (limit = 2 for free users)
  const existing = await db
    .select()
    .from(resumes)
    .where(eq(resumes.userId, session.user.id))

  if (existing.length >= 2) {
    return NextResponse.json(
      { error: "Free limit reached. Upgrade to save more resumes." },
      { status: 403 }
    )
  }

  await db.insert(resumes).values({
    userId: session.user.id,
    title,
    content: JSON.stringify(content),
    templateId,
  })

  return NextResponse.json({ success: true })
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const all = await db
    .select()
    .from(resumes)
    .where(eq(resumes.userId, session.user.id))

  return NextResponse.json({ resumes: all })
}
