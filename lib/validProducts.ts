/**
 * Server-side product whitelist for order validation
 * This prevents price manipulation and invalid product submissions
 */

export interface ValidProduct {
  slug: string;
  name: string;
  price: number;
  variantIds: number[];
}

export const UPSELL_PRICE = 4.99;
export const UPSELL_VARIANT_ID = 5932;

// All valid products with their prices and variant IDs
export const VALID_PRODUCTS: ValidProduct[] = [
  {
    slug: "aureastep",
    name: "AureaStep Pro",
    price: 49.90,
    variantIds: [5902, 5903, 5904, 5905, 5906, 5907, 5908, 5909, 5910, 5911], // sizes 36-45
  },
  {
    slug: "aureaflex",
    name: "AureaStep Pro", // Same product, different landing
    price: 49.90,
    variantIds: [5902, 5903, 5904, 5905, 5906, 5907, 5908, 5909, 5910, 5911],
  },
  {
    slug: "aureaslide",
    name: "AureaStep Pro", // Same product
    price: 49.90,
    variantIds: [5902, 5903, 5904, 5905, 5906, 5907, 5908, 5909, 5910, 5911],
  },
  {
    slug: "aurearise",
    name: "AureaRise",
    price: 49.90,
    variantIds: [5943, 5944, 5945, 5946, 5947, 5948, 5949, 5950, 5951, 5952], // sizes 36-45
  },
  {
    slug: "aureasecret",
    name: "AureaSecret",
    price: 49.90,
    variantIds: [5943, 5944, 5945, 5946, 5947, 5948, 5949, 5950, 5951, 5952], // sizes 36-45
  },
  {
    slug: "aureacloud",
    name: "AureaCloud",
    price: 49.90,
    variantIds: [5953, 5954, 5955, 5956, 5957, 5958, 5959, 5960, 5961, 5962], // sizes 36-45
  },
  {
    slug: "vitanovastep",
    name: "LuxeStep Pro",
    price: 49.90,
    variantIds: [5902, 5903, 5904, 5905, 5906, 5907, 5908, 5909, 5910, 5911], // sizes 36-45
  },
  {
    slug: "vitanovaflex",
    name: "LuxeStep Pro", // Same product, different landing
    price: 49.90,
    variantIds: [5902, 5903, 5904, 5905, 5906, 5907, 5908, 5909, 5910, 5911],
  },
  {
    slug: "vitanovaslide",
    name: "LuxeStep Pro", // Same product
    price: 49.90,
    variantIds: [5902, 5903, 5904, 5905, 5906, 5907, 5908, 5909, 5910, 5911],
  },
  {
    slug: "vitanovarise",
    name: "LuxeRise",
    price: 49.90,
    variantIds: [5943, 5944, 5945, 5946, 5947, 5948, 5949, 5950, 5951, 5952], // sizes 36-45
  },
  {
    slug: "vitanovasecret",
    name: "LuxeSecret",
    price: 49.90,
    variantIds: [5943, 5944, 5945, 5946, 5947, 5948, 5949, 5950, 5951, 5952], // sizes 36-45
  },
  {
    slug: "snellawalk",
    name: "SnellaWalk",
    price: 49.99,
    variantIds: [5901, 5902, 5903, 5904, 5905, 5906, 5907, 5908, 5909, 5910], // sizes 35-44
  },
  {
    slug: "snellawalk360",
    name: "SnellaWalk 360",
    price: 49.99,
    variantIds: [5901, 5902, 5903, 5904, 5905, 5906, 5907, 5908, 5909, 5910], // sizes 35-44
  },
  {
    slug: "orthostep",
    name: "OrthoStep Pro",
    price: 49.90,
    variantIds: [5902, 5903, 5904, 5905, 5906, 5907, 5908, 5909, 5910, 5911], // sizes 36-45
  },
  {
    slug: "cloudstep",
    name: "VENOCARE PRO",
    price: 49.90,
    variantIds: [5901, 5902, 5903, 5904, 5905, 5906, 5907, 5908, 5909, 5910], // sizes 35-44
  },
  {
    slug: "snellafit",
    name: "SnellaFit",
    price: 49.90,
    variantIds: [5921, 5922, 5923, 5924, 5925, 5926, 5927, 5928, 5929, 5930], // sizes 35-44
  },
  {
    slug: "venolight",
    name: "VenoLight",
    price: 49.90,
    variantIds: [5933, 5934, 5935, 5936, 5937, 5938, 5939, 5940, 5941, 5942], // sizes 35-44
  },
  {
    slug: "spinair",
    name: "SpinAir",
    price: 49.90,
    variantIds: [5901, 5902, 5903, 5904, 5905, 5906, 5907, 5908, 5909, 5910], // sizes 35-44
  },
  {
    slug: "slimwalk",
    name: "SlimWalk",
    price: 49.90,
    variantIds: [5971, 5972, 5973, 5974, 5975, 5976, 5977, 5978, 5979, 5980], // sizes 35-44 (placeholder)
  },
  {
    slug: "deluxe-arch",
    name: "Deluxe Arch",
    price: 49.90,
    variantIds: [5902, 5903, 5904, 5905, 5906, 5907, 5908, 5909], // sizes 36-43 (using same as aureastep)
  },
];

const PRICE_TOLERANCE = 0.02; // Allow for floating point rounding errors

function priceMatches(expected: number, actual: number): boolean {
  return Math.abs(expected - actual) <= PRICE_TOLERANCE;
}

export interface CartProduct {
  variantId: number;
  quantity: number;
  subtotal: string;
}

export interface CartPayload {
  products: CartProduct[];
  totalPrice: string;
}

export type ValidationResult =
  | { valid: true }
  | { valid: false; reason: string };

/**
 * Validate the cart payload against the product whitelist
 */
export function validateCart(
  cart: CartPayload,
  slug: string
): ValidationResult {
  // Find the product by slug
  const product = VALID_PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    return { valid: false, reason: "Prodotto non valido" };
  }

  const products = cart.products;

  // Max 2 items: product + optional upsell
  if (!products || products.length === 0 || products.length > 2) {
    return { valid: false, reason: "Carrello non valido" };
  }

  // Find main product and optional upsell
  let mainProduct: CartProduct | undefined;
  let upsellProduct: CartProduct | undefined;

  for (const item of products) {
    if (item.variantId === UPSELL_VARIANT_ID) {
      if (upsellProduct) {
        return { valid: false, reason: "Upsell duplicato" };
      }
      upsellProduct = item;
    } else {
      if (mainProduct) {
        return { valid: false, reason: "Prodotto principale duplicato" };
      }
      mainProduct = item;
    }
  }

  // Must have a main product
  if (!mainProduct) {
    return { valid: false, reason: "Prodotto principale mancante" };
  }

  // Validate main product variant ID
  if (!product.variantIds.includes(mainProduct.variantId)) {
    return { valid: false, reason: "Variante non valida" };
  }

  // Validate main product quantity
  if (mainProduct.quantity !== 1) {
    return { valid: false, reason: "Quantità non valida" };
  }

  // Validate main product subtotal
  const mainSubtotal = parseFloat(mainProduct.subtotal);
  if (!priceMatches(product.price, mainSubtotal)) {
    return { valid: false, reason: "Prezzo prodotto non valido" };
  }

  // Calculate expected total
  let expectedTotal = product.price;

  // If upsell is present, validate it
  if (upsellProduct) {
    if (upsellProduct.quantity !== 1) {
      return { valid: false, reason: "Quantità upsell non valida" };
    }

    const upsellSubtotal = parseFloat(upsellProduct.subtotal);
    if (!priceMatches(UPSELL_PRICE, upsellSubtotal)) {
      return { valid: false, reason: "Prezzo upsell non valido" };
    }

    expectedTotal += UPSELL_PRICE;
  }

  // Validate total price
  const actualTotal = parseFloat(cart.totalPrice);
  if (!priceMatches(expectedTotal, actualTotal)) {
    return { valid: false, reason: "Totale non corrisponde" };
  }

  return { valid: true };
}

/**
 * Get a valid product by slug
 */
export function getValidProduct(slug: string): ValidProduct | undefined {
  return VALID_PRODUCTS.find((p) => p.slug === slug);
}
