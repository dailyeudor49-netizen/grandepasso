"use client";

import { useState, useEffect, useRef } from "react";

/* ───────────────────────── Hero Badge ───────────────────────── */

function HeroBadge() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const viewersRef = useRef(Math.floor(Math.random() * (70 - 9 + 1)) + 9);

  const messages = [
    "Ultimi pezzi disponibili",
    "Consegna Gratuita oggi",
    `${viewersRef.current} persone stanno visualizzando ora`,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => {
          const next = (prev + 1) % 3;
          if (next === 2) {
            viewersRef.current = Math.max(9, Math.min(70, viewersRef.current + Math.floor(Math.random() * 7) - 3));
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
    `${viewersRef.current} persone stanno visualizzando ora`,
  ];

  return (
    <div
      className={`mt-2 max-w-fit rounded-lg bg-blue-500 px-3 py-2 text-center text-xs font-bold text-white transition-opacity duration-300 ${
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
        <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
          -50%
        </span>
      </div>
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <img
          key={active}
          src={images[active]}
          alt={`LuxeStep Pro - Foto ${active + 1}`}
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
                  realIndex === active ? "border-blue-600 ring-2 ring-blue-600/20" : "border-gray-200"
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
                  realIndex === active ? "border-blue-600 ring-2 ring-blue-600/20 shadow-sm" : "border-gray-200 hover:border-blue-300"
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
  { batch: 1, av: "L", name: "Laura M.", meta: "✓ Verificata · Milano · Infermiera", stars: "★★★★★", text: "12 ore in corsia ogni giorno. Con le LuxeFlex arrivo a fine turno senza avere i piedi distrutti. Le colleghe me le chiedono tutte." },
  { batch: 1, av: "F", name: "Francesca R.", meta: "✓ Verificata · Roma · Commessa", stars: "★★★★★", text: "Lavoro in un grande magazzino, sempre in piedi. Queste scarpe sono una svolta: leggere, morbide e non stringono quando i piedi si gonfiano." },
  { batch: 1, av: "G", name: "Giulia P.", meta: "✓ Verificata · Napoli · Insegnante", stars: "★★★★★", text: "Stare 5 ore in piedi in classe mi uccideva la schiena. Dopo una settimana con LuxeFlex noto già la differenza. Le consiglio a tutte le colleghe." },
  { batch: 2, av: "A", name: "Anna B.", meta: "✓ Verificata · Bologna · OSS", stars: "★★★★★", text: "Turni da 10 ore in RSA. Prima tornavo a casa coi piedi gonfi e doloranti. Ora no. Le LuxeFlex mi hanno cambiato la vita lavorativa." },
  { batch: 2, av: "M", name: "Maria C.", meta: "✓ Verificata · Torino · Parrucchiera", stars: "★★★★★", text: "8 ore in piedi in salone. Il knit si adatta perfettamente, non stringe mai. E la suola è morbidissima. Le ho comprate anche per la mia dipendente." },
  { batch: 2, av: "S", name: "Sara L.", meta: "✓ Verificata · Firenze · Barista", stars: "★★★★☆", text: "Comodissime, arrivo a fine serata molto meno stanca. L'unico dubbio era la taglia ma mi hanno consigliato bene su WhatsApp. 4 stelle solo perché vorrei più colori!" },
  { batch: 3, av: "E", name: "Elena V.", meta: "✓ Verificata · Palermo · Farmacista", stars: "★★★★★", text: "10 ore dietro al banco. Queste scarpe sono leggerissime e il plantare fa la differenza. Non torno più indietro." },
  { batch: 3, av: "R", name: "Rosa T.", meta: "✓ Verificata · Bari · Estetista", stars: "★★★★★", text: "Lavoro in piedi tutto il giorno con clienti. Le LuxeFlex sono comode, eleganti e professionali. Le mie clienti me le chiedono sempre." },
  { batch: 3, av: "C", name: "Chiara N.", meta: "✓ Verificata · Verona · Hostess", stars: "★★★★★", text: "Eventi da 8 ore in piedi. Finalmente una scarpa comoda che non sembra da ospedale. Arrivate in 2 giorni, qualità ottima." },
];

export function LpReviews() {
  const [visibleBatch, setVisibleBatch] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <>
      <div className="lp-revs">
        {lpReviewData.filter((r) => r.batch <= visibleBatch).map((r, i) => (
          <div key={i} className="lp-rev">
            <div className="lp-rev-h">
              <div className="lp-rev-av">{r.av}</div>
              <div>
                <div className="lp-rev-name">{r.name}</div>
                <div className="lp-rev-meta">{r.meta}</div>
                <div className="lp-rev-stars">{r.stars}</div>
              </div>
            </div>
            <p>{r.text}</p>
          </div>
        ))}
      </div>

      {visibleBatch < 3 && (
        <button className="lp-revs-more" onClick={() => setVisibleBatch((b) => b + 1)}>
          Mostra altre recensioni ▾
        </button>
      )}

      <div className="lp-rev-form-wrap">
        {!formSubmitted ? (
          <>
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
                <textarea id="lp-rv-text" placeholder="Raccontaci la tua esperienza con le LuxeFlex..." required />
              </div>
              <button type="submit" className="lp-rev-submit">Invia recensione</button>
            </form>
          </>
        ) : (
          <div className="lp-rev-success" style={{ display: "block" }}>
            <div className="lp-rev-success-ic">✅</div>
            <p><b>Grazie per la tua recensione!</b><br />La tua recensione è in fase di revisione. Verrà pubblicata una volta verificata la sua autenticità.</p>
          </div>
        )}
      </div>
    </>
  );
}

/* ───────────────────────── LP FAQ ───────────────────────── */

const lpFaqData = [
  { q: "Come funziona il pagamento in contrassegno?", a: "Fai l'ordine online, ti contattiamo via WhatsApp per confermare. Il pacco parte con GLS e paghi in contanti al corriere. Senza carta né anticipi." },
  { q: "Quanto tempo ci vuole per la consegna?", a: "Spediamo con corriere espresso GLS. Consegna in 24-48 ore lavorative dalla conferma." },
  { q: "Come scelgo la taglia giusta?", a: "LuxeFlex calza regolare. Se sei tra due taglie, scegli la più grande. Scrivici su WhatsApp se hai dubbi." },
  { q: "Vanno bene per turni lunghi?", a: "Sì, sono progettate proprio per chi lavora 8-12 ore in piedi. Infermiere, commesse, insegnanti: la suola cloud e il knit elasticizzato mantengono il comfort fino a fine turno." },
  { q: "I piedi si gonfiano a fine giornata: vanno bene lo stesso?", a: "Perfette. Il knit elasticizzato si adatta senza stringere mai. Niente punti di pressione anche quando i piedi sono gonfi." },
  { q: "Sono antiscivolo?", a: "Sì, la suola ha grip su pavimenti lisci, bagnati, ospedalieri. Testate per ambienti di lavoro." },
];

export function LpFaq() {
  return (
    <>
      {lpFaqData.map((item, i) => (
        <details key={i} className="lp-faq">
          <summary>{item.q}</summary>
          <div className="lp-faq-b">{item.a}</div>
        </details>
      ))}
    </>
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
        style={{ background: "linear-gradient(to bottom, #10b981, #059669)" }}
        className="rounded-full px-6 py-3 text-sm font-extrabold text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)] active:scale-[0.97]"
      >
        Ordina Ora
      </a>
    </div>
  );
}
