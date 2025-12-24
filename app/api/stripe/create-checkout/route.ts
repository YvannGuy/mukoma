import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
  typescript: true,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const productId = formData.get("product_id") as string || "ebook-standard"

    // Prix en centimes (27€ pour standard, 47€ pour bonus)
    const priceMap: Record<string, number> = {
      "ebook-standard": 2700,
      "ebook-bonus": 4700,
    }
    const amount = priceMap[productId] || 2900

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: productId === "ebook-bonus" ? "L'Art de Diriger sa Nouvelle Année - Ebook + Soutien Fondation" : "L'Art de Diriger sa Nouvelle Année - Ebook",
              description: productId === "ebook-bonus" ? "Ebook complet PDF + EPUB + Soutien à la Fondation" : "Ebook complet PDF + EPUB",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
      metadata: {
        product_id: productId,
      },
    })

    return NextResponse.redirect(session.url!, { status: 303 })
  } catch (error: any) {
    console.error("Erreur Stripe:", error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

