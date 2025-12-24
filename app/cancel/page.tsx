import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"
import Link from "next/link"

export default function CancelPage() {
  return (
    <div className="container py-24">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <XCircle className="h-16 w-16 text-destructive" />
            </div>
            <CardTitle className="text-3xl">Paiement annulé</CardTitle>
            <CardDescription className="text-lg">
              Votre paiement a été annulé. Aucun montant n'a été débité.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground text-center">
              Si vous avez rencontré un problème ou si vous souhaitez réessayer, n'hésitez pas à nous contacter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/#acheter" className="flex-1">
                <Button className="w-full">Réessayer</Button>
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

