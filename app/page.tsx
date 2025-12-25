"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import Image from "next/image"
import { Check, Eye, Crown, Shield, Compass, Book, Lock, Zap, ChevronDown } from "lucide-react"
import { ImageSlider } from "@/components/ImageSlider"
import { ImageModal } from "@/components/ImageModal"
import { EmailModal } from "@/components/EmailModal"
import { ScrollAnimation } from "@/components/ScrollAnimation"
import { useLanguage } from "@/lib/LanguageContext"

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState("ebook-standard")
  const { t } = useLanguage()

  // Fonction pour scroller vers la section suivante
  const scrollToNextSection = (currentSectionId: string) => {
    const sections = [
      'hero',
      'qui-sadresse',
      'decouvrir',
      'offres',
      'acheter-ebook',
      'impact',
      'faq',
      'acheter'
    ]
    const currentIndex = sections.indexOf(currentSectionId)
    if (currentIndex < sections.length - 1) {
      const nextSectionId = sections[currentIndex + 1]
      const nextSection = document.querySelector(`#${nextSectionId}`) || 
                         document.querySelector(`section:nth-of-type(${currentIndex + 2})`)
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  // Composant Chevron réutilisable
  const SectionChevron = ({ sectionId }: { sectionId: string }) => (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
      <button
        onClick={() => scrollToNextSection(sectionId)}
        className="flex flex-col items-center text-amber-400/80 hover:text-amber-400 transition-colors cursor-pointer group"
        aria-label={t('chevron.ariaLabel')}
      >
        <ChevronDown className="h-8 w-8 animate-bounce" style={{ animationDuration: '2s' }} />
        <ChevronDown className="h-6 w-6 animate-bounce" style={{ marginTop: '-12px', animationDuration: '2s', animationDelay: '0.2s' }} />
      </button>
    </div>
  )

  return (
    <div className="flex flex-col bg-[#1a1612] text-white min-h-screen overflow-x-hidden">
      <ImageModal
        src="/images/book/SIMULATION.jpg"
        alt="Aperçu du livre en 3D"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        productId={selectedProductId}
      />
      {/* Hero Section */}
      <section id="hero" className="relative pt-20 md:pt-24 pb-0 overflow-visible min-h-[90vh]">
        {/* Dégradé de fond */}
        <div className="absolute inset-0 opacity-100 -z-10" style={{ background: 'radial-gradient(circle at 50% 30%, #2d2823 0%, #1a1612 40%, #1a1612 100%)' }}></div>
        <div className="container relative z-10">
          <div className="relative grid md:grid-cols-2 gap-12 items-start md:items-end">
            {/* Left side - Text content */}
            <div className="space-y-6 pb-24 md:pb-32 pt-8 md:pt-24 relative z-20">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-[var(--font-serif)] font-bold leading-tight">
                {t('hero.title')}{" "}
                <span className="text-amber-400">{t('hero.titleHighlight')}</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed whitespace-pre-line">
                {t('hero.subtitle')}
              </p>
              <p className="text-base sm:text-lg text-white/60">
                {t('hero.author')}
              </p>
              <div className="pt-2 px-4 sm:px-0">
                <div className="w-full max-w-[420px] mx-auto space-y-3 sm:space-y-0 sm:flex sm:gap-4 md:mx-0 md:max-w-none md:justify-start">
                  <Button 
                    onClick={() => {
                      setSelectedProductId("ebook-standard")
                      setIsEmailModalOpen(true)
                    }}
                    size="lg" 
                    className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-black font-semibold text-lg px-8 py-6"
                  >
                    {t('hero.buyEbook')}
                  </Button>
                  <Link href="/fondation" className="block w-full sm:w-auto">
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="w-full sm:w-auto border-amber-400/50 text-amber-400 hover:bg-amber-400/10 text-lg px-8 py-6"
                    >
                      {t('hero.discoverFoundation')}
                    </Button>
                  </Link>
                </div>
              </div>
              {/* Mobile - Book cover */}
              <div className="md:hidden mt-8 flex justify-center">
                <div className="relative w-full max-w-[420px] h-[520px] overflow-hidden rounded-lg">
                  <Image
                    src="/images/book/cover1.png"
                    alt="Couverture du livre L'Art de Diriger sa Nouvelle Année"
                    fill
                    className="object-cover scale-[1.18] drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Desktop - Right side - Book cover - très grande et débordante */}
        <div className="hidden md:flex absolute right-0 top-0 bottom-0 w-[55vw] lg:w-[50vw] items-end justify-end pr-0" style={{ zIndex: 1 }}>
          <div className="relative w-full h-full flex items-end justify-center">
            <Image
              src="/images/book/cover1.png"
              alt="Couverture du livre L'Art de Diriger sa Nouvelle Année"
              width={4000}
              height={6000}
              className="h-[120vh] w-auto rounded-lg"
              style={{ 
                objectFit: 'contain',
                maxWidth: 'none',
                transform: 'translateY(20%)'
              }}
              priority
            />
          </div>
        </div>
        <SectionChevron sectionId="hero" />
      </section>

      {/* À qui s'adresse ce livre */}
      <section id="qui-sadresse" className="relative bg-black/30 py-24">
        <div className="container">
          <ScrollAnimation direction="fade">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[var(--font-serif)] font-bold text-center mb-4 px-4">
              {t('sections.whoIsItFor.title')}
            </h2>
            <p className="text-lg sm:text-xl text-center text-white/70 mb-12 sm:mb-16 max-w-3xl mx-auto px-4">
              {t('sections.whoIsItFor.subtitle')}
            </p>
          </ScrollAnimation>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScrollAnimation direction="up" delay={0}>
              <Card className="bg-[#1a1612] border-amber-900/30">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                    <Eye className="h-8 w-8 text-amber-400" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-white">{t('cards.clarity.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-center">
                    {t('cards.clarity.description')}
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
                  <CardTitle className="text-xl font-semibold text-white">{t('cards.leadership.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-center">
                    {t('cards.leadership.description')}
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
                  <CardTitle className="text-xl font-semibold text-white">{t('cards.discipline.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-center">
                    {t('cards.discipline.description')}
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
                  <CardTitle className="text-xl font-semibold text-white">{t('cards.direction.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-center">
                    {t('cards.direction.description')}
                  </p>
                </CardContent>
              </Card>
            </ScrollAnimation>
          </div>
        </div>
        <SectionChevron sectionId="qui-sadresse" />
      </section>

      {/* Ce que vous allez découvrir */}
      <section id="decouvrir" className="relative container py-24">
        <ScrollAnimation direction="fade">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-[var(--font-serif)] font-bold text-center mb-12 sm:mb-16 px-4">
            {t('sections.whatYouWillDiscover.title')}
          </h2>
        </ScrollAnimation>
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto px-4">
          <ScrollAnimation direction="left" delay={0}>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-amber-400 mb-3">{t('features.vision.title')}</h3>
              <p className="text-lg text-white/80 leading-relaxed">
                {t('features.vision.description')}
              </p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation direction="right" delay={100}>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-amber-400 mb-3">{t('features.mastery.title')}</h3>
              <p className="text-lg text-white/80 leading-relaxed">
                {t('features.mastery.description')}
              </p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation direction="left" delay={200}>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-amber-400 mb-3">{t('features.thinking.title')}</h3>
              <p className="text-lg text-white/80 leading-relaxed">
                {t('features.thinking.description')}
              </p>
            </div>
          </ScrollAnimation>
          <ScrollAnimation direction="right" delay={300}>
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold text-amber-400 mb-3">{t('features.alignment.title')}</h3>
              <p className="text-lg text-white/80 leading-relaxed">
                {t('features.alignment.description')}
              </p>
            </div>
          </ScrollAnimation>
        </div>
        <SectionChevron sectionId="decouvrir" />
      </section>

      {/* Aperçu du livre */}
      <section id="offres" className="relative bg-black/30 py-24">
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
                {t('sections.bookPreview.title')}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                    <Book className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{t('bookFeatures.format.title')}</h3>
                    <p className="text-white/70">{t('bookFeatures.format.description')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                    <Lock className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{t('bookFeatures.secure.title')}</h3>
                    <p className="text-white/70">{t('bookFeatures.secure.description')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                    <Zap className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{t('bookFeatures.instant.title')}</h3>
                    <p className="text-white/70">{t('bookFeatures.instant.description')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </ScrollAnimation>
        </div>
        <SectionChevron sectionId="offres" />
      </section>

      {/* Offres */}
      <section id="acheter-ebook" className="relative container py-24">
        <ScrollAnimation direction="fade">
          <h2 className="text-4xl md:text-5xl font-[var(--font-serif)] font-bold text-center mb-4">
            {t('sections.ebook.title')}
          </h2>
          <p className="text-xl text-center text-white/70 mb-12">
            {t('sections.ebook.subtitle')}
          </p>
        </ScrollAnimation>
        <div className="grid md:grid-cols-2 gap-12 items-stretch max-w-5xl mx-auto mb-12">
          {/* Left side - Book cover slider */}
          <ScrollAnimation direction="left" delay={0}>
            <ImageSlider
              images={[
                "/images/hero/COVER L'ART DE DIRIGER-01.jpg",
                "/images/hero/COVER L'ART DE DIRIGER-03.jpg"
              ]}
              alt="Couverture du livre L'Art de Diriger sa Nouvelle Année"
              autoPlay={true}
              interval={4000}
              enableZoom={true}
            />
          </ScrollAnimation>
          {/* Right side - Pricing card */}
          <ScrollAnimation direction="right" delay={100}>
            <div className="relative w-full h-full flex flex-col max-w-md mx-auto md:mx-0">
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-lg opacity-20 blur-sm"></div>
              
              <Card className="relative bg-gradient-to-br from-[#1a1612] via-[#2d2823] to-[#1a1612] border-2 border-amber-400/60 w-full h-full flex flex-col shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 hover:border-amber-400/80">
                <CardHeader className="flex-shrink-0 pb-4">
                  <div className="flex items-center justify-center mb-2">
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-400/30 px-4 py-1 text-sm font-semibold">
                      ⭐ Offre complète
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-semibold text-white text-center">{t('sections.ebook.cardTitle')}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-8 flex-1 flex flex-col justify-between pt-6 pb-8">
                  {/* Price section */}
                  <div className="text-center space-y-2">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 leading-none">{t('sections.ebook.price')}</span>
                      <span className="text-4xl font-bold text-amber-500 ml-1">€</span>
                    </div>
                    <p className="text-sm text-white/50">TTC</p>
                  </div>
                  
                  {/* Features list */}
                  <div className="space-y-4 py-6 border-y border-amber-900/30">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-4 group">
                        <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-500/30 transition-colors">
                          <Check className="h-4 w-4 text-amber-400" />
                        </div>
                        <span className="text-white/90 text-base leading-relaxed">{t('sections.ebook.features.format')}</span>
                      </li>
                      <li className="flex items-start gap-4 group">
                        <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-500/30 transition-colors">
                          <Check className="h-4 w-4 text-amber-400" />
                        </div>
                        <span className="text-white/90 text-base leading-relaxed">{t('sections.ebook.features.lifetime')}</span>
                      </li>
                      <li className="flex items-start gap-4 group">
                        <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-500/30 transition-colors">
                          <Check className="h-4 w-4 text-amber-400" />
                        </div>
                        <span className="text-white/90 text-base leading-relaxed">{t('sections.ebook.features.instant')}</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* CTA Button */}
                  <Button 
                    onClick={() => {
                      setSelectedProductId("ebook-standard")
                      setIsEmailModalOpen(true)
                    }}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-lg py-7 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    {t('sections.ebook.buyNow')}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </ScrollAnimation>
        </div>
        <SectionChevron sectionId="acheter-ebook" />
      </section>

      {/* Impact & Fondation */}
      <section id="impact" className="relative bg-black/30 py-24">
        <div className="container max-w-4xl">
          <ScrollAnimation direction="fade">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[var(--font-serif)] font-bold text-center mb-4 px-4">
              {t('sections.impact.title')}
            </h2>
            <p className="text-lg sm:text-xl text-center text-white/70 mb-12 px-4">
              {t('sections.impact.subtitle')}
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
                  <h3 className="text-2xl font-semibold text-white">{t('foundation.title')}</h3>
                  <p className="text-white/80 leading-relaxed">
                    {t('foundation.description')}
                  </p>
                  <Link href="/fondation">
                    <Button 
                      variant="outline" 
                      className="border-amber-400/50 text-amber-400 hover:bg-amber-400/10"
                    >
                      {t('foundation.discover')}
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          </ScrollAnimation>
        </div>
        <SectionChevron sectionId="impact" />
      </section>

      {/* FAQ */}
      <section id="faq" className="relative container py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <ScrollAnimation direction="fade">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-[var(--font-serif)] font-bold text-center mb-12 sm:mb-16">
              {t('sections.faq.title')}
            </h2>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={200}>
            <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border-amber-900/30 bg-[#1a1612] rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-amber-400">
                {t('faq.q1.question')}
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                {t('faq.q1.answer')}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-amber-900/30 bg-[#1a1612] rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-amber-400">
                {t('faq.q2.question')}
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                {t('faq.q2.answer')}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-amber-900/30 bg-[#1a1612] rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-amber-400">
                {t('faq.q3.question')}
              </AccordionTrigger>
              <AccordionContent className="text-white/70">
                {t('faq.q3.answer')}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          </ScrollAnimation>
        </div>
        <SectionChevron sectionId="faq" />
      </section>

      {/* CTA Final */}
      <section id="acheter" className="bg-black/30 py-24">
        <div className="container max-w-3xl mx-auto text-center space-y-8">
          <ScrollAnimation direction="fade" delay={0}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[var(--font-serif)] font-bold leading-tight px-4">
              {t('sections.cta.title')}{" "}
              <span className="text-amber-400">{t('sections.cta.titleHighlight')}</span>
            </h2>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto px-4">
              {t('sections.cta.subtitle')}
            </p>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={300}>
            <Button 
            onClick={() => {
              const ebookSection = document.querySelector('#acheter-ebook')
              if (ebookSection) {
                ebookSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            size="lg" 
            className="bg-amber-500 hover:bg-amber-600 text-black font-semibold text-lg px-12 py-6"
          >
            {t('sections.ebook.buyNow')}
          </Button>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  )
}