import Link from "next/link";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import FeaturesBar from "@/components/FeaturesBar";
import CategoryBanners from "@/components/CategoryBanners";
import ProductGrid from "@/components/ProductGrid";
import PromoBanner from "@/components/PromoBanner";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import ScrollReveal from "@/components/ScrollReveal";
import { getFeaturedProducts } from "@/lib/products";

export default function Home() {
  const featured = getFeaturedProducts(4);

  return (
    <>
      <HeroSection />
      <MarqueeBanner />
      <FeaturesBar />

      <ScrollReveal>
        <CategoryBanners />
      </ScrollReveal>

      {/* Featured Products */}
      <section className="bg-stone-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 sm:text-sm">
                  I Piu&apos; Venduti
                </p>
                <h2 className="mt-1.5 text-2xl font-bold text-stone-900 sm:mt-2 sm:text-4xl">
                  Bestseller della settimana
                </h2>
              </div>
              <Link
                href="/catalogo"
                className="inline-flex items-center rounded-full border border-stone-300 px-5 py-2 text-xs font-semibold text-stone-700 transition-all hover:border-indigo-300 hover:bg-blue-50 hover:text-blue-700 sm:px-6 sm:py-2.5 sm:text-sm"
              >
                Vedi tutti
                <svg className="ml-1.5 h-3.5 w-3.5 sm:ml-2 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal className="mt-8 sm:mt-10">
            <ProductGrid products={featured} />
          </ScrollReveal>
        </div>
      </section>

      <ScrollReveal>
        <PromoBanner />
      </ScrollReveal>

      {/* Lifestyle banner */}
      <section className="relative h-[300px] overflow-hidden sm:h-[400px] lg:h-[500px]">
        <Image
          src="/images/home/hero.webp"
          alt="Benessere e natura"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-2xl px-4">
            <h2 className="text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
              Il passo giusto cambia tutto
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-white/80 sm:mt-4 sm:text-base">
              Investi nei tuoi piedi e tutto il corpo ti ringraziera&apos;.
              Calzature comfort per chi non accetta compromessi.
            </p>
            <Link
              href="/catalogo"
              className="mt-6 inline-flex items-center rounded-full bg-white px-6 py-3 text-xs font-bold text-stone-900 shadow-xl transition-all hover:bg-blue-50 sm:mt-8 sm:px-8 sm:py-3.5 sm:text-sm"
            >
              Scopri Ora
            </Link>
          </div>
        </div>
      </section>

      <ScrollReveal>
        <AboutSection />
      </ScrollReveal>

      <ScrollReveal>
        <TestimonialsSection />
      </ScrollReveal>

      <NewsletterSection />

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 sm:text-sm">
              Investi nel tuo benessere
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white sm:mt-4 sm:text-4xl lg:text-5xl">
              Il tuo prossimo passo<br />inizia qui
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-stone-400 sm:mt-6 sm:text-base">
              Unisciti a migliaia di clienti soddisfatti. Spedizione gratuita,
              reso facile e garanzia di qualita&apos; su ogni ordine.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4">
              <Link
                href="/catalogo"
                className="inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-8 py-3.5 text-xs font-bold uppercase tracking-wide text-white shadow-2xl shadow-blue-600/20 transition-all hover:bg-blue-500 sm:w-auto sm:px-10 sm:py-4 sm:text-sm"
              >
                Scopri le Soluzioni
              </Link>
              <Link
                href="/contatti"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-xs font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5 sm:w-auto sm:px-10 sm:py-4 sm:text-sm"
              >
                Hai domande? Contattaci
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
