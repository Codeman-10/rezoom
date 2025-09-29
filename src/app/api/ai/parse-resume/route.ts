import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

// 🔹 Simple unsafe check
function isUnsafeInput(text: string): boolean {
  const blockedWords = ["kill", "porn", "bomb", "terrorist", "drugs", "suicide"]

  return false 
  // || blockedWords.some((w) => text.toLowerCase().includes(w))
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json()

    if (!text || text.length < 20) {
      return NextResponse.json({ error: "Please provide enough details." }, { status: 400 })
    }

    if (isUnsafeInput(text)) {
      return NextResponse.json({ error: "Inappropriate content detected. Please revise your input." }, { status: 400 })
    }

    // 📝 Prompt to AI
    const prompt = `
    You are a resume parser + ATS evaluator.
    1. Convert the text into the following JSON format (do not add anything new):
    {
      "name": "",
      "email": "",
      "phone": "",
      "summary": "",
      "skills": [],
      "experience": [{ "role": "", "company": "", "duration": "", "description": [] }],
      "education": [{ "degree": "", "school": "", "year": "" }],
      "projects": [{ "title": "", "description": "" }],
      "certifications": [],
      "languages": [{ "name": "", "proficiency": "" }]
    }

    2. Also give an "ats_score" (0–100) based on relevance, clarity, keywords, and formatting.

    Respond ONLY with valid JSON.

    Resume text:
    ${text}
    `

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })
    const result = await model.generateContent(prompt)

    const raw = result.response.candidates?.[0]?.content?.parts?.[0]?.text || "{}"
    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error("No JSON found in AI response")

    const parsed = JSON.parse(jsonMatch[0])
console.log(parsed)
    return NextResponse.json({
      resume: parsed,
      ats_score: parsed.ats_score ?? null,
    })
  } catch (err: any) {
    console.error("❌ Error in parse-resume:", err)
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 })
  }
}
