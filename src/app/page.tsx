"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useResumeStore } from "@/store/resumeStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const setResume = useResumeStore((state) => state.setResume);
  const router = useRouter();

  async function handleBuild() {
    if (!input.trim()) return;
    setLoading(true);

    const res = await fetch("/api/ai/parse-resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });

    const data = await res.json();
    if (res.ok && data.resume) {
      setResume(data.resume);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <nav className="flex justify-between items-center px-8 py-4 shadow bg-white">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          ReZoom
        </Link>
        <div className="space-x-6">
          <Link href="#features" className="hover:text-blue-500">
            Features
          </Link>
          <Link href="#pricing" className="hover:text-blue-500">
            Pricing
          </Link>
          <Link href="/auth/signin" className="hover:text-blue-500">
            Login
          </Link>
          <Button className="bg-blue-600 text-white">Build Resume</Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center flex-1 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          Build your <span className="text-blue-600">ATS-friendly resume</span>{" "}
          in minutes
        </h1>
        <p className="mt-4 text-gray-600 text-center max-w-2xl">
          AI-powered, quick, and affordable — designed for students and job
          seekers
        </p>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your details here..."
          className="mt-8 w-full max-w-2xl h-40 p-4 border rounded-lg shadow-sm"
        />

        <Button
          onClick={handleBuild}
          disabled={loading}
          className="mt-4 px-8 py-3 bg-blue-600 text-white text-lg rounded-lg"
        >
          {loading ? "Building..." : "Build Resume"}
        </Button>

        {/* Resume Card Teaser */}
        {useResumeStore.getState().resume && (
          <Card
            onClick={() => router.push("/resume/preview")}
            className="mt-10 w-[400px] h-[250px] shadow-lg cursor-pointer relative overflow-hidden"
          >
            <CardContent className="p-6 blur-sm select-none pointer-events-none">
              <h2 className="text-2xl font-bold text-gray-800">
                {useResumeStore.getState().resume.name || "Your Resume"}
              </h2>
              <p className="text-gray-500">
                {useResumeStore.getState().resume.email || "example@email.com"}{" "}
                | {useResumeStore.getState().resume.phone || "+91-0000000000"}
              </p>
              <p className="mt-4">
                {useResumeStore.getState().resume.summary?.slice(0, 100) ||
                  "This is a blurred preview of your resume."}
              </p>
            </CardContent>
            <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm">
              <span className="font-semibold text-blue-600 text-lg">
                Click to view full resume →
              </span>
            </div>
          </Card>
        )}
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

      {/* Enhanced Text */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold">
          Over 1,000+ resumes created by students & employees — yours is next!
        </h2>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-800 text-gray-300 text-center">
        <p>© 2025 ReZoom · Made in India 🇮🇳</p>
        <div className="mt-2 space-x-4 text-sm">
          <Link href="/about">About</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </footer>
    </div>
  );
}
