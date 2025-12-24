"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function TestEmailPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleTest = async () => {
    if (!email) {
      alert("Veuillez entrer un email")
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/test-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return (
      <div className="container py-24">
        <div className="max-w-2xl mx-auto text-white text-center">
          Chargement...
        </div>
      </div>
    )
  }

  return (
    <div className="container py-24">
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#1a1612] border border-amber-900/30 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Test d'envoi d'email</h1>
          <p className="text-white/70 mb-6">
            Testez la configuration de Resend et l'envoi d'emails
          </p>

          <div className="space-y-6">
            <div>
              <label htmlFor="test-email" className="block text-sm font-medium mb-2">
                Adresse email de test
              </label>
              <Input
                id="test-email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && email && !loading) {
                    handleTest()
                  }
                }}
                className="bg-black/30 border-amber-900/50 text-white placeholder:text-white/50 focus:border-amber-400"
                disabled={loading}
              />
            </div>

            <Button
              onClick={handleTest}
              disabled={loading || !email}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Envoi en cours..." : "Envoyer un email de test"}
            </Button>

            {result && (
              <div className={`p-4 rounded-lg ${
                result.success 
                  ? "bg-green-500/10 border border-green-500/30" 
                  : "bg-red-500/10 border border-red-500/30"
              }`}>
                <h3 className="font-semibold mb-2">
                  {result.success ? "✅ Succès" : "❌ Erreur"}
                </h3>
                {result.error && typeof result.error === 'object' && result.error.message && (
                  <div className="mb-3 p-3 bg-red-500/20 rounded text-sm">
                    <strong>Erreur:</strong> {result.error.message}
                  </div>
                )}
                {result.message && (
                  <div className="mb-3 p-3 bg-amber-500/20 rounded text-sm">
                    {result.message}
                  </div>
                )}
                <pre className="text-xs overflow-auto text-white/80">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}

            <div className="mt-6 p-4 bg-amber-900/20 rounded-lg">
              <h4 className="font-semibold mb-2">Vérifications à faire :</h4>
              <ul className="text-sm text-white/70 space-y-1 list-disc list-inside">
                <li>Vérifiez que RESEND_API_KEY est configuré dans .env.local</li>
                <li>Vérifiez que EMAIL_FROM est configuré (ou utilise onboarding@resend.dev)</li>
                <li>Vérifiez les logs du serveur pour plus de détails</li>
                <li>Vérifiez votre boîte de réception et les spams</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

