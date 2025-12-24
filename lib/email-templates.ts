/**
 * Templates d'emails réutilisables
 * Utilisez des variables de remplacement comme {variableName}
 */

export interface EmailTemplateVariables {
  firstName?: string
  lastName?: string
  email?: string
  downloadUrl: string
  productName?: string
}

/**
 * Template pour l'email de téléchargement d'ebook
 */
export function getDownloadEmailTemplate(variables: EmailTemplateVariables): string {
  const {
    firstName = '',
    downloadUrl,
    productName = "L'Art de Diriger sa Nouvelle Année"
  } = variables

  const greeting = firstName ? `Bonjour ${firstName},` : 'Bonjour,'

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px;
          background-color: #ffffff;
        }
        .header {
          background: linear-gradient(135deg, #1a1612 0%, #f59e0b 100%);
          color: white;
          padding: 30px 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: bold;
        }
        .content {
          padding: 30px 20px;
        }
        .button { 
          display: inline-block; 
          padding: 14px 28px; 
          background-color: #f59e0b; 
          color: #000; 
          text-decoration: none; 
          border-radius: 6px; 
          font-weight: bold; 
          margin: 20px 0;
          text-align: center;
        }
        .button-container {
          text-align: center;
          margin: 30px 0;
        }
        .info-box {
          background-color: #fff7ed;
          border-left: 4px solid #f59e0b;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .footer { 
          margin-top: 30px; 
          padding-top: 20px; 
          border-top: 1px solid #eee; 
          font-size: 12px; 
          color: #666;
          text-align: center;
        }
        .footer p {
          margin: 5px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Merci pour votre achat !</h1>
        </div>
        <div class="content">
          <p>${greeting}</p>
          <p>Votre achat de l'ebook <strong>"${productName}"</strong> a été confirmé.</p>
          <p>Cliquez sur le bouton ci-dessous pour télécharger votre ebook :</p>
          
          <div class="button-container">
            <a href="${downloadUrl}" class="button">Télécharger mon ebook</a>
          </div>

          <div class="info-box">
            <p><strong>Important :</strong> Ce lien est valide pendant 24 heures et peut être utilisé jusqu'à 5 fois.</p>
          </div>

          <p>Si vous avez des questions ou rencontrez un problème, n'hésitez pas à nous contacter.</p>
        </div>
        <div class="footer">
          <p><strong>Cordialement,</strong></p>
          <p>L'équipe Mukoma</p>
          <p>Philippe Mukoma Weto</p>
        </div>
      </div>
    </body>
    </html>
  `
}

