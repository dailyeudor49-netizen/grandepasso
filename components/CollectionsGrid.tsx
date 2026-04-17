import Link from "next/link";
import Image from "next/image";

const collections = [
  {
    name: "Uomo",
    description: "Stile e comfort per ogni occasione",
    image: "/images/catalogo/7.webp",
    href: "/catalogo?categoria=fitness",
  },
  {
    name: "Donna",
    description: "Eleganza e benessere quotidiano",
    image: "/images/catalogo/5.jpg",
    href: "/catalogo?categoria=posturali",
  },
  {
    name: "Trekking",
    description: "Avventura e resistenza",
    image: "/images/catalogo/10.jpg",
    href: "/catalogo?categoria=trekking",
  },
  {
    name: "Ortopediche",
    description: "Supporto professionale per i tuoi piedi",
    image: "/images/catalogo/2.jpg",
    href: "/catalogo?categoria=ortopediche",
  },
  {
    name: "Lavoro",
    description: "Sicurezza e comfort tutto il giorno",
    image: "/images/catalogo/12.png",
    href: "/catalogo?categoria=trekking",
  },
  {
    name: "Comfort",
    description: "Benessere ad ogni passo",
    image: "/images/home/benessere.webp",
    href: "/catalogo",
  },
];

export default function CollectionsGrid() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-stone-900 sm:text-4xl lg:text-5xl">
            Le Nostre Collezioni
          </h2>
          <p className="mt-3 text-base text-stone-600 sm:text-lg">
            Esplora le nostre collezioni selezionate per ogni esigenza
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {collections.map((collection) => (
            <Link
              key={collection.name}
              href={collection.href}
              className="group relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl"
            >
              {/* Image with aspect ratio */}
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 33vw"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
                  <h3 className="mb-1.5 text-2xl font-extrabold text-white sm:text-3xl">
                    {collection.name}
                  </h3>
                  <p className="mb-4 text-sm text-stone-200 sm:text-base">
                    {collection.description}
                  </p>

                  {/* CTA Arrow */}
                  <div className="flex items-center gap-2 text-sm font-bold text-white transition-all group-hover:gap-3">
                    <span>Esplora</span>
                    <svg
                      className="h-5 w-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
