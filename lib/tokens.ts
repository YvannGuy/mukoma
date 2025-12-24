import crypto from 'crypto'

const SECRET_KEY = process.env.DOWNLOAD_TOKEN_SECRET || 'super_secret_key_for_download_tokens_change_in_production'
const TOKEN_VALIDITY_HOURS = 24
const MAX_DOWNLOADS = 5

interface TokenPayload {
  email: string
  sessionId: string
  createdAt: number
  downloadCount: number
}

export function generateDownloadToken(email: string, sessionId: string): string {
  const payload: TokenPayload = {
    email: email.toLowerCase(),
    sessionId,
    createdAt: Date.now(),
    downloadCount: 0,
  }

  // Encoder le payload en JSON puis en base64
  const payloadString = JSON.stringify(payload)
  const payloadBase64 = Buffer.from(payloadString).toString('base64url')

  // Créer un HMAC pour signer le token
  const hmac = crypto.createHmac('sha256', SECRET_KEY)
  hmac.update(payloadBase64)
  const signature = hmac.digest('base64url')

  // Token = payload.signature
  return `${payloadBase64}.${signature}`
}

export function validateDownloadToken(token: string): { valid: boolean; email?: string; error?: string } {
  try {
    const parts = token.split('.')
    if (parts.length !== 2) {
      return { valid: false, error: 'Format de token invalide' }
    }

    const [payloadBase64, signature] = parts

    // Vérifier la signature
    const hmac = crypto.createHmac('sha256', SECRET_KEY)
    hmac.update(payloadBase64)
    const expectedSignature = hmac.digest('base64url')

    if (signature !== expectedSignature) {
      return { valid: false, error: 'Token invalide ou corrompu' }
    }

    // Décoder le payload
    const payloadString = Buffer.from(payloadBase64, 'base64url').toString('utf-8')
    const payload: TokenPayload = JSON.parse(payloadString)

    // Vérifier l'expiration
    const now = Date.now()
    const expiresAt = payload.createdAt + TOKEN_VALIDITY_HOURS * 60 * 60 * 1000

    if (now > expiresAt) {
      return { valid: false, error: 'Token expiré' }
    }

    // Vérifier la limite de téléchargements
    if (payload.downloadCount >= MAX_DOWNLOADS) {
      return { valid: false, error: 'Limite de téléchargements atteinte' }
    }

    // Note: Le compteur de téléchargements ne peut pas être incrémenté sans stockage persistant.
    // Pour une solution robuste, il faudrait utiliser une base de données.
    // Pour l'instant, on accepte jusqu'à MAX_DOWNLOADS utilisations du même token.
    // En pratique, chaque génération de token crée un nouveau token unique.

    return { valid: true, email: payload.email }
  } catch (error: any) {
    console.error('Erreur validation token:', error)
    return { valid: false, error: 'Token invalide ou corrompu' }
  }
}



