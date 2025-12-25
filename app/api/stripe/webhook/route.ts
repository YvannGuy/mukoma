import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { generateDownloadToken } from "@/lib/tokens"
import { sendDownloadEmail } from "@/lib/email"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
  typescript: true,
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message)
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      // Récupérer l'email depuis customer_email, customer_details, ou metadata
      const email = session.customer_email || 
                    session.customer_details?.email || 
                    session.metadata?.customer_email

      if (!email) {
        console.error("Aucun email trouvé dans la session Stripe", {
          customer_email: session.customer_email,
          customer_details: session.customer_details,
          metadata: session.metadata
        })
        return NextResponse.json(
          { error: "No email found in session" },
          { status: 400 }
        )
      }

      // Générer un token de téléchargement
      const token = generateDownloadToken(email, session.id)

      // Créer l'URL de téléchargement
      const downloadUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/telechargement?token=${token}`

      // Envoyer l'email avec le lien de téléchargement
      try {
        const emailResult = await sendDownloadEmail(email, downloadUrl)
        if (!emailResult.success) {
          console.error("[WEBHOOK] Erreur envoi email:", emailResult.error)
        }
      } catch (emailError: any) {
        console.error("[WEBHOOK] Exception envoi email:", emailError.message)
      }
    } catch (error: any) {
      console.error("Erreur traitement webhook:", error)
      return NextResponse.json(
        { error: "Webhook processing failed" },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ received: true })
}
