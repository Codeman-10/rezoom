"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useResumeStore } from "@/store/resumeStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const setResume = useResumeStore((state) => state.setResume);
  const setAtsScore = useResumeStore((state) => state.setAtsScore);
  const router = useRouter();

  async function handleBuild() {
    if (!input.trim()) {
      toast.error("⚠️ Please enter your resume details before building.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/ai/parse-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const data = await res.json();
      if (res.ok && data.resume) {
        setResume(data.resume);
        setAtsScore(data.ats_score || null);
        toast.success("🎉 Resume built successfully!");
        router.push("/resume/preview");
      } else {
        toast.error(data.error || "❌ Failed to build resume.");
      }
    } catch (err) {
      toast.error("⚡ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero */}
      <section className="flex flex-col items-center justify-center flex-1 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          Build your <span className="text-blue-600">ATS-friendly resume</span>{" "}
          in minutes
        </h1>
        <p className="mt-4 text-gray-600 text-center max-w-2xl">
          AI-powered, quick, and affordable — designed for students and job seekers
        </p>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your details here..."
          className="mt-8 w-full max-w-2xl h-40 p-4 border rounded-lg shadow-sm"
        />
        <p className="text-sm text-gray-500 mt-2">
          💡 Tip: Paste your resume text or type details like{" "}
          <strong>Name, Email, Phone, Summary, Skills, Work Experience, Education</strong>.  
          You can also try our{" "}
          <button className="text-blue-600 underline">Sample Resume</button>.
        </p>

        <Button
          onClick={handleBuild}
          disabled={loading}
          className="mt-4 px-8 py-3 bg-blue-600 text-white text-lg rounded-lg"
        >
          {loading ? "Building..." : "Build Resume"}
        </Button>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-white px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why ReZoom?</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="text-4xl">✅</span>
            <h3 className="font-semibold mt-2">ATS Friendly</h3>
            <p className="text-gray-600">
              Beat bots and get noticed by recruiters
            </p>
          </div>
          <div>
            <span className="text-4xl">⚡</span>
            <h3 className="font-semibold mt-2">Fast & Easy</h3>
            <p className="text-gray-600">Generate in seconds, not hours</p>
          </div>
          <div>
            <span className="text-4xl">💸</span>
            <h3 className="font-semibold mt-2">Affordable</h3>
            <p className="text-gray-600">Flexible options that fit your budget</p>
          </div>
          <div>
            <span className="text-4xl">📄</span>
            <h3 className="font-semibold mt-2">Professional</h3>
            <p className="text-gray-600">Designed for students & employees</p>
          </div>
        </div>
      </section>

      {/* Resume Showcase */}
      <section
        id="resume-showcase"
        className="py-16 bg-gray-50 px-6 md:px-20 text-center"
      >
        <h2 className="text-3xl font-bold mb-12">See What You Can Build</h2>
        <div className="flex justify-center">
          <Image
            src="/templates/sample-resume.png"
            alt="Sample Resume"
            width={400}
            height={550}
            className="shadow-lg rounded border"
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-white py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Choose Your Plan
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Pay-as-you-go Plan */}
          <div className="border rounded-2xl bg-white shadow p-8">
            <h3 className="text-xl font-semibold text-gray-900">Pay-as-you-go</h3>
            <p className="mt-2 text-gray-600">
              Great for quick one-time use without subscription.
            </p>
            <ul className="mt-6 space-y-3 text-gray-700 text-left">
              <li>👉 1st Resume Parse: <strong>₹1</strong></li>
              <li>👉 2nd Resume Parse: <strong>₹25</strong></li>
              <li>👉 3rd+ Resume Parse: <strong>₹49 each</strong></li>
              <li>❌ No unlimited option</li>
            </ul>
            <Button variant="outline" className="mt-8 w-full">
              Try Now
            </Button>
          </div>

          {/* Basic Plan */}
          <div className="border rounded-2xl bg-white shadow-lg p-8 relative">
            <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              Popular
            </span>
            <h3 className="text-xl font-semibold text-gray-900">Basic Plan</h3>
            <p className="mt-2 text-gray-600">
              Unlimited resumes, downloads, and ATS checks.
            </p>
            <ul className="mt-6 space-y-3 text-gray-700 text-left">
              <li>✅ Unlimited Resumes</li>
              <li>✅ Unlimited ATS Score Checks</li>
              <li>✅ Download as PDF</li>
              <li>✅ All Templates</li>
            </ul>
            <p className="mt-4 text-4xl font-bold">
              ₹199 <span className="text-lg font-medium text-gray-600">/month</span>
            </p>
            <Button className="mt-8 w-full bg-blue-600 text-white hover:bg-blue-700">
              Subscribe Now
            </Button>
          </div>
        </div>
      </section>

      {/* Resumes Built Section */}
      <section
        id="resumes-built"
        className="py-16 bg-gray-50 px-6 md:px-20 text-center"
      >
        <h2 className="text-3xl font-bold mb-12">Resumes Built by Users</h2>
        <p className="text-gray-600 mb-10">
          Here are some examples of resumes created using ReZoom. Your resume could be next!
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <Image
            src="/templates/resume1.png"
            alt="Resume 1"
            width={300}
            height={420}
            className="shadow-md rounded border"
          />
          <Image
            src="/templates/resume2.png"
            alt="Resume 2"
            width={300}
            height={420}
            className="shadow-md rounded border"
          />
          <Image
            src="/templates/resume3.png"
            alt="Resume 3"
            width={300}
            height={420}
            className="shadow-md rounded border"
          />
        </div>
      </section>

      {/* Enhanced Text */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold">
          Over 1,000+ resumes created by students & employees — yours is next!
        </h2>
      </section>
    </div>
  );
}
