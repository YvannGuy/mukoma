/**
 * Exemple de composant montrant comment utiliser les images
 * Ce fichier est à titre d'exemple - vous pouvez le supprimer
 */

import Image from 'next/image'

export function ImageExample() {
  return (
    <div className="space-y-8">
      {/* Exemple 1: Image simple */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Image simple</h3>
        <Image
          src="/images/book/cover.jpg"
          alt="Couverture du livre Mukoma"
          width={300}
          height={400}
          className="rounded-lg"
        />
      </div>

      {/* Exemple 2: Image avec priority (above-the-fold) */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Image hero (priority)</h3>
        <Image
          src="/images/hero/banner.jpg"
          alt="Bannière hero"
          width={1200}
          height={600}
          priority
          className="w-full h-auto rounded-lg"
        />
      </div>

      {/* Exemple 3: Image responsive */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Image responsive</h3>
        <Image
          src="/images/foundation/mission.jpg"
          alt="Mission de la fondation"
          width={800}
          height={500}
          className="w-full h-auto rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Exemple 4: Logo */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Logo</h3>
        <Image
          src="/images/logo/logo.svg"
          alt="Logo Mukoma"
          width={200}
          height={50}
          className="h-12 w-auto"
        />
      </div>
    </div>
  )
}




