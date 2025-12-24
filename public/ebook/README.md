# Dossier Ebook

Placez votre fichier PDF ici.

## Fichier requis

- **Nom** : `COVER.pdf`
- **Emplacement** : `public/ebook/COVER.pdf`

## Alternative

Si vous préférez héberger le PDF ailleurs (CDN, S3, etc.), configurez la variable d'environnement :

```env
EBOOK_PDF_URL=https://votre-cdn.com/ebook/COVER.pdf
```

## Sécurité

Le PDF n'est accessible que via un token valide généré après un achat réussi. Les tokens sont :
- Valides pendant 24 heures
- Limités à 5 téléchargements maximum
- Générés de manière sécurisée avec crypto

