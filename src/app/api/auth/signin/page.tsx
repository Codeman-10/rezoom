"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin() {
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm p-6 bg-white shadow rounded-lg">
        <h1 className="text-xl font-bold mb-4">Sign In</h1>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="mt-2" />
        <Button onClick={handleLogin} className="w-full mt-4">Login</Button>
      </div>
    </div>
  )
}
