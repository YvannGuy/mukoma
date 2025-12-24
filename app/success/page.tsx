"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, Mail } from "lucide-react"
import Link from "next/link"

function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    // Récupérer le token depuis la session Stripe
    const fetchDownloadLink = async () => {
      if (!sessionId) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/stripe/get-session?session_id=${sessionId}`)
        if (response.ok) {
          const data = await response.json()
          if (data.download_url) {
            setDownloadUrl(data.download_url)
          }
        }
      } catch (error) {
        console.error("Erreur récupération lien:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDownloadLink()
  }, [sessionId])

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
            {downloadUrl ? (
              <div className="bg-amber-900/20 border border-amber-500/30 p-6 rounded-lg">
                <div className="flex items-start gap-3 mb-4">
                  <Download className="h-6 w-6 text-amber-400 shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-2">Téléchargez votre ebook maintenant</h3>
                    <p className="text-sm text-white/70 mb-4">
                      Votre lien de téléchargement est prêt. Cliquez sur le bouton ci-dessous pour télécharger votre ebook.
                    </p>
                    <Link href={downloadUrl}>
                      <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                        <Download className="mr-2 h-5 w-5" />
                        Télécharger mon ebook
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-amber-900/30">
                  <div className="flex items-start gap-2 text-sm text-white/60">
                    <Mail className="h-4 w-4 shrink-0 mt-0.5" />
                    <p>
                      Vous recevrez également un email avec ce lien dans quelques instants. 
                      Le lien est valide pendant 24 heures et peut être utilisé jusqu'à 5 fois.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-black/30 p-4 rounded-lg">
                <p className="text-sm text-white/80 mb-2">
                  ✅ Vous allez recevoir un email dans quelques instants avec le lien pour télécharger votre ebook.
                </p>
                <p className="text-sm text-white/70">
                  Le lien est valide pendant 24 heures et peut être utilisé jusqu'à 5 fois.
                </p>
                {loading && (
                  <p className="text-xs text-amber-400/80 mt-2">
                    Chargement du lien de téléchargement...
                  </p>
                )}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full border-amber-900/50 text-white hover:bg-white/10">
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="container py-24">
        <div className="max-w-2xl mx-auto text-white text-center">
          Chargement...
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}

