# Exemples d'utilisation des images

## Avec le composant Image de Next.js (recommandé)

```tsx
import Image from 'next/image'

// Dans un composant
<Image 
  src="/images/book/cover.jpg" 
  alt="Couverture du livre Mukoma" 
  width={400} 
  height={600}
  priority // Pour les images above-the-fold (hero)
/>
```

## Avec une balise img classique

```tsx
// Pour les images simples (non optimisées)
<img 
  src="/images/icons/check.svg" 
  alt="Icône de validation" 
  className="w-6 h-6"
/>
```

## Images responsives

```tsx
<Image 
  src="/images/hero/banner.jpg" 
  alt="Bannière hero" 
  width={1200} 
  height={600}
  className="w-full h-auto"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

## Images dans le CSS/Tailwind

```tsx
// Avec Tailwind (background-image)
<div 
  className="bg-cover bg-center"
  style={{ backgroundImage: 'url(/images/hero/background.jpg)' }}
>
  {/* Contenu */}
</div>
```

## Structure recommandée pour votre projet

```
public/images/
├── hero/
│   └── banner.jpg          # Image principale de la landing page
├── book/
│   ├── cover.jpg           # Couverture de l'ebook
│   └── preview.jpg         # Aperçu du contenu
├── foundation/
│   └── mission.jpg         # Image pour la page fondation
├── icons/
│   └── (icônes SVG si nécessaire)
└── logo/
    └── logo.svg            # Logo du site
```

## Optimisation

- **Taille** : Compressez vos images avant de les uploader
- **Format** : Préférez WebP pour les photos, SVG pour les logos
- **Dimensions** : Utilisez des images de la taille appropriée (pas trop grandes)
- **Lazy loading** : Le composant `<Image>` de Next.js le fait automatiquement (sauf avec `priority`)

