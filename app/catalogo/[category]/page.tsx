import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import ScrollReveal from "@/components/ScrollReveal";
import { products } from "@/lib/products";
import categories from "@/lib/categories.json";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) return { title: "Categoria non trovata" };
  return {
    title: `${cat.label} - Grande Passo Calzature`,
    description: cat.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();

  const filtered = products.filter((p) => p.category === category);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-[11px] text-stone-400 sm:text-xs">
          <Link href="/" className="hover:text-emerald-600">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/catalogo" className="hover:text-emerald-600">Catalogo</Link>
          <span className="mx-1.5">/</span>
          <span className="text-stone-600">{cat.label}</span>
        </nav>

        {/* Header */}
        <ScrollReveal>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
              {cat.label}
            </p>
            <h1 className="mt-3 text-3xl font-bold text-stone-900 sm:text-4xl">
              {cat.label}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-stone-500">
              {cat.description}
            </p>
          </div>
        </ScrollReveal>

        {/* Products */}
        <ScrollReveal className="mt-12">
          <ProductGrid products={filtered} />
        </ScrollReveal>
      </div>
    </div>
  );
}
