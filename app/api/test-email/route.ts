import { NextRequest, NextResponse } from "next/server"
import { sendDownloadEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email requis" },
        { status: 400 }
      )
    }

    // Vérifier les variables d'environnement
    const hasResendKey = !!process.env.RESEND_API_KEY
    let emailFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev'
    
    // Si c'est un domaine public, utiliser le domaine de test
    if (emailFrom.includes('@gmail.com') || emailFrom.includes('@yahoo.com') || emailFrom.includes('@hotmail.com')) {
      emailFrom = 'onboarding@resend.dev'
    }
    
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    // ⚠️ IMPORTANT : Avec onboarding@resend.dev, Resend ne permet d'envoyer qu'à l'email du compte
    // Récupérer l'email du compte depuis les variables d'environnement si disponible
    const accountEmail = process.env.RESEND_ACCOUNT_EMAIL || emailFrom.split('@')[0] + '@gmail.com'
    
    // Si on utilise onboarding@resend.dev, on ne peut envoyer qu'à l'email du compte Resend
    const emailToUse = emailFrom === 'onboarding@resend.dev' ? accountEmail : email

    // Générer un lien de test
    const testToken = "test-token-123"
    const downloadUrl = `${siteUrl}/telechargement?token=${testToken}`

    // Tenter d'envoyer l'email
    const result = await sendDownloadEmail(emailToUse, downloadUrl)

    return NextResponse.json({
      success: result.success,
      error: result.error,
      config: {
        hasResendKey,
        emailFrom,
        siteUrl,
        accountEmail: emailFrom === 'onboarding@resend.dev' ? accountEmail : null,
        emailSentTo: emailToUse,
        note: emailFrom === 'onboarding@resend.dev' 
          ? `Avec onboarding@resend.dev, l'email sera envoyé à ${accountEmail} (email du compte Resend)`
          : null
      },
      message: result.success 
        ? emailFrom === 'onboarding@resend.dev'
          ? `Email envoyé avec succès à ${accountEmail} (email du compte Resend). Vérifiez cette boîte de réception.`
          : "Email envoyé avec succès"
        : `Erreur: ${result.error || "Inconnue"}`
    })
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}

