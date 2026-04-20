import type { Metadata } from "next";
import Script from "next/script";
import "./landing.css";
import fs from "fs";
import path from "path";
import { HeroGallery, StickyOrderButton, LpReviews, LpFaq } from "./client";
import { OrderSection } from "./OrderModal";

function getCarouselImages(): string[] {
  const dir = path.join(process.cwd(), "public/images/land/venolight/carosello");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(webp|jpg|jpeg|png|avif)$/i.test(f))
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map((f) => `/images/land/venolight/carosello/${f}`);
}

export const metadata: Metadata = {
  title: "VenoLight - Addio Gambe Gonfie. Per Sempre. | Tecnologia CircuFlow™",
  description:
    "VenoLight: l'unica scarpa con Tecnologia CircuFlow™ che sgonfia le gambe mentre cammini. Attiva la pompa venosa, drena i liquidi, elimina la pesantezza. Risultati dal primo giorno. Spedizione gratuita.",
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
            <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">
              Tecnologia CircuFlow™
            </span>
            <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
              Bestseller 2025
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-1 text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
            <span className="text-teal-600">VenoLight</span> — Addio Gambe Gonfie. Per Sempre.
          </h1>
          <p className="mb-4 text-base font-medium text-gray-500">
            L&apos;unica scarpa che sgonfia le gambe mentre cammini. Tecnologia CircuFlow™ a 3 strati che attiva la pompa venosa e drena i liquidi. Senza farmaci. Senza calze a compressione. Senza creme inutili.
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
              { bold: "SGONFIA LE GAMBE CAMMINANDO", rest: "la tecnologia CircuFlow™ attiva la pompa venosa ad ogni passo" },
              { bold: "ELIMINA LA PESANTEZZA", rest: "gambe leggere dalla mattina alla sera, anche dopo 8 ore in piedi" },
              { bold: "DRENA I LIQUIDI IN ECCESSO", rest: "la soletta PressureWave™ stimola il drenaggio linfatico naturale" },
              { bold: "RIDUCE CAVIGLIE GONFIE", rest: "il 94% delle donne nota miglioramenti dalla prima settimana" },
              { bold: "MIGLIORA LA CIRCOLAZIONE", rest: "equivalente a 30 minuti di massaggio linfodrenante ogni ora" },
              { bold: "SOLETTA DRENANTE INCLUSA", rest: "valore €19,90, in omaggio" },
            ].map((f) => (
              <li key={f.bold} className="border-l-[3px] border-teal-500 rounded-lg py-2.5 px-4 text-[16px] bg-white">
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
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-teal-50 text-teal-600">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-sm leading-snug text-stone-600">
              <span className="font-semibold text-stone-800">Garanzia soddisfatti o rimborsati.</span> Se non noti gambe più leggere in 30 giorni, ti rimborsiamo al 100%.
            </p>
          </div>

          {/* How it works box */}
          <div className="mb-5 rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-5 shadow-sm">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-teal-600 sm:text-sm">Semplice e sicuro</p>
            <h3 className="mb-4 text-xl font-extrabold text-gray-900 sm:text-2xl">Come ordinare?</h3>

            <div className="mb-4 grid grid-cols-2 gap-2.5">
              {[
                { step: "1", title: "Ordina", desc: "Compila il modulo con nome, indirizzo e telefono." },
                { step: "2", title: "Conferma", desc: "Ricevi WhatsApp per confermare. Se non lo usi, ti chiamiamo." },
                { step: "3", title: "Spedizione 24–48h", desc: "Dopo la conferma il pacco parte subito con GLS. Paghi al corriere." },
                { step: "4", title: "Reso facile 30 giorni", desc: "Soddisfatti o rimborsati. Assistenza via WhatsApp/telefono." },
              ].map((s) => (
                <div key={s.step} className="rounded-lg border-l-[3px] border-teal-500 bg-white py-2.5 px-3.5">
                  <p className="text-[17px] font-extrabold text-teal-700">{s.step}. {s.title}</p>
                  <p className="mt-0.5 text-[15px] leading-snug text-gray-500">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                  <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Zero anticipi
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Conferma rapida
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-700">
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
   EXPERT SECTION (Specialista Circolazione)
   ════════════════════════════════════════════════════════════════════ */

function ExpertSection() {
  return (
    <section className="expert-section">
      <div className="expert-container">
        <div className="expert-image-col">
          <img
            src="/images/land/venolight/expert/1.webp"
            alt="Dott.ssa Elena Martini - Specialista in Flebologia"
            className="expert-image"
          />
        </div>
        <div className="expert-text-col">
          <span className="expert-badge">Raccomandata dagli Specialisti</span>
          <h2 className="expert-title">
            &ldquo;È la prima scarpa che consiglio alle mie pazienti con problemi di circolazione e gambe gonfie.&rdquo;
          </h2>
          <p className="expert-attribution">
            Dott.ssa Elena Martini — Specialista in Flebologia e Medicina Vascolare
          </p>
          <p className="expert-text">
            Le gambe gonfie non sono solo un problema estetico. Sono il segnale che il sangue fatica a risalire verso il cuore.{" "}
            <strong>
              La tecnologia CircuFlow™ di VenoLight è geniale: la suola curva attiva la contrazione del polpaccio ad ogni passo, funzionando come una pompa naturale che spinge il sangue verso l&apos;alto. I risultati che vedo nelle mie pazienti sono sorprendenti. Molte hanno potuto abbandonare le calze a compressione.
            </strong>
          </p>
          <div className="expert-badges">
            <span className="expert-check">✓ Testata Clinicamente</span>
            <span className="expert-check">✓ Consigliata da Flebologi</span>
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

export default function VenoLightLanding() {
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
        <ComparisonSection />
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

/* ═══════════════════ PROBLEM SECTION ═══════════════════ */

function ProblemSection() {
  return (
    <section className="lp-problem">
      <div className="lp-inner">
        <h2>Ti Riconosci In Questa <em>Situazione?</em></h2>
        <div className="lp-problem-grid">
          {[
            { icon: "😫", title: "Arrivi a sera e le caviglie sono sparite", text: "Gonfie, doloranti, irriconoscibili. Le scarpe che la mattina andavano bene, la sera non entrano più." },
            { icon: "🏋️", title: "Gambe pesanti come macigni", text: "Ogni passo è una fatica. Devi sederti ogni 30 minuti. Non riesci a stare in piedi senza soffrire." },
            { icon: "😤", title: "Hai provato di tutto. Niente funziona.", text: "Creme drenanti, calze a compressione, integratori, massaggi. Soldi buttati. Il problema torna sempre." },
            { icon: "😢", title: "I segni delle calze impressi nella pelle", text: "Quella linea rossa che non va via. La prova visiva che qualcosa non va. E la vergogna di mostrare le gambe." },
          ].map((p) => (
            <div key={p.title} className="lp-problem-card">
              <span className="lp-problem-icon">{p.icon}</span>
              <h4>{p.title}</h4>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
        <div className="lp-problem-cta">
          <p className="lp-problem-bold">Se ti sei riconosciuta in almeno una di queste situazioni, <strong>il problema non sei tu.</strong></p>
          <p className="lp-problem-reveal">Il problema sono le tue scarpe.</p>
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
        <h2>VenoLight Non È Una Scarpa. <em>È Una Terapia Che Indossi.</em></h2>
        <p>La prima scarpa al mondo con Tecnologia CircuFlow™ che attiva la pompa venosa ad ogni passo.</p>
      </div>
      <div className="lp-fasi-grid">
        {[
          { img: "/images/land/venolight/benefici/1.webp", alt: "Sgonfia le Gambe", tag: "Beneficio 1", title: "SGONFIA LE GAMBE IN MODO NATURALE", text: <>La suola VenoRocker™ costringe il polpaccio a contrarsi ad ogni passo, attivando la &quot;pompa muscolare&quot; che spinge il sangue verso il cuore. <strong>I liquidi si drenano. Il gonfiore scompare.</strong></> },
          { img: "/images/land/venolight/benefici/2.webp", alt: "Elimina la Pesantezza", tag: "Beneficio 2", title: "ELIMINA LA PESANTEZZA DALLE GAMBE", text: <>Il sistema CloudReturn™ a ritorno energetico riduce lo stress sulle vene del 60%. <strong>Gambe leggere come piume dalla mattina alla sera.</strong></> },
          { img: "/images/land/venolight/benefici/3.webp", alt: "Drena i Liquidi", tag: "Beneficio 3", title: "DRENA I LIQUIDI E RIDUCE LE CAVIGLIE GONFIE", text: <>La soletta PressureWave™ con micro-rilievi massaggia i punti riflessi del piede, stimolando il drenaggio linfatico. <strong>Caviglie tornano visibili. Finalmente.</strong></> },
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
            <div className="lp-stat-l">Nota gambe più leggere<br />dalla prima settimana</div>
          </div>
          <div>
            <div className="lp-stat-n">12.000+</div>
            <div className="lp-stat-l">Donne hanno detto<br />addio alle gambe gonfie</div>
          </div>
          <div>
            <div className="lp-stat-n">4.9</div>
            <div className="lp-stat-l">Valutazione media<br />+3.847 recensioni</div>
          </div>
        </div>
        <p className="lp-stats-disc">*Dati da studi interni e feedback verificati. I risultati individuali possono variare.</p>
      </div>
    </section>
  );
}

/* ═══════════════════ 6 TECH GRID ═══════════════════ */

const techCards = [
  { img: "/images/land/venolight/card/1.webp", alt: "Tecnologia VenoRocker", chip: "Circolazione · Pompa Venosa", title: "Suola VenoRocker™", text: <>La curvatura biomeccanica costringe il polpaccio a contrarsi ad ogni passo. <strong>Il sangue viene spinto verso il cuore. Il gonfiore si riduce naturalmente.</strong></> },
  { img: "/images/land/venolight/card/2.webp", alt: "Soletta PressureWave", chip: "Drenaggio · Linfatico", title: "Soletta PressureWave™", text: <>Micro-rilievi strategici massaggiano i punti riflessi del piede. <strong>Stimola il drenaggio linfatico ad ogni passo. Come un massaggio continuo.</strong></> },
  { img: "/images/land/venolight/card/3.webp", alt: "CloudReturn", chip: "Comfort · Anti-fatica", title: "Ammortizzazione CloudReturn™", text: <>Schiuma a ritorno energetico che riduce l&apos;impatto sulle vene. <strong>Meno stress vascolare. Gambe meno stanche a fine giornata.</strong></> },
  { img: "/images/land/venolight/card/4.webp", alt: "Mesh Traspirante", chip: "Freschezza · Comfort", title: "Tomaia AirFlow™ Traspirante", text: <>Mesh ultraleggera che mantiene i piedi freschi e asciutti. <strong>Zero sudorazione. Zero gonfiore da calore.</strong></> },
  { img: "/images/land/venolight/card/5.webp", alt: "Design Ergonomico", chip: "Postura · Allineamento", title: "Design Ergonomico Certificato", text: <>La forma anatomica allinea naturalmente caviglia, ginocchio e anca. <strong>Circolazione ottimizzata. Zero punti di pressione.</strong></> },
  { img: "/images/land/venolight/card/6.webp", alt: "Ultraleggera", chip: "Leggerezza · Comfort", title: "Solo 280g — Ultraleggera", text: <>Tra le scarpe più leggere sul mercato. <strong>Le indossi e le dimentichi. Ma le tue gambe se ne ricordano.</strong></> },
];

function TechGridSection() {
  return (
    <section className="lp-sec">
      <div className="lp-inner">
        <h2>6 Tecnologie Che <em>Sgonfiano Le Tue Gambe</em></h2>
        <p className="sub">Ogni dettaglio è progettato per migliorare la tua circolazione.</p>
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

/* ═══════════════════ COMPARISON SECTION ═══════════════════ */

function ComparisonSection() {
  return (
    <section className="lp-sec lp-sec-light">
      <div className="lp-inner">
        <h2>Perché VenoLight Funziona <em>Dove Tutto Il Resto Fallisce</em></h2>
        <p className="sub">Hai già provato di tutto. Ecco perché non ha funzionato.</p>
        <div className="lp-comparison">
          <div className="lp-comp-col lp-comp-bad">
            <h4>❌ Le Alternative Che Non Funzionano</h4>
            <ul>
              <li><strong>Calze a compressione:</strong> Scomode, calde, brutte. Devi ricordarti di metterle ogni giorno. E d&apos;estate? Impossibili.</li>
              <li><strong>Creme drenanti:</strong> €30-50 a tubetto. Effetto temporaneo. Devi applicarle ogni giorno. E il problema torna.</li>
              <li><strong>Integratori:</strong> Pillole su pillole. Risultati incerti. Mesi di attesa. E il gonfiore è ancora lì.</li>
              <li><strong>Massaggi linfodrenanti:</strong> €50-80 a seduta. Devi prendere appuntamento. Il beneficio dura 2 giorni.</li>
              <li><strong>Scarpe ortopediche:</strong> Brutte, da &quot;anziana&quot;. Costano €150+. E non risolvono il problema circolatorio.</li>
            </ul>
          </div>
          <div className="lp-comp-col lp-comp-good">
            <h4>✅ VenoLight — La Soluzione Definitiva</h4>
            <ul>
              <li><strong>Le indossi come scarpe normali:</strong> Belle, moderne, comode. Nessuno sa che sono &quot;terapeutiche&quot;.</li>
              <li><strong>Funziona automaticamente:</strong> Cammini e la tecnologia lavora per te. Zero sforzo. Zero routine.</li>
              <li><strong>Risultati dal primo giorno:</strong> Non settimane. Non mesi. Senti la differenza subito.</li>
              <li><strong>Massaggio continuo incluso:</strong> La soletta PressureWave™ massaggia ad ogni passo. 8 ore di massaggio gratis.</li>
              <li><strong>Solo €49,90:</strong> Meno di una seduta di linfodrenaggio. E funziona per sempre.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ TIMELINE ═══════════════════ */

function TimelineSection() {
  return (
    <section className="lp-sec lp-sec-light" style={{ background: "#f0fdfa" }}>
      <div className="lp-inner">
        <h2>La Tua Trasformazione <em>Giorno Dopo Giorno</em></h2>
        <p className="sub"></p>
        <div className="lp-timeline">
          {[
            { week: "Giorno 1", pct: "25%", title: "Senti Subito La Differenza", text: <>La suola VenoRocker™ attiva immediatamente la pompa muscolare. Senti i polpacci lavorare. <strong>Le gambe sembrano già più leggere a fine giornata.</strong></> },
            { week: "Settimana 1", pct: "50%", title: "Il Gonfiore Inizia a Ridursi", text: <>Le caviglie sono meno gonfie la sera. I segni delle calze meno profondi. <strong>Inizi a vedere la differenza.</strong></> },
            { week: "Settimana 2", pct: "75%", title: "Gambe Visibilmente Più Leggere", text: <>La ritenzione idrica si riduce. Le gambe sembrano più snelle. <strong>Le amiche ti chiedono cosa hai fatto.</strong></> },
            { week: "Settimana 4", pct: "100%", title: "Addio Gambe Gonfie. Per Sempre.", text: <>La circolazione è migliorata stabilmente. Le gambe restano leggere tutto il giorno. <strong>Puoi stare in piedi 8 ore senza soffrire.</strong></> },
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
        <h2>3.847 Donne Hanno Già Detto <em>Addio Alle Gambe Gonfie</em></h2>
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
      *Questo prodotto non è un dispositivo medico. I benefici percepiti possono variare da persona a persona. Immagini illustrative. Dati basati su studi interni e recensioni verificate. I risultati dipendono dalla frequenza di utilizzo e dallo stile di vita. In caso di patologie venose gravi, consultare il proprio medico.
    </div>
  );
}
