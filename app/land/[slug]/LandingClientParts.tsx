"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* ── Rotating urgency badge ── */
const urgencyMessages = [
  "Alta richiesta oggi",
  "Vendute 20+ nelle ultime 24h",
  "Disponibilità limitata",
  "Ultimi pezzi in magazzino",
];

export function RotatingBadge() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % urgencyMessages.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-sm sm:bottom-4 sm:left-4 sm:px-4 sm:py-2">
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="text-[10px] font-semibold text-stone-800 transition-all sm:text-xs">
        {urgencyMessages[idx]}
      </span>
    </div>
  );
}

/* ── Color selector ── */
const colors = [
  { name: "Bianco", value: "#f5f5f4" },
  { name: "Grigio", value: "#78716c" },
  { name: "Nero", value: "#1c1917" },
];

export function ColorSelector() {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <p className="text-sm font-semibold text-stone-900">
        Colore: <span className="font-normal text-stone-500">{colors[selected].name}</span>
      </p>
      <div className="mt-2 flex gap-2.5">
        {colors.map((c, i) => (
          <button
            key={c.name}
            onClick={() => setSelected(i)}
            className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all sm:h-10 sm:w-10 ${
              selected === i ? "border-emerald-500 ring-2 ring-emerald-500/30" : "border-stone-200 hover:border-stone-400"
            }`}
          >
            <span
              className="h-6 w-6 rounded-full sm:h-7 sm:w-7"
              style={{ backgroundColor: c.value }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Size selector + CTA ── */
const sizes = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

export function SizeAndCTA({ slug, soldOut }: { slug: string; soldOut?: boolean }) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  if (soldOut) {
    return (
      <button
        disabled
        className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-full bg-stone-400 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-sm cursor-not-allowed sm:py-5 sm:text-base"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
        Prodotto Esaurito
      </button>
    );
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-stone-900">Seleziona taglia</p>
          <button className="text-xs font-medium text-emerald-600 hover:text-emerald-700">
            Guida taglie
          </button>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg border text-xs font-medium transition-all sm:h-11 sm:w-11 sm:text-sm ${
                selectedSize === size
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-500"
                  : "border-stone-200 text-stone-700 hover:border-indigo-300 hover:bg-emerald-50/50"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Link
        href={`/land/${slug}/ty`}
        className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-full bg-emerald-600 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-xl shadow-emerald-600/25 transition-all hover:bg-emerald-500 hover:shadow-2xl sm:py-5 sm:text-base"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
        Aggiungi al Carrello &mdash; Acquista Ora
      </Link>

      {/* Sub-CTA trust */}
      <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-stone-500 sm:text-xs">
        <span className="flex items-center gap-1">
          <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          Pagamento sicuro
        </span>
        <span className="flex items-center gap-1">
          <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Soddisfatti o rimborsati
        </span>
      </div>
    </>
  );
}

/* ── Sticky mobile CTA ── */
export function StickyMobileCTA({
  slug,
  price,
  soldOut,
}: {
  slug: string;
  price: string;
  soldOut?: boolean;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible || soldOut) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-stone-200 bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden">
      <div className="flex items-center gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-stone-900">Acquista ora</p>
          <p className="text-sm font-bold text-emerald-600">&euro;{price}</p>
        </div>
        <Link
          href={`/land/${slug}/ty`}
          className="flex flex-1 items-center justify-center rounded-full bg-emerald-500 py-3 text-sm font-bold uppercase tracking-wide text-stone-900 shadow-lg"
        >
          Aggiungi al Carrello
        </Link>
      </div>
    </div>
  );
}
