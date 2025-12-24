# Dossier Images

Placez ici toutes les images statiques de votre site.

## Structure recommandée

```
public/
├── images/
│   ├── hero/              # Images pour la section hero
│   ├── book/              # Images du livre/ebook
│   ├── foundation/        # Images pour la page fondation
│   ├── icons/             # Icônes (si nécessaire)
│   └── logo/              # Logo du site
```

## Utilisation dans Next.js

Les fichiers dans `public/` sont accessibles directement depuis la racine :

```tsx
// Exemple dans un composant
<Image src="/images/book/cover.jpg" alt="Couverture du livre" width={300} height={400} />
```

## Formats recommandés

- **WebP** : Meilleure compression, support moderne
- **JPEG** : Pour les photos
- **PNG** : Pour les images avec transparence
- **SVG** : Pour les logos et icônes

## Optimisation

Next.js optimise automatiquement les images avec le composant `<Image>`. Assurez-vous d'utiliser :

```tsx
import Image from 'next/image'

<Image 
  src="/images/book/cover.jpg" 
  alt="Description" 
  width={300} 
  height={400}
  priority // Pour les images above-the-fold
/>
```

