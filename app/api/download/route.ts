import { NextRequest, NextResponse } from "next/server"
import { validateDownloadToken } from "@/lib/tokens"
import { readFile, access } from "fs/promises"
import { join } from "path"
import { constants } from "fs"

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

    // Si EBOOK_PDF_URL est une URL externe (http/https), rediriger
    if (process.env.EBOOK_PDF_URL && process.env.EBOOK_PDF_URL.startsWith("http")) {
      return NextResponse.redirect(process.env.EBOOK_PDF_URL)
    }

    // Nom du fichier PDF dans public/ebook/
    // Par défaut: COVER.pdf, peut être surchargé via EBOOK_PDF_URL
    const pdfFileName = process.env.EBOOK_PDF_URL 
      ? (process.env.EBOOK_PDF_URL.split("/").pop() || "COVER.pdf")
      : "COVER.pdf"

    // Si c'est un chemin local, lire le fichier depuis public/ebook/
    try {
      const filePath = join(process.cwd(), "public", "ebook", pdfFileName)
      
      // Vérifier que le fichier existe avant de le lire
      try {
        await access(filePath, constants.F_OK)
      } catch (accessError) {
        // Essayer avec un chemin alternatif
        const altPath = join(__dirname, "../../../public/ebook", pdfFileName)
        try {
          await access(altPath, constants.F_OK)
          const fileBuffer = await readFile(altPath)
          return new NextResponse(fileBuffer, {
            headers: {
              "Content-Type": "application/pdf",
              "Content-Disposition": `attachment; filename="${encodeURIComponent(pdfFileName)}"`,
              "Content-Length": fileBuffer.length.toString(),
            },
          })
        } catch (altError) {
          throw accessError // Utiliser l'erreur originale
        }
      }
      
      const fileBuffer = await readFile(filePath)

      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${encodeURIComponent(pdfFileName)}"`,
          "Content-Length": fileBuffer.length.toString(),
        },
      })
    } catch (fileError: any) {
      console.error("[DOWNLOAD] Erreur lecture fichier:", fileError.message)
      return NextResponse.json(
        { error: `Fichier non trouvé: ${fileError.message}` },
        { status: 404 }
      )
    }
  } catch (error: any) {
    console.error("Erreur API download:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    )
  }
}
