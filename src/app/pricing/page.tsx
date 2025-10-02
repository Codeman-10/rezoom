"use client"

import { useRouter } from "next/navigation"

export default function PricingPage() {
  const router = useRouter()

  // Fake checkout handler for now (replace with Stripe/Razorpay integration)
  const handleCheckout = (plan: string) => {
    // Redirect to Stripe Checkout OR Razorpay
    router.push(`/api/checkout?plan=${plan}`)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8">Choose Your Plan</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Free Plan */}
        <div className="border rounded-xl p-6 bg-white shadow">
          <h2 className="text-xl font-bold mb-4">Free</h2>
          <p className="mb-4 text-gray-600">Good for testing</p>
          <ul className="text-sm mb-6 list-disc pl-4">
            <li>1 free resume export</li>
            <li>Basic template only</li>
          </ul>
          <button
            className="w-full py-2 bg-gray-400 text-white rounded cursor-not-allowed"
            disabled
          >
            Current
          </button>
        </div>

        {/* One-time Credits */}
        <div className="border rounded-xl p-6 bg-white shadow">
          <h2 className="text-xl font-bold mb-4">Pay As You Go</h2>
          <p className="mb-4 text-gray-600">For occasional use</p>
          <ul className="text-sm mb-6 list-disc pl-4">
            <li>10 resume exports</li>
            <li>All templates</li>
          </ul>
          <p className="text-2xl font-bold mb-6">₹299</p>
          <button
            onClick={() => handleCheckout("credits")}
            className="w-full py-2 bg-blue-600 text-white rounded"
          >
            Buy Credits
          </button>
        </div>

        {/* Subscription */}
        <div className="border rounded-xl p-6 bg-white shadow">
          <h2 className="text-xl font-bold mb-4">Pro Subscription</h2>
          <p className="mb-4 text-gray-600">For professionals</p>
          <ul className="text-sm mb-6 list-disc pl-4">
            <li>Unlimited resume exports</li>
            <li>Premium templates</li>
            <li>Priority support</li>
          </ul>
          <p className="text-2xl font-bold mb-6">₹499 / month</p>
          <button
            onClick={() => handleCheckout("subscription")}
            className="w-full py-2 bg-green-600 text-white rounded"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  )
}
