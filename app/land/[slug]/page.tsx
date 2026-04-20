import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PlaceholderImage from "@/components/PlaceholderImage";
import ProductGrid from "@/components/ProductGrid";
import ScrollReveal from "@/components/ScrollReveal";
import {
  products,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import { categoryLabels } from "@/lib/types";

export function generateStaticParams() {
  return products.filter((p) => p.slug !== "snellawalk360").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Prodotto non trovato" };
  return {
    title: `${product.name} - Grande Passo Calzature`,
    description: product.description,
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug, 4);
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div>
      {/* Breadcrumb */}
      <div className="border-b border-stone-200">
        <nav className="mx-auto max-w-7xl px-4 py-2.5 text-[11px] text-stone-400 sm:px-6 sm:text-xs lg:px-8">
          <Link href="/" className="hover:text-emerald-600">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href={`/catalogo/${product.category}`} className="hover:text-emerald-600">{categoryLabels[product.category]}</Link>
          <span className="mx-1.5">/</span>
          <span className="text-stone-600">{product.name}</span>
        </nav>
      </div>

      {/* ════════ PRODOTTO ════════ */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
          {/* ── IMAGE ── */}
          <div className="relative overflow-hidden rounded-2xl bg-stone-100 sm:rounded-3xl">
            <PlaceholderImage
              color={product.color}
              accentColor={product.accentColor}
              name={product.name}
              image={product.image}
              className="aspect-square w-full"
            />
            {discount > 0 && (
              <div className="absolute left-3 top-3 rounded-lg bg-red-500 px-2.5 py-1 text-xs font-extrabold text-white shadow-lg sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-sm">
                -{discount}%
              </div>
            )}
          </div>

          {/* ── INFO ── */}
          <div className="flex flex-col gap-5">
            {/* Title */}
            <div>
              <h1 className="text-2xl font-extrabold leading-tight text-stone-900 sm:text-3xl lg:text-4xl">
                {product.name}
              </h1>
              <p className="mt-1 text-sm text-stone-500 sm:text-base">
                {product.subtitle}
              </p>
            </div>

            {/* Price block */}
            <div className="rounded-xl bg-stone-50 p-4 sm:p-5">
              <div className="flex items-baseline gap-3">
                {discount > 0 && (
                  <span className="text-lg text-stone-400 line-through sm:text-xl">
                    &euro;{product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-4xl font-extrabold text-stone-900 sm:text-5xl">
                  &euro;{product.price.toFixed(2)}
                </span>
                {discount > 0 && (
                  <span className="rounded-md bg-red-100 px-2 py-1 text-xs font-extrabold text-red-600 sm:text-sm">
                    {discount}% OFF
                  </span>
                )}
              </div>
              {discount > 0 && (
                <p className="mt-1.5 text-xs font-semibold text-emerald-700 sm:text-sm">
                  Risparmi &euro;{(product.originalPrice - product.price).toFixed(2)} con questa offerta
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-stone-600 sm:text-base">
              {product.description}
            </p>

            {/* CTA Esaurito */}
            <button
              disabled
              className="mt-2 flex w-full items-center justify-center gap-2.5 rounded-full bg-stone-400 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-sm cursor-not-allowed sm:py-5 sm:text-base"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              Prodotto Esaurito
            </button>
          </div>
        </div>
      </section>

      {/* ════════ RELATED ════════ */}
      {related.length > 0 && (
        <section className="border-t border-stone-200 bg-stone-50 py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 className="text-xl font-bold text-stone-900 sm:text-2xl">
                Potrebbe piacerti anche
              </h2>
            </ScrollReveal>
            <ScrollReveal className="mt-6 sm:mt-8">
              <ProductGrid products={related} />
            </ScrollReveal>
          </div>
        </section>
      )}
    </div>
  );
}
