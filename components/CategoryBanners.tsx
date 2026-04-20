import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    title: "Ortopediche",
    subtitle: "Supporto e comfort certificato",
    count: "24+ modelli",
    image: "/images/home/cat1.webp",
    href: "/catalogo?categoria=ortopediche",
  },
  {
    title: "Rialzanti Uomo",
    subtitle: "Altezza extra discreta",
    count: "12+ modelli",
    image: "/images/catalogo/7.webp",
    href: "/catalogo?categoria=fitness",
  },
  {
    title: "Rialzanti Donna",
    subtitle: "Eleganza con rialzo segreto",
    count: "15+ modelli",
    image: "/images/catalogo/5.jpg",
    href: "/catalogo?categoria=posturali",
  },
  {
    title: "Trekking",
    subtitle: "Avventura e resistenza",
    count: "18+ modelli",
    image: "/images/home/cat4.webp",
    href: "/catalogo?categoria=trekking",
  },
  {
    title: "Lavoro",
    subtitle: "Sicurezza e comfort",
    count: "10+ modelli",
    image: "/images/catalogo/12.png",
    href: "/catalogo?categoria=trekking",
  },
  {
    title: "Comfort",
    subtitle: "Benessere quotidiano",
    count: "20+ modelli",
    image: "/images/home/cat3.webp",
    href: "/catalogo",
  },
];

function CategoryCard({
  cat,
  className,
  children,
}: {
  cat: (typeof categories)[number];
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={cat.href}
      className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl ${className ?? ""}`}
    >
      <Image
        src={cat.image}
        alt={cat.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 42vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

      <div className="absolute left-3 top-3 rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md sm:left-5 sm:top-5 sm:px-3.5 sm:py-1.5 sm:text-xs">
        {cat.count}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 lg:p-8">
        <p className="text-[9px] font-semibold uppercase tracking-widest text-indigo-300 sm:text-xs">
          {cat.subtitle}
        </p>
        <h3 className="mt-0.5 text-base font-bold text-white sm:mt-1 sm:text-2xl lg:text-3xl">
          {cat.title}
        </h3>
        {children}
      </div>
    </Link>
  );
}

export default function CategoryBanners() {
  return (
    <section id="collezioni" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 sm:text-sm">
            Le Nostre Soluzioni
          </p>
          <h2 className="mt-2 text-2xl font-bold text-stone-900 sm:mt-3 sm:text-4xl lg:text-5xl">
            Esplora per Esigenza
          </h2>
        </div>

        {/* Grid uniforme: 2 colonne mobile, 3 colonne desktop */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6 lg:grid-cols-3">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.title}
              cat={cat}
              className="aspect-[3/4]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
