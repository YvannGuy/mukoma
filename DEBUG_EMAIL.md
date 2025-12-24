# Guide de diagnostic - Problème d'envoi d'email

## 🔍 Étapes de diagnostic

### 1. Vérifier les variables d'environnement

Assurez-vous que votre fichier `.env.local` contient :

```env
RESEND_API_KEY=re_...  # Votre clé API Resend
EMAIL_FROM=noreply@yourdomain.com  # Ou onboarding@resend.dev pour les tests
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # Ou votre URL de production
```

### 2. Tester l'envoi d'email directement

1. Lancez le serveur : `npm run dev`
2. Allez sur : `http://localhost:3000/test-email`
3. Entrez votre email
4. Cliquez sur "Envoyer un email de test"
5. Vérifiez le résultat affiché

### 3. Vérifier les logs du serveur

Quand vous testez l'envoi d'email, regardez les logs dans le terminal où tourne `npm run dev`. Vous devriez voir :

```
[EMAIL] Tentative d'envoi à votre@email.com
[EMAIL] RESEND_API_KEY présent: true/false
[EMAIL] EMAIL_FROM: ...
[EMAIL] ✅ Email envoyé avec succès
```

### 4. Vérifier le webhook Stripe

#### En développement local :

1. Installez Stripe CLI : `brew install stripe/stripe-cli/stripe`
2. Connectez-vous : `stripe login`
3. Forwardez les webhooks : `stripe listen --forward-to localhost:3000/api/stripe/webhook`
4. Copiez le `webhook signing secret` (commence par `whsec_`)
5. Ajoutez-le dans `.env.local` : `STRIPE_WEBHOOK_SECRET=whsec_...`

#### En production :

1. Allez sur [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Ajoutez un endpoint : `https://votre-domaine.com/api/stripe/webhook`
3. Sélectionnez l'événement : `checkout.session.completed`
4. Copiez le `Signing secret` et ajoutez-le dans vos variables d'environnement

### 5. Vérifier les logs du webhook

Quand un paiement est effectué, vous devriez voir dans les logs :

```
[WEBHOOK] Tentative d'envoi d'email à votre@email.com
[WEBHOOK] URL de téléchargement: ...
[WEBHOOK] RESEND_API_KEY configuré: true/false
[WEBHOOK] ✅ Email envoyé avec succès
```

### 6. Vérifier votre compte Resend

1. Allez sur [Resend Dashboard](https://resend.com/emails)
2. Vérifiez que les emails sont bien envoyés
3. Vérifiez s'il y a des erreurs (domaine non vérifié, etc.)

### 7. Problèmes courants

#### ❌ "RESEND_API_KEY is not configured"
- **Solution** : Vérifiez que `RESEND_API_KEY` est bien dans `.env.local`
- Redémarrez le serveur après avoir ajouté la variable

#### ❌ "Domain not verified"
- **Solution** : Pour les tests, utilisez `onboarding@resend.dev` comme `EMAIL_FROM`
- En production, vérifiez votre domaine dans Resend

#### ❌ Webhook non reçu
- **Solution** : Vérifiez que `stripe listen` tourne en local
- Vérifiez que `STRIPE_WEBHOOK_SECRET` est correct
- En production, vérifiez que l'URL du webhook est correcte dans Stripe

#### ❌ Email dans les spams
- **Solution** : Vérifiez votre dossier spam
- Utilisez un domaine vérifié pour réduire les risques

## 🧪 Test complet du flux

1. **Test email direct** : `http://localhost:3000/test-email`
2. **Test webhook** : Effectuez un achat de test avec Stripe
3. **Vérifiez les logs** : Regardez les logs du serveur et de Stripe CLI
4. **Vérifiez Resend** : Regardez le dashboard Resend pour voir les emails envoyés

## 📞 Support

Si le problème persiste :
1. Vérifiez tous les logs (serveur, Stripe CLI, Resend)
2. Vérifiez que toutes les variables d'environnement sont correctes
3. Testez avec la page `/test-email` pour isoler le problème

