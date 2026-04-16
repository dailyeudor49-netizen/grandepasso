import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    title: "Calzature Ortopediche",
    subtitle: "Comfort e supporto certificato",
    count: "24 modelli",
    image: "/images/home/cat1.webp",
    href: "/catalogo/ortopediche",
  },
  {
    title: "Calzature Posturali",
    subtitle: "Allineamento naturale",
    count: "18 modelli",
    image: "/images/home/cat2.webp",
    href: "/catalogo/posturali",
  },
  {
    title: "Calzature Fitness",
    subtitle: "Performance e benessere",
    count: "15 modelli",
    image: "/images/home/cat3.webp",
    href: "/catalogo/fitness",
  },
  {
    title: "Calzature Trekking",
    subtitle: "Supporto in movimento",
    count: "12 modelli",
    image: "/images/home/cat4.webp",
    href: "/catalogo/trekking",
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
          <h2 className="mt-2 text-2xl font-bold text-stone-900 sm:mt-3 sm:text-4xl">
            Esplora per categoria
          </h2>
        </div>

        {/* Mobile: 2x2 grid pulito */}
        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:hidden">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.title}
              cat={cat}
              className="aspect-[3/4]"
            />
          ))}
        </div>

        {/* Tablet/Desktop: bento grid */}
        <div className="mt-12 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2">
          {/* Postura - card grande */}
          <CategoryCard
            cat={categories[0]}
            className="sm:row-span-2 sm:min-h-[520px] lg:col-span-5 lg:row-span-2"
          >
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-stone-900 shadow-lg transition-all group-hover:bg-blue-400">
              Scopri la collezione
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </CategoryCard>

          {/* Comfort - card orizzontale */}
          <CategoryCard
            cat={categories[1]}
            className="sm:min-h-[250px] lg:col-span-7 lg:row-span-1"
          >
            <span className="mt-3 inline-flex items-center text-sm font-medium text-white/80 transition-colors group-hover:text-indigo-300">
              Esplora
              <svg className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </CategoryCard>

          {/* Trekking */}
          <CategoryCard
            cat={categories[2]}
            className="sm:min-h-[250px] lg:col-span-4 lg:row-span-1"
          />

          {/* Wellness */}
          <CategoryCard
            cat={categories[3]}
            className="sm:min-h-[250px] lg:col-span-3 lg:row-span-1"
          />
        </div>
      </div>
    </section>
  );
}
