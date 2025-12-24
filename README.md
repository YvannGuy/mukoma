# Mukoma - Site de vente d'ebook avec Stripe

Projet Next.js 15 avec TypeScript, Tailwind CSS, shadcn/ui et Stripe Checkout.

## 🚀 Installation

### 1. Cloner et installer les dépendances

```bash
npm install
```

### 2. Configuration Stripe

1. Créez un compte sur [Stripe](https://stripe.com)
2. Récupérez vos clés API :
   - **Developers** > **API keys**
   - Copiez `Publishable key` et `Secret key` (mode test)

3. Configurez les webhooks (pour le développement local) :
   ```bash
   # Installer Stripe CLI
   # macOS: brew install stripe/stripe-cli/stripe
   
   # Se connecter
   stripe login
   
   # Forwarder les webhooks vers votre serveur local
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
   
   La commande affichera un `webhook signing secret` (commence par `whsec_`). Copiez-le.

### 3. Configuration Email (Resend)

1. Créez un compte sur [Resend](https://resend.com) (gratuit jusqu'à 3000 emails/mois)
2. Créez une API Key dans **API Keys**
3. Configurez un domaine d'envoi (ou utilisez le domaine de test pour le développement)

### 4. Configuration de l'environnement

1. Copiez `.env.example` vers `.env.local` :
   ```bash
   cp .env.example .env.local
   ```

2. Remplissez les variables dans `.env.local` :
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   
   RESEND_API_KEY=re_...
   EMAIL_FROM=noreply@yourdomain.com
   
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   EBOOK_PDF_URL=/ebook/COVER.pdf
   ```

### 5. Ajouter votre PDF

Placez votre fichier PDF dans `public/ebook/COVER.pdf` ou configurez `EBOOK_PDF_URL` avec une URL externe (CDN, S3, etc.)

### 6. Lancer le projet

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
mukoma/
├── app/
│   ├── api/
│   │   ├── stripe/
│   │   │   ├── create-checkout/route.ts    # Création session Stripe
│   │   │   └── webhook/route.ts            # Webhook Stripe + envoi email
│   │   └── download/route.ts               # Téléchargement avec token
│   ├── success/
│   │   └── page.tsx                         # Page succès (redirige vers accueil)
│   ├── cancel/
│   │   └── page.tsx                         # Page annulation
│   ├── telechargement/
│   │   └── page.tsx                         # Page téléchargement avec token
│   └── ...
├── lib/
│   ├── email.ts                             # Service d'envoi d'email (Resend)
│   └── tokens.ts                            # Gestion des tokens de téléchargement
└── public/
    └── ebook/
        └── COVER.pdf                         # Votre fichier PDF
```

## 🔄 Flux de paiement

1. **Client clique sur "Acheter"** → Redirection vers Stripe Checkout
2. **Paiement réussi** → Redirection vers `/success`
3. **Webhook Stripe** → Génère un token et envoie un email avec le lien
4. **Client reçoit l'email** → Clique sur le lien avec token
5. **Page téléchargement** → Valide le token et télécharge le PDF

## 🔐 Sécurité

- **Tokens sécurisés** : Générés avec crypto, valides 24h, max 5 téléchargements
- **Validation** : Chaque token est vérifié avant téléchargement
- **Expiration** : Tokens automatiquement expirés après 24h

## 📧 Configuration Email

Le système utilise **Resend** pour l'envoi d'emails :
- Gratuit jusqu'à 3000 emails/mois
- Facile à configurer
- Templates HTML supportés

Alternative : Vous pouvez modifier `lib/email.ts` pour utiliser un autre service (SendGrid, Nodemailer, etc.)

## 🧪 Test du flux complet

1. **Achat** :
   - Cliquez sur "Acheter l'ebook"
   - Utilisez la carte de test : `4242 4242 4242 4242`
   - Date d'expiration : n'importe quelle date future
   - CVC : n'importe quel 3 chiffres

2. **Webhook** :
   - Vérifiez que le webhook Stripe fonctionne (logs dans le terminal où `stripe listen` tourne)
   - Un email devrait être envoyé automatiquement

3. **Téléchargement** :
   - Cliquez sur le lien dans l'email reçu
   - Le PDF devrait se télécharger automatiquement

## 📝 Notes importantes

- Le fichier PDF doit être nommé `COVER.pdf` dans `public/ebook/` ou configuré via `EBOOK_PDF_URL`
- Les webhooks Stripe doivent être configurés en production avec l'URL de votre site
- En production, utilisez les clés Stripe en mode `live` (sans `_test`)
- Configurez votre domaine d'envoi dans Resend pour la production

## 🚀 Déploiement

### Vercel (recommandé)

1. Poussez votre code sur GitHub
2. Connectez votre repo à Vercel
3. Ajoutez les variables d'environnement dans Vercel
4. Configurez le webhook Stripe avec l'URL de production

### Variables d'environnement en production

N'oubliez pas de mettre à jour :
- `NEXT_PUBLIC_SITE_URL` avec votre URL de production
- `EMAIL_FROM` avec votre domaine vérifié dans Resend
- Les clés Stripe en mode `live`

## 📚 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Resend Documentation](https://resend.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
