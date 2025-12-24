"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Mail } from "lucide-react"

interface EmailModalProps {
  isOpen: boolean
  onClose: () => void
  productId: string
}

export function EmailModal({ isOpen, onClose, productId }: EmailModalProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email) {
      setError("Veuillez entrer votre adresse email")
      return
    }

    if (!validateEmail(email)) {
      setError("Veuillez entrer une adresse email valide")
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("product_id", productId)
      formData.append("email", email)

      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: "Une erreur est survenue" }))
        throw new Error(data.error || "Une erreur est survenue")
      }

      // Récupérer l'URL depuis la réponse JSON
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error("Impossible de rediriger vers le paiement")
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de l'ouverture du paiement")
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-md bg-[#1a1612] border-amber-900/30 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Mail className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <CardTitle className="text-xl">Votre email</CardTitle>
                <CardDescription className="text-white/70">
                  Nous en avons besoin pour vous envoyer votre ebook
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/10"
              aria-label="Fermer"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Adresse email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black/30 border-amber-900/50 text-white placeholder:text-white/50 focus:border-amber-400"
                disabled={loading}
                required
              />
            </div>
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-amber-900/50 text-white hover:bg-white/10"
                disabled={loading}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-semibold"
                disabled={loading}
              >
                {loading ? "Redirection..." : "Continuer vers le paiement"}
              </Button>
            </div>
            <p className="text-xs text-white/60 text-center">
              En continuant, vous serez redirigé vers Stripe pour finaliser votre paiement de manière sécurisée.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

