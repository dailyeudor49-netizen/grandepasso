"use client";

import { useState, useEffect } from "react";
import type { OrderConfig } from "@/lib/order-config";

interface StickyOrderButtonProps {
  config: OrderConfig;
}

export function StickyOrderButton({ config }: StickyOrderButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    // Scroll to top (where the main order section is)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <button
          onClick={handleClick}
          className="flex w-full items-center justify-between rounded-[14px] bg-[#3b82f6] px-6 py-4 text-white shadow-lg transition-all hover:bg-[#2563eb] active:scale-[0.98]"
        >
          <div className="flex flex-col items-start">
            <span className="text-[16px] font-bold">{config.productName}</span>
            <span className="text-[13px] opacity-90">
              Da €{config.basePrice.toFixed(2)} a €{config.discountedPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[18px] font-bold">Ordina ora</span>
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
