import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { createServiceRoleClient } from "@/lib/supabase/server"

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
      const supabase = await createServiceRoleClient()

      // Insérer l'achat dans la table purchases
      const { error: insertError } = await supabase
        .from("purchases")
        .insert({
          stripe_session_id: session.id,
          buyer_email: session.customer_email || session.customer_details?.email || null,
          product_id: session.metadata?.product_id || "ebook-standard",
        })

      if (insertError) {
        console.error("Erreur insertion purchase:", insertError)
        // Ne pas échouer le webhook si c'est un doublon (session déjà traitée)
        if (!insertError.message.includes("duplicate") && !insertError.message.includes("unique")) {
          return NextResponse.json(
            { error: "Failed to record purchase" },
            { status: 500 }
          )
        }
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

