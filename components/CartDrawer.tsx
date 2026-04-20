"use client";

import { useEffect } from "react";
import Link from "next/link";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 animate-fade-in"
        onClick={onClose}
      />
      {/* Drawer */}
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4">
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-stone-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <span className="font-serif text-lg font-semibold text-stone-900">
              Carrello
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full text-stone-600 hover:bg-stone-100"
            aria-label="Chiudi carrello"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Empty state */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-stone-100">
            <svg
              className="h-10 w-10 text-stone-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
          <h3 className="mt-4 font-serif text-lg font-semibold text-stone-900">
            Il tuo carrello e&apos; vuoto
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-stone-500">
            Esplora il nostro catalogo e trova le calzature comfort perfette
            per te.
          </p>
          <Link
            href="/catalogo"
            onClick={onClose}
            className="mt-6 inline-flex items-center rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700"
          >
            Scopri il Catalogo
          </Link>
        </div>

        {/* Footer */}
        <div className="border-t border-stone-200 px-6 py-4">
          <div className="flex items-center justify-between text-sm text-stone-500">
            <span>Subtotale</span>
            <span className="font-semibold text-stone-900">&euro;0,00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
