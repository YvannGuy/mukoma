import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-amber-900/20 bg-[#1a1612] text-white">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-white/80 font-medium">Philippe Mukoma Weto</p>
          </div>
          <nav className="flex flex-wrap items-center gap-6">
            <Link href="/fondation" className="text-sm text-white/70 hover:text-amber-400 transition-colors">
              Fondation
            </Link>
            <a href="mailto:contact@mukoma.com" className="text-sm text-white/70 hover:text-amber-400 transition-colors">
              Contact
            </a>
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t border-amber-900/20 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} Philippe Mukoma Weto. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

