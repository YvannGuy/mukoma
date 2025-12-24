import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Target, Eye, Mail } from "lucide-react"

export default function FondationPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="container py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <Badge variant="secondary" className="mb-4">
            Notre engagement
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold">
            La Fondation Mukoma
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Une partie des revenus de chaque achat contribue à des actions concrètes pour un monde meilleur
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-muted/50 py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <Target className="h-12 w-12 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold">Notre Mission</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              La Fondation Mukoma a pour mission de soutenir des projets éducatifs et sociaux qui permettent 
              à chacun d'accéder aux outils du développement personnel et professionnel, indépendamment de 
              ses moyens financiers.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nous croyons que le savoir et la croissance personnelle ne devraient pas être des privilèges, 
              mais des droits accessibles à tous. C'est pourquoi une partie significative des revenus générés 
              par la vente de l'ebook est directement reversée à des initiatives concrètes.
            </p>
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className="container py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Nos Actions
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Heart className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Programmes éducatifs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Financement de programmes de formation et d'éducation dans les communautés défavorisées, 
                permettant l'accès à des ressources de développement personnel.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Target className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Mentorat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Mise en place de programmes de mentorat pour accompagner les jeunes entrepreneurs et 
                professionnels dans leur parcours vers le succès.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Heart className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Initiatives locales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Soutien à des projets locaux qui favorisent l'épanouissement personnel et professionnel 
                dans différentes régions.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Transparence */}
      <section className="bg-muted/50 py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <Eye className="h-12 w-12 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold">Transparence</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nous croyons en la transparence totale. Chaque trimestre, nous publions un rapport détaillé 
              sur l'utilisation des fonds collectés, incluant :
            </p>
            <ul className="space-y-3 text-lg text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Le montant total collecté</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Les projets financés avec détails</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Les résultats et impacts mesurés</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Les frais de fonctionnement (maintenus au minimum)</span>
              </li>
            </ul>
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Dernier rapport trimestriel</CardTitle>
                <CardDescription>Q4 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold">Montant collecté</p>
                    <p className="text-2xl text-primary">12 450€</p>
                  </div>
                  <div>
                    <p className="font-semibold">Projets financés</p>
                    <p className="text-muted-foreground">3 programmes éducatifs dans 2 régions</p>
                  </div>
                  <div>
                    <p className="font-semibold">Bénéficiaires directs</p>
                    <p className="text-muted-foreground">127 personnes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-24">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Rejoignez notre mission
          </h2>
          <p className="text-xl text-muted-foreground">
            Vous pouvez contribuer de plusieurs façons : en achetant l'ebook, en faisant un don direct, 
            ou en nous contactant pour proposer un partenariat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="mailto:fondation@mukoma.com">
                <Mail className="mr-2 h-5 w-5" />
                Nous contacter
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/#acheter">Acheter l'ebook</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}




