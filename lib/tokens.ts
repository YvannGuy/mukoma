import crypto from 'crypto'

// Stockage en mémoire (en production, utilisez Redis ou une base de données)
const downloadTokens = new Map<string, { email: string; expiresAt: number; downloadCount: number }>()

const TOKEN_VALIDITY_HOURS = 24
const MAX_DOWNLOADS = 5

export function generateDownloadToken(email: string, sessionId: string): string {
  const token = crypto
    .createHash('sha256')
    .update(`${email}-${sessionId}-${Date.now()}-${crypto.randomBytes(16).toString('hex')}`)
    .digest('hex')
    .substring(0, 32)

  const expiresAt = Date.now() + TOKEN_VALIDITY_HOURS * 60 * 60 * 1000

  downloadTokens.set(token, {
    email: email.toLowerCase(),
    expiresAt,
    downloadCount: 0,
  })

  // Nettoyer les tokens expirés (simple cleanup)
  cleanupExpiredTokens()

  return token
}

export function validateDownloadToken(token: string): { valid: boolean; email?: string; error?: string } {
  const tokenData = downloadTokens.get(token)

  if (!tokenData) {
    return { valid: false, error: 'Token invalide' }
  }

  if (Date.now() > tokenData.expiresAt) {
    downloadTokens.delete(token)
    return { valid: false, error: 'Token expiré' }
  }

  if (tokenData.downloadCount >= MAX_DOWNLOADS) {
    return { valid: false, error: 'Limite de téléchargements atteinte' }
  }

  // Incrémenter le compteur
  tokenData.downloadCount++
  downloadTokens.set(token, tokenData)

  return { valid: true, email: tokenData.email }
}

function cleanupExpiredTokens() {
  const now = Date.now()
  for (const [token, data] of downloadTokens.entries()) {
    if (now > data.expiresAt) {
      downloadTokens.delete(token)
    }
  }
}



