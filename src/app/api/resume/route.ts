import { db } from "@/db"
import { resumes } from "@/db/schema/resumes"
import { userCredits } from "@/db/schema/userCredits"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = session.user.id
  const { title, content, templateId } = await req.json()

  // 🔹 Fetch user credits
  const creditsRow = await db.query.userCredits.findFirst({
    where: (uc, { eq }) => eq(uc.userId, userId),
  })

  if (!creditsRow) {
    return NextResponse.json({ error: "Credits not found" }, { status: 400 })
  }

  // 🔹 Check if allowed
  if (!creditsRow.subscriptionActive && creditsRow.credits <= 0) {
    return NextResponse.json(
      { error: "No credits left. Please purchase before exporting." },
      { status: 402 } // Payment Required
    )
  }

  // 🔹 Deduct credit if Pay-as-you-go
  if (!creditsRow.subscriptionActive) {
    await db
      .update(userCredits)
      .set({ credits: creditsRow.credits - 1 })
      .where(eq(userCredits.userId, userId))
  }

  // 🔹 Save resume
  await db.insert(resumes).values({
    userId,
    title,
    content: JSON.stringify(content),
    templateId,
  })

  return NextResponse.json({ success: true })
}
