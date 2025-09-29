"use client"

import { signIn, getProviders } from "next-auth/react"
import { useEffect, useState } from "react"

export default function SignInPage() {
  const [providers, setProviders] = useState<any>(null)

  useEffect(() => {
    getProviders().then((res) => setProviders(res))
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border">
        {/* Logo / Header */}
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
          ReZoom
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Sign in to build your ATS-friendly resume 🚀
        </p>

        {/* Email/Password Login */}
        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            const email = (e.currentTarget as any).email.value
            const password = (e.currentTarget as any).password.value
            await signIn("credentials", {
              email,
              password,
              callbackUrl: "/",
            })
          }}
        >
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign in with Email
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Button */}
        {providers &&
          Object.values(providers).map((provider: any) =>
            provider.name === "Google" ? (
              <button
                key={provider.id}
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                className="w-full flex items-center justify-center py-3 border rounded-lg hover:bg-gray-50 transition"
              >
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                <span className="font-medium">Continue with Google</span>
              </button>
            ) : null
          )}

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a href="/auth/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  )
}
