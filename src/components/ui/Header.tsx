"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Avatar } from "@radix-ui/react-avatar"

export default function Header() {
  const { data: session } = useSession()

  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow bg-white">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-blue-600">
        ReZoom
      </Link>

      {/* Navigation / User Actions */}
      <div className="flex items-center space-x-6">
        <Link href="#features" className="hover:text-blue-500">
          Features
        </Link>
        <Link href="#pricing" className="hover:text-blue-500">
          Pricing
        </Link>
        <Link href="#about" className="hover:text-blue-500">
          About
        </Link>

        {session ? (
          <div className="flex items-center space-x-3">
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
              {session.user?.name?.charAt(0) || "U"}
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <Link
            href="/auth/signin"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}
