import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SuccessPage() {
  return (
    <div className="container py-24">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-primary" />
            </div>
            <CardTitle className="text-3xl">Paiement réussi !</CardTitle>
            <CardDescription className="text-lg">
              Merci pour votre achat. Votre ebook est maintenant disponible.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                Vous allez recevoir un email de confirmation avec les instructions pour télécharger votre ebook.
              </p>
              <p className="text-sm text-muted-foreground">
                Vous pouvez également accéder directement à votre téléchargement en utilisant l'email utilisé lors de l'achat.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/telechargement" className="flex-1">
                <Button className="w-full">Télécharger mon ebook</Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full">Retour à l'accueil</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

