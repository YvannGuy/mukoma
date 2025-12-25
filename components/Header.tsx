"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-amber-900/20 bg-black/30 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-base sm:text-xl font-[var(--font-serif)] font-bold text-white truncate max-w-[200px] sm:max-w-none">
          Philippe Mukoma Weto
        </Link>
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <Link href="/" className="text-sm font-medium text-white/80 hover:text-amber-400 transition-colors">
            Livre
          </Link>
          <Link href="/#acheter-ebook" className="text-sm font-medium text-white/80 hover:text-amber-400 transition-colors">
            Votre ebook
          </Link>
          <Link href="/fondation" className="text-sm font-medium text-white/80 hover:text-amber-400 transition-colors">
            Fondation
          </Link>
          <Link href="/#faq" className="text-sm font-medium text-white/80 hover:text-amber-400 transition-colors">
            FAQ
          </Link>
          <Link href="/#acheter-ebook">
            <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs sm:text-sm">
              Acheter
            </Button>
          </Link>
        </nav>
        {/* Mobile menu */}
        <div className="md:hidden flex items-center gap-2">
          <Link href="/#acheter-ebook">
            <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs">
              Acheter
            </Button>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white hover:text-amber-400 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-amber-900/20 bg-black/95 backdrop-blur-sm">
          <nav className="container py-4 space-y-2">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm font-medium text-white/80 hover:text-amber-400 hover:bg-amber-400/10 rounded-md transition-colors"
            >
              Livre
            </Link>
            <Link
              href="/#acheter-ebook"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm font-medium text-white/80 hover:text-amber-400 hover:bg-amber-400/10 rounded-md transition-colors"
            >
              Votre ebook
            </Link>
            <Link
              href="/fondation"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm font-medium text-white/80 hover:text-amber-400 hover:bg-amber-400/10 rounded-md transition-colors"
            >
              Fondation
            </Link>
            <Link
              href="/#faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm font-medium text-white/80 hover:text-amber-400 hover:bg-amber-400/10 rounded-md transition-colors"
            >
              FAQ
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

