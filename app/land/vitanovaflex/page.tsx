import type { Metadata } from "next";
import Script from "next/script";
import "./landing.css";
import fs from "fs";
import path from "path";
import { HeroGallery, StickyOrderButton, LpReviews, LpFaq } from "./client";
import { OrderSection } from "./OrderModal";
import PainPointsSection from "@/components/landing/PainPointsSection";

function getCarouselImages(): string[] {
  const dir = path.join(process.cwd(), "public/images/land/vitanovaflex/carosello");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(webp|jpg|jpeg|png|avif)$/i.test(f))
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map((f) => `/images/land/vitanovaflex/carosello/${f}`);
}

export const metadata: Metadata = {
  title: "LuxeFlex - Scarpe Ortopediche per Chi Lavora in Piedi",
  description:
    "Scopri LuxeFlex: la scarpa ortopedica per infermiere, commesse e chi lavora in piedi tutto il giorno. Knit elasticizzato, suola cloud anti-fatica. Spedizione gratuita e pagamento alla consegna.",
};

/* ════════════════════════════════════════════════════════════════════
   PAIN POINTS DATA
   ════════════════════════════════════════════════════════════════════ */

const painPoints = [
  {
    icon: "⏰",
    title: "Turni Interminabili in Piedi",
    description: "8-12 ore in piedi. I piedi bruciano dopo 2 ore. Le gambe si appesantiscono. La schiena si irrigidisce. Arrivi a casa distrutta. E domani ricomincia tutto."
  },
  {
    icon: "🦶",
    title: "Piedi Gonfi e Doloranti a Fine Turno",
    description: "Le scarpe stringono sempre di più. I piedi si gonfiano. Toglierle è un sollievo e una tortura insieme. La sera non riesci nemmeno a camminare normalmente."
  },
  {
    icon: "💢",
    title: "Schiena e Gambe che Non Reggono Più",
    description: "La schiena è sempre tesa. Le gambe pesano come piombo. Ogni passo è fatica. Non è normale sentirsi così ogni singolo giorno."
  }
];

/* ════════════════════════════════════════════════════════════════════
   HERO SECTION
   ════════════════════════════════════════════════════════════════════ */

function HeroSection() {
  const images = getCarouselImages();
  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 pb-10 md:pt-10 md:pb-14 sm:px-6 lg:px-8">
      <div className="grid items-start gap-8 md:grid-cols-2 md:gap-12">
        {/* Gallery (client) */}
        <HeroGallery images={images} />

        {/* Product Info */}
        <div>
          {/* Badges */}
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              La Scarpa di 47.000 Infermiere Italiane
            </span>
            <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
              Certificata Ortopedica · 2026
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-1 text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
            <span className="text-blue-700">LuxeFlex</span> — Lavori in Piedi Tutto il Giorno. Meriti una Scarpa che Regge Quanto Te.
          </h1>
          <p className="mb-4 text-base font-medium text-gray-500">
            Knit elasticizzato, suola cloud anti-fatica: la scarpa ortopedica pensata per infermiere, commesse, insegnanti e tutte le donne che non si fermano mai.
          </p>

          {/* Rating */}
          <a href="#resenas" className="mb-5 flex items-center gap-2 no-underline">
            <span className="text-lg text-amber-400">★★★★★</span>
            <span className="text-sm font-extrabold text-gray-900">4,9/5</span>
            <span className="text-sm text-gray-400 underline underline-offset-2">(12.847 recensioni)</span>
          </a>

          {/* Price */}
          <div className="mb-6 flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-green-600">€49,90</span>
            <span className="text-xl text-gray-400 line-through">€99,90</span>
            <span className="rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-xs font-bold text-red-600">
              -50%
            </span>
          </div>

          {/* Divider */}
          <div className="mb-6 h-px bg-gray-200" />

          {/* Feature bullets */}
          <ul className="mb-6 space-y-2.5">
            {[
              { bold: "Turni da 8-12 ore?", rest: "la suola cloud assorbe ogni passo, i piedi restano leggeri fino all'ultimo minuto" },
              { bold: "Knit elasticizzato", rest: "si adatta come un calzino, niente sfregamenti nemmeno con piedi gonfi a fine turno" },
              { bold: "Schiena meno rigida", rest: "il rialzo biomeccanico raddrizza la postura e scarica i lombari" },
              { bold: "Gambe meno pesanti", rest: "la rullata guidata dimezza la fatica muscolare" },
              { bold: "Calza in piedi tutto il giorno", rest: "il plantare supportivo distribuisce il peso in modo uniforme" },
              { bold: "Fresca e traspirante", rest: "piedi asciutti anche in ambienti caldi" },
              { bold: "Calze a compressione incluse", rest: "valore €14,90, in omaggio" },
            ].map((f) => (
              <li key={f.bold} className="border-l-[3px] border-blue-500 rounded-lg py-2.5 px-4 text-[16px] bg-white">
                <span className="text-gray-700">
                  <b className="font-bold text-gray-900">{f.bold}</b> — {f.rest}
                </span>
              </li>
            ))}
          </ul>

          {/* Order section: variant selectors + trigger + modal */}
          <OrderSection image={images[0] || ""} />

          {/* Shipping & Payment options */}
          <div className="space-y-3 rounded-xl border border-stone-200 bg-white p-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Opzioni di Spedizione</p>
              <label className="mt-2 flex cursor-default items-center gap-3 rounded-lg border-2 border-green-500 bg-green-50/50 px-4 py-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-green-500">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-stone-900">Spedizione Express GLS</p>
                  <p className="text-[13px] text-stone-500">Consegna in 24-48h</p>
                </div>
                <span className="text-sm font-bold text-green-600">GRATUITA</span>
              </label>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Opzioni di Pagamento</p>
              <label className="mt-2 flex cursor-default items-center gap-3 rounded-lg border-2 border-blue-500 bg-blue-50/50 px-4 py-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-blue-500">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-stone-900">Pagamento Contanti alla Consegna</p>
                  <p className="text-[13px] text-stone-500">Paghi direttamente al corriere</p>
                </div>
              </label>
            </div>
          </div>

          {/* Refund guarantee */}
          <div className="mt-3 mb-5 flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-sm leading-snug text-stone-600">
              <span className="font-semibold text-stone-800">Garanzia soddisfatti o rimborsati.</span> Se non ti piace, puoi richiedere un rimborso entro 30 giorni dalla consegna.
            </p>
          </div>

          {/* How it works box */}
          <div className="mb-5 rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-5 shadow-sm">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-blue-600 sm:text-sm">Semplice e sicuro</p>
            <h3 className="mb-4 text-xl font-extrabold text-gray-900 sm:text-2xl">Come ordinare?</h3>

            <div className="mb-4 grid grid-cols-2 gap-2.5">
              {[
                { step: "1", title: "Ordina", desc: "Compila il modulo con nome, indirizzo e telefono." },
                { step: "2", title: "Conferma", desc: "Ricevi WhatsApp per confermare. Se non lo usi, ti chiamiamo." },
                { step: "3", title: "Spedizione 24–48h", desc: "Dopo la conferma il pacco parte subito con GLS. Paghi al corriere." },
                { step: "4", title: "Reso facile 30 giorni", desc: "Soddisfatti o rimborsati. Assistenza via WhatsApp/telefono." },
              ].map((s) => (
                <div key={s.step} className="rounded-lg border-l-[3px] border-blue-500 bg-white py-2.5 px-3.5">
                  <p className="text-[17px] font-extrabold text-blue-700">{s.step}. {s.title}</p>
                  <p className="mt-0.5 text-[15px] leading-snug text-gray-500">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                  <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Zero anticipi
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Conferma rapida
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Assistenza prima della spedizione
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   EXPERT SECTION (Farmacista)
   ════════════════════════════════════════════════════════════════════ */

function ExpertSection() {
  return (
    <section className="expert-section">
      <div className="expert-container">
        <div className="expert-image-col">
          <img
            src="/images/land/vitanovaflex/farmacista.jpg"
            alt="Farmacista certificato ortopedico raccomanda LuxeFlex"
            className="expert-image"
          />
        </div>
        <div className="expert-text-col">
          <span className="expert-badge">Raccomandata dai Professionisti</span>
          <h2 className="expert-title">
            &ldquo;La consiglio a tutte le mie clienti che lavorano in piedi: infermiere, commesse, insegnanti.&rdquo;
          </h2>
          <p className="expert-attribution">
            Dott. Marco Ferretti — Farmacista specializzato in benessere plantare
          </p>
          <p className="expert-text">
            Chi passa 8-12 ore in piedi non può usare una scarpa qualsiasi.{" "}
            <strong>
              LuxeFlex è l&apos;unica scarpa che unisce knit elasticizzato e suola cloud: sostiene senza stringere, ammortizza senza appesantire. Per questo la consiglio.
            </strong>
          </p>
          <div className="expert-badges">
            <span className="expert-check">✓ Certificato Ortopedico</span>
            <span className="expert-check">✓ Consigliata da Farmacisti e Posturologi</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   PAGE
   ════════════════════════════════════════════════════════════════════ */

const FB_PIXEL_ID = "1576025786901423";
const GADS_ID = "AW-18070555751";

export default function LuxeFlexLanding() {
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
      <PainPointsSection painPoints={painPoints} />
      <div className="lp">
        <TechGridSection />
        <LpReviewsSection />
        <ExpertSection />
        <BenefitsSection />
        <StatsBar />
        <TimelineSection />
        <GuaranteesSection />
        <OrderStepsSection />
        <LpFaqSection />
        <Disclaimer />
      </div>
    </div>
  );
}

/* ═══════════════════ BENEFITS SECTION ═══════════════════ */

function BenefitsSection() {
  return (
    <section className="lp-fasi">
      <div className="lp-fasi-head">
        <h2>Lavori in Piedi, <em>Senza Pagarne il Prezzo</em></h2>
        <p>Turni lunghi, corsie infinite, ore al banco: LuxeFlex è progettata per chi non può sedersi.</p>
      </div>
      <div className="lp-fasi-grid">
        {[
          { img: "/images/land/vitanovaflex/benefici/beneficio1.png", alt: "Turni più leggeri", tag: "Beneficio 1", title: "Turni più leggeri", text: <>La suola cloud assorbe ogni passo. <strong>Arrivi a fine turno coi piedi ancora freschi.</strong></> },
          { img: "/images/land/vitanovaflex/benefici/beneficio2.png", alt: "Schiena meno rigida", tag: "Beneficio 2", title: "Schiena meno rigida", text: <>Il rialzo biomeccanico raddrizza la postura. <strong>Meno tensione ai lombari, meno dolore a fine giornata.</strong></> },
          { img: "/images/land/vitanovaflex/benefici/beneficio3.png", alt: "Zero sfregamenti", tag: "Beneficio 3", title: "Zero sfregamenti", text: <>Il knit elasticizzato si adatta senza stringere. <strong>Niente vesciche, niente punti di pressione. Anche con piedi gonfi.</strong></> },
        ].map((f) => (
          <div key={f.title} className="lp-fase">
            <img src={f.img} alt={f.alt} />
            <div className="lp-fase-overlay">
              <span className="lp-fase-tag">{f.tag}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════ STATS BAR ═══════════════════ */

function StatsBar() {
  return (
    <section className="lp-stats-sec">
      <div className="lp-inner">
        <div className="lp-stats">
          <div>
            <div className="lp-stat-n">47K+</div>
            <div className="lp-stat-l">Infermiere, commesse,<br />insegnanti soddisfatte</div>
          </div>
          <div>
            <div className="lp-stat-n">93%</div>
            <div className="lp-stat-l">Dicono: "Arrivo a fine<br />turno meno stanca"*</div>
          </div>
          <div>
            <div className="lp-stat-n">4.9</div>
            <div className="lp-stat-l">Valutazione media<br />+12.000 recensioni</div>
          </div>
        </div>
        <p className="lp-stats-disc">*Dati da sondaggi interni e recensioni verificate. I risultati individuali possono variare.</p>
      </div>
    </section>
  );
}

/* ═══════════════════ 6 TECH GRID ═══════════════════ */

const techCards = [
  { img: "/images/land/vitanovaflex/card/card1.png", alt: "Suola Cloud Anti-Fatica", chip: "Anti-fatica · Passo morbido", title: "Suola Cloud Anti-Fatica", text: <>Assorbe ogni impatto dal primo all&apos;ultimo passo. <strong>I piedi non sentono le ore che passano.</strong></> },
  { img: "/images/land/vitanovaflex/card/card2.png", alt: "Knit Elasticizzato", chip: "Adattivo · Zero pressione", title: "Knit Elasticizzato", text: <>Si adatta come una seconda pelle, senza stringere mai. <strong>Ideale anche per piedi gonfi a fine turno.</strong></> },
  { img: "/images/land/vitanovaflex/card/card3.png", alt: "Plantare Supportivo Estraibile", chip: "Supporto interno · Più comfort", title: "Plantare Supportivo Estraibile", text: <>Sostiene tallone, arco e avampiede. <strong>Distribuisce il peso in modo uniforme per chi sta sempre in piedi.</strong></> },
  { img: "/images/land/vitanovaflex/card/card4.png", alt: "Suola Antiscivolo", chip: "Sicurezza · Grip totale", title: "Suola Antiscivolo", text: <>Grip su pavimenti lisci, bagnati, ospedalieri. <strong>Passo sicuro in ogni ambiente di lavoro.</strong></> },
  { img: "/images/land/vitanovaflex/card/card5.png", alt: "Rialzo Biomeccanico", chip: "Lombare · Postura", title: "Rialzo Biomeccanico", text: <>Il cuneo posteriore riallinea il bacino ad ogni passo. <strong>La colonna smette di compensare. La schiena ringrazia.</strong></> },
  { img: "/images/land/vitanovaflex/card/card6.png", alt: "Leggerezza Estrema", chip: "Solo 280g · Ultra-leggera", title: "Leggerezza Estrema", text: <>Solo 280g per piede. <strong>Cammini chilometri senza sentirti appesantita.</strong></> },
];

function TechGridSection() {
  return (
    <section className="lp-sec">
      <div className="lp-inner">
        <h2>6 Tecnologie in <em>Una Sola Scarpa</em></h2>
        <p className="sub">Ogni dettaglio è progettato per attaccare il dolore dove nasce.</p>
        <div className="lp-grid6">
          {techCards.map((c) => (
            <div key={c.title} className="lp-card">
              <img src={c.img} alt={c.alt} />
              <div className="lp-card-content">
                <span className="lp-card-chip">{c.chip}</span>
                <h4>{c.title}</h4>
                <p>{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ TIMELINE 4 WEEKS ═══════════════════ */

function TimelineSection() {
  return (
    <section className="lp-sec lp-sec-light" style={{ background: "#f0fdf4" }}>
      <div className="lp-inner">
        <h2>Meno Fatica in <em>4 Settimane</em></h2>
        <p className="sub"></p>
        <div className="lp-timeline">
          {[
            { week: "Settimana 1", pct: "25%", title: "Primo turno diverso", text: <>Noti subito il passo più morbido. <strong>A fine giornata i piedi sono meno stanchi.</strong></> },
            { week: "Settimana 2", pct: "50%", title: "Meno tensione", text: <>La schiena è più rilassata, le gambe meno pesanti. <strong>Il turno finisce e hai ancora energia.</strong></> },
            { week: "Settimana 3", pct: "75%", title: "Routine consolidata", text: <>Ormai il comfort è normale. <strong>Non pensi più ai piedi, pensi al lavoro.</strong></> },
            { week: "Settimana 4", pct: "100%", title: "Nuovo standard", text: <>LuxeFlex diventa la tua scarpa da lavoro. <strong>Non torni più indietro.</strong></> },
          ].map((s) => (
            <div key={s.week} className="lp-tl-step">
              <div className="lp-tl-week">{s.week}</div>
              <div className="lp-tl-bar"><div className="lp-tl-fill" style={{ width: s.pct }} /></div>
              <div className="lp-tl-info">
                <strong>{s.title}</strong>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="lp-tl-bottom">
          <div className="lp-tl-badge">Indossale ogni giorno</div>
          <div className="lp-tl-badge">Cammina normalmente</div>
          <div className="lp-tl-badge">Zero sforzo</div>
        </div>
        <p className="lp-tl-disc">*Tempi indicativi: i risultati variano in base a continuità e condizione iniziale.</p>
      </div>
    </section>
  );
}

/* ═══════════════════ REVIEWS (client) ═══════════════════ */

function LpReviewsSection() {
  return (
    <section className="lp-sec lp-sec-light" id="resenas">
      <div className="lp-inner">
        <h2>12.847 Recensioni <em>Verificate</em></h2>
        <p className="sub">Recensioni verificate esternamente a questo sito web.</p>
        <LpReviews />
      </div>
    </section>
  );
}

/* ═══════════════════ GUARANTEES ═══════════════════ */

function GuaranteesSection() {
  return (
    <section className="lp-sec lp-sec-dark">
      <div className="lp-inner">
        <h2>Acquista Senza <em>Nessun Rischio</em></h2>
        <p className="sub">La tua unica preoccupazione: scegliere la taglia.</p>
        <div className="lp-guar-grid">
          {[
            { icon: "📦", title: "Spedizione GRATIS", sub: "Consegna GLS 24-48h" },
            { icon: "💰", title: "Pagamento alla Consegna", sub: "Paghi al corriere in contanti" },
            { icon: "🔄", title: "Reso 30 Giorni", sub: "Soddisfatto o rimborsato" },
            { icon: "📞", title: "Assistenza Dedicata", sub: "WhatsApp o telefono" },
          ].map((g) => (
            <div key={g.title} className="lp-guar">
              <div className="lp-guar-ic">{g.icon}</div>
              <strong>{g.title}</strong>
              <small>{g.sub}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ ORDER STEPS ═══════════════════ */

function OrderStepsSection() {
  return (
    <section className="lp-sec">
      <div className="lp-inner">
        <h2>Ordinare È <em>Semplicissimo</em></h2>
        <p className="sub">Senza carta di credito, senza registrazione. In 2 minuti è fatto.</p>
        <div className="lp-pasos">
          {[
            { n: "1", title: "Effettua il tuo ordine", text: "Nome, indirizzo e telefono. Nient'altro." },
            { n: "2", title: "Ti contattiamo per confermare", text: "Ti scriviamo su WhatsApp per confermare i dati. Se non lo usi, ti chiamiamo." },
            { n: "3", title: "Ricevi con GLS e paghi al corriere", text: "Spedizione GRATIS 24-48h. Paghi in contanti alla consegna." },
            { n: "4", title: "Non ti convincono? Le restituisci", text: "30 giorni per il reso. Senza complicazioni. Soddisfatto o rimborsato." },
          ].map((s) => (
            <div key={s.n} className="lp-paso">
              <div className="lp-paso-n">{s.n}</div>
              <div><h4>{s.title}</h4><p>{s.text}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ FAQ (client) ═══════════════════ */

function LpFaqSection() {
  return (
    <section className="lp-sec lp-sec-light">
      <div className="lp-inner">
        <h2>Domande <em>Frequenti</em></h2>
        <LpFaq />
      </div>
    </section>
  );
}

/* ═══════════════════ DISCLAIMER ═══════════════════ */

function Disclaimer() {
  return (
    <div className="lp-disc">
      *Questo prodotto non è un dispositivo medico. I benefici percepiti possono variare da persona a persona. Immagini illustrative. Dati basati su sondaggi interni e recensioni verificate. Consulta un professionista per esigenze ortopediche specifiche.
    </div>
  );
}
