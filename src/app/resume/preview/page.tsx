"use client"

import { useEffect, useState } from "react"
import { useResumeStore } from "@/store/resumeStore"
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer"
import { BasicTemplate } from "@/components/resumePDF/templates/BasicTemplate"
import { toast } from "sonner"

export default function ResumePreview() {
  const resume = useResumeStore((s) => s.resume)
  const credits = useResumeStore((s) => s.credits)
  const subscriptionActive = useResumeStore((s) => s.subscriptionActive)
  const setCredits = useResumeStore((s) => s.setCredits)

  const [loading, setLoading] = useState(true)

  // 🔹 Always re-fetch credits from API
  useEffect(() => {
    async function fetchCredits() {
      try {
        const res = await fetch("/api/credits")
        if (res.ok) {
          const data = await res.json()
          setCredits(data.credits, data.subscriptionActive)
        } else {
          toast.error("⚠️ Failed to load credits")
        }
      } catch (err) {
        console.error("Error fetching credits:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchCredits()
  }, [setCredits])

  if (!resume) {
    return <p className="text-center mt-10">No resume found. Please go back and generate again.</p>
  }

  if (loading) {
    return <p className="text-center mt-10">Loading credits...</p>
  }

  const hasCredits = subscriptionActive || credits > 0

  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-xl font-bold text-center py-4">Resume Preview</h1>

      <div className="flex-1">
        <PDFViewer className="w-full h-full">
          <BasicTemplate resume={resume} />
        </PDFViewer>
      </div>

      <div className="flex justify-center gap-4 py-4">
        <button
          className="px-6 py-2 bg-gray-500 text-white rounded"
          onClick={() => (window.location.href = "/")}
        >
          ← Back
        </button>

        <PDFDownloadLink
          document={<BasicTemplate resume={resume} />}
          fileName="resume.pdf"
        >
          {({ loading }) =>
            hasCredits ? (
              <button className="px-6 py-2 bg-blue-600 text-white rounded">
                {loading ? "Preparing..." : "Export Resume"}
              </button>
            ) : (
              <button
                disabled
                className="px-6 py-2 bg-gray-400 text-white rounded cursor-not-allowed"
              >
                No Credits (Buy to Export)
              </button>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  )
}
