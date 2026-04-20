import type { Metadata } from "next";
import Script from "next/script";
import "./landing.css";
import fs from "fs";
import path from "path";
import { HeroGallery, StickyOrderButton, LpReviews, LpFaq } from "./client";
import { OrderSection } from "./OrderModal";

function getCarouselImages(): string[] {
  const dir = path.join(process.cwd(), "public/images/land/spinair/carosello");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(webp|jpg|jpeg|png|avif)$/i.test(f))
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map((f) => `/images/land/spinair/carosello/${f}`);
}

export const metadata: Metadata = {
  title: "SpinAir - La Scarpa Che Elimina il Mal di Schiena Camminando | Sollievo Garantito",
  description:
    "SpinAir: la scarpa ortopedica con tecnologia SpineShock™ che assorbe il 94% degli impatti sulla colonna. Mal di schiena eliminato in 2 settimane. Spedizione gratuita e pagamento alla consegna.",
};


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
            <span className="rounded-full border border-violet-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              Tecnologia SpineShock™
            </span>
            <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
              Consigliata da Ortopedici
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-1 text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
            <span className="text-blue-600">SpinAir</span> — Mal di Schiena Eliminato. Senza Farmaci. Senza Fisioterapista.
          </h1>
          <p className="mb-4 text-base font-medium text-gray-500">
            La scarpa ortopedica con camera d&apos;aria SpineShock™ che assorbe il 94% degli impatti sulla colonna vertebrale. Ogni passo diventa terapia. Sollievo dal primo giorno.
          </p>

          {/* Rating */}
          <a href="#resenas" className="mb-5 flex items-center gap-2 no-underline">
            <span className="text-lg text-amber-400">★★★★★</span>
            <span className="text-sm font-extrabold text-gray-900">4,9/5</span>
            <span className="text-sm text-gray-400 underline underline-offset-2">(3.847 recensioni)</span>
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
              { bold: "ASSORBE IL 94% DEGLI IMPATTI", rest: "la camera d'aria SpineShock™ protegge ogni vertebra ad ogni passo" },
              { bold: "MAL DI SCHIENA RIDOTTO IN 7 GIORNI", rest: "il 91% delle clienti riporta sollievo significativo già dalla prima settimana" },
              { bold: "POSTURA CORRETTA AUTOMATICAMENTE", rest: "la suola PosturAlign™ riallinea la colonna mentre cammini" },
              { bold: "ADDIO ANTIDOLORIFICI", rest: "il sollievo è naturale e costante, senza effetti collaterali" },
              { bold: "RACCOMANDATA DA ORTOPEDICI", rest: "testata e approvata da specialisti della colonna vertebrale" },
              { bold: "SOLETTA ORTOPEDICA INCLUSA", rest: "valore €19,90, in omaggio" },
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
              <span className="font-semibold text-stone-800">Garanzia soddisfatti o rimborsati.</span> Se il mal di schiena non migliora in 30 giorni, ti rimborsiamo al 100%.
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
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                  <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Zero anticipi
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Conferma rapida
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
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
   EXPERT SECTION (Ortopedico)
   ════════════════════════════════════════════════════════════════════ */

function ExpertSection() {
  return (
    <section className="expert-section">
      <div className="expert-container">
        <div className="expert-image-col">
          <img
            src="/images/land/spinair/expert/expert.webp"
            alt="Dott. Marco Bianchi - Ortopedico specialista della colonna"
            className="expert-image"
          />
        </div>
        <div className="expert-text-col">
          <span className="expert-badge">Raccomandata dagli Specialisti</span>
          <h2 className="expert-title">
            &ldquo;È l&apos;unica scarpa che prescrivo ai miei pazienti con mal di schiena cronico.&rdquo;
          </h2>
          <p className="expert-attribution">
            Dott. Marco Bianchi — Ortopedico, 25 anni di esperienza in patologie della colonna vertebrale
          </p>
          <p className="expert-text">
            Il 90% dei mal di schiena è causato da scarpe sbagliate. Ogni passo con suole rigide trasmette vibrazioni direttamente alle vertebre.{" "}
            <strong>
              SpinAir interrompe questo ciclo. La camera d&apos;aria SpineShock™ assorbe gli impatti PRIMA che raggiungano la colonna. I miei pazienti riducono gli antidolorifici dell&apos;80% già nelle prime 2 settimane. Non è un palliativo — è una soluzione biomeccanica reale.
            </strong>
          </p>
          <div className="expert-badges">
            <span className="expert-check">✓ Testata Clinicamente</span>
            <span className="expert-check">✓ Approvata da Ortopedici</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════
   PROBLEM SECTION - Agitazione del problema
   ════════════════════════════════════════════════════════════════════ */

function ProblemSection() {
  return (
    <section className="lp-problem">
      <div className="lp-inner">
        <h2>Ogni Passo Che Fai È Un <em>Martello Sulla Tua Schiena</em></h2>
        <p className="sub">8.000 passi al giorno. 8.000 micro-traumi alle vertebre. Il tuo corpo sta cedendo.</p>
        <div className="lp-problem-grid">
          <div className="lp-problem-card">
            <div className="lp-problem-icon">💊</div>
            <h4>Antidolorifici Ogni Giorno?</h4>
            <p>Ibuprofene, moment, voltaren... il tuo fegato sta soffrendo quanto la tua schiena. E il dolore torna sempre.</p>
          </div>
          <div className="lp-problem-card">
            <div className="lp-problem-icon">🛋️</div>
            <h4>Non Riesci a Stare in Piedi?</h4>
            <p>Cucinare, fare la spesa, giocare con i nipoti... ogni attività diventa una tortura. La tua vita si sta restringendo.</p>
          </div>
          <div className="lp-problem-card">
            <div className="lp-problem-icon">😴</div>
            <h4>Notti Insonni?</h4>
            <p>Ti giri e rigiri nel letto cercando una posizione. Ti alzi più stanco di quando ti sei coricato.</p>
          </div>
          <div className="lp-problem-card">
            <div className="lp-problem-icon">💸</div>
            <h4>Fisioterapisti, Chiropratici, Osteopati?</h4>
            <p>Centinaia di euro al mese. Sollievo temporaneo. Il dolore torna sempre perché la CAUSA non viene eliminata.</p>
          </div>
        </div>
        <div className="lp-problem-reveal">
          <p><strong>La verità che nessuno ti dice:</strong> Il mal di schiena non è colpa dell&apos;età, del lavoro o della genetica. È colpa delle tue SCARPE. Suole sottili e rigide che trasmettono ogni impatto direttamente alla colonna vertebrale. SpinAir elimina la causa. Per sempre.</p>
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

export default function SpinAirLanding() {
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
      <div className="lp">
        <ProblemSection />
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
        <h2>SpinAir: La Soluzione Che Il Tuo Corpo <em>Aspettava Disperatamente</em></h2>
        <p>La camera d&apos;aria SpineShock™ assorbe gli impatti. La tua schiena finalmente riposa. Anche mentre cammini.</p>
      </div>
      <div className="lp-fasi-grid">
        {[
          { img: "/images/land/spinair/benefici/1.webp", alt: "Assorbimento Impatti", tag: "Tecnologia", title: "ASSORBE IL 94% DEGLI SHOCK", text: <>La camera d&apos;aria SpineShock™ funziona come un ammortizzatore. Ogni impatto viene assorbito PRIMA di raggiungere la colonna. <strong>Le tue vertebre ringraziano ad ogni passo.</strong></> },
          { img: "/images/land/spinair/benefici/2.webp", alt: "Postura Corretta", tag: "Allineamento", title: "POSTURA CORRETTA AUTOMATICAMENTE", text: <>La suola PosturAlign™ riallinea naturalmente la colonna vertebrale. <strong>Niente più posizioni compensatorie che peggiorano il dolore.</strong></> },
          { img: "/images/land/spinair/benefici/3.webp", alt: "Sollievo dal Dolore", tag: "Risultato", title: "SOLLIEVO DAL PRIMO GIORNO", text: <>Il 91% delle clienti riporta riduzione del dolore già nelle prime 24 ore. <strong>Dopo 2 settimane, molte smettono completamente gli antidolorifici.</strong></> },
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
            <div className="lp-stat-n">94%</div>
            <div className="lp-stat-l">Degli impatti<br />assorbiti</div>
          </div>
          <div>
            <div className="lp-stat-n">14.000+</div>
            <div className="lp-stat-l">Schiene<br />salvate</div>
          </div>
          <div>
            <div className="lp-stat-n">4.9</div>
            <div className="lp-stat-l">Valutazione media<br />+3.847 recensioni</div>
          </div>
        </div>
        <p className="lp-stats-disc">*Dati da studi interni e recensioni verificate. I risultati individuali possono variare.</p>
      </div>
    </section>
  );
}

/* ═══════════════════ 6 TECH GRID ═══════════════════ */

const techCards = [
  { img: "/images/land/spinair/card/1.webp", alt: "Camera d'Aria SpineShock", chip: "Protezione · Colonna", title: "Camera d'Aria SpineShock™", text: <>Tecnologia brevettata che assorbe il 94% degli impatti. <strong>Ogni passo protegge le tue vertebre invece di danneggiarle.</strong></> },
  { img: "/images/land/spinair/card/2.webp", alt: "Suola PosturAlign", chip: "Postura · Allineamento", title: "Suola PosturAlign™", text: <>La curvatura ergonomica riallinea naturalmente la colonna. <strong>La postura si corregge automaticamente mentre cammini.</strong></> },
  { img: "/images/land/spinair/card/3.webp", alt: "Soletta SpineSupport", chip: "Supporto · Comfort", title: "Soletta SpineSupport™", text: <>Soletta ortopedica inclusa che distribuisce il peso uniformemente. <strong>Zero punti di pressione. Comfort totale.</strong></> },
  { img: "/images/land/spinair/card/4.webp", alt: "Tomaia Traspirante", chip: "Comfort · Freschezza", title: "Tomaia AirMesh™ Traspirante", text: <>Mesh ultraleggera che mantiene i piedi freschi tutto il giorno. <strong>Indossale 12 ore senza problemi.</strong></> },
  { img: "/images/land/spinair/card/5.webp", alt: "Design Anti-Fatica", chip: "Energia · Resistenza", title: "Design Anti-Fatica", text: <>La suola restituisce energia ad ogni passo. <strong>Arrivi a fine giornata con le gambe leggere, non distrutte.</strong></> },
  { img: "/images/land/spinair/card/6.webp", alt: "Ultraleggera", chip: "Leggerezza · Comfort", title: "Solo 320g — Ultraleggera", text: <>Tra le scarpe ortopediche più leggere sul mercato. <strong>Le indossi e le dimentichi. Ma la tua schiena se ne ricorda.</strong></> },
];

function TechGridSection() {
  return (
    <section className="lp-sec">
      <div className="lp-inner">
        <h2>6 Tecnologie Che <em>Salvano La Tua Schiena</em></h2>
        <p className="sub">Ogni dettaglio è progettato per eliminare il dolore e proteggere la tua colonna.</p>
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
    <section className="lp-sec lp-sec-light" style={{ background: "#f5f3ff" }}>
      <div className="lp-inner">
        <h2>La Tua Schiena Guarisce in <em>4 Settimane</em></h2>
        <p className="sub"></p>
        <div className="lp-timeline">
          {[
            { week: "Giorno 1-3", pct: "25%", title: "Sollievo Immediato", text: <>Senti subito la differenza. La camera d&apos;aria ammortizza ogni passo. <strong>Il dolore acuto si attenua. Cammini con meno paura.</strong></> },
            { week: "Settimana 1", pct: "50%", title: "I Muscoli Si Rilassano", text: <>I muscoli della schiena smettono di contrarsi per compensare. La tensione cronica si scioglie. <strong>Ti alzi la mattina senza rigidità.</strong></> },
            { week: "Settimana 2", pct: "75%", title: "Addio Antidolorifici", text: <>Il dolore quotidiano si riduce drasticamente. <strong>Molte clienti smettono completamente farmaci e antinfiammatori.</strong></> },
            { week: "Settimana 4", pct: "100%", title: "Schiena Rinata", text: <>La postura è corretta. Il dolore è un ricordo. Torni a fare tutto: cucinare, camminare, giocare con i nipoti. <strong>La tua vita è di nuovo tua.</strong></> },
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
          <div className="lp-tl-badge">La schiena guarisce</div>
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
        <h2>3.847 Recensioni <em>Verificate</em></h2>
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
      *Questo prodotto non è un dispositivo medico certificato. I benefici percepiti possono variare da persona a persona. SpinAir non sostituisce il parere medico. In caso di dolore persistente consultare uno specialista. Immagini illustrative. Dati basati su studi interni e recensioni verificate.
    </div>
  );
}
