"use client";

import { useState, useEffect } from "react";

/* ═══════════════════ Constants ═══════════════════ */
const THUMBS_VISIBLE = 4;

/* ───────────────────────── Hero Gallery ───────────────────────── */

export function HeroGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const [thumbStart, setThumbStart] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const total = images.length;

  // Keep active thumb visible in the sliding window
  useEffect(() => {
    if (active < thumbStart) setThumbStart(active);
    else if (active >= thumbStart + THUMBS_VISIBLE) setThumbStart(active - THUMBS_VISIBLE + 1);
  }, [active, thumbStart]);

  // Autoplay every 3s
  useEffect(() => {
    if (!autoplay || total <= 1) return;
    const id = setInterval(() => {
      setActive((a) => (a === total - 1 ? 0 : a + 1));
    }, 3000);
    return () => clearInterval(id);
  }, [autoplay, total]);

  const prev = () => { setAutoplay(false); setActive((a) => (a === 0 ? total - 1 : a - 1)); };
  const next = () => { setAutoplay(false); setActive((a) => (a === total - 1 ? 0 : a + 1)); };

  if (total === 0) return null;

  const visibleThumbs = images.slice(thumbStart, thumbStart + THUMBS_VISIBLE);

  return (
    <div className="md:sticky md:top-24">
      {/* Badge -50% sopra il carosello */}
      <div className="mb-2 flex justify-start">
        <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
          -50%
        </span>
      </div>
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <img
          src={images[active]}
          alt={`SlimWalk - immagine ${active + 1}`}
          className="h-full w-full object-contain"
        />
        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-md hover:bg-white"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-gray-700" fill="none" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-md hover:bg-white"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-gray-700" fill="none" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails with sliding window navigation */}
      {total > 1 && (
        <div className="mt-3 flex items-center gap-2">
          {/* Left scroll button */}
          <button
            onClick={() => setThumbStart((s) => Math.max(0, s - 1))}
            disabled={thumbStart === 0}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-gray-600" fill="none" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          {/* Thumbnails */}
          <div className="flex flex-1 gap-2 justify-center">
            {visibleThumbs.map((src, i) => {
              const realIndex = thumbStart + i;
              return (
                <button
                  key={realIndex}
                  onClick={() => { setAutoplay(false); setActive(realIndex); }}
                  className={`aspect-square w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-white transition-all ${
                    active === realIndex ? "border-pink-500 shadow-md" : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img src={src} alt={`Thumb ${realIndex + 1}`} className="h-full w-full object-cover" />
                </button>
              );
            })}
          </div>

          {/* Right scroll button */}
          <button
            onClick={() => setThumbStart((s) => Math.min(total - THUMBS_VISIBLE, s + 1))}
            disabled={thumbStart >= total - THUMBS_VISIBLE}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-gray-600" fill="none" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      )}
      {/* Badge persone sotto il carosello */}
      <HeroBadge />
    </div>
  );
}



/* ───────────────────────── LP Reviews ───────────────────────── */

// 3 batches of 3 reviews each
const reviewBatches = [
  [
    { name: "Giulia M.", loc: "Milano", text: "Ho perso 3 cm di coscia in un mese. SENZA dieta, SENZA palestra. Solo camminando con SlimWalk. Mio marito non ci credeva, mi ha chiesto se faccio esercizi di nascosto!", stars: 5 },
    { name: "Francesca R.", loc: "Roma", text: "La cellulite sulle cosce era il mio incubo. Dopo 4 settimane è ancora lì ma MOLTO meno visibile. Finalmente posso mettere i pantaloncini senza vergognarmi.", stars: 5 },
    { name: "Maria T.", loc: "Napoli", text: "A 58 anni pensavo di dovermi rassegnare alle gambe flaccide. Queste scarpe mi hanno fatto cambiare idea. Le sento lavorare ad ogni passo. Glutei più tonici, gambe più leggere.", stars: 5 },
  ],
  [
    { name: "Laura S.", loc: "Torino", text: "Lavoro in piedi 8 ore al giorno. Prima arrivavo a sera con le gambe gonfie come palloni. Con SlimWalk la differenza è incredibile. E le cosce si stanno tonificando!", stars: 5 },
    { name: "Chiara B.", loc: "Firenze", text: "Dopo 2 gravidanze il mio corpo era un disastro. Non avevo tempo per la palestra. SlimWalk mi ha ridato speranza. In 5 settimane ho visto risultati che non vedevo da anni.", stars: 5 },
    { name: "Roberta P.", loc: "Bologna", text: "Scettica all'inizio. Ma i numeri non mentono: ho perso 2 cm di girovita e 2.5 di cosce. Cammino uguale come prima, solo con scarpe diverse. Assurdo ma vero.", stars: 4 },
  ],
  [
    { name: "Antonella D.", loc: "Palermo", text: "Il mio lato B era sparito dopo i 50. Piatto, cadente. Con SlimWalk sento i glutei lavorare ad ogni passo. Dopo un mese i jeans mi stanno meglio. Non miracoli, ma risultati VERI.", stars: 5 },
    { name: "Valentina G.", loc: "Verona", text: "Ho speso centinaia di euro in creme anticellulite inutili. SlimWalk costa meno di una di quelle creme e funziona DAVVERO. La buccia d'arancia si è ridotta tantissimo.", stars: 5 },
    { name: "Paola F.", loc: "Genova", text: "Sono una scettica per natura. Ma queste scarpe mi hanno fatto ricredere. Non sono magiche, devi camminare, ma il risultato c'è. Gambe più toniche e snelle. Lo vedo, lo sento.", stars: 5 },
  ],
];

export function LpReviews() {
  const [batch, setBatch] = useState(0);
  const reviews = reviewBatches[batch];

  const loadMore = () => {
    if (batch < reviewBatches.length - 1) setBatch(batch + 1);
    else setBatch(0);
  };

  return (
    <>
      <div className="lp-revs">
        {reviews.map((r) => (
          <div key={r.name} className="lp-rev">
            <div className="lp-rev-h">
              <div className="lp-rev-av">{r.name[0]}</div>
              <div>
                <div className="lp-rev-name">{r.name}</div>
                <div className="lp-rev-meta">✓ Acquisto verificato · {r.loc}</div>
              </div>
              <div className="lp-rev-stars ml-auto">{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</div>
            </div>
            <p>{r.text}</p>
          </div>
        ))}
      </div>
      <button className="lp-revs-more" onClick={loadMore}>
        {batch < reviewBatches.length - 1 ? "Mostra altre recensioni" : "Torna alle prime recensioni"}
      </button>
    </>
  );
}

/* ───────────────────────── LP FAQ ───────────────────────── */

const faqs = [
  { q: "Funziona davvero per tonificare?", a: "Sì. La suola RockerTone™ crea una leggera instabilità che obbliga glutei, cosce e polpacci a lavorare ad ogni passo. È lo stesso principio delle tavole propriocettive usate in riabilitazione e fitness. Con 8.000 passi al giorno, sono migliaia di micro-contrazioni muscolari quotidiane." },
  { q: "Quanto tempo ci vuole per vedere risultati?", a: "La maggior parte delle nostre clienti riporta i primi cambiamenti visibili dopo 3-4 settimane di uso quotidiano. Gambe meno gonfie dalla prima settimana, tonificazione e riduzione della cellulite dalla terza/quarta settimana. I risultati variano in base alla costanza d'uso." },
  { q: "Devo fare dieta o esercizi insieme?", a: "No, non è necessario. SlimWalk funziona semplicemente camminando normalmente. Ovviamente, abbinare un'alimentazione equilibrata e attività fisica può accelerare i risultati, ma non è obbligatorio per vedere miglioramenti." },
  { q: "Sono comode per stare in piedi tutto il giorno?", a: "Assolutamente sì. La suola ammortizzante e la tomaia traspirante le rendono perfette anche per chi lavora in piedi. Molte clienti le usano 8-10 ore al giorno senza problemi." },
  { q: "Come scelgo la taglia giusta?", a: "SlimWalk veste regolare. Se sei tra due taglie, ti consigliamo di scegliere quella più grande. Se hai il piede largo, prendi mezza taglia in più." },
  { q: "Posso restituirle se non mi piacciono?", a: "Certo! Hai 30 giorni di tempo per restituirle se non sei soddisfatta. Ti rimborsiamo l'intero importo senza fare domande. Zero rischi per te." },
  { q: "Come funziona il pagamento alla consegna?", a: "Semplicissimo: ordini ora senza pagare nulla. Quando il corriere arriva con il pacco, paghi in contanti direttamente a lui. Nessun anticipo, nessun rischio." },
  { q: "La spedizione è davvero gratuita?", a: "Sì, la spedizione Express con GLS è completamente gratuita. Consegna in 24-48 ore lavorative in tutta Italia." },
];

export function LpFaq() {
  return (
    <div>
      {faqs.map((f) => (
        <details key={f.q} className="lp-faq">
          <summary>{f.q}</summary>
          <div className="lp-faq-b">{f.a}</div>
        </details>
      ))}
    </div>
  );
}

/* ───────────────────────── Sticky Order Button ───────────────────────── */

export function StickyOrderButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToOrder = () => {
    const el = document.getElementById("ordina");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[9999] transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">SlimWalk</p>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold text-green-600">€49,90</span>
              <span className="text-sm text-gray-400 line-through">€99,90</span>
            </div>
          </div>
          <button
            onClick={scrollToOrder}
            className="shrink-0 px-6 py-3 rounded-full text-white text-sm font-bold shadow-lg"
            style={{ background: "linear-gradient(to bottom, #ec4899, #db2777)" }}
          >
            Ordina Ora
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── HeroBadge ───────────────────────── */

function HeroBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(Math.floor(Math.random() * 30) + 45);
  }, []);

  if (count === 0) return null;

  return (
    <div className="mt-3 flex items-center justify-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-sm shadow-sm">
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pink-500" />
      </span>
      <span className="font-medium text-pink-700">
        <strong>{count} persone</strong> stanno guardando questo prodotto
      </span>
    </div>
  );
}
