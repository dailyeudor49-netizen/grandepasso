import type { Metadata } from "next";
import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import ScrollReveal from "@/components/ScrollReveal";
import { getProductsSorted } from "@/lib/products";
import categories from "@/lib/categories.json";

export const metadata: Metadata = {
  title: "Catalogo - Grande Passo Calzature",
  description:
    "Sfoglia il nostro catalogo completo di calzature italiane comfort. Soluzioni per postura, benessere e stile quotidiano.",
};

export default function CatalogoPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
              Le Nostre Soluzioni
            </p>
            <h1 className="mt-3 text-3xl font-bold text-stone-900 sm:text-4xl">
              Catalogo Benessere e Postura
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-stone-500">
              Ogni modello e&apos; sviluppato con ortopedici e posturologi per offrire
              comfort reale, supporto e benessere quotidiano.
            </p>
          </div>
        </ScrollReveal>

        {/* Categories */}
        <ScrollReveal className="mt-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalogo/${cat.slug}`}
                className="rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-semibold text-stone-700 shadow-sm transition-all hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 sm:px-5 sm:py-2.5 sm:text-sm"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </ScrollReveal>

        {/* Products */}
        <ScrollReveal className="mt-12">
          <ProductGrid products={getProductsSorted()} />
        </ScrollReveal>
      </div>
    </div>
  );
}
