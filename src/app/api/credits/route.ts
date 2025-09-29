import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { db } from "@/db"
import { userCredits } from "@/db/schema/userCredits"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"
import { validate as isUuid } from "uuid"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      console.error("❌ No session user found")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    console.log("▶ Fetching credits for user:", userId)

    if (!isUuid(userId)) {
      console.error("❌ Not a UUID:", userId)
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 })
    }

    const row = await db.query.userCredits.findFirst({
      where: (uc, { eq }) => eq(uc.userId, userId),
    })

    console.log("▶ DB Result:", row)

    if (!row) {
      return NextResponse.json({ credits: 0, subscriptionActive: false })
    }

    return NextResponse.json({
      credits: row.credits,
      subscriptionActive: row.subscriptionActive,
    })
  } catch (err: any) {
    console.error("❌ Error in /api/credits:", err)
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 })
  }
}
