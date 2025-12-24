# Configuration des variables d'environnement

## ⚠️ Erreur actuelle

Vous voyez cette erreur car les variables d'environnement Supabase ne sont pas configurées.

## 🔧 Solution rapide

1. **Vérifiez que le fichier `.env.local` existe** :
```bash
ls -la .env.local
```

2. **Si le fichier n'existe pas, créez-le** :
```bash
cp .env.example .env.local
```

3. **Ouvrez `.env.local` et remplissez les valeurs** :

```env
# Supabase - OBLIGATOIRE
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key_ici
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key_ici

# Stripe - OBLIGATOIRE pour les paiements
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📝 Comment obtenir les clés Supabase

1. Allez sur [supabase.com](https://supabase.com) et connectez-vous
2. Créez un projet ou sélectionnez un projet existant
3. Allez dans **Settings** > **API**
4. Copiez :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ gardez-la secrète !)

## 📝 Comment obtenir les clés Stripe

1. Allez sur [stripe.com](https://stripe.com) et connectez-vous
2. Allez dans **Developers** > **API keys**
3. Assurez-vous d'être en **Test mode**
4. Copiez :
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** → `STRIPE_SECRET_KEY` (cliquez sur "Reveal")

Pour le webhook secret, utilisez Stripe CLI :
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
Copiez le `whsec_...` affiché.

## ✅ Vérification

Après avoir rempli `.env.local`, **redémarrez le serveur** :

```bash
# Arrêtez le serveur (Ctrl+C)
npm run dev
```

L'erreur devrait disparaître !

## 🚨 Mode développement temporaire

Si vous voulez juste voir le design sans configurer Supabase pour l'instant, le middleware a été modifié pour ne pas bloquer en développement. Cependant, certaines fonctionnalités (auth, téléchargement) ne fonctionneront pas sans les vraies clés.

