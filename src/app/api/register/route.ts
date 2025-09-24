import { db } from "@/db"
import { users } from "@/db/schema/user"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
  try {
    console.log(process.env.DATABASE_URL,'jj')
    const { name, email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email & password required" }, { status: 400 })
    }

    const hashed = await bcrypt.hash(password, 10)

    await db.insert(users).values({
      name,
      email,
      passwordHash: hashed,
    })
    console.log('jj')

    return NextResponse.json({ success: true })
  } catch (err) {
    console.log(err,'jj')
    return NextResponse.json({ error: "Registratisson failed" }, { status: 500 })
  }
}
