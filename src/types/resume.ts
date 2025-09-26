// types/resume.ts

export interface ResumeData {
  name: string
  title?: string
  email?: string
  phone?: string
  location?: string
  linkedin?: string
  github?: string
  summary?: string
  experience?: {
    role: string
    company: string
    duration: string
    description?: string[]
  }[]
  education?: {
    degree: string
    school: string
    year: string
  }[]
  skills?: string[]
  projects?: {
    title: string
    tech?: string[]
    description?: string
  }[]
  certifications?: string[]
  languages?: {
    name: string
    proficiency: string
  }[]
}

