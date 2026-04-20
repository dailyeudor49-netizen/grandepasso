import type { Metadata } from "next";
import Script from "next/script";
import "./landing.css";
import fs from "fs";
import path from "path";
import { HeroGallery, StickyOrderButton, LpReviews, LpFaq } from "./client";
import { OrderSection } from "./OrderModal";

function getCarouselImages(): string[] {
  const dir = path.join(process.cwd(), "public/images/land/aureacloud/carosello");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(webp|jpg|jpeg|png|avif)$/i.test(f))
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map((f) => `/images/land/aureacloud/carosello/${f}`);
}

export const metadata: Metadata = {
  title: "AureaCloud - Ciabatte Platform con Rialzo Segreto +6cm | Stile Labubu",
  description:
    "Scopri AureaCloud: ciabatte platform stile Crocs/Labubu con rialzo segreto di 6cm. Comodità estrema + altezza extra invisibile. Spedizione gratuita e pagamento alla consegna.",
};

/* ════════════════════════════════════════════════════════════════════
   HERO SECTION
   ════════════════════════════════════════════════════════════════════ */

function HeroSection() {
  const images = getCarouselImages();
  return (
    <section className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 pt-2 pb-6 md:pt-5 md:pb-10">
      <div className="grid items-start gap-4 md:gap-6 md:grid-cols-2 lg:[grid-template-columns:1.15fr_1fr]">
        {/* LEFT: Solo Gallery */}
        <div>
          <HeroGallery images={images} />
        </div>

        {/* RIGHT: Tutto il contenuto prodotto */}
        <div>
          {/* Price in alto */}
          <div className="mb-4 flex items-baseline gap-2.5">
            <span className="text-[36px] md:text-[42px] font-extrabold text-[#2B6E44]">€49,90</span>
            <span className="text-[18px] md:text-[20px] text-[#9B9790] line-through">€99,90</span>
            <span className="inline-flex items-center rounded-[5px] bg-[#FDE8E8] px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#D63031]">
              -50%
            </span>
          </div>

          {/* Feature bullets */}
          <div className="mb-5 rounded-[14px] border border-[#E2E4E8] bg-white divide-y divide-[#E2E4E8] shadow-[0_1px_3px_rgba(26,25,23,0.04)]">
            {[
              { icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", text: "+6 cm reali e invisibili — il rialzo è nascosto dentro la suola" },
              { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", text: "Comode come le Crocs — stesso comfort leggendario, ma con rialzo segreto" },
              { icon: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7", text: "Design Labubu kawaii — lo stile trendy di TikTok con rialzo nascosto" },
              { icon: "M5 13l4 4L19 7", text: "Ultraleggere, solo 280g — le indossi tutto il giorno senza sentirle" },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EEF1F7]">
                  <svg className="h-4 w-4 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                  </svg>
                </div>
                <p className="text-[14px] leading-[1.65] text-[#1A1917]">{f.text}</p>
              </div>
            ))}
          </div>

          {/* Order section: variant selectors + trigger + modal */}
          <OrderSection image={images[0] || ""} />

          {/* Shipping & Payment options */}
          <div className="mt-4 space-y-3 rounded-[14px] border border-[#E2E4E8] bg-white p-4 shadow-[0_1px_3px_rgba(26,25,23,0.04)]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#9B9790]">Spedizione</p>
              <label className="mt-2 flex cursor-default items-center gap-3 rounded-[8px] border-2 border-[#2B6E44] bg-[#E6F4EC] px-4 py-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#2B6E44]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#2B6E44]" />
                </span>
                <div className="flex-1">
                  <p className="text-[14px] font-bold text-[#1A1917]">Spedizione Express GLS</p>
                  <p className="text-[13px] text-[#5A5752]">Consegna in 24-48h</p>
                </div>
                <span className="text-[14px] font-bold text-[#2B6E44]">GRATUITA</span>
              </label>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#9B9790]">Pagamento</p>
              <label className="mt-2 flex cursor-default items-center gap-3 rounded-[8px] border-2 border-[#3b82f6] bg-[#EEF1F7] px-4 py-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[#3b82f6]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#3b82f6]" />
                </span>
                <div className="flex-1">
                  <p className="text-[14px] font-bold text-[#1A1917]">Pagamento Contanti alla Consegna</p>
                  <p className="text-[13px] text-[#5A5752]">Paghi direttamente al corriere</p>
                </div>
              </label>
            </div>
          </div>

          {/* Come funziona l'ordine? */}
          <div className="mt-4 rounded-[14px] border border-[#E2E4E8] bg-white p-5 shadow-[0_1px_3px_rgba(26,25,23,0.04)]">
            <h3 className="mb-4 text-[18px] font-bold text-[#1A1917]">Come funziona l&apos;ordine?</h3>
            <div className="space-y-3">
              {[
                { step: "1", title: "Scegli taglia e colore", desc: "Seleziona la tua misura EU. Se sei tra due taglie, scegli la più grande — calzata regolare." },
                { step: "2", title: "Clicca «Ordina ora»", desc: "Inserisci i dati di spedizione. Nessun pagamento anticipato, nessun account necessario." },
                { step: "3", title: "Ti chiamiamo o scriviamo", desc: "Ti contattiamo (Lun–Ven 9:00–17:00) per confermare l'ordine. Ordini del venerdì dopo le 17:00 → spediti lunedì." },
                { step: "4", title: "Ricevi e paga al corriere", desc: "Il pacco arriva in 24-48h con GLS Express. Spedizione gratuita, paghi in contanti al corriere." },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 min-w-[24px] shrink-0 items-center justify-center rounded-full bg-[#2B6E44] text-[12px] font-bold text-white">
                    {s.step}
                  </div>
                  <div>
                    <p className="mb-0.5 text-[14px] font-bold text-[#1A1917]">{s.title}</p>
                    <p className="text-[13px] leading-[1.65] text-[#5A5752]">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Garanzia */}
          <div className="mt-4 rounded-[14px] border border-[#E2E4E8] bg-white p-4 shadow-[0_1px_3px_rgba(26,25,23,0.04)]">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[#EEF1F7]">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#3b82f6]" fill="none">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 text-[15px] font-bold text-[#1A1917]">Garanzia soddisfatto o rimborsato — 30 giorni</h3>
                <p className="text-[13px] leading-[1.65] text-[#5A5752]">
                  Non sei soddisfatto? Scrivi a <a href="mailto:supporto@piedeluxe.com" className="text-[#3b82f6] underline">supporto@piedeluxe.com</a> entro 30 giorni. Ritiriamo noi il pacco e il rimborso è immediato. <strong>Zero rischi.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


/* ════════════════════════════════════════════════════════════════════
   PROBLEM / SOLUTION COMPARISON
   ════════════════════════════════════════════════════════════════════ */

function ProblemSolutionSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-[27px] md:text-[33px] leading-[1.22] tracking-[-0.015em] font-bold text-[#1A1917]">
            Prima Soffrivi. <span className="text-[#3b82f6]">Ora Sorridi.</span>
          </h2>
          <p className="text-[16px] leading-[1.65] text-[#5A5752]">
            Le AureaCloud risolvono i problemi che hai sempre avuto con le scarpe tradizionali.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2">
          {/* Problems */}
          <div className="rounded-[14px] border border-[#E2E4E8] bg-white p-5 shadow-[0_1px_3px_rgba(26,25,23,0.04)]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-[5px] border border-[#D63031] bg-[#FDE8E8] px-3 py-1.5">
              <span className="text-[16px]">❌</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#D63031]">PROBLEMI</span>
            </div>
            <ul className="space-y-3">
              {[
                { title: "Tacchi altissimi che fanno male", desc: "Dopo un'ora non li sopporti più. Schiena, piedi, ginocchia — tutto fa male." },
                { title: "Rialzi evidenti e imbarazzanti", desc: "Si vede subito il trucco. Tutti capiscono che le usi per sembrare più alta." },
                { title: "Ciabatte piatte e scomode", desc: "Comode sì, ma ti fanno sembrare ancora più bassa. Zero autostima." },
                { title: "Pesanti e rigide", desc: "Le indossi e dopo mezz'ora hai i piedi distrutti. Dimentica di usarle tutto il giorno." },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 text-[16px] shrink-0">😔</span>
                  <div>
                    <p className="text-[14px] font-bold text-[#1A1917]">{item.title}</p>
                    <p className="text-[13px] leading-[1.65] text-[#5A5752]">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="rounded-[14px] border border-[#E2E4E8] bg-white p-5 shadow-[0_1px_3px_rgba(26,25,23,0.04)]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-[5px] border border-[#2B6E44] bg-[#E6F4EC] px-3 py-1.5">
              <span className="text-[16px]">✅</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#2B6E44]">SOLUZIONI</span>
            </div>
            <ul className="space-y-3">
              {[
                { title: "6cm in più, comfort totale", desc: "Il rialzo è nascosto nella suola. Sei più alta, ma cammini come se fossero normali ciabatte." },
                { title: "Rialzo invisibile al 100%", desc: "Nessuno lo vedrà mai. Dall'esterno sono ciabatte platform trendy. Il segreto è tutto dentro." },
                { title: "Platform trendy e comode", desc: "Design Labubu kawaii che va di moda. Sei alta E comoda. Finalmente." },
                { title: "Leggerissime, solo 280g", desc: "Le indossi tutto il giorno senza problemi. Comfort cloud che non stanca mai." },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 text-[16px] shrink-0">😊</span>
                  <div>
                    <p className="text-[14px] font-bold text-[#1A1917]">{item.title}</p>
                    <p className="text-[13px] leading-[1.65] text-[#5A5752]">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   FEATURES GRID (6 CARDS)
   ════════════════════════════════════════════════════════════════════ */

const techCards = [
  { img: "/images/land/aureacloud/card/card1.jpeg", alt: "Rialzo Invisibile 6cm", chip: "Tacco Segreto", title: "Rialzo Integrato Invisibile", text: "6 cm nascosti nella suola platform. Dall'esterno sono normali ciabatte trendy. Il tuo segreto resta invisibile." },
  { img: "/images/land/aureacloud/card/card2.jpeg", alt: "Materiale Cloud Ultra-Morbido", chip: "Comfort Cloud", title: "Materiale Cloud Ultra-Morbido", text: "Stessa tecnologia delle Crocs originali. Morbidezza estrema, leggerezza totale. Cammini sulle nuvole. Letteralmente." },
  { img: "/images/land/aureacloud/card/card3.jpeg", alt: "Design Labubu Kawaii", chip: "Stile Labubu", title: "Design Labubu Kawaii", text: "Lo stile che ha conquistato TikTok e le fashion week asiatiche. Trendy, unico, impossibile non farsi notare." },
  { img: "/images/land/aureacloud/card/card4.jpeg", alt: "Suola Anti-Scivolo", chip: "Sicurezza Grip", title: "Suola Anti-Scivolo Premium", text: "Pattern di aderenza studiato per superfici bagnate e asciutte. Sicura in piscina, sicura in città. Ovunque." },
  { img: "/images/land/aureacloud/card/card5.jpeg", alt: "Fori di Areazione", chip: "Traspirante", title: "Fori di Areazione Strategici", text: "I fori mantengono il piede fresco e asciutto tutto il giorno. Zero sudore, zero odore. Anche d'estate." },
  { img: "/images/land/aureacloud/card/card6.jpeg", alt: "Charm Personalizzabili", chip: "Personalizzazione", title: "Compatibile con Charm e Accessori", text: "Aggiungi i tuoi charm preferiti e personalizza il tuo stile. Ogni paio è unico. Come te." },
];

function FeaturesGridSection() {
  return (
    <section className="bg-[#FCFCFA] py-12 md:py-16">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-[27px] md:text-[33px] leading-[1.22] tracking-[-0.015em] font-bold text-[#1A1917]">
            6 Caratteristiche che le Rendono <span className="text-[#3b82f6]">Uniche</span>
          </h2>
          <p className="text-[16px] leading-[1.65] text-[#5A5752]">
            Non sono solo belle. Sono progettate per darti comfort e altezza senza compromessi.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {techCards.map((c) => (
            <div key={c.title} className="flex h-full flex-col overflow-hidden rounded-[14px] border border-[#E2E4E8] bg-white shadow-[0_1px_3px_rgba(26,25,23,0.04)]">
              <div className="aspect-square overflow-hidden bg-[#FCFCFA] p-4 pb-0">
                <img src={c.img} alt={c.alt} className="h-full w-full object-contain" />
              </div>
              <div className="p-5 pt-3">
                <span className="mb-2 inline-flex items-center rounded-[5px] bg-[#EEF1F7] px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#3b82f6]">
                  {c.chip}
                </span>
                <h3 className="mb-2 text-[18px] font-extrabold text-[#1A1917]">{c.title}</h3>
                <p className="text-[14px] leading-[1.65] text-[#5A5752]">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   BEFORE / AFTER SECTION
   ════════════════════════════════════════════════════════════════════ */

function BeforeAfterSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-[27px] md:text-[33px] leading-[1.22] tracking-[-0.015em] font-bold text-[#1A1917]">
            La Differenza È <span className="text-[#3b82f6]">Visibile</span>
          </h2>
          <p className="text-[16px] leading-[1.65] text-[#5A5752]">
            6 centimetri cambiano tutto. Postura, proporzioni, sicurezza. E nessuno lo saprà mai.
          </p>
        </div>

        <div className="relative mx-auto max-w-3xl">
          {/* Before/After Image Container */}
          <div className="relative overflow-hidden rounded-[14px] border border-[#E2E4E8] shadow-[0_1px_3px_rgba(26,25,23,0.04)]">
            <img
              src="/images/land/aureacloud/vs.jpeg"
              alt="Prima e Dopo AureaCloud - Differenza Visibile"
              className="w-full"
            />
          </div>

          {/* Benefits Pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              { icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", text: "Postura corretta" },
              { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", text: "Glutei sollevati" },
              { icon: "M13 10V3L4 14h7v7l9-11h-7z", text: "Gambe slanciate" },
              { icon: "M5 13l4 4L19 7", text: "Più sicurezza" },
            ].map((item, i) => (
              <div key={i} className="inline-flex items-center gap-2 rounded-full border border-[#E2E4E8] bg-white px-3 py-2 shadow-[0_1px_3px_rgba(26,25,23,0.04)]">
                <svg className="h-4 w-4 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span className="text-[14px] font-bold text-[#1A1917]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   REVIEWS SECTION
   ════════════════════════════════════════════════════════════════════ */

function LpReviewsSection() {
  return (
    <section className="bg-[#FCFCFA] py-12 md:py-16" id="resenas">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#FF6B35]">RECENSIONI</p>
          <h2 className="mb-4 text-[27px] md:text-[33px] leading-[1.22] tracking-[-0.015em] font-bold text-[#1A1917]">
            Recensioni delle clienti
          </h2>
          <div className="flex items-center justify-center gap-2">
            {/* Stelle piccole arancioni */}
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-4 w-4 fill-[#FFB800]" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                </svg>
              ))}
            </div>
            <span className="text-[16px] font-bold text-[#1A1917]">4,9/5</span>
            <span className="text-[14px] text-[#9B9790]">· 1.624 recensioni</span>
            <span className="inline-flex items-center gap-1 rounded-[5px] bg-[#E6F4EC] px-2 py-1 text-[11px] font-semibold text-[#2B6E44]">
              verificate
            </span>
          </div>
        </div>
        <LpReviews />
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   FAQ SECTION
   ════════════════════════════════════════════════════════════════════ */

function LpFaqSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          {/* Orange FAQ badge */}
          <div className="mb-3 inline-flex items-center rounded-[5px] bg-[#3b82f6] px-3 py-1.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white">FAQ</span>
          </div>
          <h2 className="mb-3 text-[27px] md:text-[33px] leading-[1.22] tracking-[-0.015em] font-bold text-[#1A1917]">
            Domande Frequenti
          </h2>

          {/* Search input */}
          <div className="mx-auto max-w-2xl mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Cerca nelle FAQ (es. spedizione, taglia, reso...)"
                className="w-full rounded-[14px] border border-[#E2E4E8] bg-white px-4 py-3 pl-11 text-[14px] text-[#1A1917] outline-none transition-colors focus:border-[#3b82f6] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] shadow-[0_1px_3px_rgba(26,25,23,0.04)]"
              />
              <svg viewBox="0 0 24 24" className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 fill-none stroke-[#9B9790]" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-4xl">
          <LpFaq />

          {/* Show all button */}
          <div className="mt-6 text-center">
            <button className="inline-flex items-center gap-2 rounded-full border-2 border-[#3b82f6] bg-white px-6 py-3 text-[14px] font-bold text-[#3b82f6] transition-colors hover:bg-[#3b82f6] hover:text-white shadow-[0_1px_3px_rgba(26,25,23,0.04)]">
              Mostra tutte le domande
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   TRUSTPILOT SECTION
   ════════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════════
   LOGISTICS / SHIPPING INFO SECTION
   ════════════════════════════════════════════════════════════════════ */

function LogisticsSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* LOGISTICS SECTION */}
        <div className="mb-8 rounded-[14px] border border-[#E2E4E8] bg-white p-6 md:p-8 shadow-[0_1px_3px_rgba(26,25,23,0.04)]">
          <div className="mb-6 flex items-center justify-between">
            <div className="inline-flex items-center rounded-[5px] bg-[#2B6E44] px-3 py-1.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white">LOGISTICA</span>
            </div>
            <div className="flex h-8 items-center justify-center rounded-[8px] bg-white px-3">
              <span className="text-[16px] font-extrabold text-[#2B6E44]">GLS</span>
            </div>
          </div>

          <h2 className="mb-6 text-[24px] md:text-[33px] font-bold text-[#1A1917]">Spediamo con GLS Express</h2>

          <div className="mb-6 grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-3">
            {[
              { icon: "M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z", title: "Spedizione gratuita 24-48h", desc: "Consegna express in tutta Italia. Sempre gratis, nessun costo nascosto." },
              { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", title: "Ti chiamiamo o scriviamo per confermare", desc: "Ti contattiamo via WhatsApp o telefono per confermare l'ordine prima di spedire." },
              { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", title: "Ordini venerdì dopo 17:00 confermati lunedì", desc: "Gli ordini del weekend vengono confermati il lunedì mattina." },
            ].map((item, i) => (
              <div key={i} className="rounded-[14px] border border-[#E2E4E8] bg-white p-5 shadow-[0_1px_3px_rgba(26,25,23,0.04)]">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#E6F4EC]">
                  <svg className="h-5 w-5 fill-[#2B6E44]" viewBox="0 0 24 24">
                    <path d={item.icon} />
                  </svg>
                </div>
                <h3 className="mb-2 text-[16px] font-bold text-[#1A1917]">{item.title}</h3>
                <p className="text-[14px] leading-[1.65] text-[#5A5752]">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {["Spedizione gratuita", "Pagamento alla consegna", "Consegna 24-48h"].map((text, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 rounded-full bg-[#E6F4EC] px-4 py-2 text-[14px] font-bold text-[#2B6E44]">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* TRUSTPILOT SECTION */}
        <div className="rounded-[14px] border border-[#E2E4E8] bg-white p-6 md:p-8 shadow-[0_1px_3px_rgba(26,25,23,0.04)]">
          {/* Header - Centrato */}
          <div className="mb-6 text-center">
            {/* Logo Trustpilot con testo */}
            <div className="mb-3 inline-flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-7 w-7 fill-[#00B67A]">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
              </svg>
              <span className="text-[24px] font-bold text-[#1A1917]">Trustpilot</span>
            </div>

            {/* Stelle */}
            <div className="mb-3 flex justify-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-5 w-5 fill-[#00B67A]" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                </svg>
              ))}
            </div>

            <p className="mb-2 text-[16px] font-bold text-[#1A1917]">Valutato Eccellente · 4.8 su 5 basato su 483 recensioni</p>
            <p className="mb-6 text-[14px] text-[#5A5752]">Recensioni Generali del Negozio Calzame</p>
          </div>

          {/* Review Cards - Horizontal Carousel */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Sofia M.", time: "2 giorni fa", text: "Prodotto eccellente, spedizione velocissima. Molto soddisfatta dell'acquisto!" },
              { name: "Chiara B.", time: "1 settimana fa", text: "Ottima qualità e assistenza clienti impeccabile. Consiglio vivamente!" },
              { name: "Giulia R.", time: "2 settimane fa", text: "Le scarpe sono comodissime e arrivate in tempo. Perfette!" },
              { name: "Elena P.", time: "3 settimane fa", text: "Servizio eccezionale. Prodotti di alta qualità. Tornerò sicuramente!" },
            ].map((review, i) => (
              <div key={i} className="rounded-[14px] border border-[#E2E4E8] bg-white p-4 shadow-[0_1px_3px_rgba(26,25,23,0.04)]">
                <div className="mb-2 flex gap-0.5">
                  {[...Array(5)].map((_, idx) => (
                    <svg key={idx} className="h-4 w-4 fill-[#00B67A]" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                    </svg>
                  ))}
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-[5px] bg-[#E6F4EC] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#2B6E44]">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Verificata
                  </span>
                </div>
                <p className="mb-2 text-[14px] font-bold text-[#1A1917]">{review.text}</p>
                <div className="flex items-center justify-between text-[12px] text-[#9B9790]">
                  <span>{review.name}</span>
                  <span>{review.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <p className="text-center text-[12px] text-[#9B9790]">
            Recensioni prese in modo casuale dal nostro profilo TrustPilot
          </p>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   REFUND POLICY SECTION
   ════════════════════════════════════════════════════════════════════ */

function RefundPolicySection() {
  return (
    <section className="bg-[#FCFCFA] py-12 md:py-16">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {/* Image */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <img
                src="/images/land/aureacloud/carosello/1.jpeg"
                alt="AureaCloud - Reso Facile"
                className="relative aspect-square w-full max-w-md rounded-[14px] border border-[#E2E4E8] object-cover shadow-[0_1px_3px_rgba(26,25,23,0.04)]"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center">
            <h2 className="mb-6 text-[27px] md:text-[33px] leading-[1.22] tracking-[-0.015em] font-bold text-[#1A1917]">
              Reso Facile <span className="text-[#3b82f6]">Entro 30 Giorni</span>
            </h2>

            <div className="mb-6 space-y-4">
              {[
                { step: "1", title: "Contattaci entro 30 giorni", desc: "Scrivici su WhatsApp o via email per richiedere il reso. Ti risponderemo subito." },
                { step: "2", title: "Spedisci il prodotto", desc: "Rimanda le AureaCloud nella confezione originale. Ti forniamo tutte le istruzioni." },
                { step: "3", title: "Ricevi il rimborso completo", desc: "Appena riceviamo il prodotto, ti rimborsiamo l'intero importo. Senza domande." },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 min-w-[24px] shrink-0 items-center justify-center rounded-full bg-[#3b82f6] text-[12px] font-bold text-white">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="mb-1 text-[16px] font-bold text-[#1A1917]">{item.title}</h3>
                    <p className="text-[14px] leading-[1.65] text-[#5A5752]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", text: "Assistenza dedicata" },
                { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", text: "Garanzia soddisfatti" },
                { icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15", text: "Procedura semplice" },
              ].map((item, i) => (
                <div key={i} className="rounded-[8px] border border-[#E2E4E8] bg-white p-3 text-center shadow-[0_1px_3px_rgba(26,25,23,0.04)]">
                  <div className="mb-2 flex justify-center">
                    <svg className="h-6 w-6 text-[#3b82f6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <p className="text-[12px] font-bold text-[#1A1917]">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[14px] border border-[#E2E4E8] bg-white p-4 shadow-[0_1px_3px_rgba(26,25,23,0.04)]">
              <p className="text-[14px] leading-[1.65] text-[#5A5752]">
                <strong className="font-bold text-[#1A1917]">Contatti:</strong> Per assistenza o per richiedere il reso, contattaci via WhatsApp al <strong className="font-bold text-[#3b82f6]">+39 351 123 4567</strong> o via email a <strong className="font-bold text-[#3b82f6]">supporto@piedeluxe.com</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   DISCLAIMER
   ════════════════════════════════════════════════════════════════════ */

function Disclaimer() {
  return (
    <div className="mx-auto max-w-[1360px] px-4 py-8 text-center text-[12px] leading-[1.65] text-[#9B9790] sm:px-6 lg:px-8">
      *Questo prodotto non è un dispositivo medico. I benefici percepiti possono variare da persona a persona. Immagini illustrative. Dati basati su sondaggi interni e recensioni verificate.
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════════════ */

const FB_PIXEL_ID = "1576025786901423";
const GADS_ID = "AW-17553930868";

export default function AureaCloudLanding() {
  return (
    <div className="bg-white">
      {/* Facebook Pixel */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${FB_PIXEL_ID}');
fbq('track','PageView');`,
        }}
      />
      {/* Google Ads */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init-landing"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','${GADS_ID}');`,
        }}
      />
      <StickyOrderButton />
      <HeroSection />
      <ProblemSolutionSection />
      <FeaturesGridSection />
      <BeforeAfterSection />
      <LpReviewsSection />
      <LpFaqSection />
      <LogisticsSection />
      <RefundPolicySection />
      <Disclaimer />
    </div>
  );
}
