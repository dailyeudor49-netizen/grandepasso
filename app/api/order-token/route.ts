import { NextRequest, NextResponse } from "next/server";
import { generateOrderToken } from "@/lib/orderToken";
import { getValidProduct } from "@/lib/validProducts";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { error: "Parametro slug mancante" },
      { status: 400 }
    );
  }

  // Verify this is a valid product slug
  const product = getValidProduct(slug);
  if (!product) {
    return NextResponse.json(
      { error: "Prodotto non valido" },
      { status: 400 }
    );
  }

  try {
    const token = generateOrderToken(slug);
    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error generating order token:", error);
    return NextResponse.json(
      { error: "Errore interno" },
      { status: 500 }
    );
  }
}
