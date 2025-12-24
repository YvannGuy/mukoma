# Structure du projet Mukoma

## 📁 Arborescence complète

```
mukoma/
├── app/                          # Next.js App Router
│   ├── api/                      # Routes API
│   │   ├── download/
│   │   │   └── route.ts         # Génération lien téléchargement
│   │   └── stripe/
│   │       ├── create-checkout/
│   │       │   └── route.ts     # Création session Stripe Checkout
│   │       └── webhook/
│   │           └── route.ts     # Webhook Stripe (checkout.session.completed)
│   ├── cancel/
│   │   └── page.tsx             # Page annulation paiement
│   ├── fondation/
│   │   └── page.tsx             # Page Fondation
│   ├── success/
│   │   └── page.tsx             # Page succès paiement
│   ├── telechargement/
│   │   └── page.tsx             # Page téléchargement ebook
│   ├── layout.tsx               # Layout principal (Header + Footer)
│   ├── page.tsx                 # Landing page (accueil)
│   └── globals.css              # Styles globaux Tailwind
│
├── components/                   # Composants React
│   ├── ui/                      # Composants shadcn/ui
│   │   ├── accordion.tsx       # Accordion pour FAQ
│   │   ├── badge.tsx           # Badge
│   │   ├── button.tsx          # Button
│   │   ├── card.tsx             # Card
│   │   └── input.tsx           # Input
│   ├── Header.tsx               # Header avec navigation
│   └── Footer.tsx               # Footer
│
├── lib/                         # Utilitaires et configurations
│   ├── supabase/
│   │   ├── client.ts           # Client Supabase (browser)
│   │   └── server.ts           # Client Supabase (server + service role)
│   └── utils.ts                # Fonction cn() pour Tailwind
│
├── supabase/
│   └── schema.sql              # Schéma SQL (tables + RLS policies)
│
├── middleware.ts                # Middleware Next.js (gestion sessions Supabase)
│
├── .env.example                 # Exemple variables d'environnement
├── .gitignore                   # Fichiers ignorés par Git
├── components.json              # Configuration shadcn/ui
├── INSTALLATION.md              # Guide d'installation détaillé
├── next.config.js               # Configuration Next.js
├── package.json                 # Dépendances npm
├── postcss.config.js           # Configuration PostCSS
├── README.md                    # Documentation principale
├── STRUCTURE.md                # Ce fichier
├── tailwind.config.ts          # Configuration Tailwind
└── tsconfig.json               # Configuration TypeScript
```

## 🔑 Fichiers clés

### Pages principales

- **`app/page.tsx`** : Landing page avec toutes les sections (Hero, À qui s'adresse, Bénéfices, Aperçu, Offres, FAQ, CTA)
- **`app/fondation/page.tsx`** : Page Fondation (Mission, Actions, Transparence)
- **`app/telechargement/page.tsx`** : Page de téléchargement de l'ebook (vérification achat + génération lien)
- **`app/success/page.tsx`** : Page de confirmation après paiement réussi
- **`app/cancel/page.tsx`** : Page d'annulation de paiement

### Routes API

- **`app/api/stripe/create-checkout/route.ts`** : Crée une session Stripe Checkout
- **`app/api/stripe/webhook/route.ts`** : Reçoit les webhooks Stripe et enregistre les achats
- **`app/api/download/route.ts`** : Génère un signed URL pour télécharger l'ebook

### Composants

- **`components/Header.tsx`** : Navigation principale avec auth Supabase
- **`components/Footer.tsx`** : Footer avec liens
- **`components/ui/*`** : Composants shadcn/ui réutilisables

### Configuration Supabase

- **`lib/supabase/client.ts`** : Client pour le navigateur (auth, queries)
- **`lib/supabase/server.ts`** : Client pour le serveur (SSR) + service role
- **`middleware.ts`** : Gère les sessions Supabase sur toutes les routes
- **`supabase/schema.sql`** : Tables (`purchases`, `download_logs`) + RLS policies

## 🔄 Flux de données

### Flux d'achat

1. Utilisateur clique sur "Acheter l'ebook" → `app/page.tsx`
2. Formulaire POST vers `/api/stripe/create-checkout` → `app/api/stripe/create-checkout/route.ts`
3. Redirection vers Stripe Checkout
4. Après paiement, redirection vers `/success` ou `/cancel`
5. Stripe envoie webhook → `/api/stripe/webhook` → `app/api/stripe/webhook/route.ts`
6. Webhook enregistre l'achat dans Supabase (`purchases` table)

### Flux de téléchargement

1. Utilisateur va sur `/telechargement` → `app/telechargement/page.tsx`
2. Utilisateur entre son email (ou est connecté)
3. POST vers `/api/download` → `app/api/download/route.ts`
4. Vérification de l'achat dans `purchases` (par email)
5. Vérification limite de téléchargements (max 5/jour via `download_logs`)
6. Génération signed URL Supabase Storage (valide 5 min)
7. Enregistrement dans `download_logs`
8. Retour du lien à l'utilisateur

## 🔐 Sécurité

### Row Level Security (RLS)

- **`purchases`** : Les utilisateurs ne voient que leurs propres achats
- **`download_logs`** : Les utilisateurs ne voient que leurs propres logs
- Seul le service role peut insérer (via webhook)

### Protection anti-partage

- Signed URLs avec expiration (5 minutes)
- Limite de régénération (5 fois par jour)
- Vérification par email à chaque téléchargement
- Bucket Supabase Storage privé

## 🎨 Design

- **Palette** : Noir/gris + accents amber/orange (primary color)
- **Typographie** : Inter (Google Fonts)
- **Composants** : shadcn/ui (moderne, accessible)
- **Responsive** : Mobile-first avec breakpoints Tailwind

## 📦 Dépendances principales

- **Next.js 15** : Framework React avec App Router
- **Supabase** : Auth + Database + Storage
- **Stripe** : Paiements
- **Tailwind CSS** : Styling
- **shadcn/ui** : Composants UI
- **TypeScript** : Typage statique

## 🚀 Commandes disponibles

```bash
npm run dev      # Démarre le serveur de développement
npm run build    # Build de production
npm run start    # Démarre le serveur de production
npm run lint     # Vérifie le code avec ESLint
```

