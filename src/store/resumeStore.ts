import { create } from "zustand"
import { ResumeData } from "@/types/resume"

interface ResumeState {
  resume: ResumeData | null
  setResume: (resume: ResumeData) => void
  clearResume: () => void
}

export const useResumeStore = create<ResumeState>((set) => ({
  resume: null,
  setResume: (resume) => set({ resume }),
  clearResume: () => set({ resume: null }),
}))
