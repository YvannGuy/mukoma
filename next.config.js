const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Spécifie explicitement le répertoire racine pour éviter les avertissements de lockfiles multiples
  outputFileTracingRoot: path.join(__dirname),
  images: {
    // Domaines externes autorisés pour les images (si vous utilisez des images externes)
    domains: [],
    // Formats d'images supportés
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig

