# Guide de Diagnostic - Problèmes de Téléchargement et Email

## Problème 1 : "Fichier non trouvé"

### Vérifications à faire :

1. **Vérifier que le fichier existe** :
   ```bash
   ls -la public/ebook/
   ```
   Le fichier doit s'appeler exactement : `COVER L'ART DE DIRIGER.pdf`

2. **Vérifier les logs du serveur** :
   Quand vous essayez de télécharger, regardez les logs dans le terminal où `npm run dev` tourne.
   Vous devriez voir :
   ```
   [DOWNLOAD] Tentative de lecture du fichier: /chemin/vers/public/ebook/COVER L'ART DE DIRIGER.pdf
   [DOWNLOAD] Nom du fichier: COVER L'ART DE DIRIGER.pdf
   ```

3. **Si le fichier n'est pas trouvé** :
   - Vérifiez que le nom du fichier correspond exactement (majuscules/minuscules, apostrophe)
   - Vérifiez que le fichier est bien dans `public/ebook/`

## Problème 2 : Aucun email n'arrive

### Vérifications à faire :

1. **Vérifier les variables d'environnement** dans `.env.local` :
   ```env
   RESEND_API_KEY=re_...
   EMAIL_FROM=onboarding@resend.dev
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

2. **Vérifier que le webhook Stripe est configuré** :
   - En développement local : utilisez `stripe listen --forward-to localhost:3000/api/stripe/webhook`
   - En production : configurez le webhook dans votre tableau de bord Stripe

3. **Vérifier les logs du webhook** :
   Quand un paiement est effectué, vous devriez voir dans les logs :
   ```
   [WEBHOOK] Tentative d'envoi d'email à [email]
   [WEBHOOK] RESEND_API_KEY configuré: true
   [WEBHOOK] EMAIL_FROM utilisé: onboarding@resend.dev
   [EMAIL] ✅ Email envoyé avec succès
   ```

4. **Si l'email n'est pas envoyé** :
   - Vérifiez que `RESEND_API_KEY` est correctement configuré
   - Vérifiez que `EMAIL_FROM` est `onboarding@resend.dev` (pour les tests)
   - Vérifiez les logs pour voir l'erreur exacte

5. **Important pour Resend** :
   - Avec `onboarding@resend.dev`, Resend peut avoir des limitations
   - Pour la production, vous devez vérifier votre propre domaine dans Resend
   - Vérifiez votre boîte de réception ET les spams

## Test rapide

Pour tester l'envoi d'email sans faire un paiement complet, vous pouvez créer une route de test (mais nous l'avons supprimée). 

Alternative : Utilisez directement l'API Stripe pour créer une session de test et vérifier que le webhook est appelé.

