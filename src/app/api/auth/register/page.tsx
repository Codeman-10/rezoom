"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleRegister() {
    // 🔹 For now, just redirect (no DB)
    alert("Registered successfully (mock). Please sign in with demo@rezoom.com / 1234")
    window.location.href = "/auth/signin"
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm p-6 bg-white shadow rounded-lg">
        <h1 className="text-xl font-bold mb-4">Register</h1>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="mt-2" />
        <Input value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="mt-2" />
        <Button onClick={handleRegister} className="w-full mt-4">Register</Button>
      </div>
    </div>
  )
}
