# Guide d'installation détaillé - Mukoma

Ce guide vous accompagne étape par étape pour configurer votre projet Mukoma.

## Prérequis

- Node.js 18+ installé
- Compte Supabase (gratuit)
- Compte Stripe (gratuit en mode test)
- Git (optionnel)

## Étape 1 : Installation des dépendances

```bash
cd mukoma
npm install
```

## Étape 2 : Configuration Supabase

### 2.1 Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un compte ou connectez-vous
3. Cliquez sur "New Project"
4. Remplissez les informations :
   - **Name** : mukoma (ou votre choix)
   - **Database Password** : choisissez un mot de passe fort (notez-le !)
   - **Region** : choisissez la région la plus proche
5. Attendez la création du projet (2-3 minutes)

### 2.2 Créer les tables et politiques RLS

1. Dans votre projet Supabase, allez dans **SQL Editor**
2. Cliquez sur **New Query**
3. Copiez-collez tout le contenu du fichier `supabase/schema.sql`
4. Cliquez sur **Run** (ou `Cmd/Ctrl + Enter`)
5. Vérifiez qu'il n'y a pas d'erreur dans les résultats

### 2.3 Créer le bucket de stockage

1. Allez dans **Storage** dans le menu de gauche
2. Cliquez sur **New bucket**
3. Configurez :
   - **Name** : `ebooks`
   - **Public bucket** : **DÉSACTIVÉ** (important pour la sécurité)
4. Cliquez sur **Create bucket**

### 2.4 Uploader votre fichier PDF

1. Dans le bucket `ebooks`, cliquez sur **Upload file**
2. Uploadez votre fichier PDF
3. **Important** : Le fichier doit s'appeler exactement `mukoma.pdf`
   - Si votre fichier a un autre nom, renommez-le avant l'upload
   - Ou renommez-le après l'upload dans l'interface Supabase

### 2.5 Récupérer les clés API

1. Allez dans **Settings** > **API**
2. Notez les valeurs suivantes :
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon public** key (commence par `eyJ...`)
   - **service_role** key (commence par `eyJ...`) - **⚠️ GARDEZ-LA SECRÈTE !**

## Étape 3 : Configuration Stripe

### 3.1 Créer un compte Stripe

1. Allez sur [stripe.com](https://stripe.com)
2. Créez un compte (gratuit)
3. Complétez la configuration de votre compte (peut prendre quelques minutes)

### 3.2 Récupérer les clés API

1. Dans le dashboard Stripe, allez dans **Developers** > **API keys**
2. Assurez-vous d'être en **Test mode** (bascule en haut à droite)
3. Notez :
   - **Publishable key** (commence par `pk_test_...`)
   - **Secret key** (commence par `sk_test_...`) - cliquez sur "Reveal test key"

### 3.3 Installer Stripe CLI (pour les webhooks locaux)

**macOS (avec Homebrew) :**
```bash
brew install stripe/stripe-cli/stripe
```

**Linux :**
```bash
# Téléchargez depuis https://github.com/stripe/stripe-cli/releases
# Ou utilisez snap:
snap install stripe
```

**Windows :**
Téléchargez depuis [https://github.com/stripe/stripe-cli/releases](https://github.com/stripe/stripe-cli/releases)

### 3.4 Configurer le webhook local

1. Connectez-vous à Stripe CLI :
```bash
stripe login
```
(Cela ouvrira votre navigateur pour l'authentification)

2. Dans un **nouveau terminal**, démarrez le forward des webhooks :
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

3. **Important** : Cette commande va afficher un `webhook signing secret` qui commence par `whsec_...`
   - **COPIEZ-LE** et gardez ce terminal ouvert pendant le développement
   - Vous en aurez besoin pour `.env.local`

## Étape 4 : Configuration de l'environnement

1. Créez un fichier `.env.local` à la racine du projet :
```bash
cp .env.example .env.local
```

2. Ouvrez `.env.local` et remplissez avec vos valeurs :

```env
# Supabase (remplacez par vos valeurs)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe (remplacez par vos valeurs)
STRIPE_SECRET_KEY=sk_test_51...
STRIPE_WEBHOOK_SECRET=whsec_...  # Celui du terminal stripe listen
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Étape 5 : Lancer le projet

1. Dans un terminal, lancez le serveur de développement :
```bash
npm run dev
```

2. Ouvrez [http://localhost:3000](http://localhost:3000)

3. **Important** : Gardez aussi ouvert le terminal avec `stripe listen` pour que les webhooks fonctionnent

## Étape 6 : Tester le flux complet

### Test d'achat

1. Allez sur [http://localhost:3000](http://localhost:3000)
2. Cliquez sur "Acheter l'ebook"
3. Utilisez les **cartes de test Stripe** :
   - **Numéro** : `4242 4242 4242 4242`
   - **Date d'expiration** : n'importe quelle date future (ex: `12/25`)
   - **CVC** : n'importe quel 3 chiffres (ex: `123`)
   - **Code postal** : n'importe quel code (ex: `12345`)
4. Complétez le paiement

### Vérifier l'enregistrement

1. Dans Supabase, allez dans **Table Editor** > **purchases**
2. Vous devriez voir une nouvelle ligne avec votre achat

### Test de téléchargement

1. Allez sur [http://localhost:3000/telechargement](http://localhost:3000/telechargement)
2. Entrez l'email utilisé lors de l'achat
3. Cliquez sur "Accéder à mon ebook"
4. Le lien de téléchargement devrait apparaître

## Dépannage

### Erreur "Missing stripe-signature header"

- Vérifiez que `stripe listen` tourne dans un terminal
- Vérifiez que `STRIPE_WEBHOOK_SECRET` dans `.env.local` correspond au secret affiché par `stripe listen`

### Erreur "Aucun achat trouvé pour cet email"

- Vérifiez que le webhook a bien fonctionné (regardez les logs dans le terminal `stripe listen`)
- Vérifiez dans Supabase que l'achat est bien dans la table `purchases`
- Vérifiez que l'email utilisé correspond exactement (minuscules/majuscules)

### Erreur "Erreur lors de la génération du lien de téléchargement"

- Vérifiez que le fichier `mukoma.pdf` existe dans le bucket `ebooks`
- Vérifiez que le bucket est bien **privé** (pas public)
- Vérifiez que `SUPABASE_SERVICE_ROLE_KEY` est correct dans `.env.local`

### Le webhook ne fonctionne pas

- Vérifiez que `stripe listen` tourne
- Vérifiez que votre serveur Next.js tourne sur le port 3000
- Vérifiez les logs dans le terminal `stripe listen` pour voir les erreurs

## Prochaines étapes

Une fois que tout fonctionne en local :

1. **Déployer sur Vercel** (recommandé) :
   - Poussez votre code sur GitHub
   - Connectez votre repo à Vercel
   - Ajoutez les variables d'environnement dans Vercel
   - Configurez le webhook Stripe avec l'URL de production

2. **Configurer le webhook Stripe en production** :
   - Dans Stripe Dashboard > **Developers** > **Webhooks**
   - Ajoutez l'URL : `https://votre-domaine.com/api/stripe/webhook`
   - Sélectionnez l'événement : `checkout.session.completed`
   - Récupérez le nouveau `webhook signing secret` et mettez-le dans Vercel

3. **Passer en mode production Stripe** :
   - Dans Stripe, basculez en **Live mode**
   - Récupérez les nouvelles clés API (sans `_test`)
   - Mettez à jour les variables d'environnement dans Vercel

## Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs dans les terminaux (Next.js et Stripe CLI)
2. Vérifiez la console du navigateur (F12)
3. Vérifiez les logs Supabase dans **Logs** > **Postgres Logs**

