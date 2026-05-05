"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Lightbox from "@/components/Lightbox";

const REVIEW_COUNT_FMT = "1.847";

export function HeroReviewCount() {
  return <span className="text-sm text-gray-400 underline underline-offset-2" suppressHydrationWarning>({REVIEW_COUNT_FMT} recensioni)</span>;
}

/* ───────────────────────── Hero Badge ───────────────────────── */

const HERO_BADGE_MESSAGES = [
  "Alta richiesta oggi",
  "Ultimi pezzi in alcune taglie",
  "Vendute 20+ in 24h",
];

function HeroBadge() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % HERO_BADGE_MESSAGES.length);
        setFading(false);
      }, 350);
    }, 3750);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="absolute bottom-3 left-3 z-10 max-w-fit select-none"
      style={{
        backgroundColor: "rgba(26,25,23,0.78)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        borderRadius: 6,
        padding: "3px 7px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
        transition: "opacity 350ms ease",
        opacity: fading ? 0 : 1,
      }}
    >
      <span
        className="whitespace-nowrap text-[13px] font-semibold leading-none md:text-[14px]"
        style={{ color: "#FFFFFF", letterSpacing: "0.01em" }}
      >
        {HERO_BADGE_MESSAGES[index]}
      </span>
    </div>
  );
}

/* ───────────────────────── Hero Gallery ───────────────────────── */

const THUMBS_VISIBLE = 5;

export function HeroGallery({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const [thumbStart, setThumbStart] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [lightbox, setLightbox] = useState(false);
  const total = images.length;
  const swipeRef = useRef<number | null>(null);
  const isDrag = useRef(false);

  useEffect(() => {
    if (active < thumbStart) setThumbStart(active);
    else if (active >= thumbStart + THUMBS_VISIBLE) setThumbStart(active - THUMBS_VISIBLE + 1);
  }, [active, thumbStart]);

  useEffect(() => {
    if (!autoplay || total <= 1) return;
    const id = setInterval(() => {
      setActive((a) => (a === total - 1 ? 0 : a + 1));
    }, 5000);
    return () => clearInterval(id);
  }, [autoplay, total]);

  const prev = () => { setAutoplay(false); setActive((a) => (a === 0 ? total - 1 : a - 1)); };
  const next = () => { setAutoplay(false); setActive((a) => (a === total - 1 ? 0 : a + 1)); };

  if (total === 0) return (
    <div className="md:sticky md:top-24">
      <div className="relative aspect-square overflow-hidden rounded-2xl -mx-4 sm:-mx-6 md:mx-0 md:rounded-2xl md:border"
        style={{ backgroundColor: "#FFFFFF", borderColor: "#E2E4E8" }}>
        <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl" style={{ backgroundColor: "#E2E4E8" }}>
            <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="#9B9790" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold" style={{ color: "#9B9790" }}>Pandora</p>
            <p className="mt-1 text-xs" style={{ color: "#C4C0B8" }}>Foto prodotto in arrivo</p>
          </div>
          <HeroBadge />
        </div>
      </div>
    </div>
  );

  const visibleThumbs = images.slice(thumbStart, thumbStart + THUMBS_VISIBLE);

  return (
    <div className="md:sticky md:top-24">
      {lightbox && <Lightbox images={images} currentIndex={active} onNext={next} onPrev={prev} onClose={() => setLightbox(false)} />}
      <div
        className="relative aspect-square overflow-hidden -mx-4 sm:-mx-6 md:mx-0 md:rounded-lg md:border md:border-gray-200 bg-white md:shadow-sm select-none"
        onTouchStart={(e) => { swipeRef.current = e.touches[0].clientX; isDrag.current = false; }}
        onTouchEnd={(e) => { if (swipeRef.current !== null && e.changedTouches.length > 0) { const dx = e.changedTouches[0].clientX - swipeRef.current; if (Math.abs(dx) > 50) { isDrag.current = true; if (dx < 0) next(); else prev(); } } swipeRef.current = null; }}
        onMouseDown={(e) => { swipeRef.current = e.clientX; isDrag.current = false; }}
        onMouseMove={(e) => { if (swipeRef.current !== null && Math.abs(e.clientX - swipeRef.current) > 5) isDrag.current = true; }}
        onMouseUp={(e) => { if (swipeRef.current !== null) { const dx = e.clientX - swipeRef.current; if (isDrag.current && Math.abs(dx) > 50) { if (dx < 0) next(); else prev(); } } swipeRef.current = null; }}
        onMouseLeave={() => { swipeRef.current = null; }}
      >
        <img
          key={active}
          src={images[active]}
          alt={`Pandora - Foto ${active + 1}`}
          className="h-full w-full object-cover animate-fade-in cursor-zoom-in"
          onClick={() => { if (!isDrag.current) { setAutoplay(false); setLightbox(true); } }}
        />
        <button onClick={prev} className="absolute left-2.5 top-1/2 -translate-y-1/2 flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full shadow-sm backdrop-blur-sm transition hover:scale-105" style={{ backgroundColor: "rgba(255,255,255,0.82)", color: "#1A1917" }} aria-label="Immagine precedente">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button onClick={next} className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full shadow-sm backdrop-blur-sm transition hover:scale-105" style={{ backgroundColor: "rgba(255,255,255,0.82)", color: "#1A1917" }} aria-label="Immagine successiva">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <HeroBadge />
      </div>
      {/* Thumbnails */}
      <div className="mt-3 flex items-center gap-1.5 px-4 sm:px-6 md:px-0">
        {total > THUMBS_VISIBLE && (
          <button
            onClick={() => setThumbStart((s) => Math.max(0, s - 1))}
            disabled={thumbStart === 0}
            className="flex h-8 w-8 shrink-0 items-center justify-center transition disabled:opacity-30"
            style={{ borderRadius: 8, backgroundColor: "#FCFCFA", color: "#5A5752" }}
            aria-label="Miniature precedenti"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        )}
        <div className="grid flex-1 gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(total, THUMBS_VISIBLE)}, 1fr)` }}>
          {visibleThumbs.map((src, i) => {
            const realIndex = thumbStart + i;
            const isActive = realIndex === active;
            return (
              <button
                key={realIndex}
                onClick={() => { setAutoplay(false); setActive(realIndex); }}
                className="aspect-square overflow-hidden transition-all duration-200"
                style={{
                  borderRadius: 10,
                  border: isActive ? "2px solid #B07D4A" : "2px solid #E2E4E8",
                  boxShadow: isActive ? "0 0 0 1px #B07D4A" : "none",
                  opacity: isActive ? 1 : 0.7,
                }}
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
            className="flex h-8 w-8 shrink-0 items-center justify-center transition disabled:opacity-30"
            style={{ borderRadius: 8, backgroundColor: "#FCFCFA", color: "#5A5752" }}
            aria-label="Miniature successive"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        )}
      </div>
    </div>
  );
}

/* ───────────────────────── FAQ Section ───────────────────────── */

const faqData = [
  { q: "Quali sono i tempi e i costi di spedizione?", a: 'Spedizione <b class="text-green-600 font-bold">GRATUITA</b> con GLS Express, consegna in <b>24-48h</b>. Gli ordini del <b>venerdì dopo le 17:00</b> vengono confermati e spediti il <b>lunedì</b>.', extraMobile: true },
  { q: "Come funziona il pagamento alla consegna?", a: "Compili il modulo, ti <b>chiamiamo o scriviamo</b> per confermare l'ordine (Lun–Ven 9:00–17:00), il pacco parte e <b>paghi in contanti</b> al corriere.", extra: true },
  { q: "Posso restituire il prodotto?", a: "Hai <b>30 giorni</b> per il reso. Scrivi a <b>supportoacquistionline@gmail.com</b> con il numero d'ordine e il motivo: rispondiamo in 24h con le istruzioni.", extra: true },
  { q: "Come scelgo la taglia corretta?", a: "Calzano regolari. La <b>pelle scamosciata</b> si adatta naturalmente al piede dopo qualche utilizzo. Se sei tra due taglie, scegli quella più piccola. Per dubbi, scrivici su WhatsApp.", extra: true },
  { q: "Sono adatte a piedi gonfi o sensibili?", a: "<b>Sì</b>. La soletta in sughero naturale e la fascia larga sono pensate per <b>piedi sensibili e gonfi</b>: nessun punto di pressione e traspirazione continua." },
  { q: "Quanto è alto il rialzo?", a: "Il rialzo integrato è di circa <b>+5 cm</b>. La suola platform distribuisce il peso in modo uniforme, quindi <b>non senti la fatica del tacco</b>: è come indossare una pantofola, ma con l'eleganza di un tacco." },
  { q: "Il materiale è traspirante?", a: "<b>Sì</b>. La <b>pelle scamosciata</b> e il <b>sughero naturale</b> della soletta garantiscono <b>traspirazione costante</b>: il piede resta fresco e asciutto anche nelle giornate più calde.", extra: true },
  { q: "Aiutano davvero schiena e ginocchia?", a: "Sì. La <b>suola curva platform</b> distribuisce il peso ad ogni passo e <b>scarica ginocchia e schiena</b>: molte clienti raccontano meno fatica e camminata più leggera già dai primi giorni.", extra: true },
  { q: "La suola è antiscivolo?", a: "Sì, il battistrada offre <b>aderenza avanzata</b> anche su superfici scivolose o leggermente bagnate.", extra: true },
];

export function FAQSection() {
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const filtered = faqData.filter((item) => {
    if (search.trim() !== "") {
      const q = search.toLowerCase();
      return (item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q));
    }
    if (showAll) return true;
    if (item.extra) return false;
    if (item.extraMobile && !isDesktop) return false;
    return true;
  });

  const faqBorder = "#E2E4E8";
  const faqText = "#1A1917";
  const faqTextSec = "#5A5752";
  const faqBrandSubtle = "#FFF3EB";
  const faqBrandDark = "#D06A2B";
  const faqCta = "#ff914d";

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 md:py-16" id="faq-pandora" aria-label="Domande frequenti">
      <div className="mb-3 flex justify-center">
        <span className="rounded px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[0.1em]"
          style={{ backgroundColor: faqBrandSubtle, color: faqBrandDark }}>
          FAQ
        </span>
      </div>
      <h2 className="mb-8 text-center text-2xl font-bold md:text-3xl" style={{ color: faqText, fontFamily: "var(--font-heading)" }}>
        Domande Frequenti
      </h2>
      <input
        type="search"
        placeholder="Cerca nelle FAQ (es. spedizione, taglia, reso…)"
        className="mb-5 w-full outline-none"
        style={{ border: `1px solid ${faqBorder}`, borderRadius: 12, padding: "12px 16px", fontSize: 14, fontFamily: "var(--font-body)", color: faqText, backgroundColor: "#FFFFFF" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Cerca nelle FAQ"
      />
      <div className="grid gap-2.5 md:grid-cols-2">
        {filtered.map((item, i) => (
          <div key={i} className="overflow-hidden border transition-all"
            style={{ borderRadius: 12, borderColor: openIndex === i ? "#D7DCE2" : faqBorder, backgroundColor: "#FFFFFF" }}>
            <button
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-[17px] font-semibold"
              style={{ color: faqText, fontFamily: "var(--font-heading)" }}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
            >
              <span>{item.q}</span>
              <svg
                viewBox="0 0 24 24" className="h-4 w-4 shrink-0 transition-transform duration-200"
                style={{ transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)", color: openIndex === i ? faqBrandDark : faqTextSec }}
                fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {openIndex === i && (
              <div className="px-4 pb-4 pt-0.5 text-[17px] leading-[1.7]" style={{ color: faqTextSec }}
                dangerouslySetInnerHTML={{ __html: item.a }} />
            )}
          </div>
        ))}
      </div>
      {search.trim() === "" && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 w-full px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
          style={{ borderRadius: 12, backgroundColor: faqCta, fontFamily: "var(--font-heading)" }}
          aria-expanded={showAll}
        >
          {showAll ? "Mostra meno domande" : "Mostra tutte le domande"}
        </button>
      )}
    </section>
  );
}

/* ───────────────────────── Reviews Section ───────────────────────── */

const reviewData: { name: string; date: string; stars: number; text: string; reply?: string }[] = [
  { name: "Giulia S.", date: "18 aprile 2026", stars: 5, text: "Sono come indossare tacchi senza il fastidio. Le metto tutto il giorno e non sento nessuna fatica, il rialzo c'è ma sembra di camminare con le pantofole. Pelle morbidissima e il piede traspira anche con il caldo.", reply: "Grazie Giulia! La suola platform è studiata proprio per questo effetto. Buone camminate!" },
  { name: "Francesca D.", date: "5 aprile 2026", stars: 5, text: "cercavo qualcosa con un po di rialzo ma senza soffrire come con i tacchi. queste sono perfette, la suola curva scarica tutto e il sughero dentro è una nuvola. le metto anche per andare a fare la spesa", reply: "Grazie Francesca! Il sughero si modella sul piede con l'uso. Buon comfort!" },
  { name: "Valentina R.", date: "22 marzo 2026", stars: 5, text: "La pelle scamosciata è bellissima, morbida e non fa sudare il piede. Ho preso quelle nere e sono elegantissime ma comode come ciabatte. Le ginocchia non mi fanno più male a fine giornata." },
  { name: "Anna M.", date: "10 marzo 2026", stars: 5, text: "Ho comprato quelle taupe per mia mamma che ha 72 anni. Le adora perché si infilano facilmente e il rialzo la fa sembrare più alta senza la paura di cadere. La suola è stabile e antiscivolo.", reply: "Grazie Anna! Il design platform è pensato per dare altezza in totale sicurezza." },
  { name: "Chiara B.", date: "25 febbraio 2026", stars: 5, text: "finalmente delle ciabatte belle e comode. le avevo viste su una amica e le ho volute subito. il piede non suda grazie alla pelle vera e al sughero, e con 5 cm in piu mi sento alta senza soffrire" },
  { name: "Laura T.", date: "12 febbraio 2026", stars: 5, text: "Le uso sia in casa che fuori. Sembrano ciabatte da quanto sono comode ma hanno un look elegante. La suola curva mi ha risolto il dolore alla schiena che avevo con le scarpe basse.", reply: "Grazie Laura! La suola platform rocker scarica il peso e aiuta la postura." },
  { name: "Silvia C.", date: "30 gennaio 2026", stars: 5, text: "Secondo paio, questa volta le nere. La pelle scamosciata dopo qualche giorno prende la forma del piede. Il sughero traspira e non puzzano mai. Le fibbie si regolano benissimo." },
  { name: "Paola G.", date: "18 gennaio 2026", stars: 5, text: "Le ho ordinate col contrassegno, arrivate in 2 giorni. Mi hanno chiamata prima per confermare. Scarpe bellissime e comodissime, il rialzo si sente ma non pesa. Le consiglio a tutte.", reply: "Grazie Paola! Confermiamo sempre l'ordine per sicurezza. Buon comfort!" },
  { name: "Roberta F.", date: "5 gennaio 2026", stars: 5, text: "soffro di fascite plantare e queste mi hanno salvata. la soletta in sughero sostiene l'arco e il piede non brucia piu a fine giornata. e sono pure belle, non sembrano scarpe ortopediche" },
  { name: "Monica L.", date: "20 dicembre 2025", stars: 5, text: "Ho i piedi larghi e con la maggior parte delle scarpe soffro. Queste con le fibbie le regolo come voglio e la pelle scamosciata si allarga senza deformarsi. Traspiranti anche d'estate.", reply: "Grazie Monica! Le fibbie regolabili sono pensate proprio per adattarsi a ogni piede." },
  { name: "Federica P.", date: "8 dicembre 2025", stars: 5, text: "Bellissima sorpresa. Ero indecisa tra taupe e nere, alla fine ho preso entrambe. Comode dal primo giorno, il rialzo è discreto ma efficace. Materiali di qualità, si vede e si sente." },
  { name: "Teresa N.", date: "25 novembre 2025", stars: 5, text: "le uso tutti i giorni. la cosa che preferisco è che il piede respira, con le ciabatte sintetiche sudavo tantissimo. queste con la pelle vera e il sughero sono un altro mondo" },
  { name: "Alessandra V.", date: "10 novembre 2025", stars: 4, text: "Molto belle e comode. Le fibbie sono di qualità, non come quelle di plastica. L'unica cosa è che la pelle scamosciata si sporca facilmente, ma basta una spazzolina. Per il resto perfette." },
  { name: "Grazia M.", date: "28 ottobre 2025", stars: 5, text: "Le ho prese per il mare e le uso anche in città. La suola è comoda e il piede non si stanca mai. Il rialzo di 5 cm fa un bell'effetto alle gambe senza soffrire. Consigliatissime.", reply: "Grazie Grazia! Versatili e comode in ogni contesto. Buone passeggiate!" },
  { name: "Daniela S.", date: "15 ottobre 2025", stars: 5, text: "mia figlia mi ha convinta a ordinarle e ha avuto ragione. sono alta, sto comoda e cammino dritta. la schiena non mi fa piu male come prima. le metto anche in casa quando sto tante ore in piedi" },
  { name: "Claudia R.", date: "2 ottobre 2025", stars: 5, text: "Terzo ordine su questo sito, sempre soddisfatta. Le Pandora sono le migliori finora: comode, traspiranti e con quel rialzo che ti fa sentire sicura. Materiali premium, niente a che vedere con le imitazioni." },
  { name: "Rita B.", date: "18 settembre 2025", stars: 5, text: "Le uso per andare in ufficio e nessuno immagina quanto siano comode. Sembrano delle ciabatte di design ma dentro hanno il sughero che culla il piede. Le ginocchia e la schiena ringraziano.", reply: "Grazie Rita! Stile e comfort insieme, è il cuore di Pandora." },
  { name: "Elisabetta T.", date: "5 settembre 2025", stars: 5, text: "ho 65 anni e fatico a trovare scarpe belle che non mi facciano male. queste le infilo, regolo le fibbie e via. il piede sta fresco, la suola ammortizza e sto 5 cm piu alta senza problemi" },
  { name: "Carla D.", date: "22 agosto 2025", stars: 5, text: "Comprate per le vacanze al mare. Perfette su ogni terreno, la suola non scivola e il piede traspira benissimo. Le ho usate tutti i giorni per due settimane senza mai un dolore." },
  { name: "Marta P.", date: "10 agosto 2025", stars: 4, text: "Molto comode e belle, la qualità della pelle è ottima. 4 stelle solo perché avrei voluto più colori disponibili, ma come prodotto è top. Il rialzo è perfetto, non troppo e non troppo poco." },
];

function StarRow({ count, size = 16 }: { count: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} style={{ width: size, height: size }} className={i < count ? "text-amber-400" : "text-gray-200"} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

const PER_PAGE = 5;
const totalPages = Math.ceil(reviewData.length / PER_PAGE);

export function ReviewsSection() {
  const [page, setPage] = useState(0);
  const [fading, setFading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reviewCount = REVIEW_COUNT_FMT;

  const visible = reviewData.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  const goTo = (p: number) => {
    if (p === page) return;
    setFading(true);
    setTimeout(() => {
      setPage(p);
      setFading(false);
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  const rv = { text: "#1A1917", textSec: "#5A5752", textMuted: "#9B9790", border: "#E2E4E8", muted: "#FCFCFA", surface: "#FFFFFF", trust: "#2B6E44", trustLight: "#E6F4EC", cta: "#ff914d", brand: "#FF914D", brandSubtle: "#FFF3EB", brandDark: "#D06A2B" };

  return (
    <section ref={sectionRef} id="recensioni" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 md:py-16" aria-label="Recensioni dei clienti">
      <div className="mb-3 flex justify-center">
        <span className="rounded px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[0.1em]"
          style={{ backgroundColor: rv.brandSubtle, color: rv.brandDark }}>
          Recensioni
        </span>
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold md:text-3xl" style={{ color: rv.text, fontFamily: "var(--font-heading)" }}>
          Recensioni delle clienti
        </h2>
        <div className="flex items-center gap-2 text-sm">
          <StarRow count={5} />
          <span className="font-bold" style={{ color: rv.text }}>4,9/5</span>
          <span style={{ color: rv.textMuted }}>&middot;</span>
          <span style={{ color: rv.textSec }}>{reviewCount} recensioni</span>
          <span className="rounded px-2 py-0.5 text-[12px] font-semibold"
            style={{ backgroundColor: rv.trustLight, color: rv.trust }}>
            verificate
          </span>
        </div>
      </div>

      <div className={`space-y-0 transition-opacity duration-200 ${fading ? "opacity-0" : "opacity-100"}`}
        style={{ border: `1px solid ${rv.border}`, borderRadius: 16, overflow: "hidden", backgroundColor: rv.surface }}>
        {visible.map((r, i) => (
          <div key={page * PER_PAGE + i} className="p-5" style={{ borderBottom: i < visible.length - 1 ? `1px solid ${rv.border}` : "none" }}>
            <div className="mb-2 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold"
                style={{ backgroundColor: rv.brandSubtle, color: rv.brandDark }}>
                {r.name.charAt(0)}
              </div>
              <div>
                <span className="text-sm font-semibold" style={{ color: rv.text }}>{r.name}</span>
                <span className="ml-2 text-xs" style={{ color: rv.textMuted }}>{r.date}</span>
              </div>
            </div>
            <div className="mb-2 flex items-center gap-2">
              <StarRow count={r.stars} size={16} />
              <span className="rounded px-2 py-0.5 text-[12px] font-semibold"
                style={{ backgroundColor: rv.trustLight, color: rv.trust }}>
                Acquisto verificato
              </span>
            </div>
            <p className="text-[15px] leading-relaxed" style={{ color: rv.textSec }}>{r.text}</p>
            {r.reply && (
              <div className="mt-3 rounded-xl p-3.5" style={{ backgroundColor: rv.muted, borderLeft: `3px solid ${rv.brand}` }}>
                <p className="mb-1 text-xs font-bold" style={{ color: rv.text }}>Risposta di Calzame</p>
                <p className="text-[14px] leading-relaxed" style={{ color: rv.textSec }}>{r.reply}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <button onClick={() => goTo(page - 1)} disabled={page === 0}
            className="flex h-8 w-8 items-center justify-center border transition disabled:opacity-25"
            style={{ borderRadius: 10, borderColor: rv.border, color: rv.textMuted, backgroundColor: rv.surface }} aria-label="Precedente">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          {(() => {
            const maxVisible = 5;
            let start = 0;
            let end = totalPages;
            if (totalPages > maxVisible) {
              start = Math.max(0, page - Math.floor(maxVisible / 2));
              end = start + maxVisible;
              if (end > totalPages) { end = totalPages; start = end - maxVisible; }
            }
            return Array.from({ length: end - start }, (_, idx) => {
              const i = start + idx;
              return (
                <button key={i} onClick={() => goTo(i)}
                  className="flex h-8 w-8 items-center justify-center text-[15px] font-semibold transition"
                  style={i === page
                    ? { backgroundColor: rv.text, color: "#fff", borderRadius: 10 }
                    : { border: `1px solid ${rv.border}`, color: rv.textMuted, borderRadius: 10, backgroundColor: rv.surface }}>
                  {i + 1}
                </button>
              );
            });
          })()}
          <button onClick={() => goTo(page + 1)} disabled={page === totalPages - 1}
            className="flex h-8 w-8 items-center justify-center border transition disabled:opacity-25"
            style={{ borderRadius: 10, borderColor: rv.border, color: rv.textMuted, backgroundColor: rv.surface }} aria-label="Successiva">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
        {page < totalPages - 1 && (
          <button onClick={() => goTo(page + 1)} className="flex items-center gap-1.5 text-[15px] font-medium cursor-pointer transition-colors hover:opacity-80"
            style={{ color: rv.textSec }}>
            Mostra altre recensioni
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
          </button>
        )}
      </div>

      <div className="mt-6 h-px" style={{ backgroundColor: rv.border }} />

      <div className="mt-5">
        {!showForm && !formSubmitted && (
          <button onClick={() => setShowForm(true)}
            className="w-full px-4 py-2.5 text-[15px] font-semibold transition-all hover:bg-gray-50"
            style={{ borderRadius: 12, backgroundColor: rv.surface, color: rv.text, border: `1px solid ${rv.border}`, fontFamily: "var(--font-heading)" }}>
            <span className="flex items-center justify-center gap-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke={rv.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              Scrivi una recensione
            </span>
          </button>
        )}
        {showForm && !formSubmitted && (
          <>
            <h3 className="mb-4 text-base font-bold" style={{ color: rv.text, fontFamily: "var(--font-heading)" }}>
              Scrivi una recensione
            </h3>
            <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} className="space-y-3">
              <div>
                <label htmlFor="pn-rv-name" className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em]" style={{ color: rv.textMuted }}>Nome *</label>
                <input type="text" id="pn-rv-name" placeholder="Il tuo nome" required
                  className="w-full outline-none" style={{ border: `1px solid ${rv.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: "var(--font-body)", color: rv.text }} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em]" style={{ color: rv.textMuted }}>Valutazione *</label>
                <div className="flex gap-1 flex-row-reverse justify-end">
                  {[5,4,3,2,1].map((v) => (
                    <label key={v} className="cursor-pointer text-[28px] leading-none text-gray-300 hover:text-amber-400 has-[input:checked]:text-amber-400 [&:hover~label]:text-amber-400 [&:has(input:checked)~label]:text-amber-400">
                      <input type="radio" name="pn-rating" value={v} required className="hidden" />★
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="pn-rv-text" className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em]" style={{ color: rv.textMuted }}>Recensione *</label>
                <textarea id="pn-rv-text" placeholder="Raccontaci la tua esperienza con le Pandora…" required
                  className="w-full outline-none resize-y" style={{ border: `1px solid ${rv.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 14, fontFamily: "var(--font-body)", color: rv.text, minHeight: 80 }} />
              </div>
              <button type="submit" className="rounded-lg px-6 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: rv.cta }}>
                Invia recensione
              </button>
            </form>
          </>
        )}
        {formSubmitted && (
          <div className="py-6 text-center">
            <p className="text-sm" style={{ color: rv.textSec }}>
              <b style={{ color: rv.trust }}>Grazie per la tua recensione!</b><br />Sarà pubblicata dopo la verifica.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ───────────────────────── Feature Card ───────────────────────── */

export function FeatureCard({ id, children }: { id: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const activate = useCallback(() => {
    setActive(true);
    window.dispatchEvent(new CustomEvent("feature-active", { detail: id }));
  }, [id]);

  useEffect(() => {
    if (!isMobile) return;
    const handler = (e: Event) => {
      if ((e as CustomEvent).detail !== id) setActive(false);
    };
    window.addEventListener("feature-active", handler);
    return () => window.removeEventListener("feature-active", handler);
  }, [id, isMobile]);

  useEffect(() => {
    if (!isMobile) return;
    const el = ref.current;
    if (!el) return;
    const check = () => {
      const rect = el.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const mid = window.innerHeight / 2;
      if (cardCenter <= mid && cardCenter >= 0) activate();
    };
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, [activate, isMobile]);

  if (!isMobile) {
    return (
      <div ref={ref} className="feature-card-desktop" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)", borderRadius: "14px" }}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onClick={() => { if (active) setActive(false); else activate(); }}
      style={{
        transition: "transform 0.4s ease, box-shadow 0.4s ease",
        transform: active ? "translateY(-4px) scale(1.04)" : "scale(1)",
        boxShadow: active ? "0 6px 20px rgba(0,0,0,0.14)" : "0 2px 12px rgba(0,0,0,0.08)",
        borderRadius: "14px",
        cursor: "pointer",
      }}
    >
      {children}
    </div>
  );
}

/* ───────────────────────── Trustpilot Carousel ───────────────────────── */

const tpReviews = [
  { name: "Lucia M.", stars: 5, title: "Spedizione velocissima", text: "Ordinate lunedì, arrivate mercoledì. Pagato al corriere senza problemi, scarpe comodissime dal primo giorno", date: "3 giorni fa" },
  { name: "Davide P.", stars: 5, title: "Secondo acquisto", text: "Dopo le prime ho preso anche il secondo paio per mio fratello. Qualità ottima per il prezzo, servizio clienti gentilissimo", date: "1 settimana fa" },
  { name: "Simone R.", stars: 5, title: "Finalmente scarpe serie", text: "Ho provato altri siti e le scarpe facevano schifo. Queste sono un altro livello, le metto tutti i giorni per andare in ufficio", date: "2 settimane fa" },
  { name: "Anna B.", stars: 5, title: "Comodissime davvero", text: "Le ho comprate per mio marito che sta in piedi tutto il giorno al lavoro. Dice che non ha mai avuto scarpe cosi comode, le mette anche nel weekend", date: "2 settimane fa" },
  { name: "Roberto F.", stars: 5, title: "Assistenza top", text: "avevo sbagliato taglia e me l'hanno cambiata senza problemi. pacco arrivato in 3 giorni, pagato alla consegna", date: "3 settimane fa" },
  { name: "Marco L.", stars: 5, title: "Meglio di quello che pensavo", text: "Ero scettico a ordinare online ma devo dire che sono rimasto sorpreso. Scarpe belle, comode e nessuno nota nulla", date: "1 mese fa" },
  { name: "Chiara V.", stars: 5, title: "Regalo perfetto", text: "le ho regalate a mio marito per il compleanno, contentissimo. dice che sono le scarpe piu comode che ha mai avuto", date: "1 mese fa" },
  { name: "Giuseppe T.", stars: 5, title: "Pagamento alla consegna comodo", text: "Non mi fidavo a pagare online, con il contrassegno zero problemi. Corriere puntuale e scarpe ottime", date: "1 mese fa" },
  { name: "Federica S.", stars: 4, title: "Carine e comode", text: "Scarpe bellissime e comode, niente da dire. Lascio 4 stelle solo perchè il corriere era un po svampito e ci ha messo un po a trovare il civico.. ma non è colpa del negozio ovviamente", date: "2 mesi fa" },
  { name: "Antonio G.", stars: 5, title: "Consigliatissimo", text: "terzo ordine su questo sito, non mi hanno mai deluso. spedizione sempre veloce e qualità costante. bravi", date: "2 mesi fa" },
];

function TPStars({ count }: { count: number }) {
  return (
    <div className="flex gap-px">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="inline-flex h-5 w-5 items-center justify-center" style={{ backgroundColor: i <= count ? "#00B67A" : "#dcdce6" }}>
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="#fff"><path d="M12 1.5l3.09 6.26L22 8.64l-5 4.87 1.18 6.88L12 17.27l-6.18 3.25L7 13.64 2 8.77l6.91-1.01L12 1.5z" /></svg>
        </div>
      ))}
    </div>
  );
}

export function TrustpilotCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => { el.removeEventListener("scroll", updateArrows); window.removeEventListener("resize", updateArrows); };
  }, [updateArrows]);

  const scroll = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = el.querySelector<HTMLElement>(":scope > div")?.offsetWidth ?? 300;
    el.scrollBy({ left: dir * (cardW + 12), behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" aria-label="Trustpilot" style={{ fontFamily: "var(--font-body)" }}>
      <div className="mb-5 flex flex-col items-center text-center">
        <div className="mb-1 flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" fill="#00B67A" style={{ width: 32, height: 32 }}><path d="M12 1.5l3.09 6.26L22 8.64l-5 4.87 1.18 6.88L12 17.27l-6.18 3.25L7 13.64 2 8.77l6.91-1.01L12 1.5z" /></svg>
          <span className="font-bold tracking-tight text-gray-900" style={{ fontSize: "1.875rem", fontFamily: "var(--font-heading)" }}>Trustpilot</span>
        </div>
        <div className="mb-1 flex justify-center">
          <div className="flex gap-px">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="inline-flex h-5 w-5 items-center justify-center" style={{ backgroundColor: "#00B67A" }}>
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="#fff"><path d="M12 1.5l3.09 6.26L22 8.64l-5 4.87 1.18 6.88L12 17.27l-6.18 3.25L7 13.64 2 8.77l6.91-1.01L12 1.5z" /></svg>
              </div>
            ))}
            <div className="relative inline-flex h-5 w-5 items-center justify-center overflow-hidden" style={{ backgroundColor: "#dcdce6" }}>
              <div className="absolute left-0 top-0 h-full overflow-hidden" style={{ width: "82%", backgroundColor: "#00B67A" }} />
              <svg viewBox="0 0 24 24" className="relative h-3 w-3" fill="#fff"><path d="M12 1.5l3.09 6.26L22 8.64l-5 4.87 1.18 6.88L12 17.27l-6.18 3.25L7 13.64 2 8.77l6.91-1.01L12 1.5z" /></svg>
            </div>
          </div>
        </div>
        <p className="mt-3 text-gray-500" style={{ fontSize: "1rem" }}>Valutato <b className="text-gray-900">Eccellente</b> &middot; <b className="text-gray-900">4.8</b> su <b className="text-gray-900">5</b> basato su <b className="text-gray-900">483 recensioni</b></p>
        <p className="mt-3 font-semibold text-gray-500" style={{ fontSize: "0.9rem" }}>Recensioni Generali del Negozio Calzame</p>
      </div>

      <div className="relative flex items-center">
        <button onClick={() => scroll(-1)} disabled={!canLeft} className="mr-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-md border border-gray-200 cursor-pointer hover:bg-gray-50 disabled:opacity-30 disabled:cursor-default" aria-label="Precedente">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 19l-7-7 7-7" /></svg>
        </button>

        <div ref={scrollRef} className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {tpReviews.map((r, i) => (
            <div key={i} className="w-[280px] shrink-0 rounded-xl border border-gray-100 bg-white p-5 shadow-sm md:w-[320px]">
              <div className="mb-2.5 flex items-center justify-between">
                <TPStars count={r.stars} />
                <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">Verificata</span>
              </div>
              <h4 className="mb-1.5 text-base font-bold text-gray-900" style={{ fontFamily: "var(--font-heading)" }}>{r.title}</h4>
              <p className="mb-4 leading-relaxed text-gray-600" style={{ fontSize: "0.938rem" }}>{r.text}</p>
              <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                <span className="text-sm font-semibold text-gray-800">{r.name}</span>
                <span className="text-xs text-gray-400">{r.date}</span>
              </div>
            </div>
          ))}
        </div>

        <button onClick={() => scroll(1)} disabled={!canRight} className="ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-md border border-gray-200 cursor-pointer hover:bg-gray-50 disabled:opacity-30 disabled:cursor-default" aria-label="Successiva">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      <p className="mt-4 text-center text-base text-gray-400">
        Recensioni prese in modo casuale dal sito ufficiale. Puoi vedere tutte le recensioni su <b className="text-gray-600">TrustPilot</b>.
      </p>
    </section>
  );
}

/* ───────────────────────── Refund Collapsible ───────────────────────── */

export function RefundCollapsible({ image, children }: { image: React.ReactNode; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "#E2E4E8", backgroundColor: "#FFFFFF" }}>
      {image}
      <div className="px-5 py-5 md:px-8">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full py-3 text-sm font-semibold cursor-pointer transition-all hover:bg-gray-50"
          style={{ borderRadius: 12, backgroundColor: "#FFFFFF", color: "#ff914d", border: "1px solid #D1CCBF", fontFamily: "var(--font-heading)" }}
        >
          <span className="flex items-center justify-center gap-2">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="#2B6E44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
            </svg>
            {open ? "Chiudi" : "Scopri come richiedere un rimborso"}
          </span>
        </button>
      </div>
      <div className="transition-all duration-300 ease-in-out" style={{ maxHeight: open ? "2000px" : "0", opacity: open ? 1 : 0, overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   PROBLEM / SOLUTION SECTION
   ════════════════════════════════════════════════════════════ */

export function ProblemSolutionAnimated({
  problems,
  solutions,
}: {
  problems: string[];
  solutions: string[];
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const elRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const starts = [0.02, 0.08, 0.16, 0.22];
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));

      elRefs.current.forEach((el, i) => {
        if (!el) return;
        const start = starts[i] ?? 0;
        const t = Math.min(1, Math.max(0, (progress - start) / 0.08));
        const e = easeOut(t);
        el.style.opacity = String(e);
        el.style.transform = `translateY(${(1 - e) * 28}px)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ref = (i: number) => (el: HTMLDivElement | null) => { elRefs.current[i] = el; };

  const xIcon = (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
  const checkIcon = (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );

  return (
    <div ref={sectionRef} className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 md:py-16">
      <div ref={ref(0)} className="mb-3 flex justify-center" style={{ opacity: 0 }}>
        <span className="rounded px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[0.1em]"
          style={{ backgroundColor: "#FFF3EB", color: "#D06A2B" }}>
          Ciabatta comune → Pandora
        </span>
      </div>

      <div ref={ref(1)} style={{ opacity: 0 }}>
        <h2 id="why-title" className="mb-8 text-center text-2xl font-bold md:text-3xl" style={{ color: "#1A1917" }}>
          Perché Pandora fa la differenza
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div ref={ref(2)} className="border p-5 md:p-6"
          style={{ borderColor: "#F0D0D0", borderLeftColor: "#E05555", borderLeftWidth: 4, backgroundColor: "#FDF5F5", borderRadius: 14, opacity: 0 }}>
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ backgroundColor: "#E05555", color: "#FFFFFF" }}>
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </span>
            <h3 className="text-[15px] font-bold uppercase tracking-wider" style={{ color: "#B93F3F" }}>Ciabatte comuni</h3>
          </div>
          <ul className="space-y-3">
            {problems.map((p, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[15px] leading-snug" style={{ color: "#3A3A3A" }}>
                <span className="mt-[3px]" style={{ color: "#B93F3F" }}>{xIcon}</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div ref={ref(3)} className="border p-5 md:p-6"
          style={{ borderColor: "#CFE7D8", borderLeftColor: "#2B6E44", borderLeftWidth: 4, backgroundColor: "#F0F9F4", borderRadius: 14, opacity: 0 }}>
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ backgroundColor: "#2B6E44", color: "#FFFFFF" }}>
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </span>
            <h3 className="text-[15px] font-bold uppercase tracking-wider" style={{ color: "#2B6E44" }}>Con Pandora</h3>
          </div>
          <ul className="space-y-3">
            {solutions.map((s, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[15px] leading-snug" style={{ color: "#3A3A3A" }}>
                <span className="mt-[3px]" style={{ color: "#2B6E44" }}>{checkIcon}</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   SOLUTION BRIDGE
   ════════════════════════════════════════════════════════════ */

export function SolutionBridgeAnimated({
  textColor,
  brandColor,
  bg,
}: {
  textColor: string;
  brandColor: string;
  mutedColor?: string;
  bg: string;
}) {
  const brandRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        labelRef.current && (labelRef.current.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out");
        brandRef.current && (brandRef.current.style.transition = "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)");
        subRef.current && (subRef.current.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out");
      });
    });

    const entries = [
      { el: labelRef.current, delay: 0 },
      { el: brandRef.current, delay: 140 },
      { el: subRef.current, delay: 280 },
    ];

    const observers = entries.map(({ el, delay }) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "scale(1) translateY(0)";
            }, delay);
            obs.disconnect();
          }
        },
        { threshold: 0.5 }
      );
      obs.observe(el);
      return obs;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <div className="text-center" style={{ backgroundColor: bg }}>
      <div ref={labelRef} className="mb-3 flex justify-center" style={{ opacity: 0, transform: "translateY(10px)" }}>
        <span className="rounded px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[0.1em]"
          style={{ backgroundColor: "#FFF3EB", color: "#D06A2B" }}>
          Caratteristiche
        </span>
      </div>
      <p ref={brandRef} className="text-5xl font-extrabold leading-none tracking-tight sm:text-6xl md:text-7xl"
        style={{ color: textColor, fontFamily: "var(--font-heading)", opacity: 0, transform: "scale(0.72)" }}>
        Pandora
      </p>
      <p ref={subRef} className="mt-1.5 text-base sm:text-[17px]"
        style={{ color: brandColor, opacity: 0, transform: "translateY(10px)" }}>
        Tacchi senza fatica, comfort da pantofola.
      </p>
    </div>
  );
}
