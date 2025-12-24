"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b border-amber-900/20 bg-[#1a1612]">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-base sm:text-xl font-[var(--font-serif)] font-bold text-white truncate max-w-[200px] sm:max-w-none">
          L'Art de Diriger sa Nouvelle Année
        </Link>
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <Link href="/" className="text-sm font-medium text-white/80 hover:text-amber-400 transition-colors">
            Livre
          </Link>
          <Link href="/#offres" className="text-sm font-medium text-white/80 hover:text-amber-400 transition-colors">
            Offres
          </Link>
          <Link href="/fondation" className="text-sm font-medium text-white/80 hover:text-amber-400 transition-colors">
            Fondation
          </Link>
          <Link href="/#faq" className="text-sm font-medium text-white/80 hover:text-amber-400 transition-colors">
            FAQ
          </Link>
          <Link href="/#acheter">
            <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs sm:text-sm">
              Acheter
            </Button>
          </Link>
        </nav>
        {/* Mobile menu button */}
        <Link href="/#acheter" className="md:hidden">
          <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs">
            Acheter
          </Button>
        </Link>
      </div>
    </header>
  )
}

