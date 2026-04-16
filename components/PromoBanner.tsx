import Link from "next/link";
import Image from "next/image";

export default function PromoBanner() {
  return (
    <section className="relative overflow-hidden bg-stone-900">
      <div className="grid lg:grid-cols-2">
        {/* Image side */}
        <div className="relative min-h-[280px] sm:min-h-[400px] lg:min-h-[500px]">
          <Image
            src="/images/home/offerta.webp"
            alt="Collezione calzature comfort"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-stone-900/30 lg:bg-none" />
          <div className="absolute right-4 top-4 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg sm:right-6 sm:top-6 sm:px-4 sm:py-2 sm:text-sm">
            Fino a -50%
          </div>
        </div>

        {/* Text side */}
        <div className="flex items-center bg-stone-900 px-4 py-10 sm:px-8 sm:py-16 lg:px-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 sm:text-sm">
              Investi nella tua salute
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight text-white sm:mt-4 sm:text-4xl lg:text-5xl">
              Offerta Comfort+
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-stone-400 sm:mt-6 sm:text-base">
              Sconti fino al 50% su tutta la collezione. Approfitta dell&apos;offerta
              per scoprire il comfort Piede Luxe Calzature. Un&apos;occasione da non perdere.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
              <Link
                href="/catalogo"
                className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-xs font-bold uppercase tracking-wide text-white transition-all hover:bg-blue-500 sm:px-8 sm:py-3.5 sm:text-sm"
              >
                Scopri le Offerte
              </Link>
              <Link
                href="/catalogo"
                className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-xs font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5 sm:px-8 sm:py-3.5 sm:text-sm"
              >
                Tutte le Soluzioni
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
