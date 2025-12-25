import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ScrollToTop } from "@/components/ScrollToTop"
import { LanguageProvider } from "@/lib/LanguageContext"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-serif",
  weight: ["400", "700", "900"]
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mukoma.com'),
  title: {
    default: "L'Art de Diriger sa Nouvelle Année - Philippe Mukoma Weto",
    template: "%s | Philippe Mukoma Weto"
  },
  description: "Découvrez l'ebook 'L'Art de Diriger sa Nouvelle Année' par Philippe Mukoma Weto. Reprenez le contrôle de votre vie, de vos décisions et de votre destinée. Ebook complet PDF + EPUB disponible immédiatement après achat.",
  keywords: [
    "Philippe Mukoma Weto",
    "L'Art de Diriger sa Nouvelle Année",
    "ebook développement personnel",
    "leadership personnel",
    "maîtrise de soi",
    "vision claire",
    "discipline personnelle",
    "pensée gouvernante",
    "ebook PDF EPUB",
    "développement personnel",
    "gestion du temps",
    "prise de décision",
    "spiritualité",
    "alignement avec Dieu"
  ],
  authors: [{ name: "Philippe Mukoma Weto" }],
  creator: "Philippe Mukoma Weto",
  publisher: "Philippe MW Ministries",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Philippe Mukoma Weto",
    title: "L'Art de Diriger sa Nouvelle Année - Philippe Mukoma Weto",
    description: "Reprenez le contrôle de votre vie, de vos décisions et de votre destinée avec l'ebook 'L'Art de Diriger sa Nouvelle Année' par Philippe Mukoma Weto.",
    images: [
      {
        url: "/images/book/cover1.png",
        width: 1200,
        height: 1600,
        alt: "Couverture du livre L'Art de Diriger sa Nouvelle Année",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "L'Art de Diriger sa Nouvelle Année - Philippe Mukoma Weto",
    description: "Reprenez le contrôle de votre vie, de vos décisions et de votre destinée.",
    images: ["/images/book/cover1.png"],
    creator: "@philippemukoma",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "votre-code-verification-google",
    // yandex: "votre-code-verification-yandex",
  },
  alternates: {
    canonical: "/",
  },
  category: "Développement personnel",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mukoma.com'

  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": "L'Art de Diriger sa Nouvelle Année",
    "author": {
      "@type": "Person",
      "name": "Philippe Mukoma Weto",
      "jobTitle": "Pasteur, Président de Philippe MW Ministries",
      "description": "Le Prophète Philippe MUKOMA WETO est le pasteur responsable des églises LA RESTAURATION DES FAMILLES dans le monde."
    },
    "publisher": {
      "@type": "Organization",
      "name": "Philippe MW Ministries"
    },
    "description": "Reprendre le contrôle de sa vie, de ses décisions et de sa destinée. Un guide complet pour développer une vision claire, une discipline personnelle inébranlable et une pensée gouvernante.",
    "bookFormat": "Ebook",
    "inLanguage": "fr",
    "offers": {
      "@type": "Offer",
      "price": "70",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "url": `${siteUrl}/#acheter-ebook`
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Philippe Mukoma Weto",
    "url": siteUrl,
    "description": "Site officiel de Philippe Mukoma Weto - L'Art de Diriger sa Nouvelle Année"
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Philippe MW Ministries",
    "url": siteUrl,
    "logo": `${siteUrl}/images/hero/MUKO.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "contact@mukoma.com"
    }
  }

  return (
    <html lang="fr" className="dark" suppressHydrationWarning>
      <head>
        <link rel="canonical" href={siteUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1a1612" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${inter.className} bg-[#1a1612] text-white`} suppressHydrationWarning>
        <LanguageProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  )
}

