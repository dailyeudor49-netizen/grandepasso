import { createHmac } from "crypto";

const TOKEN_EXPIRY_MS = 30 * 60 * 1000; // 30 minutes

function getSecret(): string {
  const secret = process.env.ORDER_TOKEN_SECRET;
  if (!secret) {
    throw new Error("ORDER_TOKEN_SECRET environment variable is not set");
  }
  return secret;
}

/**
 * Generate an HMAC-signed order token bound to a specific product slug
 * Format: "timestamp.signature"
 */
export function generateOrderToken(slug: string): string {
  const timestamp = Date.now().toString();
  const data = `${timestamp}:${slug}`;
  const signature = createHmac("sha256", getSecret())
    .update(data)
    .digest("hex");
  return `${timestamp}.${signature}`;
}

/**
 * Validate an order token
 * Returns { valid: true } if token is valid and not expired
 * Returns { valid: false, reason: string } otherwise
 */
export function validateOrderToken(
  token: string,
  slug: string
): { valid: true } | { valid: false; reason: string } {
  if (!token || typeof token !== "string") {
    return { valid: false, reason: "Token mancante" };
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return { valid: false, reason: "Formato token non valido" };
  }

  const [timestampStr, providedSignature] = parts;
  const timestamp = parseInt(timestampStr, 10);

  if (isNaN(timestamp)) {
    return { valid: false, reason: "Timestamp non valido" };
  }

  // Check expiration
  const age = Date.now() - timestamp;
  if (age > TOKEN_EXPIRY_MS) {
    return { valid: false, reason: "Sessione scaduta" };
  }

  if (age < 0) {
    return { valid: false, reason: "Token dal futuro" };
  }

  // Verify signature
  const data = `${timestampStr}:${slug}`;
  const expectedSignature = createHmac("sha256", getSecret())
    .update(data)
    .digest("hex");

  // Constant-time comparison to prevent timing attacks
  if (providedSignature.length !== expectedSignature.length) {
    return { valid: false, reason: "Firma non valida" };
  }

  let mismatch = 0;
  for (let i = 0; i < providedSignature.length; i++) {
    mismatch |= providedSignature.charCodeAt(i) ^ expectedSignature.charCodeAt(i);
  }

  if (mismatch !== 0) {
    return { valid: false, reason: "Firma non valida" };
  }

  return { valid: true };
}
