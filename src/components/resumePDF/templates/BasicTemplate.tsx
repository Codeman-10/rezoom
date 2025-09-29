"use client"

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { ResumeData } from "@/types/resume"

export interface BasicTemplateProps {
  resume: ResumeData
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#333",
    lineHeight: 1.4,
  },

  // Header
  header: { textAlign: "center", marginBottom: 20 },
  name: { fontSize: 20, fontWeight: "bold", textTransform: "uppercase", marginBottom: 4 },
  title: { fontSize: 12, color: "#555", marginBottom: 8 },
  contact: { fontSize: 10, color: "#333", marginBottom: 2 },
  highlight: { color: "#0A66C2", fontWeight: "bold" },

  // Sections
  section: { marginTop: 16, marginBottom: 12, paddingTop: 6, borderTop: "1pt solid #eee" },
  sectionTitle: { fontSize: 13, fontWeight: "bold", marginBottom: 6, textTransform: "uppercase" },

  // Experience
  jobHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  jobTitle: { fontWeight: "bold", fontSize: 11 },
  company: { fontSize: 10, color: "#555" },
  duration: { fontSize: 10, color: "#0A66C2" },
  bulletGroup: { marginBottom: 8 },
  bullet: { fontSize: 10, marginLeft: 10, marginBottom: 2 },

  // Misc
  text: { marginBottom: 3 },
  italic: { fontStyle: "italic" },
  footer: {
    position: "absolute",
    fontSize: 9,
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#888",
  },
})

export function BasicTemplate({ resume }: BasicTemplateProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header} wrap={false}>
          <Text style={styles.name}>{resume?.name}</Text>
          {resume?.title && <Text style={styles.title}>{resume?.title}</Text>}
          <Text style={styles.contact}>
            {resume?.email && <Text style={styles.highlight}>{resume.email}</Text>}{" "}
            {resume?.phone && <>| <Text style={styles.highlight}>{resume.phone}</Text></>}{" "}
            {resume?.location && `| ${resume.location}`}
          </Text>
          {resume?.linkedin && <Text style={styles.contact}>🔗 {resume.linkedin}</Text>}
          {resume?.github && <Text style={styles.contact}>💻 {resume.github}</Text>}
        </View>

        {/* Summary */}
        {resume?.summary && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.text}>{resume.summary}</Text>
          </View>
        )}

        {/* Work Experience */}
        {Array.isArray(resume?.experience) && resume.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {resume.experience.map((exp, i) => (
              <View key={i} style={{ marginBottom: 10 }}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{exp?.role}</Text>
                  <Text style={styles.duration}>{exp?.duration}</Text>
                </View>
                <Text style={styles.company}>{exp?.company}</Text>
                {Array.isArray(exp?.description) && exp.description.length > 0 && (
                  <View style={styles.bulletGroup} wrap={false}>
                    {exp.description.map((d, j) => (
                      <Text key={j} style={styles.bullet}>
                        • {d}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {Array.isArray(resume?.education) && resume.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {resume.education.map((edu, i) => (
              <Text key={i} style={styles.text}>
                <Text style={styles.jobTitle}>{edu?.degree}</Text> – {edu?.school}{" "}
                <Text style={styles.duration}>{edu?.year}</Text>
              </Text>
            ))}
          </View>
        )}

        {/* Skills */}
        {Array.isArray(resume?.skills) && resume.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.text}>{resume.skills.join(" • ")}</Text>
          </View>
        )}

        {/* Projects */}
        {Array.isArray(resume?.projects) && resume.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {resume.projects.map((proj, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={styles.jobTitle}>{proj?.title}</Text>
                {Array.isArray(proj?.tech) && proj.tech.length > 0 && (
                  <Text style={[styles.italic, { fontSize: 10 }]}>{proj.tech.join(", ")}</Text>
                )}
                <Text style={styles.text}>{proj?.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {Array.isArray(resume?.certifications) && resume.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {resume.certifications.map((cert, i) => (
              <Text key={i} style={styles.text}>
                • {cert}
              </Text>
            ))}
          </View>
        )}

        {/* Languages */}
        {Array.isArray(resume?.languages) && resume.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            {resume.languages.map((lang, i) => (
              <Text key={i} style={styles.text}>
                {lang?.name} – <Text style={styles.italic}>{lang?.proficiency}</Text>
              </Text>
            ))}
          </View>
        )}

        {/* Page Numbers */}
        <Text style={styles.footer} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
      </Page>
    </Document>
  )
}
