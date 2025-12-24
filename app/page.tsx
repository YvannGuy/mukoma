"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import Image from "next/image"
import { Check, Eye, Crown, Shield, Compass, Book, Lock, Zap } from "lucide-react"
import { ImageSlider } from "@/components/ImageSlider"
import { ImageModal } from "@/components/ImageModal"
import { EmailModal } from "@/components/EmailModal"
import { ScrollAnimation } from "@/components/ScrollAnimation"

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState("ebook-standard")

  return (
    <div className="flex flex-col bg-[#1a1612] text-white min-h-screen">
      {isModalOpen && (
        <ImageModal
          src="/images/book/SIMULATION.jpg"
          alt="Aperçu du livre en 3D"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        productId={selectedProductId}
      />
      {/* Hero Section */}
      <section className="relative container py-24 md:py-32">
        {/* Dégradé de fond */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1612] via-[#1a1612] to-amber-950/20 opacity-100 -z-10"></div>
        <div className="relative grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-[var(--font-serif)] font-bold leading-tight">
              L'Art de Diriger sa{" "}
              <span className="text-amber-400">Nouvelle Année</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed">
              Reprendre le contrôle de sa vie, de ses décisions et de sa destinée
            </p>
            <p className="text-base sm:text-lg text-white/60">
              Par Philippe Mukoma Weto
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Button 
                onClick={() => {
                  setSelectedProductId("ebook-standard")
                  setIsEmailModalOpen(true)
                }}
                size="lg" 
                className="bg-amber-500 hover:bg-amber-600 text-black font-semibold text-lg px-8 py-6"
              >
                Acheter l'ebook
              </Button>
              <Link href="/fondation">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10 text-lg px-8 py-6"
                >
                  Découvrir la Fondation
                </Button>
              </Link>
            </div>
          </div>
          {/* Right side - Book cover slider */}
          <div className="relative">
            <ImageSlider
              images={[
                "/images/hero/COVER L'ART DE DIRIGER-01.jpg",
                "/images/hero/COVER L'ART DE DIRIGER-03.jpg"
              ]}
              alt="Couverture du livre L'Art de Diriger sa Nouvelle Année"
              autoPlay={true}
              interval={4000}
            />
          </div>
        </div>
      </section>

      {/* À qui s'adresse ce livre */}
      <section className="bg-black/30 py-24">
        <div className="container">
          <ScrollAnimation direction="fade">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[var(--font-serif)] font-bold text-center mb-4 px-4">
              À qui s'adresse ce livre
            </h2>
            <p className="text-lg sm:text-xl text-center text-white/70 mb-12 sm:mb-16 max-w-3xl mx-auto px-4">
              Pour ceux qui refusent de subir et choisissent de diriger leur destinée
            </p>
          </ScrollAnimation>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScrollAnimation direction="up" delay={0}>
              <Card className="bg-[#1a1612] border-amber-900/30">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-8 w-8 text-amber-400" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-white">Clarté de vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-center">
                    Développer une vision claire de votre avenir et des étapes pour l'atteindre.
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={100}>
              <Card className="bg-[#1a1612] border-amber-900/30">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                    <Crown className="h-8 w-8 text-amber-400" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-white">Leadership personnel</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-center">
                    Maîtriser l'art de se diriger avant de prétendre diriger les autres.
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={200}>
              <Card className="bg-[#1a1612] border-amber-900/30">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-amber-400" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-white">Discipline intérieure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-center">
                    Forger une discipline qui transforme les intentions en actions concrètes.
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>
            <ScrollAnimation direction="up" delay={300}>
              <Card className="bg-[#1a1612] border-amber-900/30">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                    <Compass className="h-8 w-8 text-amber-400" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-white">Direction spirituelle</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-center">
                    Aligner vos objectifs avec votre mission spirituelle profonde.
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Ce que vous allez découvrir */}
      <section className="container py-24">
        <ScrollAnimation direction="fade">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[var(--font-serif)] font-bold text-center mb-12 sm:mb-16 px-4">
            Ce que vous allez découvrir
          </h2>
        </ScrollAnimation>
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto px-4">
          <ScrollAnimation direction="left" delay={0}>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-amber-400 mb-3">Vision</h3>
              <p className="text-lg text-white/80 leading-relaxed">
                Comment développer une vision claire et inspirante qui guide chacune de vos décisions et transforme votre rapport au temps et aux priorités.
              </p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation direction="right" delay={100}>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-amber-400 mb-3">Maîtrise intérieure</h3>
              <p className="text-lg text-white/80 leading-relaxed">
                Les techniques pour développer une discipline personnelle inébranlable et transformer vos habitudes en forces de réussite.
              </p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation direction="left" delay={200}>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-amber-400 mb-3">Pensée gouvernante</h3>
              <p className="text-lg text-white/80 leading-relaxed">
                Les principes mentaux qui séparent les leaders des suiveurs, et comment cultiver une pensée stratégique au quotidien.
              </p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation direction="right" delay={300}>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-amber-400 mb-3">Alignement avec Dieu</h3>
              <p className="text-lg text-white/80 leading-relaxed">
                Comment harmoniser vos ambitions personnelles avec votre mission spirituelle pour une vie d'impact et de sens profond.
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Aperçu du livre */}
      <section className="bg-black/30 py-24">
        <div className="container">
          <ScrollAnimation direction="up">
            <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Book 3D image */}
            <div className="relative flex justify-center items-center">
              <div 
                className="relative w-full max-w-lg mx-auto cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setIsModalOpen(true)}
              >
                <Image
                  src="/images/book/SIMULATION.jpg"
                  alt="Aperçu du livre en 3D - Cliquez pour agrandir"
                  width={800}
                  height={1200}
                  className="w-full h-auto rounded-lg shadow-2xl"
                  style={{ objectFit: 'contain' }}
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20 rounded-lg">
                  <div className="bg-black/50 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Cliquez pour agrandir
                  </div>
                </div>
              </div>
            </div>
            {/* Right side - Features */}
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-[var(--font-serif)] font-bold">
                Aperçu du livre
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                    <Book className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Format Ebook</h3>
                    <p className="text-white/70">PDF et EPUB compatibles tous appareils</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                    <Lock className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Accès sécurisé</h3>
                    <p className="text-white/70">Téléchargement protégé et personnel</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                    <Zap className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Livraison instantanée</h3>
                    <p className="text-white/70">Accès immédiat après paiement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Offres */}
      <section id="offres" className="container py-24">
          <ScrollAnimation direction="fade">
            <h2 className="text-4xl md:text-5xl font-[var(--font-serif)] font-bold text-center mb-4">
              Offres
            </h2>
            <p className="text-xl text-center text-white/70 mb-16">
              Choisissez votre parcours vers la maîtrise
            </p>
          </ScrollAnimation>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <ScrollAnimation direction="left" delay={0}>
            <Card className="bg-[#1a1612] border-amber-900/30">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white">Ebook seul</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-5xl font-bold text-white">27€</div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-white/80">Ebook complet PDF + EPUB</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-white/80">Accès à vie</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-white/80">Téléchargement immédiat</span>
                </li>
              </ul>
              <Button 
                onClick={() => {
                  setSelectedProductId("ebook-standard")
                  setIsEmailModalOpen(true)
                }}
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-6"
              >
                Acheter maintenant
              </Button>
            </CardContent>
          </Card>
          </ScrollAnimation>
          <ScrollAnimation direction="right" delay={100}>
            <Card className="bg-[#1a1612] border-2 border-amber-400/50 relative">
            <div className="absolute -top-3 right-6">
              <Badge className="bg-amber-500 text-black font-semibold px-3 py-1">
                Recommandé
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-white">Ebook + Soutien Fondation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-5xl font-bold text-white">47€</div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-white/80">Tout de l'offre Ebook</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-white/80">Soutien à la Fondation (20€)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-white/80">Impact social direct</span>
                </li>
              </ul>
              <Button 
                onClick={() => {
                  setSelectedProductId("ebook-bonus")
                  setIsEmailModalOpen(true)
                }}
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-6"
              >
                Acheter et soutenir
              </Button>
            </CardContent>
          </Card>
          </ScrollAnimation>
        </div>
      </section>

      {/* Impact & Fondation */}
      <section className="bg-black/30 py-24">
        <div className="container max-w-4xl">
          <ScrollAnimation direction="fade">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[var(--font-serif)] font-bold text-center mb-4 px-4">
              Impact & Fondation
            </h2>
            <p className="text-lg sm:text-xl text-center text-white/70 mb-12 px-4">
              Votre achat soutient la Fondation Philippe Mukoma et ses actions pour l'éducation et le leadership en Afrique
            </p>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={200}>
            <Card className="bg-[#1a1612] border-amber-900/30">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="relative w-32 h-32 shrink-0">
                  <Image
                    src="/images/foundation/fondation.jpeg"
                    alt="Logo Fondation Philippe Mukoma"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-semibold text-white">Fondation Philippe Mukoma</h3>
                  <p className="text-white/80 leading-relaxed">
                    Notre mission est de former la prochaine génération de leaders africains en leur donnant accès à une éducation de qualité et aux outils de développement personnel nécessaires pour transformer leurs communautés.
                  </p>
                  <Link href="/fondation">
                    <Button 
                      variant="outline" 
                      className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10"
                    >
                      Découvrir nos actions
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          </ScrollAnimation>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <ScrollAnimation direction="fade">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[var(--font-serif)] font-bold text-center mb-12 sm:mb-16">
              Questions fréquentes
            </h2>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={200}>
            <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border-amber-900/30 bg-[#1a1612] rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-amber-400">
                Comment accéder à l'ebook après achat ?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                Après votre achat, vous recevrez un email avec un lien sécurisé pour télécharger votre ebook. Vous pouvez également accéder directement depuis la page de téléchargement en utilisant l'email utilisé lors de l'achat.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-amber-900/30 bg-[#1a1612] rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-amber-400">
                L'ebook est-il compatible avec tous les appareils ?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                Oui, l'ebook est disponible en format PDF et EPUB, compatibles avec tous les appareils : ordinateur, tablette, smartphone et liseuse électronique.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-amber-900/30 bg-[#1a1612] rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-amber-400">
                Puis-je offrir ce livre à quelqu'un ?
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                Chaque achat est personnel et lié à l'email utilisé lors de l'achat. Les liens de téléchargement sont sécurisés et limités pour éviter le partage non autorisé. Pour offrir le livre, vous pouvez effectuer un achat en utilisant l'email du destinataire.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          </ScrollAnimation>
        </div>
      </section>

      {/* CTA Final */}
      <section id="acheter" className="bg-black/30 py-24">
        <div className="container max-w-3xl mx-auto text-center space-y-8">
          <ScrollAnimation direction="fade" delay={0}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[var(--font-serif)] font-bold leading-tight px-4">
              L'année ne décide rien.{" "}
              <span className="text-amber-400">Le maître, c'est toi.</span>
            </h2>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto px-4">
              Ne laissez pas une année de plus passer sans prendre le contrôle de votre destinée. Le moment d'agir, c'est maintenant.
            </p>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={300}>
            <Button 
            onClick={() => {
              setSelectedProductId("ebook-standard")
              setIsEmailModalOpen(true)
            }}
            size="lg" 
            className="bg-amber-500 hover:bg-amber-600 text-black font-semibold text-lg px-12 py-6"
          >
            Acheter maintenant
          </Button>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  )
}
