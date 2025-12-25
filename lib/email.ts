import { Resend } from 'resend'
import { getDownloadEmailTemplate, EmailTemplateVariables } from './email-templates'

/**
 * Crée et retourne une instance du client Resend
 */
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }
  return new Resend(apiKey)
}

/**
 * Détermine l'adresse email d'expéditeur à utiliser
 * Gère automatiquement les domaines publics non vérifiés
 */
function getEmailFrom(): string {
  let emailFrom = process.env.EMAIL_FROM || 'workgraphicde@gmail.com'
  
  // Si l'utilisateur a configuré un email avec un domaine public, utiliser le domaine de test
  if (emailFrom.includes('@gmail.com') || 
      emailFrom.includes('@yahoo.com') || 
      emailFrom.includes('@hotmail.com')) {
    return 'workgraphicde@gmail.com'
  }
  
  return emailFrom
}

/**
 * Envoie un email avec le lien de téléchargement de l'ebook
 * 
 * @param email - Adresse email du destinataire
 * @param downloadUrl - URL sécurisée de téléchargement
 * @param options - Options supplémentaires (firstName, lastName, productName)
 * @returns Résultat de l'envoi avec success/error
 */
export async function sendDownloadEmail(
  email: string, 
  downloadUrl: string,
  options?: {
    firstName?: string
    lastName?: string
    productName?: string
  }
) {
  try {
    const emailFrom = getEmailFrom()
    
    // Préparer les variables pour le template
    const templateVariables: EmailTemplateVariables = {
      email,
      downloadUrl,
      firstName: options?.firstName,
      lastName: options?.lastName,
      productName: options?.productName || "L'Art de Diriger sa Nouvelle Année"
    }
    
    // Générer le contenu HTML à partir du template
    const htmlContent = getDownloadEmailTemplate(templateVariables)
    
    // Envoyer l'email via Resend
    const resend = getResendClient()
    const { data, error } = await resend.emails.send({
      from: emailFrom,
      to: email,
      subject: `Votre ebook "${templateVariables.productName}" est prêt !`,
      html: htmlContent,
    })

    if (error) {
      console.error('[EMAIL] Erreur Resend:', error)
      let errorMessage: any = error
      if (typeof error === 'object' && error !== null) {
        if ('message' in error && typeof error.message === 'string') {
          errorMessage = error.message
        } else if ('statusCode' in error && (error as any).statusCode === 403) {
          errorMessage = 'Domaine non vérifié. Utilisez "onboarding@resend.dev" pour les tests ou vérifiez votre domaine dans Resend.'
        }
      }
      return { success: false, error: errorMessage }
    }

    return { success: true, data }
  } catch (error: any) {
    console.error('[EMAIL] Exception lors de l\'envoi:', error.message)
    return { success: false, error: error.message }
  }
}

