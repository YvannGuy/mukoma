"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function TelechargementPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      if (user?.email) {
        setEmail(user.email)
      }
    })
  }, [])

  const handleDownload = async () => {
    if (!email) {
      setError("Veuillez entrer votre email")
      return
    }

    setLoading(true)
    setError(null)
    setDownloadUrl(null)

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la génération du lien")
      }

      setDownloadUrl(data.url)
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-24">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Télécharger votre ebook</CardTitle>
            <CardDescription>
              Entrez l'email utilisé lors de l'achat pour accéder à votre ebook
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!user && (
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
            )}

            {error && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-lg text-sm">
                {error}
              </div>
            )}

            {downloadUrl ? (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-4">
                    Votre lien de téléchargement est prêt. Il est valide pendant 5 minutes.
                  </p>
                  <a href={downloadUrl} download>
                    <Button className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger l'ebook
                    </Button>
                  </a>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setDownloadUrl(null)
                    setError(null)
                  }}
                >
                  Générer un nouveau lien
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleDownload}
                disabled={loading || !email}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Génération du lien...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Accéder à mon ebook
                  </>
                )}
              </Button>
            )}

            {user && (
              <div className="text-sm text-muted-foreground text-center">
                Connecté en tant que {user.email}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

