import { NextRequest, NextResponse } from "next/server";
import { updatePhone } from "@/lib/db";

const FULLSHIP_API_URL =
  process.env.FULLSHIP_API_URL ||
  "https://fullship-proxy.marco-quaranta-info.workers.dev";

export async function POST(req: NextRequest) {
  try {
    const { oldPhone, newPhone, payload } = await req.json();

    if (!oldPhone || !newPhone || !payload) {
      return NextResponse.json({ error: "Dati mancanti" }, { status: 400 });
    }

    // Update phone in DB (best effort)
    try {
      await updatePhone(oldPhone, newPhone);
    } catch {
      // DB down — proceed to re-send anyway
    }

    // Update phone and generate new order code to avoid FullShip duplicate rejection
    payload.customer.phoneNumber = newPhone;
    if (payload.cart) {
      payload.cart.code = String(Date.now());
    }

    // Re-send to FullShip
    const res = await fetch(FULLSHIP_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: "FullShip ha rifiutato l'ordine", detail: data },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore di rete";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
