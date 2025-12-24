"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Rediriger automatiquement vers l'accueil après 5 secondes
    const timer = setTimeout(() => {
      router.push("/")
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="container py-24">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-[#1a1612] border-amber-900/30">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-amber-400" />
            </div>
            <CardTitle className="text-3xl text-white">Paiement réussi !</CardTitle>
            <CardDescription className="text-lg text-white/70">
              Merci pour votre achat. Votre ebook est maintenant disponible.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-black/30 p-4 rounded-lg">
              <p className="text-sm text-white/80 mb-2">
                ✅ Vous allez recevoir un email dans quelques instants avec le lien pour télécharger votre ebook.
              </p>
              <p className="text-sm text-white/70">
                Le lien est valide pendant 24 heures et peut être utilisé jusqu'à 5 fois.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/" className="flex-1">
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
            <p className="text-xs text-white/50 text-center">
              Redirection automatique dans 5 secondes...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

