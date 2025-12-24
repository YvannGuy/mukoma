# Limitations de Resend avec le domaine de test

## ⚠️ Limitation importante

Quand vous utilisez `onboarding@resend.dev` (le domaine de test de Resend), **vous ne pouvez envoyer des emails qu'à l'adresse email associée à votre compte Resend**.

## 🔍 Comment trouver votre email de compte Resend

1. Allez sur [Resend Dashboard](https://resend.com)
2. Connectez-vous avec votre compte
3. L'email affiché dans le coin supérieur droit est votre email de compte
4. C'est généralement l'email que vous avez utilisé pour créer le compte

## ✅ Solutions

### Option 1 : Tester avec votre email de compte (Recommandé pour les tests)

Quand vous testez avec `/test-email`, entrez **votre propre email** (celui de votre compte Resend).

Par exemple, si votre compte Resend est `workgraphicde@gmail.com`, entrez cet email dans le formulaire de test.

### Option 2 : Vérifier votre propre domaine (Recommandé pour la production)

Pour envoyer à n'importe quelle adresse email, vous devez :

1. **Vérifier un domaine dans Resend** :
   - Allez sur [Resend Domains](https://resend.com/domains)
   - Cliquez sur "Add Domain"
   - Entrez votre domaine (ex: `mukoma.com`)
   - Ajoutez les enregistrements DNS demandés
   - Attendez la vérification

2. **Configurer dans `.env.local`** :
   ```env
   EMAIL_FROM=noreply@votre-domaine.com
   ```

3. **Redémarrer le serveur**

## 📝 Configuration recommandée pour les tests

Dans votre `.env.local`, ajoutez :

```env
# Email de votre compte Resend (pour les tests avec onboarding@resend.dev)
RESEND_ACCOUNT_EMAIL=workgraphicde@gmail.com

# Email d'envoi (utilisez onboarding@resend.dev pour les tests)
EMAIL_FROM=onboarding@resend.dev
```

## 🧪 Test du flux complet

1. **Test email** : Utilisez `/test-email` avec votre email de compte Resend
2. **Test achat** : Pour tester un vrai achat, vous devrez soit :
   - Utiliser votre email de compte Resend comme email client
   - Ou vérifier un domaine dans Resend

## 🚀 Production

En production, **vous devez absolument** :
1. Vérifier votre domaine dans Resend
2. Utiliser un email avec votre domaine vérifié
3. Cela permettra d'envoyer à n'importe quelle adresse email

## ❓ FAQ

**Q : Pourquoi je ne peux pas envoyer à d'autres emails avec onboarding@resend.dev ?**
R : C'est une limitation de sécurité de Resend pour éviter l'abus du domaine de test.

**Q : Comment savoir quel email est associé à mon compte Resend ?**
R : C'est l'email que vous avez utilisé pour créer votre compte Resend. Vérifiez dans le dashboard.

**Q : Puis-je utiliser mon propre domaine gratuitement ?**
R : Oui, Resend permet de vérifier un domaine gratuitement. Vous devrez juste configurer les DNS.

