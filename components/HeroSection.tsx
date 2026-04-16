import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-stone-900">
      <Image
        src="/images/home/hero.webp"
        alt=""
        fill
        priority
        className="object-cover opacity-60"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-stone-900/30" />

      <div className="relative flex min-h-[90vh] items-center">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-2xl">
            <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
              <span className="h-2 w-2 shrink-0 rounded-full bg-blue-400" />
              <span className="text-[11px] font-medium tracking-wide text-blue-200 sm:text-xs">
                Comfort Premium
              </span>
            </div>

            <h1 className="mt-5 animate-fade-in-up text-3xl font-extrabold leading-[1.1] text-white sm:mt-6 sm:text-5xl lg:text-7xl [animation-delay:100ms]">
              Il lusso del{" "}
              <span className="text-blue-400">comfort</span>.{" "}
              L&apos;eleganza del{" "}
              <span className="text-blue-400">benessere</span>
            </h1>

            <p className="mt-5 animate-fade-in-up text-sm leading-relaxed text-stone-300 sm:mt-6 sm:text-lg lg:text-xl [animation-delay:200ms]">
              Calzature di alta qualità che uniscono design raffinato e benessere autentico.
              Tecnologia avanzata, materiali pregiati e attenzione artigianale per i tuoi piedi.
              Riscopri il piacere di camminare con stile.
            </p>

            <div className="mt-8 flex animate-fade-in-up flex-wrap gap-3 sm:gap-4 [animation-delay:300ms]">
              <Link
                href="/catalogo"
                className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-2xl shadow-blue-600/30 transition-all hover:bg-blue-500 sm:px-8 sm:py-4"
              >
                Scopri le Soluzioni
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="#collezioni"
                className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10 sm:px-8 sm:py-4"
              >
                Le Collezioni
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-10 flex animate-fade-in-up items-center gap-5 sm:mt-12 sm:gap-8 [animation-delay:400ms]">
              <div>
                <p className="text-xl font-bold text-white sm:text-2xl">15k+</p>
                <p className="text-[10px] text-stone-400 sm:text-xs">Clienti soddisfatti</p>
              </div>
              <div className="h-8 w-px bg-white/20 sm:h-10" />
              <div>
                <p className="text-xl font-bold text-white sm:text-2xl">4.9</p>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-2.5 w-2.5 text-amber-400 sm:h-3 sm:w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="h-8 w-px bg-white/20 sm:h-10" />
              <div>
                <p className="text-xl font-bold text-white sm:text-2xl">100%</p>
                <p className="text-[10px] text-stone-400 sm:text-xs">Made in Italy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
