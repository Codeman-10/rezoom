"use client"

import { useEffect } from "react"
import { useResumeStore } from "@/store/resumeStore"
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer"
import { ResumePDF } from "@/components/ResumePDF"

export default function ResumePreview() {
  const resume = useResumeStore((state) => state.resume)
  const setResume = useResumeStore((state) => state.setResume)

  console.log("📌 ResumeStore (hook):", resume)

  useEffect(() => {
    if (!resume) {
      const stored = sessionStorage.getItem("resumeData")
      if (stored) {
        setResume(JSON.parse(stored))
      }
    }
  }, [resume, setResume])

  if (!resume) {
    return (
      <p className="text-center mt-10">
        No resume found. Please go back and generate again.
      </p>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-xl font-bold text-center py-4">Resume Preview</h1>

      {/* PDF Preview */}
      <div className="flex-1">
        <PDFViewer className="w-full h-full">
          <ResumePDF resume={resume} />
        </PDFViewer>
      </div>

      {/* Download Button */}
      <div className="flex justify-center py-4">
        <PDFDownloadLink
          document={<ResumePDF resume={resume} />}
          fileName="resume.pdf"
        >
          {({ loading }) =>
            loading ? (
              <button className="px-6 py-2 bg-gray-400 text-white rounded">
                Preparing...
              </button>
            ) : (
              <button className="px-6 py-2 bg-blue-600 text-white rounded">
                Download PDF
              </button>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  )
}
