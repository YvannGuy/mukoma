"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Target, Image as ImageIcon, Mail, X, ChevronLeft, ChevronRight, Play, Video } from "lucide-react"
import Image from "next/image"
import { ImageModal } from "@/components/ImageModal"

// Définir les fichiers en dehors du composant pour éviter les recréations
const imageFiles = [
    "WhatsApp Image 2025-12-25 at 13.16.47 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.16.47.jpeg",
    "WhatsApp Image 2025-12-25 at 13.16.48 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.16.48 (2).jpeg",
    "WhatsApp Image 2025-12-25 at 13.16.48 (3).jpeg",
    "WhatsApp Image 2025-12-25 at 13.16.48 (4).jpeg",
    "WhatsApp Image 2025-12-25 at 13.16.48 (5).jpeg",
    "WhatsApp Image 2025-12-25 at 13.16.48.jpeg",
    "WhatsApp Image 2025-12-25 at 13.16.49.jpeg",
    "WhatsApp Image 2025-12-25 at 13.25.27 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.25.27 (2).jpeg",
    "WhatsApp Image 2025-12-25 at 13.25.27.jpeg",
    "WhatsApp Image 2025-12-25 at 13.25.39 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.25.39 (2).jpeg",
    "WhatsApp Image 2025-12-25 at 13.25.39.jpeg",
    "WhatsApp Image 2025-12-25 at 13.31.41.jpeg",
    "WhatsApp Image 2025-12-25 at 13.31.43.jpeg",
    "WhatsApp Image 2025-12-25 at 13.31.44 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.31.44.jpeg",
    "WhatsApp Image 2025-12-25 at 13.31.45 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.31.45 (2).jpeg",
    "WhatsApp Image 2025-12-25 at 13.31.45.jpeg",
    "WhatsApp Image 2025-12-25 at 13.31.46 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.31.46.jpeg",
    "WhatsApp Image 2025-12-25 at 13.31.47 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.31.47 (2).jpeg",
    "WhatsApp Image 2025-12-25 at 13.31.47.jpeg",
    "WhatsApp Image 2025-12-25 at 13.31.48 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.31.48.jpeg",
    "WhatsApp Image 2025-12-25 at 13.31.49 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.31.49.jpeg",
    "WhatsApp Image 2025-12-25 at 13.31.50 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.31.50.jpeg",
    "WhatsApp Image 2025-12-25 at 13.31.54.jpeg",
    "WhatsApp Image 2025-12-25 at 13.31.57.jpeg",
    "WhatsApp Image 2025-12-25 at 13.31.58 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.31.58.jpeg",
    "WhatsApp Image 2025-12-25 at 13.31.59 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.31.59.jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.00 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.00.jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.01 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.01.jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.02 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.02.jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.03.jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.04 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.04.jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.05 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.05 (2).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.05.jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.06.jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.08.jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.09 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.09.jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.10 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.10.jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.11.jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.12.jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.33 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.33.jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.34 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.34.jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.35 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.35.jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.36 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.36 (2).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.36.jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.37 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.37.jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.38 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.38 (2).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.38 (3).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.38.jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.39.jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.40 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.40.jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.41 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.41 (2).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.41.jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.42 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.42 (2).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.42.jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.43 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.43.jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.44 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.44 (2).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.44.jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.45 (1).jpeg",
    "WhatsApp Image 2025-12-25 at 13.32.45.jpeg",
]

const videoFiles = [
    "WhatsApp Video 2025-12-25 at 13.25.20.mp4",
    "WhatsApp Video 2025-12-25 at 13.25.24.mp4",
    "WhatsApp Video 2025-12-25 at 13.25.26.mp4",
    "WhatsApp Video 2025-12-25 at 13.25.30.mp4",
    "WhatsApp Video 2025-12-25 at 13.25.34.mp4",
    "WhatsApp Video 2025-12-25 at 13.25.36.mp4",
    "WhatsApp Video 2025-12-25 at 13.25.38.mp4",
    "WhatsApp Video 2025-12-25 at 13.25.59.mp4",
]

export default function FondationPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [filter, setFilter] = useState<'all' | 'images' | 'videos'>('all')
  const [itemsToShow, setItemsToShow] = useState(24)

  // Créer un tableau mixte avec type
  const allItems = useMemo(() => {
    const images = imageFiles.map((file, idx) => ({ type: 'image' as const, file, index: idx }))
    const videos = videoFiles.map((file, idx) => ({ type: 'video' as const, file, index: idx + imageFiles.length }))
    return [...images, ...videos]
  }, [])

  const filteredItems = useMemo(() => {
    if (filter === 'all') return allItems
    const typeToFilter = filter === 'images' ? 'image' : 'video'
    return allItems.filter(item => item.type === typeToFilter)
  }, [filter, allItems])

  const displayedItems = filteredItems.slice(0, itemsToShow)
  const hasMore = filteredItems.length > itemsToShow

  const openLightbox = (index: number) => {
    const itemIndex = filteredItems.findIndex((_, i) => i === index)
    setSelectedImageIndex(itemIndex)
  }

  const closeLightbox = () => {
    setSelectedImageIndex(null)
  }

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return
    const newIndex = direction === 'next' 
      ? (selectedImageIndex + 1) % filteredItems.length
      : (selectedImageIndex - 1 + filteredItems.length) % filteredItems.length
    setSelectedImageIndex(newIndex)
  }

  const currentItem = selectedImageIndex !== null ? filteredItems[selectedImageIndex] : null

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

      {/* Galerie */}
      <section className="bg-muted/50 py-24">
        <div className="container">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <ImageIcon className="h-12 w-12 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold">Galerie</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              Découvrez en images et en vidéos les actions concrètes de la Fondation Mukoma. 
              Chaque projet, chaque sourire, chaque moment de partage témoigne de notre engagement 
              à transformer des vies et à créer un impact positif dans les communautés que nous servons.
            </p>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mt-8 justify-center">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => {
                  setFilter('all')
                  setItemsToShow(24)
                }}
                className="gap-2"
              >
                <ImageIcon className="h-4 w-4" />
                Tout ({allItems.length})
              </Button>
              <Button
                variant={filter === 'images' ? 'default' : 'outline'}
                onClick={() => {
                  setFilter('images')
                  setItemsToShow(24)
                }}
                className="gap-2"
              >
                <ImageIcon className="h-4 w-4" />
                Photos ({imageFiles.length})
              </Button>
              <Button
                variant={filter === 'videos' ? 'default' : 'outline'}
                onClick={() => {
                  setFilter('videos')
                  setItemsToShow(24)
                }}
                className="gap-2"
              >
                <Video className="h-4 w-4" />
                Vidéos ({videoFiles.length})
              </Button>
            </div>
            
            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
              {displayedItems.map((item, index) => (
                <div
                  key={`${item.type}-${item.index}`}
                  className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={() => openLightbox(index)}
                >
                  {item.type === 'image' ? (
                    <>
                      <Image
                        src={`/images/found/${item.file}`}
                        alt={`Action de la Fondation ${index + 1}`}
                        fill
                        className="object-cover group-hover:opacity-90 transition-opacity"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </>
                  ) : (
                    <>
                      <video
                        src={`/images/found/${item.file}`}
                        className="w-full h-full object-cover"
                        preload="metadata"
                        muted
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                          <Play className="h-8 w-8 text-white ml-1" fill="white" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  onClick={() => setItemsToShow(itemsToShow + 24)}
                  className="gap-2"
                >
                  Charger plus ({filteredItems.length - itemsToShow} restants)
                </Button>
              </div>
            )}

            {/* Lightbox */}
            {selectedImageIndex !== null && currentItem && (
              <div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
                onClick={closeLightbox}
              >
                <div
                  className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closeLightbox}
                    className="absolute top-4 right-4 z-[10000] bg-black/50 hover:bg-black/70 text-white rounded-full"
                    aria-label="Fermer"
                  >
                    <X className="h-6 w-6" />
                  </Button>

                  {/* Navigation Buttons */}
                  {filteredItems.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigateLightbox('prev')
                        }}
                        className="absolute left-4 z-[10000] bg-black/50 hover:bg-black/70 text-white rounded-full"
                        aria-label="Précédent"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigateLightbox('next')
                        }}
                        className="absolute right-4 z-[10000] bg-black/50 hover:bg-black/70 text-white rounded-full"
                        aria-label="Suivant"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </>
                  )}

                  {/* Counter */}
                  <div className="absolute top-4 left-4 z-[10000] bg-black/50 text-white px-4 py-2 rounded-lg text-sm">
                    {selectedImageIndex + 1} / {filteredItems.length}
                  </div>

                  {/* Content */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    {currentItem.type === 'image' ? (
                      <Image
                        src={`/images/found/${currentItem.file}`}
                        alt={`Action de la Fondation ${selectedImageIndex + 1}`}
                        fill
                        className="object-contain"
                        sizes="90vw"
                        priority
                      />
                    ) : (
                      <video
                        src={`/images/found/${currentItem.file}`}
                        className="max-w-full max-h-[90vh]"
                        controls
                        autoPlay
                        playsInline
                      >
                        Votre navigateur ne supporte pas la lecture de vidéos.
                      </video>
                    )}
                  </div>
                </div>
              </div>
            )}
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





