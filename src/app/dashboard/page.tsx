"use client"
import { Button } from "@/components/ui/button"
import { useSession ,signOut } from "next-auth/react"

export default function Dashboard() {
  const { data: session, status } = useSession()

  if (status === "loading") return <p>Loading...</p>
  if (!session) return <p>You must log in first.</p>

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Welcome, {session.user?.email}</h1>
      <p>This is your dashboard 🎉</p>
      <Button onClick={() => signOut()} className="mt-4">Logout</Button>
    </div>
  )
}
