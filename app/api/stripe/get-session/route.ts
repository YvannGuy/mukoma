import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { generateDownloadToken } from "@/lib/tokens"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
  typescript: true,
})

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sessionId = searchParams.get("session_id")

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID requis" },
        { status: 400 }
      )
    }

    // Récupérer la session Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    // Récupérer l'email depuis la session
    const email = session.customer_email || 
                  session.customer_details?.email || 
                  session.metadata?.customer_email

    if (!email) {
      return NextResponse.json(
        { error: "Email non trouvé dans la session" },
        { status: 400 }
      )
    }

    // Générer le token de téléchargement (même logique que dans le webhook)
    const token = generateDownloadToken(email, sessionId)
    const downloadUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/telechargement?token=${token}`

    return NextResponse.json({
      session_id: sessionId,
      download_url: downloadUrl,
      email: email,
    })
  } catch (error: any) {
    console.error("Erreur récupération session:", error)
    return NextResponse.json(
      { error: error.message || "Erreur lors de la récupération de la session" },
      { status: 500 }
    )
  }
}

