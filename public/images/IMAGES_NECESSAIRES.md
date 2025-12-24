# Images nécessaires pour la landing page

Voici la liste des images à ajouter dans le dossier `public/images/` :

## Images requises

### 1. Couverture du livre (Hero)
- **Chemin** : `public/images/book/cover.jpg`
- **Description** : Couverture du livre "L'Art de Diriger sa Nouvelle Année"
- **Dimensions recommandées** : 600x800px (ratio 3:4)
- **Style** : Couverture noire avec pièces d'échecs dorées et sceau "ABCAHT" en haut à gauche

### 2. Livre en 3D (Section Aperçu)
- **Chemin** : `public/images/book/book-3d.jpg`
- **Description** : Rendu 3D du livre montrant la couverture et le dos
- **Dimensions recommandées** : 600x900px (ratio 2:3)
- **Style** : Vue en angle montrant la couverture et le dos avec le texte "ALLETERS" sur le dos

### 3. Logo de la Fondation
- **Chemin** : `public/images/foundation/logo.jpg`
- **Description** : Logo de la Fondation Philippe Mukoma
- **Dimensions recommandées** : 300x300px (carré)
- **Style** : Design circulaire doré avec motif complexe (soleil ou boussole stylisée) sur fond sombre

## Images optionnelles (pour améliorer le design)

### 4. Favicon
- **Chemin** : `public/favicon.ico`
- **Description** : Icône du site (s'affiche dans l'onglet du navigateur)
- **Dimensions** : 32x32px ou 16x16px

## Notes importantes

- Tous les fichiers doivent être nommés exactement comme indiqué ci-dessus
- Les formats acceptés : JPG, PNG, WebP
- Pour de meilleures performances, compressez les images avant de les uploader
- Utilisez des outils comme [TinyPNG](https://tinypng.com) ou [Squoosh](https://squoosh.app) pour optimiser les images

## Si vous n'avez pas les images

En attendant d'avoir les vraies images, vous pouvez :
1. Utiliser des placeholders depuis [Unsplash](https://unsplash.com) ou [Pexels](https://pexels.com)
2. Créer des images temporaires avec un outil de design comme Canva ou Figma
3. Laisser les chemins d'images - Next.js affichera une erreur mais le site fonctionnera

## Structure finale attendue

```
public/
├── favicon.ico
└── images/
    ├── book/
    │   ├── cover.jpg          ← REQUIS
    │   └── book-3d.jpg        ← REQUIS
    └── foundation/
        └── logo.jpg           ← REQUIS
```

