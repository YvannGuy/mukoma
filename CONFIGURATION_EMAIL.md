# Configuration Email avec Resend

## ⚠️ Important : Domaine d'envoi

Resend ne permet **PAS** d'utiliser des domaines publics comme :
- `@gmail.com`
- `@yahoo.com`
- `@hotmail.com`
- `@outlook.com`

## ✅ Solutions

### Option 1 : Utiliser le domaine de test Resend (Recommandé pour les tests)

Dans votre `.env.local`, utilisez :

```env
EMAIL_FROM=onboarding@resend.dev
```

C'est le domaine de test fourni par Resend. **Limitation** : Les emails peuvent aller dans les spams.

### Option 2 : Vérifier votre propre domaine (Recommandé pour la production)

1. Allez sur [Resend Dashboard](https://resend.com/domains)
2. Cliquez sur "Add Domain"
3. Entrez votre domaine (ex: `mukoma.com`)
4. Ajoutez les enregistrements DNS demandés dans votre hébergeur de domaine
5. Attendez la vérification (quelques minutes)
6. Une fois vérifié, utilisez dans `.env.local` :

```env
EMAIL_FROM=noreply@votre-domaine.com
```

## 📝 Configuration complète

Votre `.env.local` devrait contenir :

```env
# Resend API Key (obtenue sur https://resend.com/api-keys)
RESEND_API_KEY=re_...

# Email d'envoi (utilisez onboarding@resend.dev pour les tests)
EMAIL_FROM=onboarding@resend.dev

# URL de votre site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🧪 Test

1. Utilisez la page `/test-email` pour tester l'envoi
2. Vérifiez que `EMAIL_FROM` est bien configuré
3. Si vous utilisez `onboarding@resend.dev`, ça devrait fonctionner immédiatement

## 🚀 Production

En production, **vous devez** :
1. Vérifier votre propre domaine dans Resend
2. Utiliser un email avec votre domaine vérifié
3. Configurer les enregistrements SPF/DKIM pour améliorer la délivrabilité

## ❓ Problèmes courants

### "Domain is not verified"
- **Solution** : Utilisez `onboarding@resend.dev` pour les tests
- Ou vérifiez votre domaine dans Resend Dashboard

### "Email dans les spams"
- Normal avec `onboarding@resend.dev`
- En production avec votre domaine vérifié, la délivrabilité sera meilleure

