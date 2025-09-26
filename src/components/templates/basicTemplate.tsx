"use client"

import { ResumeData } from "@/types/resume"

interface Props {
  resume: ResumeData
  theme?: "default" | "premium-blue" | "premium-red"
}

export function BasicTemplate({ resume, theme = "default" }: Props) {
  const themeColors: Record<string, string> = {
    default: "text-black",
    "premium-blue": "text-blue-700",
    "premium-red": "text-red-700",
  }

  return (
    <div className="w-[210mm] h-[297mm] bg-white shadow-md mx-auto p-8">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className={`text-3xl font-bold uppercase ${themeColors[theme]}`}>
          {resume.name}
        </h1>
        {resume.title && <p className="text-lg font-medium">{resume.title}</p>}
        <p className="text-sm">
          {resume.email} | {resume.phone}
          {resume.location && ` | ${resume.location}`}
        </p>
      </div>

      {/* Summary */}
      {resume.summary && (
        <section className="mb-3">
          <h2 className={`font-bold uppercase text-sm ${themeColors[theme]}`}>
            Summary
          </h2>
          <p className="text-sm">{resume.summary}</p>
        </section>
      )}

      {/* Education */}
      {resume.education?.length ? (
        <section className="mb-3">
          <h2 className={`font-bold uppercase text-sm ${themeColors[theme]}`}>
            Education
          </h2>
          {resume.education.map((edu, idx) => (
            <p key={idx} className="text-sm">
              <span className="font-semibold">{edu.degree}</span> – {edu.school}{" "}
              {edu.year && `(${edu.year})`}
            </p>
          ))}
        </section>
      ) : null}

      {/* Experience */}
      {resume.experience?.length ? (
        <section className="mb-3">
          <h2 className={`font-bold uppercase text-sm ${themeColors[theme]}`}>
            Work Experience
          </h2>
          {resume.experience.map((exp, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-semibold text-sm">
                {exp.role} – {exp.company} {exp.duration && `(${exp.duration})`}
              </p>
              {exp.description?.length ? (
                <ul className="list-disc list-inside text-sm">
                  {exp.description.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </section>
      ) : null}

      {/* Skills */}
      {resume.skills?.length ? (
        <section className="mb-3">
          <h2 className={`font-bold uppercase text-sm ${themeColors[theme]}`}>
            Key Skills
          </h2>
          <p className="text-sm">{resume.skills.join(" • ")}</p>
        </section>
      ) : null}

      {/* Projects */}
      {resume.projects?.length ? (
        <section className="mb-3">
          <h2 className={`font-bold uppercase text-sm ${themeColors[theme]}`}>
            Projects
          </h2>
          {resume.projects.map((p, idx) => (
            <p key={idx} className="text-sm">
              <span className="font-semibold">{p.title}:</span> {p.description}
            </p>
          ))}
        </section>
      ) : null}

      {/* Certifications */}
      {resume.certifications?.length ? (
        <section className="mb-3">
          <h2 className={`font-bold uppercase text-sm ${themeColors[theme]}`}>
            Certifications
          </h2>
          <ul className="list-disc list-inside text-sm">
            {resume.certifications.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Languages */}
      {resume.languages?.length ? (
        <section className="mb-3">
          <h2 className={`font-bold uppercase text-sm ${themeColors[theme]}`}>
            Languages
          </h2>
          <p className="text-sm">{resume.languages.join(" • ")}</p>
        </section>
      ) : null}
    </div>
  )
}
