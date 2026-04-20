import Link from "next/link";
import PlaceholderImage from "./PlaceholderImage";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <Link
      href={`/land/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border-l-2 border-emerald-500 bg-white shadow-sm ring-1 ring-stone-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-indigo-200 sm:rounded-2xl"
    >
      {discount > 0 && (
        <span className="absolute left-2 top-2 z-10 rounded-md bg-red-500 px-2 py-0.5 text-[10px] font-semibold text-white sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs">
          -{discount}%
        </span>
      )}

      {product.soldOut && (
        <span className="absolute right-2 top-2 z-10 rounded-md bg-stone-700 px-2 py-0.5 text-[10px] font-semibold text-white sm:right-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs">
          Esaurito
        </span>
      )}

      <div className="relative aspect-square overflow-hidden">
        <PlaceholderImage
          color={product.color}
          accentColor={product.accentColor}
          name={product.name}
          image={product.image}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {product.soldOut && (
          <div className="absolute inset-0 bg-white/30" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[8px] font-medium uppercase tracking-wider text-emerald-700 sm:text-[10px]">
          {product.subtitle}
        </p>
        <h3 className="mt-0.5 font-serif text-sm font-semibold text-stone-900 sm:mt-1 sm:text-lg">
          {product.name}
        </h3>
        {/* Wellness badge */}
        <div className="mt-1.5 inline-flex w-fit items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-medium text-emerald-700 sm:text-[10px]">
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          Comfort certificato
        </div>
        <div className="mt-auto flex items-center gap-1.5 pt-2 sm:gap-2 sm:pt-3">
          <span className="text-sm font-bold text-stone-900 sm:text-lg">
            &euro;{product.price.toFixed(2)}
          </span>
          {discount > 0 && (
            <span className="text-[10px] text-stone-400 line-through sm:text-sm">
              &euro;{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
