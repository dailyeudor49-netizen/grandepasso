import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import fs from "fs";
import path from "path";
import {
  HeroGallery,
  FAQSection,
  ReviewsSection,
  HeroReviewCount,
  FeatureCard,
  RefundCollapsible,
  TrustpilotCarousel,
  ProblemSolutionAnimated,
  SolutionBridgeAnimated,
} from "./client";
import { OrderSection } from "./OrderModal";

function getCarouselImages(): string[] {
  const dir = path.join(process.cwd(), "public/images/land/deluxe-arch/carosello");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(webp|jpg|jpeg|png|avif)$/i.test(f))
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map((f) => {
      const mtime = Math.floor(fs.statSync(path.join(dir, f)).mtimeMs);
      return `/images/land/deluxe-arch/carosello/${f}?v=${mtime}`;
    });
}

export const metadata: Metadata = {
  title: "Deluxe Arch — Sandalo Ortopedico Elastico Donna | Piede Luxe",
  description:
    "Scopri le Deluxe Arch: sandali ortopedici con tomaia a maglia elastica effetto seconda pelle, supporto alla caviglia, soletta memory foam e suola curva che scarica ginocchia e schiena.",
};

/* ════════════════════════════════════════════════════════════
   IMAGE UTILITIES
   ════════════════════════════════════════════════════════════ */

function imgExists(publicPath: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", publicPath));
  } catch { return false; }
}

function imgWithCacheBuster(publicPath: string): string {
  try {
    const mtime = Math.floor(fs.statSync(path.join(process.cwd(), "public", publicPath)).mtimeMs);
    return `${publicPath}?v=${mtime}`;
  } catch { return publicPath; }
}

function ImgPlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-2 ${className ?? "aspect-video w-full"}`}
      style={{ backgroundColor: "#F6F7F8", border: "1px dashed #D7DCE2", borderRadius: "inherit" }}>
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="#C4C0B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
      <span className="text-xs font-medium" style={{ color: "#C4C0B8" }}>{label}</span>
    </div>
  );
}

function ImgWithFallback({
  src, alt, label, width, height, className, loading = "lazy", style,
}: {
  src: string; alt: string; label: string;
  width: number; height: number; className?: string; loading?: "lazy" | "eager"; style?: React.CSSProperties;
}) {
  if (imgExists(src)) {
    return <Image src={src} alt={alt} width={width} height={height} className={className} loading={loading} style={style} />;
  }
  return <ImgPlaceholder label={label} className={className} />;
}

/* ── Design tokens ── */
const DS = {
  brand:       "#FF914D",
  brandLight:  "#FFB07D",
  brandSubtle: "#FFF3EB",
  brandDark:   "#D06A2B",
  cta:         "#ff914d",
  ctaHover:    "#e67a30",
  text:        "#1A1917",
  textSec:     "#5A5752",
  textMuted:   "#9B9790",
  bg:          "#FCFCFA",
  surface:     "#FFFFFF",
  muted:       "#FCFCFA",
  trust:       "#2B6E44",
  trustLight:  "#E6F4EC",
  border:      "#E2E4E8",
  borderMed:   "#D7DCE2",
  navy:        "#ff914d",
} as const;

/* ════════════════════════════════════════════════════════════
   HERO SECTION
   ════════════════════════════════════════════════════════════ */

function HeroSection() {
  const images = getCarouselImages();
  return (
    <section style={{ backgroundColor: "#FFFFFF" }} className="w-full px-4 pt-2 pb-6 sm:px-6 lg:px-8 md:pt-5 md:pb-10">
      <div className="mx-auto max-w-7xl">
      <div className="grid items-start gap-4 md:gap-6 md:grid-cols-2 lg:[grid-template-columns:1.15fr_1fr]">

        {/* ── Gallery ── */}
        <HeroGallery images={images} />

        {/* ── Product info ── */}
        <div>

          {/* 1. Label + Rating */}
          <div style={{ marginBottom: 12 }} className="flex flex-wrap items-center gap-y-2" >
            <span className="inline-flex items-center gap-1.5 rounded px-2.5 py-0.5 text-[12px] font-semibold uppercase tracking-[0.1em]"
              style={{ backgroundColor: DS.brandSubtle, color: DS.brandDark, marginRight: 20 }}>
              Sandalo Ortopedico Elastico
            </span>
            <a href="#recensioni" className="flex items-center gap-1.5 no-underline">
              <span className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="#D97706">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </span>
              <span className="text-xs font-bold" style={{ color: DS.text }}>4,9</span>
              <HeroReviewCount />
            </a>
          </div>

          {/* 2. Title */}
          <h1 style={{ marginBottom: 14, color: DS.text, fontFamily: "var(--font-heading)", fontSize: 27, lineHeight: 1.22, letterSpacing: "-0.015em" }}
            className="font-bold md:text-[33px]">
            <span style={{ color: DS.brand }}>Deluxe Arch</span> — Li infili come un Calzino.{" "}
            <span style={{ color: DS.textSec, fontWeight: 500 }}>Comfort ortopedico.</span>
          </h1>

          {/* 3. Description */}
          <p style={{ marginBottom: 18, color: DS.textSec }} className="text-[16px] leading-[1.65]">
            Tomaia elastica che si adatta al piede, supporto alla caviglia e suola curva che scarica ginocchia e schiena: comfort immediato dal primo passo, per <strong style={{ color: "#3a3a3a" }}>camminare leggera, dritta e senza dolori</strong>.
          </p>

          {/* 4. Price block */}
          <div style={{ marginBottom: 5 }} className="flex items-baseline">
            <span className="text-[36px] font-extrabold leading-none" style={{ color: "#137333", fontFamily: "var(--font-heading)" }}>
              €49,99
            </span>
            <span className="ml-4 text-[16px] font-normal line-through" style={{ color: "#B8B3AB" }}>€166,99</span>
            <span className="ml-2 self-center rounded-md px-2.5 py-1 text-[15px] font-bold leading-none"
              style={{ backgroundColor: "#FDE8E8", color: "#D63031" }}>
              -70%
            </span>
          </div>
          <div style={{ marginBottom: 6 }} className="flex items-center gap-1.5">
            <span className="relative inline-flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: "#D63031", opacity: 0.45 }} />
              <span className="absolute inset-0 rounded-full" style={{ backgroundColor: "#D63031", boxShadow: "0 0 4px #D63031, 0 0 8px rgba(214,48,49,0.4)" }} />
            </span>
            <span className="text-[15px] font-semibold" style={{ color: "#D63031" }}>Disponibilità limitata</span>
          </div>

          {/* Divider */}
          <div className="mb-3 h-px" style={{ backgroundColor: DS.border }} />

          {/* Feature bullets */}
          <div className="mb-3.5 overflow-hidden border" style={{ borderColor: DS.border, backgroundColor: "#FCFCFA", borderRadius: 12 }}>
            {[
              {
                icon: <svg viewBox="0 0 24 24" fill="none" className="h-[16px] w-[16px] shrink-0" stroke={DS.navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12c0-4 4-7 8-7s8 3 8 7-4 7-8 7-8-3-8-7z"/><path d="M9 12h6"/></svg>,
                bold: "Tomaia a maglia elastica",
                rest: "si adatta al piede come un calzino, comfort immediato senza punti di pressione",
              },
              {
                icon: <svg viewBox="0 0 24 24" fill="none" className="h-[16px] w-[16px] shrink-0" stroke={DS.navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>,
                bold: "Facile da indossare",
                rest: "si infila in un secondo, niente lacci né fibbie, perfetto per chi fatica a chinarsi",
              },
              {
                icon: <svg viewBox="0 0 24 24" fill="none" className="h-[16px] w-[16px] shrink-0" stroke={DS.navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z"/></svg>,
                bold: "Supporto alla caviglia",
                rest: "stabilizza il piede e riduce il rischio di storte, sicurezza su terreni irregolari",
              },
              {
                icon: <svg viewBox="0 0 24 24" fill="none" className="h-[16px] w-[16px] shrink-0" stroke={DS.navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="1.5"/><circle cx="16" cy="8" r="1.5"/><circle cx="8" cy="16" r="1.5"/><circle cx="16" cy="16" r="1.5"/><circle cx="12" cy="12" r="1.5"/></svg>,
                bold: "Soletta Memory Foam",
                rest: "prende la forma del piede e sostiene l'arco plantare, ideale per piedi gonfi e diabetici",
              },
              {
                icon: <svg viewBox="0 0 24 24" fill="none" className="h-[16px] w-[16px] shrink-0" stroke={DS.navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18c3-6 6-9 9-9s6 3 9 9"/></svg>,
                bold: "Suola curva rocker",
                rest: "distribuisce il peso e scarica ginocchia e schiena, attiva i glutei, meno fatica e postura dritta",
              },
            ].map((f, i) => (
              <div key={f.bold}>
                {i > 0 && <div className="h-px" style={{ backgroundColor: "#E2E4E8" }} />}
                <div className="flex items-center gap-2.5 px-3.5 py-3" style={{ backgroundColor: i % 2 === 0 ? "#FAF8F5" : "#FFFFFF" }}>
                  <span className="flex h-7 w-7 min-w-[28px] shrink-0 items-center justify-center" style={{ backgroundColor: "#EEF1F7", borderRadius: 7 }}>
                    {f.icon}
                  </span>
                  <span className="min-w-0 text-[17px] leading-snug" style={{ color: DS.textSec }}>
                    <strong className="font-bold" style={{ color: DS.text }}>{f.bold}</strong>{" "}
                    — {f.rest}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Order section */}
          <OrderSection image={images[0] || ""} />

          {/* Microtrust */}
          <div className="mt-2.5 grid grid-cols-3 gap-x-1">
            {[
              "Paghi al corriere",
              "Conferma via chiamata o messaggio",
              "Spedizione gratis 24-48h",
            ].map((t) => (
              <span key={t} className="flex items-center justify-center gap-1 text-[12px] font-medium leading-none text-center" style={{ color: DS.textSec }}>
                <svg viewBox="0 0 16 16" className="h-2.5 w-2.5 shrink-0" fill={DS.trust}>
                  <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.35 5.35l-4 4a.5.5 0 01-.7 0l-2-2a.5.5 0 01.7-.7L7 9.29l3.65-3.64a.5.5 0 01.7.7z"/>
                </svg>
                {t}
              </span>
            ))}
          </div>

          {/* Trust badges - spazio vuoto per layout */}
          <div className="mt-4"></div>
        </div>
      </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   TRUST STRIP
   ════════════════════════════════════════════════════════════ */

function TrustStrip() {
  const items = [
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0"><path d="M5 12h14M12 5l7 7-7 7"/></svg>,
      title: "Spedizione Gratuita 24-48h",
      sub: "Con corriere GLS Express in tutta Italia",
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>,
      title: "Paghi Solo al Corriere",
      sub: "Nessun pagamento anticipato, zero rischi",
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0"><path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
      title: "Reso Entro 30 Giorni",
      sub: "Soddisfatto o rimborsato, senza domande",
    },
  ];

  return (
    <div style={{ backgroundColor: "#FCFCFA", borderTop: `1px solid ${DS.border}`, borderBottom: `1px solid ${DS.border}` }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="divide-y md:hidden" style={{ divideColor: DS.border } as React.CSSProperties}>
          {items.map((item) => (
            <div key={item.title} className="flex items-center gap-3.5 py-3.5">
              <span style={{ color: DS.trust }}>{item.icon}</span>
              <div>
                <p className="text-sm font-semibold" style={{ color: DS.text, fontFamily: "var(--font-heading)" }}>{item.title}</p>
                <p className="text-xs" style={{ color: DS.textMuted }}>{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden md:grid md:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={item.title}
              className="flex items-center gap-3.5 py-4"
              style={{ borderRight: i < items.length - 1 ? `1px solid ${DS.border}` : "none", paddingLeft: i === 0 ? 0 : "2rem", paddingRight: i === items.length - 1 ? 0 : "2rem" }}
            >
              <span style={{ color: DS.trust }}>{item.icon}</span>
              <div>
                <p className="text-sm font-semibold" style={{ color: DS.text, fontFamily: "var(--font-heading)" }}>{item.title}</p>
                <p className="text-xs" style={{ color: DS.textMuted }}>{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   PAGE ROOT
   ════════════════════════════════════════════════════════════ */

export default function ArveliaArchLanding() {
  return (
    <div>
      <Script
        id="fb-pixel-landing"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1576025786901423');fbq('track','PageView');`,
        }}
      />
      <noscript>
        <img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=1576025786901423&ev=PageView&noscript=1" alt="" />
      </noscript>

      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Trust strip */}
      <TrustStrip />

      {/* 3. Why (problemi) */}
      <div style={{ backgroundColor: "#FFFFFF" }}>
        <WhySection />
      </div>

      {/* 4. Features + Solution bridge */}
      <div style={{ backgroundColor: "#FCFCFA" }}>
        <FeaturesSection />
      </div>

      {/* 5. Before / After */}
      <div style={{ backgroundColor: "#FFFFFF" }}>
        <BeforeAfterSection />
      </div>

      {/* 6. Reviews */}
      <div style={{ backgroundColor: "#FFFFFF" }}>
        <ReviewsSection />
      </div>

      {/* 7. FAQ */}
      <div style={{ backgroundColor: "#FCFCFA" }}>
        <FAQSection />
      </div>

      {/* 8. Couriers */}
      <div style={{ backgroundColor: "#FFFFFF" }}>
        <CouriersSection />
      </div>

      {/* 9. Trustpilot */}
      <div style={{ backgroundColor: "#FCFCFA" }}>
        <TrustpilotCarousel />
      </div>

      {/* 10. Refund */}
      <div style={{ backgroundColor: "#FFFFFF" }}>
        <RefundSection />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   WHY SECTION — Problem / Solution comparison
   ════════════════════════════════════════════════════════════ */

function WhySection() {
  const problems = [
    "Tomaie rigide che segnano e fanno male",
    "Zero supporto: dolori a schiena e ginocchia",
    "Piedi gonfi che non entrano in nulla",
    "Postura curva e camminata faticosa",
  ];
  const solutions = [
    "Maglia elastica: si adatta come un guanto",
    "Suola rocker: scarica schiena e ginocchia",
    "Comfort anche per piedi gonfi e diabetici",
    "Postura dritta e passo leggero",
  ];
  return (
    <section style={{ backgroundColor: "transparent" }} aria-labelledby="why-title">
      <ProblemSolutionAnimated problems={problems} solutions={solutions} />
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   FEATURES SECTION
   ════════════════════════════════════════════════════════════ */

const features = [
  {
    img: "/images/land/deluxe-arch/caratteristiche/1.webp",
    animated: true,
    alt: "Tomaia a maglia elastica effetto seconda pelle",
    title: "Effetto seconda pelle",
    badge: "Si adatta a tutto",
    tags: ["Zero punti di pressione", "Comfort immediato"],
    text: "Tomaia a <b>maglia elastica</b> con <b>effetto seconda pelle</b>: si adatta a <b>qualsiasi forma di piede</b> — anche largo, gonfio o sensibile — senza segnare né creare punti di pressione.",
  },
  {
    img: "/images/land/deluxe-arch/caratteristiche/2.webp",
    alt: "Facile da indossare: si infila in un secondo",
    title: "Si infila in un secondo",
    badge: "Niente lacci",
    tags: ["Zero fibbie", "Pronta in un attimo"],
    text: "Niente lacci, fibbie o strappi: <b>apri il bordo elastico, infili il piede</b> ed è fatta. Perfetto per chi <b>fatica a chinarsi</b> o ha dolori alla schiena.",
  },
  {
    img: "/images/land/deluxe-arch/caratteristiche/3.webp",
    alt: "Supporto alla caviglia per camminata stabile",
    title: "Supporto alla caviglia",
    badge: "Stabilità totale",
    tags: ["Anti-storte", "Camminata sicura"],
    text: "La fascia avvolgente <b>stabilizza la caviglia</b> ad ogni passo, riduce il rischio di storte e ti dà <b>sicurezza su terreni irregolari</b> o pavimenti scivolosi.",
  },
  {
    img: "/images/land/deluxe-arch/caratteristiche/4.webp",
    alt: "Soletta Memory Foam che prende la forma del piede",
    title: "Soletta Memory Foam",
    badge: "Su misura",
    tags: ["Forma il piede", "Supporto plantare"],
    text: "Soletta in <b>Memory Foam</b> che prende la <b>forma esatta del tuo piede</b>, sostiene l'arco plantare e distribuisce la pressione: comfort dal primo all'ultimo passo.",
  },
  {
    img: "/images/land/deluxe-arch/caratteristiche/5.webp",
    alt: "Dita libere e alluce allineato, sollievo per alluce valgo",
    title: "Allevia l'alluce valgo",
    badge: "Dita libere",
    tags: ["Zero compressione", "Alluce allineato"],
    text: "La tomaia elastica lascia <b>le dita libere</b>: zero pressione sull'alluce, che torna ad <b>allinearsi naturalmente</b>. Sollievo per chi soffre di alluce valgo.",
  },
  {
    img: "/images/land/deluxe-arch/caratteristiche/6.webp",
    alt: "Suola curva rocker che scarica ginocchia e schiena",
    title: "Suola curva: scarica ginocchia e schiena",
    badge: "Postura corretta",
    tags: ["Effetto rocker", "Solleva i glutei"],
    text: "La <b>suola curva rocker</b> distribuisce il peso ad ogni passo <b>scaricando ginocchia e schiena</b>: la spinta naturale attiva i glutei e raddrizza la postura — cammini più leggera e dritta.",
  },
];

function FeaturesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 pb-12 sm:px-6 lg:px-8 md:pt-12 md:pb-16" id="benefici-arvelia-arch" aria-label="Caratteristiche Deluxe Arch">
      {/* Solution bridge */}
      <SolutionBridgeAnimated
        bg="transparent"
        textColor={DS.text}
        brandColor={DS.brand}
      />

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <FeatureCard key={f.title} id={f.title}>
            <article
              className="flex h-full flex-col overflow-hidden"
              style={{ backgroundColor: "#FFFFFF", border: `1px solid ${DS.border}`, borderRadius: 14, boxShadow: "0 1px 3px rgba(26,25,23,0.04)" }}
            >
              <div className="p-4 pb-0">
                {f.animated ? (
                  imgExists(f.img)
                    ? <img src={f.img} alt={f.alt} className="w-full" style={{ borderRadius: 12 }} loading="lazy" />
                    : <ImgPlaceholder label={`Foto: ${f.alt}`} className="aspect-square w-full" />
                ) : (
                  <ImgWithFallback src={f.img} alt={f.alt} label={`Foto: ${f.alt}`} width={600} height={600} className="w-full" style={{ borderRadius: 12 }} />
                )}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide"
                    style={{ backgroundColor: DS.brandSubtle, color: DS.brandDark, borderRadius: 5 }}>
                    {f.badge}
                  </span>
                  {f.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center px-2 py-0.5 text-[11px] font-medium"
                      style={{ backgroundColor: "#ECEEF2", color: DS.textSec, borderRadius: 5 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1 p-5 pt-3">
                <h3 className="mb-2 text-[18px] font-extrabold leading-snug" style={{ color: DS.text, fontFamily: "var(--font-heading)" }}>{f.title}</h3>
                <p className="text-[16px] leading-relaxed" style={{ color: DS.textSec }} dangerouslySetInnerHTML={{ __html: f.text }} />
              </div>
            </article>
          </FeatureCard>
        ))}
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   BEFORE / AFTER SECTION
   ════════════════════════════════════════════════════════════ */

function CheckIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BeforeAfterSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 md:py-16" id="prima-dopo" aria-label="Prima e dopo con Deluxe Arch">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border p-4 md:p-6" style={{ borderColor: DS.border, backgroundColor: DS.bg }}>
          {/* Header */}
          <header className="mb-6 text-center">
            <h2 className="mb-2 text-xl font-extrabold md:text-2xl" style={{ color: DS.text, fontFamily: "var(--font-heading)" }}>
              Da postura curva a{" "}
              <span style={{ color: DS.navy }}>schiena dritta e camminata leggera</span>.
            </h2>
            <p className="text-[16px]" style={{ color: DS.textSec, fontFamily: "var(--font-body)" }}>
              Con <b>Deluxe Arch</b> il sollievo si sente <b>fin dal primo passo</b>.
            </p>
          </header>

          {/* Single postura image */}
          <div className="relative -mx-2 md:mx-auto md:max-w-md">
            <figure className="relative overflow-hidden rounded-2xl border bg-white shadow-sm" style={{ borderColor: DS.border }}>
              {imgExists("/images/land/deluxe-arch/vs/postura.webp")
                ? <Image src={imgWithCacheBuster("/images/land/deluxe-arch/vs/postura.webp")} alt="Prima e dopo con Deluxe Arch" width={960} height={960} className="aspect-square w-full object-cover" loading="lazy" />
                : <ImgPlaceholder label="Foto postura prima/dopo" className="aspect-square w-full" />
              }
              <div className="absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-bold shadow-md"
                style={{ backgroundColor: "#D63031", color: "#fff" }}>Prima</div>
              <div className="absolute right-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-bold shadow-md"
                style={{ backgroundColor: DS.trust, color: "#fff" }}>Dopo</div>
            </figure>
            {/* VS divider */}
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-xs font-extrabold text-white shadow-lg md:h-12 md:w-12 md:text-sm"
                style={{ backgroundColor: DS.navy }}>VS</div>
            </div>
          </div>

          <p className="mt-4 text-center text-[14px] leading-relaxed" style={{ color: DS.textSec }}>
            La <b style={{ color: "#3a3a3a" }}>suola curva</b> distribuisce il peso e <b style={{ color: "#3a3a3a" }}>scarica ginocchia e schiena</b> ad ogni passo.<br />La postura si raddrizza, la camminata diventa <b style={{ color: "#3a3a3a" }}>leggera e fluida</b> e i glutei risultano <b style={{ color: "#3a3a3a" }}>visibilmente più tonici</b>.
          </p>

          {/* Benefits */}
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              "Postura più dritta",
              "Zero dolori a ginocchia e schiena",
              "Camminata leggera e stabile",
            ].map((text) => (
              <li
                key={text}
                className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-2 text-[14px] font-bold"
                style={{ borderColor: DS.border, color: DS.text }}
              >
                <span style={{ color: DS.navy }}><CheckIcon className="h-4 w-4" /></span>
                {text}
              </li>
            ))}
          </ul>

        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   COURIERS SECTION
   ════════════════════════════════════════════════════════════ */

function CouriersSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 md:py-16" aria-label="Corrieri e spedizione">
      <div className="rounded-2xl border p-5 md:p-8" style={{ backgroundColor: "#FCFCFA", borderColor: DS.border }}>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="mb-1 inline-block rounded px-2 py-0.5 text-[12px] font-semibold uppercase tracking-[0.1em]"
              style={{ backgroundColor: DS.trustLight, color: DS.trust }}>
              Logistica
            </div>
            <h3 className="text-lg font-bold" style={{ color: DS.text, fontFamily: "var(--font-heading)" }}>
              Spediamo con GLS Express
            </h3>
          </div>
          <span className="rounded border px-3 py-1.5 text-xs font-bold" style={{ borderColor: DS.border, color: DS.textSec }}>GLS</span>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {[
            { text: "<b>Spedizione gratuita 24-48h</b> in tutta Italia con GLS Express" },
            { text: "<b>Ti chiamiamo o ti scriviamo</b> per confermare l'ordine prima della spedizione" },
            { text: "Ordini del <b>venerdì dopo le 17:00</b> confermati e spediti il <b>lunedì</b>" },
          ].map((card, i) => (
            <div key={i} className="flex gap-3 rounded-xl border p-4"
              style={{ backgroundColor: DS.muted, borderColor: DS.border }}>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: DS.trustLight, color: DS.trust }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  {i === 0 && <path d="M3 7h11l3 3h4v7h-2a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H3V7z" />}
                  {i === 1 && <path d="M6.5 17c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5S6.5 18.38 6.5 17zM22 9l-3-6H4L1 9v2h1v8h10v-8h6v8h2v-8h1V9h-1z" />}
                  {i === 2 && <path fill="none" d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}
                </svg>
              </div>
              <p className="text-[16px] leading-relaxed" style={{ color: DS.textSec }} dangerouslySetInnerHTML={{ __html: card.text }} />
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {["Spedizione GRATIS", "Pagamento alla consegna", "Consegna 24-48h"].map((chip) => (
            <span key={chip} className="rounded border px-3 py-1.5 text-xs font-semibold"
              style={{ backgroundColor: DS.trustLight, borderColor: "#B7D9C5", color: DS.trust }}>
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   REFUND SECTION
   ════════════════════════════════════════════════════════════ */

function RefundSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 pt-4 sm:px-6 lg:px-8 md:py-16 md:pt-4" aria-label="Resi e rimborsi">
      <RefundCollapsible
        image={
          <div className="overflow-hidden rounded-t-2xl">
            <ImgWithFallback
              src="/images/land/deluxe-arch/rimborso.webp"
              alt="Soddisfatto o rimborsato"
              label="Foto garanzia rimborso"
              width={960} height={420}
              className="w-full h-auto"
            />
          </div>
        }
      >
        <div className="p-5 md:p-8">
          <ol className="mb-6 ml-5 list-decimal space-y-2 text-[17px] leading-relaxed" style={{ color: DS.textSec }}>
            <li>Hai <b style={{ color: DS.text }}>30 giorni</b> dalla consegna per richiedere il reso.</li>
            <li>
              Scrivi a{" "}
              <a href="mailto:supportoacquistionline@gmail.com" className="font-semibold underline" style={{ color: DS.trust }}>
                supportoacquistionline@gmail.com
              </a>{" "}
              o usa il{" "}
              <a href="/contatti" className="font-semibold underline" style={{ color: DS.trust }}>
                modulo resi
              </a>{" "}
              con nome, telefono, indirizzo e motivo.
            </li>
            <li>Rispondiamo in <b style={{ color: DS.text }}>24h</b>. Mandiamo noi il corriere e il <b style={{ color: DS.text }}>rimborso è immediato</b>.</li>
          </ol>

          <div className="grid gap-3 md:grid-cols-3">
            {[
              { text: "Assistenza Tempestiva" },
              { text: "Soddisfatto o Rimborsato" },
              { text: "Procedure Semplici e Veloci" },
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border p-4"
                style={{ backgroundColor: DS.muted, borderColor: DS.border }}>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: DS.trustLight, color: DS.trust }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    {i === 0 && <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z" />}
                    {i === 1 && <path d="M9 12l2 2 4-4M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z" />}
                    {i === 2 && <path fill="none" d="M4 6h16M7 12h10M9 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}
                  </svg>
                </div>
                <p className="text-[16px] font-semibold" style={{ color: DS.text }}>{p.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-5 text-center" style={{ borderColor: DS.border }}>
            <p className="text-sm font-semibold" style={{ color: DS.text }}>Calzame S.R.L.</p>
            <p className="mt-1 text-xs" style={{ color: DS.textMuted }}>Via Borgo Palazzo 28, 24125 Bergamo (BG) — P.IVA 04391260175</p>
          </div>
        </div>
      </RefundCollapsible>
    </section>
  );
}
