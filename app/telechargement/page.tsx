"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Loader2, CheckCircle } from "lucide-react"
import Link from "next/link"

function TelechargementContent() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const token = searchParams.get("token")

  useEffect(() => {
    if (token) {
      handleDownload()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const handleDownload = async () => {
    if (!token) {
      setError("Token manquant dans l'URL")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/download?token=${token}`)

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Erreur lors du téléchargement")
      }

      // Si c'est une redirection, le navigateur suivra automatiquement
      if (response.redirected) {
        window.location.href = response.url
        setSuccess(true)
      } else {
        // Sinon, essayer de télécharger
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "L'Art de Diriger sa Nouvelle Année.pdf"
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        setSuccess(true)
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-24">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-[#1a1612] border-amber-900/30">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Télécharger votre ebook</CardTitle>
            <CardDescription className="text-white/70">
              {token
                ? "Votre lien de téléchargement est prêt"
                : "Entrez le token reçu par email pour accéder à votre ebook"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {success ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-green-400">
                  <CheckCircle className="h-6 w-6" />
                  <p className="text-lg font-semibold">Téléchargement réussi !</p>
                </div>
                <p className="text-white/70">
                  Votre ebook devrait commencer à télécharger. Si ce n'est pas le cas, vérifiez votre dossier de téléchargements.
                </p>
                <Link href="/">
                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">
                    Retour à l'accueil
                  </Button>
                </Link>
              </div>
            ) : error ? (
              <div className="space-y-4">
                <div className="bg-destructive/10 text-destructive p-4 rounded-lg text-sm">
                  {error}
                </div>
                {token && (
                  <Button
                    onClick={handleDownload}
                    disabled={loading}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Téléchargement...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Réessayer
                      </>
                    )}
                  </Button>
                )}
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    Retour à l'accueil
                  </Button>
                </Link>
              </div>
            ) : token ? (
              <div className="space-y-4">
                <Button
                  onClick={handleDownload}
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Préparation du téléchargement...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger l'ebook
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-white/70 text-center">
                  Vous devriez avoir reçu un email avec un lien de téléchargement après votre achat.
                  Cliquez sur le lien dans l'email pour accéder à votre ebook.
                </p>
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    Retour à l'accueil
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function TelechargementPage() {
  return (
    <Suspense fallback={
      <div className="container py-24">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-[#1a1612] border-amber-900/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-amber-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    }>
      <TelechargementContent />
    </Suspense>
  )
}
