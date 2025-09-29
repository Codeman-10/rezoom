import { create } from "zustand"

interface ResumeState {
  resume: any | null
  atsScore: number | null
  credits: number
  subscriptionActive: boolean
  setResume: (resume: any) => void
  setAtsScore: (score: number | null) => void
  setCredits: (credits: number, subActive: boolean) => void
  clearResume: () => void
}

export const useResumeStore = create<ResumeState>((set) => ({
  resume: null,
  atsScore: null,
  credits: 0,
  subscriptionActive: false,
  setResume: (resume) => set({ resume }),
  setAtsScore: (score) => set({ atsScore: score }),
  setCredits: (credits, subActive) =>
    set({ credits, subscriptionActive: subActive }),
  clearResume: () => set({ resume: null, atsScore: null, credits: 0, subscriptionActive: false }),
}))