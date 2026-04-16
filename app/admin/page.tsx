import { getOrderStats } from "@/lib/db";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ from?: string; to?: string }>;
}

export default async function AdminPage({ searchParams }: Props) {
  const params = await searchParams;
  const from = params.from || "";
  const to = params.to || "";

  let stats: Awaited<ReturnType<typeof getOrderStats>> | null = null;
  let error = "";

  try {
    stats = await getOrderStats(from || undefined, to || undefined);
  } catch (e: unknown) {
    error = e instanceof Error ? e.message : "Errore DB";
  }

  const peakHour = stats?.byHour.reduce<{ hour: number; count: number } | null>(
    (max, h) => (!max || h.count > max.count ? h : max),
    null
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#f6f6f7", minHeight: "100vh", padding: "32px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 28, fontWeight: 700, marginBottom: 4 }}>
          Pannello Ordini
        </h1>
        <p style={{ color: "#5f6368", fontSize: 14, marginBottom: 28 }}>
          {from && to ? `Dal ${from} al ${to}` : "Tutti gli ordini"}
        </p>

        {/* Filtro date */}
        <form style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28, alignItems: "end" }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4 }}>Da</label>
            <input type="date" name="from" defaultValue={from} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 4 }}>A</label>
            <input type="date" name="to" defaultValue={to} style={inputStyle} />
          </div>
          <button type="submit" style={btnStyle}>Filtra</button>
          {(from || to) && (
            <a href="/admin" style={{ ...btnStyle, background: "#6b7280", textDecoration: "none", textAlign: "center" }}>Reset</a>
          )}
        </form>

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: 14, marginBottom: 20, color: "#dc2626", fontSize: 13 }}>
            {error}
          </div>
        )}

        {stats && (
          <>
            {/* Totale */}
            <div style={cardStyle}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: 1 }}>Ordini totali</div>
              <div style={{ fontSize: 42, fontWeight: 800, fontFamily: "'Poppins', sans-serif", color: "#1a1a1a", marginTop: 4 }}>
                {stats.total}
              </div>
            </div>

            {/* Upsell Plantare (senza +7) */}
            <div style={cardStyle}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: 1 }}>Plantare Ortopedico (upsell)</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 4 }}>
                <span style={{ fontSize: 42, fontWeight: 800, fontFamily: "'Poppins', sans-serif", color: "#0e7490" }}>
                  {stats.upsellCount}
                </span>
                <span style={{ fontSize: 14, color: "#5f6368" }}>
                  su {stats.total} ordini ({stats.total > 0 ? Math.round((stats.upsellCount / stats.total) * 100) : 0}%)
                </span>
              </div>
            </div>

            {/* Per prodotto */}
            <div style={cardStyle}>
              <div style={cardTitle}>Per prodotto</div>
              {stats.byProduct.length === 0 && <p style={{ color: "#888", fontSize: 13 }}>Nessun ordine</p>}
              {stats.byProduct.map((p) => (
                <div key={p.product} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{p.product}</span>
                  <span style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Poppins', sans-serif", color: "#1B5E6B" }}>{p.count}</span>
                </div>
              ))}
            </div>

            {/* Per giorno */}
            <div style={cardStyle}>
              <div style={cardTitle}>Per giorno</div>
              {stats.byDay.length === 0 && <p style={{ color: "#888", fontSize: 13 }}>Nessun dato</p>}
              <div style={{ maxHeight: 320, overflowY: "auto" }}>
                {stats.byDay.map((d) => (
                  <div key={d.day} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f0f0f0" }}>
                    <span style={{ fontSize: 13, color: "#444" }}>{formatDay(d.day)}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: Math.max(4, (d.count / Math.max(...stats!.byDay.map(x => x.count))) * 120), height: 18, background: "#1B5E6B", borderRadius: 4, opacity: 0.8 }} />
                      <span style={{ fontSize: 14, fontWeight: 600, minWidth: 24, textAlign: "right" }}>{d.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Per fascia oraria */}
            <div style={cardStyle}>
              <div style={cardTitle}>Per fascia oraria</div>
              {peakHour && (
                <p style={{ fontSize: 13, color: "#5f6368", marginBottom: 12 }}>
                  Picco: <strong>{peakHour.hour}:00–{peakHour.hour + 1}:00</strong> ({peakHour.count} ordini)
                </p>
              )}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))", gap: 6 }}>
                {stats.byHour.map((h) => (
                  <div key={h.hour} style={{ textAlign: "center", padding: "8px 4px", background: "#f9fafb", borderRadius: 6, border: "1px solid #e5e7eb" }}>
                    <div style={{ fontSize: 11, color: "#888" }}>{String(h.hour).padStart(2, "0")}:00</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#1B5E6B" }}>{h.count}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function formatDay(d: string) {
  try {
    return new Date(d).toLocaleDateString("it-IT", { weekday: "short", day: "numeric", month: "short" });
  } catch {
    return d;
  }
}

const inputStyle: React.CSSProperties = {
  padding: "8px 12px",
  border: "1.5px solid #d1d5db",
  borderRadius: 8,
  fontSize: 14,
  fontFamily: "'Inter', sans-serif",
};

const btnStyle: React.CSSProperties = {
  padding: "8px 20px",
  background: "#1B5E6B",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "'Inter', sans-serif",
};

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e1e1e1",
  borderRadius: 10,
  padding: 24,
  marginBottom: 16,
};

const cardTitle: React.CSSProperties = {
  fontFamily: "'Poppins', sans-serif",
  fontSize: 14,
  fontWeight: 700,
  color: "#1a1a1a",
  marginBottom: 14,
  paddingBottom: 10,
  borderBottom: "1px solid #f0f0f0",
  textTransform: "uppercase",
  letterSpacing: 0.4,
};
