import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import OpenAI from "openai"
import { fitToA4 } from "@/utils/fitToA4"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  try {
    const { text } = await req.json()
    console.log("▶ Input text:", text)

    const prompt = `
    Convert the following resume text into JSON only.
    Do not include any explanation, markdown, or extra words.
    Format:
    {
      "name": "",
      "email": "",
      "phone": "",
      "summary": "",
      "skills": [],
      "experience": [
        { "role": "", "company": "", "duration": "", "description": [] }
      ],
      "education": [
        { "degree": "", "school": "", "year": "" }
      ],
      "projects": [
        { "title": "", "description": "" }
      ],
      "certifications": [],
      "languages": [{ "name": "", "proficiency": "" }]
    }

    Resume text:
    ${text}
    `

    let raw = "{}"

    if (process.env.AI_PROVIDER === "openai") {
      console.log("🔹 Using OpenAI")
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini", // cheapest working model
        messages: [{ role: "user", content: prompt }],
        temperature: 0,
      })
      raw = completion.choices[0].message?.content || "{}"
    } else {
      console.log("🔹 Using Gemini")
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })
      const result = await model.generateContent(prompt)
      raw =
        result.response.candidates
          ?.map(c => c.content?.parts?.map(p => p.text).join(" "))
          .join(" ") || "{}"
    }

    console.log("▶ Raw AI Output:", raw)

    // ✅ Extract JSON safely
    const cleaned = raw.replace(/```json|```/g, "").trim()
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error("No JSON found in AI response")

    const parsed = JSON.parse(jsonMatch[0])

    // Trim to A4
    const trimmed = fitToA4(parsed)

    return NextResponse.json({ resume: trimmed })
  } catch (err: any) {
    console.error("❌ Error in parse-resume:", err)
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    )
  }
}
