# Mukoma - Site de vente d'ebook avec Stripe et Supabase

Projet Next.js 15 avec TypeScript, Tailwind CSS, shadcn/ui, Supabase et Stripe Checkout.

## 🚀 Installation

### 1. Cloner et installer les dépendances

```bash
npm install
```

### 2. Configuration Supabase

1. Créez un projet sur [Supabase](https://supabase.com)
2. Allez dans **SQL Editor** et exécutez le contenu de `supabase/schema.sql`
3. Créez un bucket de stockage nommé `ebooks` :
   - Allez dans **Storage** > **Buckets**
   - Créez un nouveau bucket `ebooks`
   - Marquez-le comme **Private**
   - Uploadez votre fichier PDF (`mukoma.pdf`)

4. Récupérez vos clés Supabase :
   - **Settings** > **API**
   - Copiez `Project URL` et `anon public key`
   - Copiez `service_role key` (gardez-la secrète !)

### 3. Configuration Stripe

1. Créez un compte sur [Stripe](https://stripe.com)
2. Récupérez vos clés API :
   - **Developers** > **API keys**
   - Copiez `Publishable key` et `Secret key` (mode test)

3. Configurez les webhooks (pour le développement local) :
   ```bash
   # Installer Stripe CLI
   # macOS: brew install stripe/stripe-cli/stripe
   # Linux/Windows: https://stripe.com/docs/stripe-cli
   
   # Se connecter
   stripe login
   
   # Forwarder les webhooks vers votre serveur local
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
   
   La commande affichera un `webhook signing secret` (commence par `whsec_`). Copiez-le.

### 4. Configuration de l'environnement

1. Copiez `.env.example` vers `.env.local` :
   ```bash
   cp .env.example .env.local
   ```

2. Remplissez les variables dans `.env.local` :
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
   SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key
   
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

### 5. Initialiser shadcn/ui (déjà fait, mais pour référence)

Les composants shadcn/ui sont déjà configurés. Si vous voulez en ajouter d'autres :

```bash
npx shadcn@latest add [component-name]
```

### 6. Lancer le projet

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

## 📁 Structure du projet

```
mukoma/
├── public/
│   ├── images/              # Images statiques du site
│   │   ├── hero/           # Images pour la section hero
│   │   ├── book/           # Images du livre/ebook
│   │   ├── foundation/     # Images pour la page fondation
│   │   ├── icons/          # Icônes
│   │   └── logo/           # Logo du site
│   └── favicon.ico         # Favicon du site
├── app/
│   ├── api/
│   │   ├── stripe/
│   │   │   ├── create-checkout/route.ts    # Création session Stripe
│   │   │   └── webhook/route.ts            # Webhook Stripe
│   │   └── download/route.ts                # Génération lien téléchargement
│   ├── fondation/
│   │   └── page.tsx                         # Page Fondation
│   ├── success/
│   │   └── page.tsx                         # Page succès paiement
│   ├── cancel/
│   │   └── page.tsx                         # Page annulation
│   ├── telechargement/
│   │   └── page.tsx                         # Page téléchargement ebook
│   ├── layout.tsx                           # Layout principal
│   ├── page.tsx                             # Landing page
│   └── globals.css                          # Styles globaux
├── components/
│   ├── ui/                                  # Composants shadcn/ui
│   ├── Header.tsx                           # Header avec navigation
│   └── Footer.tsx                           # Footer
├── lib/
│   ├── supabase/
│   │   ├── client.ts                        # Client Supabase (browser)
│   │   └── server.ts                        # Client Supabase (server)
│   └── utils.ts                             # Utilitaires (cn)
├── supabase/
│   └── schema.sql                           # Schéma SQL Supabase
└── package.json
```

## 🔐 Sécurité

- **RLS activé** : Les utilisateurs ne peuvent voir que leurs propres achats
- **Signed URLs** : Les liens de téléchargement expirent après 5 minutes
- **Limite de téléchargements** : Maximum 5 par jour par achat
- **Service Role** : Utilisé uniquement côté serveur pour les webhooks

## 🧪 Test du flux complet

1. **Achat** :
   - Cliquez sur "Acheter l'ebook" sur la landing page
   - Utilisez la carte de test Stripe : `4242 4242 4242 4242`
   - Date d'expiration : n'importe quelle date future
   - CVC : n'importe quel 3 chiffres

2. **Webhook** :
   - Vérifiez que le webhook Stripe fonctionne (logs dans le terminal où `stripe listen` tourne)
   - L'achat devrait être enregistré dans Supabase

3. **Téléchargement** :
   - Allez sur `/telechargement`
   - Entrez l'email utilisé lors de l'achat
   - Cliquez sur "Accéder à mon ebook"
   - Le lien de téléchargement devrait apparaître

## 📝 Notes importantes

- Le fichier PDF doit être nommé `mukoma.pdf` dans le bucket `ebooks`
- Les webhooks Stripe doivent être configurés en production avec l'URL de votre site
- En production, utilisez les clés Stripe en mode `live` (sans `_test`)
- Les images statiques doivent être placées dans `public/images/`
  - Utilisez le composant `<Image>` de Next.js pour l'optimisation automatique
  - Exemple : `<Image src="/images/book/cover.jpg" alt="..." width={300} height={400} />`

## 🚀 Déploiement

### Vercel (recommandé)

1. Poussez votre code sur GitHub
2. Connectez votre repo à Vercel
3. Ajoutez les variables d'environnement dans Vercel
4. Configurez le webhook Stripe avec l'URL de production

### Variables d'environnement en production

N'oubliez pas de mettre à jour `NEXT_PUBLIC_SITE_URL` avec votre URL de production.

## 📚 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

