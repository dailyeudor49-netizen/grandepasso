import type { Metadata } from "next";
import Script from "next/script";
import "./landing.css";
import fs from "fs";
import path from "path";
import { HeroGallery, StickyOrderButton, LpReviews, LpFaq } from "./client";
import { OrderSection } from "./OrderModal";
import PainPointsSection from "@/components/landing/PainPointsSection";

function getCarouselImages(): string[] {
  const dir = path.join(process.cwd(), "public/images/land/aurearise/carosello");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(webp|jpg|jpeg|png|avif)$/i.test(f))
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map((f) => `/images/land/aurearise/carosello/${f}`);
}

export const metadata: Metadata = {
  title: "AureaRise - Scarpe Rialzanti Uomo +7cm Invisibili",
  description:
    "Scopri AureaRise: la scarpa rialzante uomo con +7cm invisibili e suola ortopedica. Guadagni altezza senza che nessuno lo sappia. Spedizione gratuita e pagamento alla consegna.",
};

/* ════════════════════════════════════════════════════════════════════
   PAIN POINTS DATA
   ════════════════════════════════════════════════════════════════════ */

const painPoints = [
  {
    icon: "😔",
    title: "Bassa Statura",
    description: "Ti senti insicuro per la tua altezza e vorresti qualche centimetro in più per sentirti più sicuro di te nelle situazioni sociali e professionali."
  },
  {
    icon: "😣",
    title: "Scarpe Rialzanti Evidenti",
    description: "Le scarpe con rialzo tradizionali si vedono subito e sono imbarazzanti. La suola troppo alta si nota e ti senti a disagio."
  },
  {
    icon: "🙈",
    title: "Mancanza di Fiducia",
    description: "L'altezza influisce sulla tua autostima. Vorresti sentirti più sicuro negli appuntamenti, al lavoro e nelle relazioni sociali."
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
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              Rialzante Certificata
            </span>
            <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              Bestseller Uomo 2025
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-1 text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
            <span className="text-emerald-700">AureaRise</span> — +7 cm Reali. Sembrano Sneaker Normali. Nessuno Lo Capirà Mai.
          </h1>
          <p className="mb-4 text-base font-medium text-gray-500">
            Il rialzo è dentro la suola. Dall'esterno sembrano normali scarpe sportive. Ma sotto hai 7 cm in più — e nessuno, mai, lo capirà. Nemmeno chi ti sta accanto ogni giorno.
          </p>

          {/* Rating */}
          <a href="#resenas" className="mb-5 flex items-center gap-2 no-underline">
            <span className="text-lg text-blue-400">★★★★★</span>
            <span className="text-sm font-extrabold text-gray-900">4,9/5</span>
            <span className="text-sm text-gray-400 underline underline-offset-2">(3.241 recensioni)</span>
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
              { bold: "+7 cm reali e invisibili", rest: "integrati nella suola, non si vedono dall'esterno. Mai." },
              { bold: "Zero sospetti", rest: "sembrano sneaker sportive normali. Niente plateau, niente suole esagerate." },
              { bold: "Cammini esattamente come sempre", rest: "il rialzo è progressivo, non un tacco. Nessuna instabilità." },
              { bold: "Dalla mattina alla sera senza dolore", rest: "suola ammortizzata, nessuna pressione su schiena e piedi." },
              { bold: "Si abbinano a tutto", rest: "jeans, chino, tuta. Dal lavoro all'aperitivo." },
              { bold: "Solette comfort incluse", rest: "valore €14,90, in omaggio." },
            ].map((f) => (
              <li key={f.bold} className="border-l-[3px] border-emerald-500 rounded-lg py-2.5 px-4 text-[16px] bg-white">
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
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
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
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-emerald-600 sm:text-sm">Semplice e sicuro</p>
            <h3 className="mb-4 text-xl font-extrabold text-gray-900 sm:text-2xl">Come ordinare?</h3>

            <div className="mb-4 grid grid-cols-2 gap-2.5">
              {[
                { step: "1", title: "Ordina", desc: "Compila il modulo con nome, indirizzo e telefono." },
                { step: "2", title: "Conferma", desc: "Ricevi WhatsApp per confermare. Se non lo usi, ti chiamiamo." },
                { step: "3", title: "Spedizione 24–48h", desc: "Dopo la conferma il pacco parte subito con GLS. Paghi al corriere." },
                { step: "4", title: "Reso facile 30 giorni", desc: "Soddisfatti o rimborsati. Assistenza via WhatsApp/telefono." },
              ].map((s) => (
                <div key={s.step} className="rounded-lg border-l-[3px] border-emerald-500 bg-white py-2.5 px-3.5">
                  <p className="text-[17px] font-extrabold text-emerald-700">{s.step}. {s.title}</p>
                  <p className="mt-0.5 text-[15px] leading-snug text-gray-500">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                  <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Zero anticipi
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Conferma rapida
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
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
            src="/images/land/aurearise/gif2.gif"
            alt="AureaRise - Scarpa rialzante uomo"
            className="expert-image"
          />
        </div>
        <div className="expert-text-col">
          <span className="expert-badge">Raccomandata dai Professionisti</span>
          <h2 className="expert-title">
            &ldquo;È l&apos;unica scarpa rialzante che consiglio agli uomini: il rialzo progressivo non altera la postura, e la suola ortopedica protegge ogni articolazione a ogni passo.&rdquo;
          </h2>
          <p className="expert-attribution">
            Dott. Marco Ferretti — Ortopedico specializzato in biomeccanica del piede
          </p>
          <p className="expert-text">
            Ogni settimana visito uomini con dolori lombari, ginocchia logorate e tensioni cervicali. Spesso la causa è una sola: anni passati a compensare la postura per sembrare più alti. Il corpo paga il prezzo.{" "}
            <strong>
              AureaRise è l&apos;unica scarpa rialzante che consiglio: il rialzo biomeccanico non forza la colonna, distribuisce il peso in modo naturale. Sei più alto. Stai bene. E non devi spiegarlo a nessuno.
            </strong>
          </p>
          <div className="expert-badges">
            <span className="expert-check">✓ Certificato Ortopedico</span>
            <span className="expert-check">✓ Consigliata da Podologi e Farmacisti</span>
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
const GADS_ID = "AW-17553930868";

export default function AureaRiseLanding() {
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
        <h2>Essere Bassi Non Fa Male ai Piedi. Fa Male Dentro. <em>AureaRise Risolve Entrambi.</em></h2>
        <p>Rialzo invisibile e suola ortopedica: 7 cm in più senza che nessuno lo sappia — e senza pagarne il prezzo sulla schiena.</p>
      </div>
      <div className="lp-fasi-grid">
        {[
          { img: "/images/land/aurearise/card/1.png", alt: "+7 cm Invisibili", tag: "Beneficio 1", title: "+7 cm Invisibili. Solo Tuo.", text: <>Nessuno lo vede. Nessuno lo capisce. Tu lo sai. E basta.</> },
          { img: "/images/land/aurearise/card/2.png", alt: "Zero Dolore", tag: "Beneficio 2", title: "Cammini Ore. Arrivi Intero.", text: <>Suola ammortizzata, zero pressione sulla schiena. Dal mattino alla sera senza sentirle.</> },
          { img: "/images/land/aureasecret/benefici/3.webp", alt: "7 cm Che Cambiano", tag: "Beneficio 3", title: "7 cm Che Cambiano Come Ti Trattano.", text: <>Non è solo altezza. È presenza. È come ti guardano. È come ti senti quando entri in una stanza.</> },
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
            <div className="lp-stat-n">+7 cm</div>
            <div className="lp-stat-l">Rialzo invisibile<br />certificato</div>
          </div>
          <div>
            <div className="lp-stat-n">2.800+</div>
            <div className="lp-stat-l">Uomini che non tornano<br />alle scarpe normali</div>
          </div>
          <div>
            <div className="lp-stat-n">4.9</div>
            <div className="lp-stat-l">Valutazione media<br />su 3.241 recensioni</div>
          </div>
        </div>
        <p className="lp-stats-disc">*Dati da sondaggi interni e recensioni verificate. I risultati individuali possono variare.</p>
      </div>
    </section>
  );
}

/* ═══════════════════ 6 TECH GRID ═══════════════════ */

const techCards = [
  { img: "/images/land/aurearise/beneficio.png", alt: "Rialzo Integrato Invisibile", chip: "Tacco Invisibile · +7 cm", title: "Rialzo Integrato Invisibile", text: <>7 cm nascosti nella struttura della suola. Dall&apos;esterno: sneaker normale. Dall&apos;interno: il tuo vantaggio segreto. <strong>Nessuno lo vede. Mai.</strong></> },
  { img: "/images/land/aureasecret/card/card2.webp", alt: "Suola Ortopedica Ammortizzata", chip: "Zero Dolore · Ammortizzazione", title: "Suola Ortopedica Ammortizzata", text: <>Ogni passo viene assorbito prima che raggiunga le articolazioni. Puoi stare in piedi ore. Non lo senti. <strong>Comfort reale — non marketing.</strong></> },
  { img: "/images/land/aureasecret/card/card3.webp", alt: "Scarica il Tallone Completamente", chip: "Tallone · Fascite", title: "Scarica il Tallone Completamente", text: <>Il plantare ad arco alto elimina la pressione dove si accumula di più. <strong>Niente tallonite. Niente fitte al primo passo della mattina. Finisce qui.</strong></> },
  { img: "/images/land/aureasecret/card/card4.webp", alt: "Protegge Ginocchia e Schiena", chip: "Ginocchia · Schiena", title: "Protegge Ginocchia e Schiena", text: <>La camera d&apos;aria assorbe ogni impatto prima che raggiunga le articolazioni. <strong>Sei più alto — e il tuo corpo non ne paga il prezzo.</strong></> },
  { img: "/images/land/aureasecret/card/card5.webp", alt: "Rialzo Biomeccanico Progressivo", chip: "Postura · Bacino", title: "Rialzo Biomeccanico Progressivo", text: <>Non è un tacco verticale. È un rialzo graduato: il bacino resta in asse, la colonna non compensa. <strong>Cammini naturale. La schiena ringrazia.</strong></> },
  { img: "/images/land/aureasecret/card/card6.webp", alt: "Tomaia Morbida Avvolgente", chip: "Comfort · Adattabilità", title: "Tomaia Morbida Avvolgente", text: <>Si forma attorno al tuo piede senza punti di pressione. <strong>Zero attrito, zero vesciche. Perfetta anche per piede largo o alluce valgo.</strong></> },
];

function TechGridSection() {
  return (
    <section className="lp-sec">
      <div className="lp-inner">
        <h2>6 Tecnologie in <em>Una Sola Scarpa</em></h2>
        <p className="sub">Ogni dettaglio risolve un problema reale. Niente marketing. Niente compromessi.</p>
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
        <h2>Il Cambiamento in <em>4 Settimane</em></h2>
        <p className="sub"></p>
        <div className="lp-timeline">
          {[
            { week: "Settimana 1", pct: "25%", title: "Il Primo Giorno Cambia Tutto", text: <>Le indossi. Sei più alto di 7 cm. Cammini normale. Nessuno dice nulla. <strong>Nessuno ha capito. Tu sì.</strong></> },
            { week: "Settimana 2", pct: "50%", title: "Diventano la Tua Scarpa Fissa", text: <>Al lavoro, in palestra, agli aperitivi. Le porti ovunque. Le persone ti guardano diversamente. <strong>Il rialzo è ancora invisibile.</strong></> },
            { week: "Settimana 3", pct: "75%", title: "La Sicurezza Prende Forma", text: <>Non è solo altezza. È come ti muovi. Come parli. Come occupi lo spazio. <strong>Hai smesso di pensarci — e si vede.</strong></> },
            { week: "Settimana 4", pct: "100%", title: "Non Torni Più Indietro", text: <>Le scarpe vecchie sono nel cassetto. AureaRise è ai tuoi piedi. <strong>Sei più alto, stai bene. Il segreto è solo tuo.</strong></> },
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
        <h2>3.241 Recensioni <em>Verificate</em></h2>
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
