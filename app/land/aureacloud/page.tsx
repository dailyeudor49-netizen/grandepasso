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
    <section className="mx-auto max-w-7xl px-4 pt-6 pb-10 md:pt-10 md:pb-14 sm:px-6 lg:px-8">
      <div className="grid items-start gap-8 md:grid-cols-2 md:gap-12">
        {/* Gallery (client) */}
        <HeroGallery images={images} />

        {/* Product Info */}
        <div>
          {/* Badges */}
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-xs font-bold text-pink-700">
              Stile Labubu
            </span>
            <span className="rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700">
              +6cm Invisibili
            </span>
            <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              Trend 2025
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-1 text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
            <span className="text-pink-600">AureaCloud</span> — Comode Come Crocs. Alte 6 cm. Nessuno Lo Saprà.
          </h1>
          <p className="mb-4 text-base font-medium text-gray-500">
            La ciabatta platform con rialzo segreto integrato. Comfort leggendario stile Crocs, design kawaii Labubu, e 6 centimetri in più che nessuno vedrà mai. Il tacco nascosto che sembra una ciabatta.
          </p>

          {/* Rating */}
          <a href="#resenas" className="mb-5 flex items-center gap-2 no-underline">
            <span className="text-lg text-blue-400">★★★★★</span>
            <span className="text-sm font-extrabold text-gray-900">4,9/5</span>
            <span className="text-sm text-gray-400 underline underline-offset-2">(2.847 recensioni)</span>
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
              { bold: "+6 cm REALI e invisibili", rest: "il rialzo è nascosto dentro la suola, dall'esterno sembrano normali ciabatte platform" },
              { bold: "Comode come le Crocs", rest: "stessa morbidezza cloud, stesso comfort leggendario, ma con il rialzo segreto" },
              { bold: "Design Labubu kawaii", rest: "lo stile trendy che spopola su TikTok, ora con il benefit del rialzo nascosto" },
              { bold: "Ultraleggere, solo 280g", rest: "le indossi tutto il giorno senza mai sentirle ai piedi" },
              { bold: "Perfette per ogni occasione", rest: "casa, spiaggia, shopping, aperitivo — sei sempre 6cm più alta" },
              { bold: "Charm decorativi inclusi", rest: "personalizza le tue AureaCloud, in omaggio" },
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
            <p className="text-sm leading-snug text-stone-600">
              <span className="font-semibold text-stone-800">Garanzia soddisfatti o rimborsati.</span> Se non ti piacciono, puoi richiedere un rimborso entro 30 giorni dalla consegna.
            </p>
          </div>

          {/* How it works box */}
          <div className="mb-5 rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-white p-5 shadow-sm">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-pink-600 sm:text-sm">Semplice e sicuro</p>
            <h3 className="mb-4 text-xl font-extrabold text-gray-900 sm:text-2xl">Come ordinare?</h3>

            <div className="mb-4 grid grid-cols-2 gap-2.5">
              {[
                { step: "1", title: "Ordina", desc: "Compila il modulo con nome, indirizzo e telefono." },
                { step: "2", title: "Conferma", desc: "Ricevi WhatsApp per confermare. Se non lo usi, ti chiamiamo." },
                { step: "3", title: "Spedizione 24–48h", desc: "Dopo la conferma il pacco parte subito con GLS. Paghi al corriere." },
                { step: "4", title: "Reso facile 30 giorni", desc: "Soddisfatti o rimborsati. Assistenza via WhatsApp/telefono." },
              ].map((s) => (
                <div key={s.step} className="rounded-lg border-l-[3px] border-pink-500 bg-white py-2.5 px-3.5">
                  <p className="text-[17px] font-extrabold text-pink-700">{s.step}. {s.title}</p>
                  <p className="mt-0.5 text-[15px] leading-snug text-gray-500">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50 px-3 py-1.5 text-xs font-bold text-pink-700">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                  <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Zero anticipi
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50 px-3 py-1.5 text-xs font-bold text-pink-700">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Conferma rapida
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-pink-200 bg-pink-50 px-3 py-1.5 text-xs font-bold text-pink-700">
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
   EXPERT SECTION (Influencer/Stylist)
   ════════════════════════════════════════════════════════════════════ */

function ExpertSection() {
  return (
    <section className="expert-section">
      <div className="expert-container">
        <div className="expert-image-col">
          <img
            src="/images/land/aureacloud/gif.gif"
            alt="AureaCloud - Ciabatte Platform con Rialzo Segreto"
            className="expert-image"
          />
        </div>
        <div className="expert-text-col">
          <span className="expert-badge">Il Segreto delle Influencer</span>
          <h2 className="expert-title">
            &ldquo;Finalmente posso essere alta senza soffrire. Le uso dal mattino alla sera.&rdquo;
          </h2>
          <p className="expert-attribution">
            Sofia C. — Fashion Content Creator, Milano
          </p>
          <p className="expert-text">
            Ho provato ogni tipo di scarpa rialzante — scomode, rigide, e si vedeva sempre il trucco. Le AureaCloud sono diverse.{" "}
            <strong>
              Sembrano delle normalissime ciabatte trendy, le metti e stai subito 6cm più alta. Sono morbidissime, le uso tutto il giorno. Le amiche mi chiedono sempre: &quot;ma come fai a sembrare più alta?&quot; — e io sorrido. Il segreto è tutto nella suola.
            </strong>
          </p>
          <div className="expert-badges">
            <span className="expert-check">✓ Rialzo 100% Invisibile</span>
            <span className="expert-check">✓ Trend TikTok 2025</span>
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
      <ExpertSection />
      <div className="lp">
        <ProblemSolutionSection />
        <BenefitsSection />
        <StatsBar />
        <TechGridSection />
        <TimelineSection />
        <LpReviewsSection />
        <GuaranteesSection />
        <OrderStepsSection />
        <LpFaqSection />
        <Disclaimer />
      </div>
    </div>
  );
}

/* ═══════════════════ PROBLEM/SOLUTION SECTION ═══════════════════ */

function ProblemSolutionSection() {
  return (
    <section className="lp-sec" style={{ background: "linear-gradient(180deg, #fdf2f8 0%, #fff 100%)" }}>
      <div className="lp-inner">
        <h2>Vuoi Essere Più Alta. Ma i Tacchi <em>Ti Distruggono</em>.</h2>
        <p className="sub">Finalmente esiste un&apos;alternativa: il rialzo nascosto in una ciabatta comodissima.</p>

        <div className="lp-comparison">
          <div className="lp-comp-bad">
            <div className="lp-comp-icon">❌</div>
            <h4>Con i tacchi normali...</h4>
            <ul>
              <li>Dolore ai piedi dopo 2 ore</li>
              <li>Vesciche, bruciore, gonfiore</li>
              <li>Schiena e ginocchia a pezzi</li>
              <li>Non puoi camminare a lungo</li>
              <li>Li togli appena puoi</li>
            </ul>
          </div>
          <div className="lp-comp-good">
            <div className="lp-comp-icon">✓</div>
            <h4>Con AureaCloud...</h4>
            <ul>
              <li>+6cm reali, dalla mattina alla sera</li>
              <li>Morbide come camminare sulle nuvole</li>
              <li>Zero dolore, zero fatica</li>
              <li>Le usi per ore senza pensarci</li>
              <li>Nessuno capisce che sei rialzata</li>
            </ul>
          </div>
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
        <h2>3 Benefici in <em>Una Sola Ciabatta</em></h2>
        <p>Comfort Crocs + Stile Labubu + Rialzo Segreto. Tutto insieme. Finalmente.</p>
      </div>
      <div className="lp-fasi-grid">
        {[
          { img: "/images/land/aureacloud/benefici/1.jpeg", alt: "Rialzo Segreto 6cm", tag: "Beneficio 1", title: "+6 cm Segreti. Nessuno Li Vede." },
          { img: "/images/land/aureacloud/benefici/2.jpeg", alt: "Comfort Cloud Estremo", tag: "Beneficio 2", title: "Morbide Come Camminare su Nuvole." },
          { img: "/images/land/aureacloud/benefici/3.jpeg", alt: "Stile Labubu Trendy", tag: "Beneficio 3", title: "Lo Stile Labubu Che Spopola su TikTok." },
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
            <div className="lp-stat-n">6 cm</div>
            <div className="lp-stat-l">Rialzo invisibile<br />integrato</div>
          </div>
          <div>
            <div className="lp-stat-n">7.500+</div>
            <div className="lp-stat-l">Vendute solo<br />su TikTok Shop</div>
          </div>
          <div>
            <div className="lp-stat-n">4.9</div>
            <div className="lp-stat-l">Valutazione media<br />+2.847 recensioni</div>
          </div>
        </div>
        <p className="lp-stats-disc">*Dati da sondaggi interni e recensioni verificate. I risultati individuali possono variare.</p>
      </div>
    </section>
  );
}

/* ═══════════════════ 6 TECH GRID ═══════════════════ */

const techCards = [
  { img: "/images/land/aureacloud/card/card1.webp", alt: "Rialzo Invisibile 6cm", chip: "Tacco Segreto · +6 cm", title: "Rialzo Integrato Invisibile", text: <>6 cm nascosti nella suola platform. Dall&apos;esterno sono normali ciabatte trendy. <strong>Il tuo segreto resta invisibile.</strong></> },
  { img: "/images/land/aureacloud/card/card2.webp", alt: "Materiale Cloud Ultra-Morbido", chip: "Comfort · Cloud", title: "Materiale Cloud Ultra-Morbido", text: <>Stessa tecnologia delle Crocs originali. Morbidezza estrema, leggerezza totale. <strong>Cammini sulle nuvole. Letteralmente.</strong></> },
  { img: "/images/land/aureacloud/card/card3.webp", alt: "Design Labubu Kawaii", chip: "Stile · Labubu", title: "Design Labubu Kawaii", text: <>Lo stile che ha conquistato TikTok e le fashion week asiatiche. <strong>Trendy, unico, impossibile non farsi notare.</strong></> },
  { img: "/images/land/aureacloud/card/card4.webp", alt: "Suola Anti-Scivolo", chip: "Sicurezza · Grip", title: "Suola Anti-Scivolo Premium", text: <>Pattern di aderenza studiato per superfici bagnate e asciutte. <strong>Sicura in piscina, sicura in città. Ovunque.</strong></> },
  { img: "/images/land/aureacloud/card/card5.webp", alt: "Fori di Areazione", chip: "Traspirante · Fresco", title: "Fori di Areazione Strategici", text: <>I fori mantengono il piede fresco e asciutto tutto il giorno. <strong>Zero sudore, zero odore. Anche d&apos;estate.</strong></> },
  { img: "/images/land/aureacloud/card/card6.webp", alt: "Charm Personalizzabili", chip: "Personalizzazione", title: "Compatibile con Charm e Accessori", text: <>Aggiungi i tuoi charm preferiti e personalizza il tuo stile. <strong>Ogni paio è unico. Come te.</strong></> },
];

function TechGridSection() {
  return (
    <section className="lp-sec">
      <div className="lp-inner">
        <h2>6 Caratteristiche che le Rendono <em>Uniche</em></h2>
        <p className="sub">Non sono solo belle. Sono progettate per darti comfort e altezza senza compromessi.</p>
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

/* ═══════════════════ TIMELINE ═══════════════════ */

function TimelineSection() {
  return (
    <section className="lp-sec lp-sec-light" style={{ background: "#fdf2f8" }}>
      <div className="lp-inner">
        <h2>La Tua Nuova Routine <em>Con AureaCloud</em></h2>
        <p className="sub"></p>
        <div className="lp-timeline">
          {[
            { week: "Giorno 1", pct: "25%", title: "Le Indossi e Capisci Subito", text: <>Le infili. Sei subito 6cm più alta. Ma la cosa che ti colpisce è il comfort. <strong>Sono così morbide che non credi ai tuoi piedi.</strong></> },
            { week: "Settimana 1", pct: "50%", title: "Diventano le Tue Preferite", text: <>Le usi al mare, a fare shopping, all&apos;aperitivo. Le amiche chiedono dove le hai trovate. <strong>Tu sorridi e dici &quot;TikTok&quot;.</strong></> },
            { week: "Settimana 2", pct: "75%", title: "Non Torni Più alle Ciabatte Normali", text: <>Le altre ciabatte sembrano piatte, scomode, banali. Le AureaCloud ti danno quel boost di altezza e stile che non vuoi più perdere. <strong>Le metti ogni giorno.</strong></> },
            { week: "Settimana 4", pct: "100%", title: "Ordini il Secondo Paio", text: <>Una per la spiaggia. Una per la città. Magari un colore diverso. <strong>Non riesci più a farne a meno.</strong></> },
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
          <div className="lp-tl-badge">+6cm ogni giorno</div>
          <div className="lp-tl-badge">Zero fatica</div>
          <div className="lp-tl-badge">Stile unico</div>
        </div>
        <p className="lp-tl-disc">*Esperienza tipica delle nostre clienti. Il comfort è immediato.</p>
      </div>
    </section>
  );
}

/* ═══════════════════ REVIEWS (client) ═══════════════════ */

function LpReviewsSection() {
  return (
    <section className="lp-sec lp-sec-light" id="resenas">
      <div className="lp-inner">
        <h2>2.847 Recensioni <em>Verificate</em></h2>
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
        <p className="sub">La tua unica preoccupazione: scegliere il colore.</p>
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
      *Questo prodotto non è un dispositivo medico. I benefici percepiti possono variare da persona a persona. Immagini illustrative. Dati basati su sondaggi interni e recensioni verificate.
    </div>
  );
}
