"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function Header() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogin = async () => {
    const supabase = createClient()
    const email = prompt("Entrez votre email pour recevoir le lien de connexion:")
    if (email) {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/telechargement`,
        },
      })
      if (error) {
        alert("Erreur: " + error.message)
      } else {
        alert("Vérifiez votre email pour le lien de connexion!")
      }
    }
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.refresh()
  }

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
          {user ? (
            <>
              <Link href="/telechargement">
                <Button variant="outline" size="sm" className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10 hidden lg:inline-flex">
                  Télécharger
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white/80 hover:text-white hidden lg:inline-flex">
                Déconnexion
              </Button>
            </>
          ) : null}
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

