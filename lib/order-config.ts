export interface OrderConfig {
  productSlug: string;
  productName: string;
  basePrice: number;
  discountedPrice: number;
  colors?: { name: string; value: string }[];
  sizes?: string[];
}

// Configurazioni per le landing pages
const orderConfigs: Record<string, OrderConfig> = {
  "arvelia-arch": {
    productSlug: "arvelia-arch",
    productName: "Arvelia Arch",
    basePrice: 166.99,
    discountedPrice: 49.99,
    colors: [
      { name: "Nero", value: "#000000" },
      { name: "Grigio", value: "#808080" },
    ],
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
  },
  "aureacloud": {
    productSlug: "aureacloud",
    productName: "AureaCloud",
    basePrice: 166.99,
    discountedPrice: 49.99,
    colors: [
      { name: "Nero", value: "#000000" },
      { name: "Beige", value: "#D4B896" },
    ],
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43"],
  },
  "sample": {
    productSlug: "sample",
    productName: "Sample Product",
    basePrice: 166.99,
    discountedPrice: 49.99,
    colors: [
      { name: "Nero", value: "#000000" },
      { name: "Grigio", value: "#808080" },
    ],
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
  },
};

export function getOrderConfig(slug: string): OrderConfig {
  return (
    orderConfigs[slug] || {
      productSlug: slug,
      productName: slug,
      basePrice: 166.99,
      discountedPrice: 49.99,
      colors: [{ name: "Nero", value: "#000000" }],
      sizes: ["36", "37", "38", "39", "40", "41", "42"],
    }
  );
}
