// utils/fitToA4.ts

const MAX_CHARS = 7800 // safe capacity for one A4 page

// --- Helpers ---
function estimateChars(section: any): number {
  if (!section) return 0

  if (Array.isArray(section)) {
    return section.reduce((sum: number, s: any) => sum + estimateChars(s), 0)
  }

  if (typeof section === "object") {
    return Object.values(section).reduce(
      (sum: number, v: any) => sum + estimateChars(v),
      0
    )
  }

  return String(section).length
}

function recalcChars(resume: any): number {
    console.log(resume)
  return (
    estimateChars(resume.summary) +
    estimateChars(resume.skills) +
    estimateChars(
      (resume.experience || []).map(
        (e: any) => `${e.role || ""}${e.company || ""}${(e.description || []).join(" ")}`
      )
    ) +
    estimateChars(resume.education) +
    estimateChars(resume.projects) +
    estimateChars(resume.certifications) +
    estimateChars(resume.languages)
  )
}

// --- Rephrase stub (replace with AI if needed) ---
function rephrase(text: string, maxChars: number): string {
  if (!text) return ""
  return text.length > maxChars ? text.slice(0, maxChars) + "..." : text
}

// --- Main Shrink ---
export function fitToA4(resume: any) {
  let total = recalcChars(resume)

  if (total <= MAX_CHARS) {
    return resume // ✅ everything fits
  }

  // Step 1: rephrase/shorten long text
  resume.summary = rephrase(resume.summary, 350)

  if (resume.experience) {
    resume.experience = resume.experience.map((exp: any) => ({
      ...exp,
      description: (exp.description || []).map((d: string) => rephrase(d, 120)),
    }))
  }

  // Step 2: recalc
  total = recalcChars(resume)

  // Step 3: trim only if still overflowing
  if (total > MAX_CHARS) {
    if (resume.skills) resume.skills = resume.skills.slice(0, 8)
    if (resume.experience) resume.experience = resume.experience.slice(-2) // keep latest 2
    if (resume.projects) resume.projects = resume.projects.slice(0, 2)
    if (resume.certifications) resume.certifications = resume.certifications.slice(0, 2)
    if (resume.languages) resume.languages = resume.languages.slice(0, 2)
  }

  return resume
}
