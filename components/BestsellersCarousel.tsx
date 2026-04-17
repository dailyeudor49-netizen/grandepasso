"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";

interface BestsellersCarouselProps {
  products: Product[];
}

export default function BestsellersCarousel({ products }: BestsellersCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;
  const maxIndex = Math.max(0, products.length - itemsPerView);

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const discount = (product: Product) => {
    if (!product.originalPrice) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  return (
    <section className="bg-stone-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-stone-900 sm:text-4xl lg:text-5xl">
            I Più Venduti
          </h2>
          <p className="mt-3 text-base text-stone-600 sm:text-lg">
            Le nostre calzature più apprezzate dai clienti
          </p>
        </div>

        {/* Desktop Carousel */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Navigation Buttons */}
            {currentIndex > 0 && (
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 z-10 -translate-x-4 -translate-y-1/2 rounded-full bg-white p-3 shadow-xl transition-all hover:scale-110 hover:bg-blue-600 hover:text-white"
                aria-label="Precedente"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {currentIndex < maxIndex && (
              <button
                onClick={next}
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-4 rounded-full bg-white p-3 shadow-xl transition-all hover:scale-110 hover:bg-blue-600 hover:text-white"
                aria-label="Successivo"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Carousel Container */}
            <div className="overflow-hidden">
              <div
                className="flex gap-6 transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                }}
              >
                {products.map((product) => (
                  <Link
                    key={product.slug}
                    href={product.hasLanding ? `/land/${product.slug}` : `/prodotto/${product.slug}`}
                    className="group w-1/4 flex-shrink-0"
                  >
                    <div className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl">
                      {/* Image */}
                      <div className="relative aspect-square overflow-hidden bg-stone-100">
                        <Image
                          src={product.image || '/placeholder.png'}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                        {/* Discount Badge */}
                        {product.originalPrice && (
                          <div className="absolute right-3 top-3 rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                            -{discount(product)}%
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="mb-2 text-lg font-bold text-stone-900 group-hover:text-blue-600">
                          {product.name}
                        </h3>
                        <p className="mb-3 line-clamp-2 text-sm text-stone-600">
                          {product.subtitle}
                        </p>

                        {/* Price */}
                        <div className="mb-4 flex items-baseline gap-2">
                          <span className="text-2xl font-extrabold text-blue-600">
                            €{product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-stone-400 line-through">
                              €{product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center justify-between rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition-all group-hover:bg-blue-700">
                          <span>Scopri di più</span>
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Dots Navigation */}
            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === currentIndex ? "w-8 bg-blue-600" : "w-2.5 bg-stone-300 hover:bg-stone-400"
                  }`}
                  aria-label={`Vai alla pagina ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Scroll */}
        <div className="lg:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide sm:gap-6">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={product.hasLanding ? `/land/${product.slug}` : `/prodotto/${product.slug}`}
                className="group w-[280px] flex-shrink-0 sm:w-[320px]"
              >
                <div className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-stone-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="320px"
                    />
                    {/* Discount Badge */}
                    {product.originalPrice && (
                      <div className="absolute right-3 top-3 rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                        -{discount(product)}%
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="mb-2 text-lg font-bold text-stone-900 group-hover:text-blue-600">
                      {product.name}
                    </h3>
                    <p className="mb-3 line-clamp-2 text-sm text-stone-600">
                      {product.subtitle}
                    </p>

                    {/* Price */}
                    <div className="mb-4 flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold text-blue-600">
                        €{product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-stone-400 line-through">
                          €{product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition-all group-hover:bg-blue-700">
                      <span>Scopri di più</span>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
