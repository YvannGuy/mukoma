import { NextRequest, NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"

const MAX_DOWNLOADS_PER_DAY = 5

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email requis" },
        { status: 400 }
      )
    }

    const supabase = await createServiceRoleClient()

    // Vérifier si l'utilisateur a un achat valide
    const { data: purchase, error: purchaseError } = await supabase
      .from("purchases")
      .select("*")
      .eq("buyer_email", email.toLowerCase())
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (purchaseError || !purchase) {
      return NextResponse.json(
        { error: "Aucun achat trouvé pour cet email" },
        { status: 404 }
      )
    }

    // Vérifier le nombre de téléchargements aujourd'hui
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const { data: downloads, error: downloadLogError } = await supabase
      .from("download_logs")
      .select("*")
      .eq("purchase_id", purchase.id)
      .gte("created_at", today.toISOString())

    if (downloadLogError) {
      console.error("Erreur vérification logs:", downloadLogError)
    }

    const downloadCount = downloads?.length || 0

    if (downloadCount >= MAX_DOWNLOADS_PER_DAY) {
      return NextResponse.json(
        { error: `Limite de ${MAX_DOWNLOADS_PER_DAY} téléchargements par jour atteinte. Réessayez demain.` },
        { status: 429 }
      )
    }

    // Générer un signed URL valide 5 minutes
    const { data: signedUrlData, error: urlError } = await supabase.storage
      .from("ebooks")
      .createSignedUrl("mukoma.pdf", 300) // 5 minutes = 300 secondes

    if (urlError || !signedUrlData) {
      console.error("Erreur génération URL:", urlError)
      return NextResponse.json(
        { error: "Erreur lors de la génération du lien de téléchargement" },
        { status: 500 }
      )
    }

    // Enregistrer le téléchargement
    await supabase
      .from("download_logs")
      .insert({
        purchase_id: purchase.id,
        buyer_email: email.toLowerCase(),
      })

    return NextResponse.json({
      url: signedUrlData.signedUrl,
      expiresIn: 300,
    })
  } catch (error: any) {
    console.error("Erreur API download:", error)
    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    )
  }
}

