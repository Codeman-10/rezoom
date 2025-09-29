import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-6 bg-gray-800 text-gray-300 text-center">
      <p>© 2025 ReZoom · Made in India 🇮🇳</p>
      <div className="mt-2 space-x-4 text-sm">
        <Link href="/about">About</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </footer>
  )
}
