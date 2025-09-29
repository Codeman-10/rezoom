"use client"

import { useResumeStore } from "@/store/resumeStore"
import { useEffect } from "react"
import { PDFViewer } from "@react-pdf/renderer"
import { BasicTemplate } from "@/components/resumePDF/templates/BasicTemplate"

const samplePrompt = `Name: Rahul Verma
Email: rahul.verma@example.com | Phone: +91-9876543210
Summary: Full-stack developer with 3+ years of experience in React, Node.js, and cloud-native apps.
Experience:
- Software Engineer at Infosys (2020–Present) – Built microservices on AWS
- Developer Intern at Wipro (2019–2020) – Designed dashboards with React
Education: B.Tech in CSE, NIT Trichy (2015–2019)
Skills: React, Next.js, Node.js, PostgreSQL, AWS, Docker
`

export default function SampleResumePage() {
  const setResume = useResumeStore((state) => state.setResume)
  const resume = useResumeStore((state) => state.resume)

  // On mount, parse & set a sample resume object
  useEffect(() => {
    setResume({
      name: "Rahul Verma",
      email: "rahul.verma@example.com",
      phone: "+91-9876543210",
      location: "Bangalore, India",
      summary:
        "Full-stack developer with 3+ years of experience in React, Node.js, and cloud-native apps.",
      experience: [
        {
          role: "Software Engineer",
          company: "Infosys",
          duration: "2020 – Present",
          description: ["Built microservices on AWS"],
        },
        {
          role: "Developer Intern",
          company: "Wipro",
          duration: "2019 – 2020",
          description: ["Designed dashboards with React"],
        },
      ],
      education: [
        {
          degree: "B.Tech in CSE",
          school: "NIT Trichy",
          year: "2015 – 2019",
        },
      ],
      skills: ["React", "Next.js", "Node.js", "PostgreSQL", "AWS", "Docker"],
      projects: [],
      certifications: [],
      languages: [],
    })
  }, [setResume])

  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-2xl font-bold text-center py-4">Sample Resume</h1>

      {/* Show prompt */}
      <div className="px-6 mb-6">
        <h2 className="font-semibold text-lg mb-2">Sample Input Prompt</h2>
        <pre className="p-4 bg-gray-100 rounded text-sm whitespace-pre-wrap">
          {samplePrompt}
        </pre>
      </div>

      {/* Show PDF Preview */}
      <div className="flex-1 border-t">
        {resume ? (
          <PDFViewer className="w-full h-full">
            <BasicTemplate resume={resume} />
          </PDFViewer>
        ) : (
          <p className="text-center mt-10">Loading sample resume...</p>
        )}
      </div>
    </div>
  )
}
