"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/lib/LanguageContext"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 border-b border-amber-900/20 bg-black/30 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-base sm:text-xl font-[var(--font-serif)] font-bold text-white truncate max-w-[200px] sm:max-w-none">
          Philippe Mukoma Weto
        </Link>
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <Link href="/" className="text-sm font-medium text-white/80 hover:text-amber-400 transition-colors">
            {t('nav.book')}
          </Link>
          <Link href="/#acheter-ebook" className="text-sm font-medium text-white/80 hover:text-amber-400 transition-colors">
            {t('nav.ebook')}
          </Link>
          <Link href="/fondation" className="text-sm font-medium text-white/80 hover:text-amber-400 transition-colors">
            {t('nav.foundation')}
          </Link>
          <Link href="/#faq" className="text-sm font-medium text-white/80 hover:text-amber-400 transition-colors">
            {t('nav.faq')}
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className="text-sm font-medium text-white/80 hover:text-amber-400 transition-colors px-2 py-1 border border-white/20 rounded hover:border-amber-400"
              aria-label="Change language"
            >
              {language === 'fr' ? 'EN' : 'FR'}
            </button>
            <Link href="/#acheter-ebook">
              <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs sm:text-sm">
                {t('nav.buy')}
              </Button>
            </Link>
          </div>
        </nav>
        {/* Mobile menu */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
            className="text-xs font-medium text-white/80 hover:text-amber-400 transition-colors px-2 py-1 border border-white/20 rounded hover:border-amber-400"
            aria-label="Change language"
          >
            {language === 'fr' ? 'EN' : 'FR'}
          </button>
          <Link href="/#acheter-ebook">
            <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs">
              {t('nav.buy')}
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
              {t('nav.book')}
            </Link>
            <Link
              href="/#acheter-ebook"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm font-medium text-white/80 hover:text-amber-400 hover:bg-amber-400/10 rounded-md transition-colors"
            >
              {t('nav.ebook')}
            </Link>
            <Link
              href="/fondation"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm font-medium text-white/80 hover:text-amber-400 hover:bg-amber-400/10 rounded-md transition-colors"
            >
              {t('nav.foundation')}
            </Link>
            <Link
              href="/#faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 text-sm font-medium text-white/80 hover:text-amber-400 hover:bg-amber-400/10 rounded-md transition-colors"
            >
              {t('nav.faq')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

