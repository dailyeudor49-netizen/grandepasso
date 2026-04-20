"use client";

import { useState, useEffect, useRef } from "react";

/* ───────────────────────── Hero Badge ───────────────────────── */

function HeroBadge() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const viewersRef = useRef(Math.floor(Math.random() * (85 - 15 + 1)) + 15);

  const messages = [
    "🔥 Ultimi pezzi disponibili",
    "🚚 Consegna Gratuita oggi",
    `👀 ${viewersRef.current} persone stanno visualizzando ora`,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => {
          const next = (prev + 1) % 3;
          if (next === 2) {
            viewersRef.current = Math.max(15, Math.min(85, viewersRef.current + Math.floor(Math.random() * 7) - 3));
          }
          return next;
        });
        setVisible(true);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentMessages = [
    messages[0],
    messages[1],
    `👀 ${viewersRef.current} persone stanno visualizzando ora`,
  ];

  return (
    <div
      className={`mt-2 max-w-fit rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-2 text-center text-xs font-bold text-white transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {currentMessages[index]}
    </div>
  );
}

/* ───────────────────────── Hero Gallery ───────────────────────── */

const THUMBS_VISIBLE = 5;

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
        <span className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
          -50% OGGI
        </span>
      </div>
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <img
          key={active}
          src={images[active]}
          alt={`AureaCloud - Foto ${active + 1}`}
          className="h-full w-full object-contain animate-fade-in"
        />
        {/* Prev / Next */}
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-gray-700 shadow-sm backdrop-blur-sm transition hover:bg-white" aria-label="Immagine precedente">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-gray-700 shadow-sm backdrop-blur-sm transition hover:bg-white" aria-label="Immagine successiva">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
      {/* Thumbnails (mobile): max 5 with sliding window */}
      <div className="mt-3 flex items-center gap-1.5 md:hidden">
        {total > THUMBS_VISIBLE && (
          <button
            onClick={() => setThumbStart((s) => Math.max(0, s - 1))}
            disabled={thumbStart === 0}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition hover:bg-gray-200 disabled:opacity-30"
            aria-label="Miniature precedenti"
          >
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        )}
        <div className="grid flex-1 grid-cols-5 gap-1.5">
          {visibleThumbs.map((src, i) => {
            const realIndex = thumbStart + i;
            return (
              <button
                key={realIndex}
                onClick={() => { setAutoplay(false); setActive(realIndex); }}
                className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                  realIndex === active ? "border-pink-600 ring-2 ring-pink-600/20" : "border-gray-200"
                }`}
              >
                <img src={src} alt={`Miniatura ${realIndex + 1}`} className="h-full w-full object-cover" loading="lazy" />
              </button>
            );
          })}
        </div>
        {total > THUMBS_VISIBLE && (
          <button
            onClick={() => setThumbStart((s) => Math.min(total - THUMBS_VISIBLE, s + 1))}
            disabled={thumbStart >= total - THUMBS_VISIBLE}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition hover:bg-gray-200 disabled:opacity-30"
            aria-label="Miniature successive"
          >
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        )}
      </div>
      {/* Thumbnails (desktop) */}
      <div className="mt-3 hidden items-center gap-1.5 md:flex">
        {/* Thumb prev */}
        {total > THUMBS_VISIBLE && (
          <button
            onClick={() => setThumbStart((s) => Math.max(0, s - 1))}
            disabled={thumbStart === 0}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition hover:bg-gray-200 disabled:opacity-30"
            aria-label="Miniature precedenti"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        )}
        <div className="grid flex-1 grid-cols-5 gap-2">
          {visibleThumbs.map((src, i) => {
            const realIndex = thumbStart + i;
            return (
              <button
                key={realIndex}
                onClick={() => { setAutoplay(false); setActive(realIndex); }}
                className={`aspect-square overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                  realIndex === active ? "border-pink-600 ring-2 ring-pink-600/20 shadow-sm" : "border-gray-200 hover:border-pink-300"
                }`}
              >
                <img src={src} alt={`Miniatura ${realIndex + 1}`} className="h-full w-full object-cover" loading="lazy" />
              </button>
            );
          })}
        </div>
        {/* Thumb next */}
        {total > THUMBS_VISIBLE && (
          <button
            onClick={() => setThumbStart((s) => Math.min(total - THUMBS_VISIBLE, s + 1))}
            disabled={thumbStart >= total - THUMBS_VISIBLE}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition hover:bg-gray-200 disabled:opacity-30"
            aria-label="Miniature successive"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        )}
      </div>
      {/* Badge persone sotto il carosello */}
      <HeroBadge />
    </div>
  );
}



/* ───────────────────────── LP Reviews ───────────────────────── */

const lpReviewData = [
  {
    batch: 1,
    initial: "F",
    color: "#9333ea",
    name: "Francesca M.",
    date: "2 giorni fa",
    stars: 5,
    text: "Non credevo fossero così comode! Le ho prese per il mare ma le uso anche per andare a fare la spesa, all'aperitivo, ovunque. E nessuno ha capito che il rialzo è nascosto nella suola. Sono 6cm più alta e sto benissimo!",
    response: "Ciao Francesca! Grazie mille per la tua recensione! Siamo felici che le AureaCloud ti accompagnino in ogni momento della giornata. Il comfort e il rialzo invisibile sono proprio il nostro punto di forza!"
  },
  {
    batch: 1,
    initial: "A",
    color: "#ec4899",
    name: "Anna G.",
    date: "5 giorni fa",
    stars: 5,
    text: "Sono bassa (1.55) e odiavo le ciabatte piatte. Queste sono una rivoluzione. Morbidissime tipo Crocs ma con il rialzo che mi fa sentire finalmente alta. Le amiche sono impazzite, ne ho già regalate 3 paia."
  },
  {
    batch: 1,
    initial: "G",
    color: "#3b82f6",
    name: "Giulia T.",
    date: "1 settimana fa",
    stars: 5,
    text: "Le ho viste su TikTok e dovevo provarle. Sono arrivate in 2 giorni, la qualità è ottima, e i 6cm di rialzo sono davvero invisibili. Sembro più alta ma nessuno capisce il trucco. Consigliatissime!",
    response: "Grazie Giulia! Siamo contentissimi che tu sia soddisfatta! La discrezione è la chiave del nostro design. Buona continuazione con le tue AureaCloud!"
  },
  {
    batch: 2,
    initial: "D",
    color: "#f59e0b",
    name: "Daniela P.",
    date: "2 settimane fa",
    stars: 5,
    text: "Comodissime! Le porto tutto il giorno senza problemi. Il materiale è morbidissimo e il rialzo non si vede proprio. Perfette per chi vuole essere comoda e allo stesso tempo sentirsi più alta."
  },
  {
    batch: 2,
    initial: "P",
    color: "#10b981",
    name: "Paola R.",
    date: "2 settimane fa",
    stars: 5,
    text: "Avevo dei dubbi ma sono rimasta molto soddisfatta. La qualità è ottima e sono super leggere. Le consiglio a tutte!"
  },
  {
    batch: 2,
    initial: "S",
    color: "#ef4444",
    name: "Sara B.",
    date: "3 settimane fa",
    stars: 5,
    text: "Finalmente una ciabatta che mi fa sentire alta senza sacrificare il comfort! Le uso sia in casa che fuori. Ottime!"
  },
];

export function LpReviews() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const reviewsPerPage = 3;
  const totalPages = Math.ceil(lpReviewData.length / reviewsPerPage);
  const startIdx = (currentPage - 1) * reviewsPerPage;
  const visibleReviews = lpReviewData.slice(startIdx, startIdx + reviewsPerPage);

  return (
    <>
      {/* Reviews Grid */}
      <div className="mb-6 space-y-4">
        {visibleReviews.map((r, i) => (
          <div key={i} className="rounded-[14px] border border-[#E2E4E8] bg-white p-5 shadow-[0_1px_3px_rgba(26,25,23,0.04)]">
            {/* Header */}
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[16px] font-bold text-white"
                  style={{ backgroundColor: r.color }}
                >
                  {r.initial}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-[#1A1917]">{r.name}</span>
                    <span className="text-[13px] text-[#9B9790]">{r.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[...Array(r.stars)].map((_, idx) => (
                        <svg key={idx} className="h-3.5 w-3.5 fill-[#D97706]" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                        </svg>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-[5px] bg-[#E6F4EC] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#2B6E44]">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Acquisto verificato
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Text */}
            <p className="mb-3 text-[14px] leading-[1.65] text-[#5A5752]">{r.text}</p>

            {/* Response from Shop */}
            {r.response && (
              <div className="mt-3 rounded-[8px] border-l-4 border-[#FF6B35] bg-[#FFF5F0] p-4">
                <p className="mb-2 text-[13px] font-bold text-[#1A1917]">Risposta di Calzame</p>
                <p className="text-[13px] leading-[1.65] text-[#5A5752]">{r.response}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mb-6 flex items-center justify-center gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`flex h-10 w-10 items-center justify-center rounded-[8px] text-[14px] font-bold transition-colors ${
              currentPage === i + 1
                ? "bg-[#3b82f6] text-white"
                : "border border-[#E2E4E8] bg-white text-[#5A5752] hover:border-[#3b82f6]"
            }`}
          >
            {i + 1}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-[#E2E4E8] bg-white text-[14px] font-bold text-[#5A5752] hover:border-[#3b82f6]"
          >
            ›
          </button>
        )}
      </div>

      {/* Show More Dropdown Button */}
      <div className="mb-6 text-center">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="inline-flex items-center gap-2 rounded-[8px] border border-[#E2E4E8] bg-white px-4 py-2 text-[14px] font-bold text-[#5A5752] transition-colors hover:border-[#3b82f6]"
        >
          Mostra altre recensioni
          <svg viewBox="0 0 24 24" className={`h-4 w-4 transition-transform ${showDropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Write Review Button */}
      <div className="text-center">
        <button
          onClick={() => setFormSubmitted(false)}
          className="inline-flex items-center gap-2 rounded-[14px] border-2 border-[#3b82f6] bg-white px-6 py-3 text-[14px] font-bold text-[#3b82f6] transition-colors hover:bg-[#3b82f6] hover:text-white shadow-[0_1px_3px_rgba(26,25,23,0.04)]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Scrivi una recensione
        </button>
      </div>

      {/* Review Form Modal */}
      {!formSubmitted && (
        <div className="lp-rev-form-wrap mt-6 hidden">
          <h3>Lascia la tua recensione</h3>
          <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}>
            <div className="lp-rev-field">
              <label htmlFor="lp-rv-name">Nome *</label>
              <input type="text" id="lp-rv-name" placeholder="Il tuo nome" required />
            </div>
            <div className="lp-rev-field">
              <label>Punteggio *</label>
              <div className="lp-star-select">
                <input type="radio" id="lp-s5" name="lp-rating" value="5" required /><label htmlFor="lp-s5">★</label>
                <input type="radio" id="lp-s4" name="lp-rating" value="4" /><label htmlFor="lp-s4">★</label>
                <input type="radio" id="lp-s3" name="lp-rating" value="3" /><label htmlFor="lp-s3">★</label>
                <input type="radio" id="lp-s2" name="lp-rating" value="2" /><label htmlFor="lp-s2">★</label>
                <input type="radio" id="lp-s1" name="lp-rating" value="1" /><label htmlFor="lp-s1">★</label>
              </div>
            </div>
            <div className="lp-rev-field">
              <label htmlFor="lp-rv-text">La tua recensione *</label>
              <textarea id="lp-rv-text" placeholder="Raccontaci la tua esperienza con le AureaCloud..." required />
            </div>
            <button type="submit" className="lp-rev-submit">Invia recensione</button>
          </form>
        </div>
      )}
    </>
  );
}

/* ───────────────────────── LP FAQ ───────────────────────── */

const lpFaqData = [
  { q: "Si vede che hanno il rialzo?", a: "Assolutamente no. I 6cm sono completamente integrati nella suola platform. Dall'esterno sembrano delle normalissime ciabatte trendy stile Crocs/Labubu. Il design è studiato per nascondere completamente il rialzo." },
  { q: "Sono comode come le Crocs?", a: "Sì! Utilizziamo lo stesso materiale cloud ultra-morbido. La differenza è che le AureaCloud hanno il rialzo segreto integrato. Stessa comodità leggendaria, ma con 6cm in più di altezza." },
  { q: "Posso usarle al mare e in piscina?", a: "Certo! Sono resistenti all'acqua, asciugano velocemente grazie ai fori di aerazione, e la suola anti-scivolo le rende sicure anche su superfici bagnate." },
  { q: "Come funziona il pagamento?", a: "Fai l'ordine online, ti contattiamo via WhatsApp per confermare. Il pacco parte con GLS e paghi in contanti al corriere. Senza carta né anticipi." },
  { q: "Come scelgo la taglia?", a: "Le AureaCloud calzano regolare. Se sei tra due taglie, scegli la più grande. Scrivici su WhatsApp se hai dubbi — il cambio taglia è gratuito." },
  { q: "Posso restituirle?", a: "Sì. 30 giorni per provarle. Non ti convincono — le rimandi indietro gratis. Senza complicazioni. Soddisfatta o rimborsata." },
];

export function LpFaq() {
  return (
    <div className="space-y-3">
      {lpFaqData.map((item, i) => (
        <details key={i} className="group rounded-[14px] border border-[#E2E4E8] bg-white shadow-[0_1px_3px_rgba(26,25,23,0.04)]">
          <summary className="flex cursor-pointer items-center justify-between p-4 text-[16px] font-bold text-[#1A1917] list-none">
            <span>{item.q}</span>
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-4 pb-4 pt-0 text-[14px] leading-[1.65] text-[#5A5752]">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}

/* ───────────────────────── Sticky Order Button ───────────────────────── */

export function StickyOrderButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let io: IntersectionObserver | null = null;

    const setup = () => {
      const orderBtn = document.getElementById("ordina");
      const footer = document.querySelector("footer");
      if (!orderBtn) {
        requestAnimationFrame(setup);
        return;
      }

      let btnPassed = false;
      let footerVisible = false;

      const update = () => setShow(btnPassed && !footerVisible);

      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.target === orderBtn) {
              btnPassed = !entry.isIntersecting && entry.boundingClientRect.top < 0;
            } else if (entry.target === footer) {
              footerVisible = entry.isIntersecting;
            }
          }
          update();
        },
        { threshold: 0 }
      );

      io.observe(orderBtn);
      if (footer) io.observe(footer);
    };

    setup();
    return () => { if (io) io.disconnect(); };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 flex items-center justify-between bg-white px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
      <span className="flex items-center gap-2">
        <span className="text-lg font-extrabold text-green-600">€49,90</span>
        <span className="text-sm font-medium text-gray-400 line-through">€99,90</span>
      </span>
      <a
        href="#taglie"
        style={{ background: "linear-gradient(to bottom, #ec4899, #db2777)" }}
        className="rounded-full px-6 py-3 text-sm font-extrabold text-white shadow-[0_4px_12px_rgba(236,72,153,0.3)] active:scale-[0.97]"
      >
        Ordina Ora
      </a>
    </div>
  );
}
