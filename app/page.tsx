import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import FeaturesBar from "@/components/FeaturesBar";
import BestsellersCarousel from "@/components/BestsellersCarousel";
import CategoryBanners from "@/components/CategoryBanners";
import CollectionsGrid from "@/components/CollectionsGrid";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSection from "@/components/NewsletterSection";
import ScrollReveal from "@/components/ScrollReveal";
import { getFeaturedProducts } from "@/lib/products";

export default function Home() {
  const featured = getFeaturedProducts(6);

  return (
    <>
      <HeroSection />
      <MarqueeBanner />
      <FeaturesBar />

      <ScrollReveal>
        <BestsellersCarousel products={featured} />
      </ScrollReveal>

      <ScrollReveal>
        <CategoryBanners />
      </ScrollReveal>

      <ScrollReveal>
        <CollectionsGrid />
      </ScrollReveal>

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
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 sm:text-sm">
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
                className="inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-8 py-3.5 text-xs font-bold uppercase tracking-wide text-white shadow-2xl shadow-emerald-600/20 transition-all hover:bg-emerald-500 sm:w-auto sm:px-10 sm:py-4 sm:text-sm"
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
