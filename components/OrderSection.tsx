"use client";

import { useState } from "react";
import type { OrderConfig } from "@/lib/order-config";

interface OrderSectionProps {
  config: OrderConfig;
  image: string;
}

export function OrderSection({ config, image }: OrderSectionProps) {
  const [selectedColor, setSelectedColor] = useState(config.colors?.[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState(config.sizes?.[0] || "");

  const handleOrder = () => {
    // Placeholder - implementare logica ordine
    console.log("Ordine:", { color: selectedColor, size: selectedSize });
  };

  return (
    <div className="mt-4">
      {/* Color selector */}
      {config.colors && config.colors.length > 0 && (
        <div className="mb-4">
          <label className="mb-2 block text-[14px] font-bold text-[#1A1917]">
            Colore: {selectedColor}
          </label>
          <div className="flex flex-wrap gap-2">
            {config.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`flex h-10 items-center gap-2 rounded-[10px] border-2 px-3 transition-all ${
                  selectedColor === color.name
                    ? "border-[#3b82f6] bg-[#EEF1F7]"
                    : "border-[#E2E4E8] bg-white hover:border-[#C4C0B8]"
                }`}
              >
                <span
                  className="h-5 w-5 rounded-full border border-[#E2E4E8]"
                  style={{ backgroundColor: color.value }}
                />
                <span className="text-[14px] font-medium text-[#1A1917]">
                  {color.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size selector */}
      {config.sizes && config.sizes.length > 0 && (
        <div className="mb-4">
          <label className="mb-2 block text-[14px] font-bold text-[#1A1917]">
            Taglia EU: {selectedSize}
          </label>
          <div className="flex flex-wrap gap-2">
            {config.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`flex h-10 min-w-[48px] items-center justify-center rounded-[10px] border-2 px-3 transition-all ${
                  selectedSize === size
                    ? "border-[#3b82f6] bg-[#EEF1F7]"
                    : "border-[#E2E4E8] bg-white hover:border-[#C4C0B8]"
                }`}
              >
                <span className="text-[14px] font-bold text-[#1A1917]">
                  {size}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Order button */}
      <button
        onClick={handleOrder}
        className="w-full rounded-[14px] bg-[#3b82f6] py-4 text-[18px] font-bold text-white shadow-lg transition-all hover:bg-[#2563eb] active:scale-[0.98]"
      >
        Ordina ora — €{config.discountedPrice.toFixed(2)}
      </button>
    </div>
  );
}
