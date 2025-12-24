import { NextRequest, NextResponse } from "next/server"
import { validateDownloadToken } from "@/lib/tokens"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json(
        { error: "Token requis" },
        { status: 400 }
      )
    }

    // Valider le token
    const validation = validateDownloadToken(token)

    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error || "Token invalide" },
        { status: 400 }
      )
    }

    // URL du PDF (peut être stocké sur un CDN, S3, ou dans public/)
    const pdfPath = process.env.EBOOK_PDF_URL || "/ebook/COVER L'ART DE DIRIGER.pdf"

    // Si c'est une URL externe (http/https), rediriger
    if (pdfPath.startsWith("http")) {
      return NextResponse.redirect(pdfPath)
    } else {
      // Si c'est un chemin local, construire l'URL correctement
      const baseUrl = new URL(request.url).origin
      // Construire l'URL avec le chemin (Next.js gère l'encodage automatiquement)
      const downloadUrl = new URL(pdfPath, baseUrl)
      return NextResponse.redirect(downloadUrl.toString())
    }
  } catch (error: any) {
    console.error("Erreur API download:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    )
  }
}
