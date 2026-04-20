import { NextRequest, NextResponse } from "next/server";
import { phoneExists, registerOrder } from "@/lib/db";
import { validateOrderToken } from "@/lib/orderToken";
import { validateCart } from "@/lib/validProducts";

const FULLSHIP_API_URL =
  process.env.FULLSHIP_API_URL ||
  "https://fullship-proxy.marco-quaranta-info.workers.dev";

// Allowed origins for the order API
const ALLOWED_ORIGINS = [
  "https://grandepasso.it",
  "https://www.grandepasso.it",
  "https://grandepassoit.com",
  "https://www.grandepassoit.com",
  "https://grandepasso.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
];

// Italian phone regex: optional +39, then 3 followed by 8-9 digits
const ITALIAN_PHONE_REGEX = /^(\+39)?3\d{8,9}$/;

function normalizePhone(phone: string): string {
  return phone.replace(/\s+/g, "").replace(/^(\+39)?/, "");
}

function validateItalianPhone(phone: string): boolean {
  const normalized = phone.replace(/\s+/g, "");
  return ITALIAN_PHONE_REGEX.test(normalized);
}

function checkOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");

  // Check Origin header first
  if (origin) {
    return ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed));
  }

  // Fall back to Referer header
  if (referer) {
    return ALLOWED_ORIGINS.some((allowed) => referer.startsWith(allowed));
  }

  // In development, allow requests without origin/referer (e.g., from Postman)
  if (process.env.NODE_ENV === "development") {
    return true;
  }

  return false;
}

export async function POST(req: NextRequest) {
  try {
    // ═══════════════════════════════════════════════════════════════
    // 1. ORIGIN CHECK
    // ═══════════════════════════════════════════════════════════════
    if (!checkOrigin(req)) {
      return NextResponse.json(
        { detail: "Accesso non autorizzato" },
        { status: 403 }
      );
    }

    const body = await req.json();

    // ═══════════════════════════════════════════════════════════════
    // 2. HONEYPOT CHECK
    // If the hidden "website" field is filled, it's likely a bot
    // Return 200 to not reveal detection to the bot
    // ═══════════════════════════════════════════════════════════════
    if (body.website && body.website.trim() !== "") {
      // Silent success - don't reveal to bot that we caught them
      return NextResponse.json({ success: true, orderId: "AC-" + Date.now() });
    }

    // ═══════════════════════════════════════════════════════════════
    // 3. TOKEN HMAC VALIDATION
    // ═══════════════════════════════════════════════════════════════
    const orderToken = body._orderToken;
    const slug = body.pageId;

    if (!slug) {
      return NextResponse.json(
        { detail: "Prodotto non specificato" },
        { status: 400 }
      );
    }

    const tokenResult = validateOrderToken(orderToken, slug);
    if (!tokenResult.valid) {
      return NextResponse.json(
        { detail: tokenResult.reason },
        { status: 403 }
      );
    }

    // Remove the token from payload before forwarding to fulfillment
    const { _orderToken, website, ...cleanBody } = body;

    // ═══════════════════════════════════════════════════════════════
    // 4. REQUIRED FIELDS VALIDATION
    // ═══════════════════════════════════════════════════════════════
    const customer = cleanBody.customer;
    if (!customer) {
      return NextResponse.json(
        { detail: "Dati cliente mancanti" },
        { status: 400 }
      );
    }

    const requiredFields = [
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
      "city",
      "state",
      "zip",
    ];
    for (const field of requiredFields) {
      if (!customer[field] || String(customer[field]).trim() === "") {
        return NextResponse.json(
          { detail: `Campo ${field} obbligatorio` },
          { status: 400 }
        );
      }
    }

    // ═══════════════════════════════════════════════════════════════
    // 5. PHONE VALIDATION
    // ═══════════════════════════════════════════════════════════════
    const phone: string = customer.phoneNumber || "";
    if (!validateItalianPhone(phone)) {
      return NextResponse.json(
        { detail: "Numero di telefono non valido" },
        { status: 400 }
      );
    }

    // ═══════════════════════════════════════════════════════════════
    // 6. CART VALIDATION (SERVER-SIDE WHITELIST)
    // ═══════════════════════════════════════════════════════════════
    const cart = cleanBody.cart;
    if (!cart) {
      return NextResponse.json(
        { detail: "Carrello mancante" },
        { status: 400 }
      );
    }

    const cartValidation = validateCart(cart, slug);
    if (!cartValidation.valid) {
      return NextResponse.json(
        { detail: "Ordine non valido" },
        { status: 400 }
      );
    }

    // ═══════════════════════════════════════════════════════════════
    // 7. REDIS/DATABASE DEDUPLICATION
    // If database is down, BLOCK the order (failsafe)
    // ═══════════════════════════════════════════════════════════════
    const product: string =
      cleanBody.cart?.productName || cleanBody.productTitle || "Sconosciuto";
    const upsell: boolean = !!cleanBody.upsell;

    try {
      const exists = await phoneExists(phone);
      if (exists) {
        return NextResponse.json({ duplicate: true }, { status: 409 });
      }
    } catch (dbError) {
      // Database is down - BLOCK the order (Redis failsafe policy)
      console.error("Database unavailable during order:", dbError);
      return NextResponse.json(
        { detail: "Servizio temporaneamente non disponibile" },
        { status: 503 }
      );
    }

    // ═══════════════════════════════════════════════════════════════
    // ALL CHECKS PASSED - Forward to fulfillment
    // ═══════════════════════════════════════════════════════════════
    const res = await fetch(FULLSHIP_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanBody),
    });

    const data = await res.json();

    if (res.ok) {
      // Register order in DB (fire and forget)
      try {
        await registerOrder(product, phone, upsell);
      } catch {
        // Order already sent to fullship, proceed even if DB fails here
        console.error("Failed to register order in database");
      }
    }

    return NextResponse.json(data, { status: res.status });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore di rete";
    return NextResponse.json({ detail: message }, { status: 500 });
  }
}
