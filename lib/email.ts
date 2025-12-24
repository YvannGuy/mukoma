import { Resend } from 'resend'

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }
  return new Resend(apiKey)
}

export async function sendDownloadEmail(email: string, downloadUrl: string) {
  try {
    // Utiliser le domaine de test de Resend si aucun domaine n'est configuré ou si c'est gmail.com
    let emailFrom = process.env.EMAIL_FROM || 'onboarding@resend.dev'
    
    // Si l'utilisateur a configuré un email gmail.com, utiliser le domaine de test
    if (emailFrom.includes('@gmail.com') || emailFrom.includes('@yahoo.com') || emailFrom.includes('@hotmail.com')) {
      emailFrom = 'onboarding@resend.dev'
    }
    
    const resend = getResendClient()
    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to: email,
      subject: 'Votre ebook "L\'Art de Diriger sa Nouvelle Année" est prêt !',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .button { display: inline-block; padding: 12px 24px; background-color: #f59e0b; color: #000; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Merci pour votre achat !</h1>
            <p>Bonjour,</p>
            <p>Votre achat de l'ebook <strong>"L'Art de Diriger sa Nouvelle Année"</strong> a été confirmé.</p>
            <p>Cliquez sur le bouton ci-dessous pour télécharger votre ebook :</p>
            <p style="text-align: center;">
              <a href="${downloadUrl}" class="button">Télécharger mon ebook</a>
            </p>
            <p><strong>Important :</strong> Ce lien est valide pendant 24 heures et peut être utilisé jusqu'à 5 fois.</p>
            <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
            <div class="footer">
              <p>Cordialement,<br>L'équipe Mukoma</p>
              <p>Philippe Mukoma Weto</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      let errorMessage: any = error
      if (typeof error === 'object' && error !== null) {
        if ('message' in error && typeof error.message === 'string') {
          errorMessage = error.message
        } else if ('statusCode' in error && (error as any).statusCode === 403) {
          errorMessage = 'Domaine non vérifié. Utilisez "onboarding@resend.dev" pour les tests ou vérifiez votre domaine dans Resend.'
        }
      }
      console.error('Erreur envoi email:', errorMessage)
      return { success: false, error: errorMessage }
    }

    return { success: true, data }
  } catch (error: any) {
    console.error('Erreur envoi email:', error.message)
    return { success: false, error: error.message }
  }
}

