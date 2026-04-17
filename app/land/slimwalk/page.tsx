import type { Metadata } from "next";
import Script from "next/script";
import "./landing.css";
import fs from "fs";
import path from "path";
import { HeroGallery, StickyOrderButton, LpReviews, LpFaq } from "./client";
import { OrderSection } from "./OrderModal";
import PainPointsSection from "@/components/landing/PainPointsSection";

function getCarouselImages(): string[] {
  const dir = path.join(process.cwd(), "public/images/land/slimwalk/carosello");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(webp|png|jpe?g)$/i.test(f))
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map((f) => `/images/land/slimwalk/carosello/${f}`);
}

export const metadata: Metadata = {
  title: "SlimWalk - Gambe Snelle e Toniche Camminando | Senza Palestra, Senza Fatica",
  description:
    "SlimWalk: la scarpa con tecnologia RockerTone™ che tonifica glutei e cosce ad ogni passo. Cellulite ridotta in 4 settimane. Spedizione gratuita e pagamento alla consegna.",
};

/* ════════════════════════════════════════════════════════════════════
   PAIN POINTS DATA
   ════════════════════════════════════════════════════════════════════ */

const painPoints = [
  {
    icon: "😩",
    title: "Gambe Poco Toniche",
    description: "Le tue gambe sono molli e poco toniche. Vorresti gambe più snelle e definite ma non hai tempo per la palestra."
  },
  {
    icon: "😣",
    title: "Cellulite Evidente",
    description: "La cellulite su cosce e glutei ti mette a disagio. Hai provato creme e trattamenti ma niente funziona davvero."
  },
  {
    icon: "😫",
    title: "Sedentarietà Forzata",
    description: "Passi troppo tempo seduta per lavoro. Le tue gambe sono pesanti, la circolazione è lenta e i muscoli si indeboliscono."
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
            <span className="rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-xs font-bold text-pink-700">
              Tecnologia RockerTone™
            </span>
            <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
              Bestseller 2024
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-1 text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
            <span className="text-pink-600">SlimWalk</span> — Gambe Snelle e Toniche. Senza Palestra. Senza Fatica.
          </h1>
          <p className="mb-4 text-base font-medium text-gray-500">
            La scarpa con suola RockerTone™ che OBBLIGA i tuoi muscoli a lavorare ad ogni passo. Tonifica glutei e cosce mentre cammini. Cellulite ridotta in 4 settimane.
          </p>

          {/* Rating */}
          <a href="#resenas" className="mb-5 flex items-center gap-2 no-underline">
            <span className="text-lg text-amber-400">★★★★★</span>
            <span className="text-sm font-extrabold text-gray-900">4,9/5</span>
            <span className="text-sm text-gray-400 underline underline-offset-2">(4.218 recensioni)</span>
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
              { bold: "TONIFICA GLUTEI E COSCE", rest: "la suola RockerTone™ attiva il 30% in più di muscoli ad ogni passo" },
              { bold: "CELLULITE RIDOTTA IN 4 SETTIMANE", rest: "migliora la circolazione e combatte la ritenzione idrica" },
              { bold: "BRUCIA IL 25% DI CALORIE IN PIÙ", rest: "camminare diventa un allenamento invisibile" },
              { bold: "GAMBE PIÙ SNELLE E DEFINITE", rest: "senza palestra, senza diete estreme, senza fatica" },
              { bold: "GLUTEI SOLLEVATI NATURALMENTE", rest: "la postura migliora e il lato B si alza" },
              { bold: "SOLETTA MODELLANTE INCLUSA", rest: "valore €19,90, in omaggio" },
            ].map((f) => (
              <li key={f.bold} className="border-l-[3px] border-pink-500 rounded-lg py-2.5 px-4 text-[16px] bg-white">
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
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-pink-50 text-pink-600">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-gray-900">Garanzia Risultati 30 Giorni</p>
              <p className="text-[12px] text-gray-500">Non vedi risultati? Ti rimborsiamo al 100%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   EXPERT SECTION (Esperta Fitness)
   ════════════════════════════════════════════════════════════════════ */

function ExpertSection() {
  return (
    <section className="expert-section">
      <div className="expert-container">
        <div className="expert-image-col">
          <img
            src="/images/land/slimwalk/expert/expert.webp"
            alt="Dott.ssa Elena Rossi - Personal Trainer e Esperta di Tonificazione"
            className="expert-image"
          />
        </div>
        <div className="expert-text-col">
          <span className="expert-badge">Consigliata dai Professionisti</span>
          <h2 className="expert-title">
            &ldquo;È come fare squat ad ogni passo. Ma senza lo sforzo.&rdquo;
          </h2>
          <p className="expert-attribution">
            Dott.ssa Elena Rossi — Personal Trainer, 18 anni di esperienza in tonificazione femminile
          </p>
          <p className="expert-text">
            Le mie clienti mi chiedono sempre: &ldquo;Come posso tonificare senza andare in palestra?&rdquo; La risposta è camminare nel modo GIUSTO.{" "}
            <strong>
              La suola RockerTone™ di SlimWalk attiva glutei e quadricipiti ad ogni singolo passo. È come fare migliaia di micro-squat ogni giorno, senza rendertene conto. Le mie clienti vedono risultati in 3-4 settimane. Gambe più snelle, glutei più alti, cellulite ridotta. Senza sudare, senza sacrifici.
            </strong>
          </p>
          <div className="expert-badges">
            <span className="expert-check">✓ Attiva Glutei</span>
            <span className="expert-check">✓ Tonifica Cosce</span>
            <span className="expert-check">✓ Riduce Cellulite</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   PROBLEM SECTION - Agitazione del problema (AGGRESSIVO)
   ════════════════════════════════════════════════════════════════════ */

function ProblemSection() {
  return (
    <section className="lp-problem">
      <div className="lp-inner">
        <h2>Guardati Allo Specchio. <em>Ti Piace Quello Che Vedi?</em></h2>
        <p className="sub">Se la risposta è no, non è colpa tua. È colpa di COME cammini.</p>
        <div className="lp-problem-grid">
          <div className="lp-problem-card">
            <div className="lp-problem-icon">🍊</div>
            <h4>Cellulite Che Non Va Via?</h4>
            <p>Creme, massaggi, fanghi... hai speso centinaia di euro e quella pelle a buccia d&apos;arancia è ancora lì. Ogni volta che ti spogli ti viene da piangere.</p>
          </div>
          <div className="lp-problem-card">
            <div className="lp-problem-icon">🩳</div>
            <h4>Ti Nascondi Dietro Pantaloni Larghi?</h4>
            <p>Anche d&apos;estate. Anche quando fa caldo. Perché le tue cosce non ti piacciono e non vuoi che nessuno le veda.</p>
          </div>
          <div className="lp-problem-card">
            <div className="lp-problem-icon">🍑</div>
            <h4>Glutei Piatti o Cadenti?</h4>
            <p>Quei jeans che una volta ti stavano benissimo ora sembrano un sacco vuoto. Il tuo lato B ha perso tono e forma.</p>
          </div>
          <div className="lp-problem-card">
            <div className="lp-problem-icon">🏋️</div>
            <h4>La Palestra Non Fa Per Te?</h4>
            <p>Non hai tempo. Non hai voglia. Ti annoia. Hai provato mille volte e hai sempre mollato. E intanto le tue gambe peggiorano.</p>
          </div>
        </div>
        <div className="lp-problem-reveal">
          <p><strong>La verità brutale:</strong> Con scarpe normali, i tuoi muscoli DORMONO mentre cammini. Glutei, cosce, polpacci — tutto inattivo. 8.000 passi al giorno SPRECATI. SlimWalk ha una suola curva che OBBLIGA i muscoli a lavorare. Ogni passo diventa un esercizio. Tonifichi senza sforzo. È scienza, non magia.</p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ BENEFITS SECTION ═══════════════════ */

function BenefitsSection() {
  return (
    <section className="lp-fasi">
      <div className="lp-fasi-head">
        <h2>Il Segreto Delle Donne Con <em>Gambe Perfette</em></h2>
        <p>Non è genetica. Non è la palestra. È COME camminano. SlimWalk trasforma ogni passo in un allenamento invisibile.</p>
      </div>
      <div className="lp-fasi-grid">
        {[
          { img: "/images/land/slimwalk/benefici/1.webp", alt: "Tonificazione Muscolare", tag: "Tonificazione", title: "MUSCOLI ATTIVI AD OGNI PASSO", text: <>La suola RockerTone™ crea un&apos;instabilità controllata che OBBLIGA glutei e cosce a lavorare. <strong>È come fare squat camminando.</strong></> },
          { img: "/images/land/slimwalk/benefici/2.webp", alt: "Cellulite Ridotta", tag: "Bellezza", title: "CELLULITE VISIBILMENTE RIDOTTA", text: <>La circolazione migliora, la ritenzione idrica diminuisce. <strong>In 4 settimane la pelle a buccia d&apos;arancia si attenua visibilmente.</strong></> },
          { img: "/images/land/slimwalk/benefici/3.webp", alt: "Glutei Sollevati", tag: "Risultato", title: "GLUTEI PIÙ ALTI E TONICI", text: <>La postura migliora naturalmente, il bacino si riallinea. <strong>Il tuo lato B si solleva senza interventi.</strong></> },
        ].map((f) => (
          <div key={f.title} className="lp-fase">
            <img src={f.img} alt={f.alt} />
            <span className="lp-fase-tag">{f.tag}</span>
            <h3>{f.title}</h3>
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
            <div className="lp-stat-n">30%</div>
            <div className="lp-stat-l">Muscoli in più<br />attivati</div>
          </div>
          <div>
            <div className="lp-stat-n">18.000+</div>
            <div className="lp-stat-l">Donne<br />trasformate</div>
          </div>
          <div>
            <div className="lp-stat-n">4.9</div>
            <div className="lp-stat-l">Valutazione media<br />+4.218 recensioni</div>
          </div>
        </div>
        <p className="lp-stats-disc">*Dati da studi interni e recensioni verificate. I risultati individuali possono variare.</p>
      </div>
    </section>
  );
}

/* ═══════════════════ 6 TECH GRID ═══════════════════ */

const techCards = [
  { img: "/images/land/slimwalk/card/1.webp", alt: "Suola RockerTone", chip: "Tonificazione · Core", title: "Suola RockerTone™", text: <>La curvatura scientifica crea micro-instabilità che attiva glutei, cosce e addominali ad ogni passo. <strong>Tonifichi camminando.</strong></> },
  { img: "/images/land/slimwalk/card/2.webp", alt: "Sistema CelluliteDrain", chip: "Bellezza · Circolazione", title: "Sistema CelluliteDrain™", text: <>Il movimento naturale stimola la circolazione linfatica. <strong>Ritenzione idrica e cellulite si riducono visibilmente.</strong></> },
  { img: "/images/land/slimwalk/card/3.webp", alt: "Tecnologia PostureLift", chip: "Postura · Glutei", title: "Tecnologia PostureLift™", text: <>Riallinea naturalmente bacino e colonna. <strong>I glutei si sollevano automaticamente, senza chirurgia.</strong></> },
  { img: "/images/land/slimwalk/card/4.webp", alt: "Intersuola SlimStep", chip: "Calorie · Dimagrimento", title: "Intersuola SlimStep™", text: <>Brucia il 25% di calorie in più rispetto a camminare con scarpe normali. <strong>Dimagrisci senza dieta.</strong></> },
  { img: "/images/land/slimwalk/card/5.webp", alt: "Suola Antiscivolo", chip: "Sicurezza · Grip", title: "Suola Antiscivolo Pro", text: <>Gomma ad alta aderenza per camminare sicura su ogni superficie. <strong>Zero rischio di scivolate.</strong></> },
  { img: "/images/land/slimwalk/card/6.webp", alt: "Design Ultraleggero", chip: "Comfort · Leggerezza", title: "Solo 290g — Ultraleggera", text: <>Tra le più leggere nella categoria. <strong>Le indossi tutto il giorno senza sentirle.</strong></> },
];

function TechGridSection() {
  return (
    <section className="lp-sec">
      <div className="lp-inner">
        <h2>6 Tecnologie Che <em>Scolpiscono Il Tuo Corpo</em></h2>
        <p className="sub">Ogni dettaglio è progettato per tonificare, snellire e modellare le tue gambe.</p>
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

/* ═══════════════════ TRANSFORMATION SECTION ═══════════════════ */

function TransformationSection() {
  return (
    <section className="lp-sec" style={{ background: "#fff5f7" }}>
      <div className="lp-inner">
        <h2>La Trasformazione Inizia <em>Dal Primo Passo</em></h2>
        <p className="sub">Ecco cosa succede al tuo corpo quando indossi SlimWalk ogni giorno.</p>
        <div className="lp-timeline">
          {[
            { week: "Giorno 1-3", pct: "25%", title: "Senti i Muscoli Lavorare", text: <>I glutei e le cosce iniziano ad attivarsi. Senti una leggera &ldquo;stanchezza buona&rdquo; dopo le prime camminate. <strong>I tuoi muscoli dormivano — ora si sono svegliati.</strong></> },
            { week: "Settimana 1-2", pct: "50%", title: "Gambe Meno Pesanti", text: <>La circolazione migliora. Le gambe a fine giornata non sono più gonfie e doloranti. <strong>Ti senti già più leggera.</strong></> },
            { week: "Settimana 3", pct: "75%", title: "Cellulite Meno Visibile", text: <>La pelle inizia a sembrare più liscia. La ritenzione idrica si riduce. <strong>Inizi a guardarti allo specchio con meno vergogna.</strong></> },
            { week: "Settimana 4+", pct: "100%", title: "Gambe Trasformate", text: <>Cosce più snelle. Glutei più tonici e sollevati. Cellulite ridotta. <strong>Ti senti finalmente bene nel tuo corpo. Torni a mettere gonne e vestiti corti.</strong></> },
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
          <div className="lp-tl-badge">Il corpo si trasforma</div>
        </div>
        <p className="lp-tl-disc">*Tempi indicativi: i risultati variano in base a continuità e condizione iniziale.</p>
      </div>
    </section>
  );
}

/* ═══════════════════ REVIEWS (client-side) ═══════════════════ */

function LpReviewsSection() {
  return (
    <section className="lp-sec" id="resenas">
      <div className="lp-inner">
        <h2>+4.218 Donne Hanno Già <em>Trasformato Le Loro Gambe</em></h2>
        <p className="sub">Storie vere di donne che hanno ripreso fiducia nel proprio corpo.</p>
        <LpReviews />
      </div>
    </section>
  );
}

/* ═══════════════════ GUARANTEES ═══════════════════ */

function GuaranteesSection() {
  return (
    <section className="lp-sec-dark lp-sec">
      <div className="lp-inner">
        <h2>Acquista <em>Senza Rischi</em></h2>
        <div className="lp-guar-grid">
          <div className="lp-guar"><span className="lp-guar-ic">🚚</span><strong>Spedizione Gratis</strong><small>Express 24-48h</small></div>
          <div className="lp-guar"><span className="lp-guar-ic">💵</span><strong>Paga al Corriere</strong><small>Nessun rischio</small></div>
          <div className="lp-guar"><span className="lp-guar-ic">🔄</span><strong>Reso Facile</strong><small>30 giorni</small></div>
          <div className="lp-guar"><span className="lp-guar-ic">⭐</span><strong>4.9 su 5</strong><small>4.218 recensioni</small></div>
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
        <h2>Come <em>Ordinare</em></h2>
        <p className="sub">Semplice, veloce e senza rischi. Paghi solo alla consegna.</p>
        <div className="lp-pasos">
          {[
            { n: 1, t: "Scegli taglia e colore", d: "Seleziona la tua taglia (35-44) e il colore preferito." },
            { n: 2, t: "Compila i tuoi dati", d: "Inserisci nome, telefono e indirizzo di spedizione." },
            { n: 3, t: "Ricevi e paga", d: "Consegna in 24-48h. Paghi al corriere quando ricevi." },
          ].map((p) => (
            <div key={p.n} className="lp-paso">
              <div className="lp-paso-n">{p.n}</div>
              <div><h4>{p.t}</h4><p>{p.d}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ FAQ (client-side) ═══════════════════ */

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
      *Questo prodotto non è un dispositivo medico certificato. I benefici percepiti possono variare da persona a persona. SlimWalk non sostituisce dieta ed esercizio fisico. Immagini illustrative. Dati basati su studi interni e recensioni verificate.
    </div>
  );
}

/* ═══════════════════ PAGE ═══════════════════ */

export default function SlimWalkLanding() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#fff" }}>
      {/* Pixel */}
      <Script id="fb-pixel" strategy="afterInteractive">{`
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','1020342473005498');fbq('track','PageView');
      `}</Script>
      <Script id="gads" strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=AW-18070555751" />
      <Script id="gads-cfg" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-18070555751');`}</Script>
      <noscript><img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=1020342473005498&ev=PageView&noscript=1" alt="" /></noscript>

      {/* Top Bar */}
      <div className="lp-bar">🔥 OFFERTA LIMITATA: <em>50% DI SCONTO</em> + Spedizione Gratuita — Solo per oggi!</div>
      <StickyOrderButton />
      <HeroSection />
      <PainPointsSection painPoints={painPoints} />
      <div className="lp">
        <TechGridSection />
        <LpReviewsSection />
        <ExpertSection />
        <BenefitsSection />
        <StatsBar />
        <TransformationSection />
        <GuaranteesSection />
        <OrderStepsSection />
        <LpFaqSection />
        <Disclaimer />
      </div>
    </div>
  );
}
