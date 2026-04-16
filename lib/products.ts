import { Product } from "./types";

export const products: Product[] = [
  // ── Prodotti con Landing Page ──
  {
    slug: "aureacloud",
    name: "AureaCloud",
    subtitle: "Ciabatte Platform con Rialzo Segreto +6cm",
    price: 49.90,
    originalPrice: 99.90,
    category: "posturali",
    description:
      "Le AureaCloud sono ciabatte platform stile Crocs/Labubu con rialzo segreto di 6cm integrato nella suola. Comodità estrema + altezza extra invisibile. Il tacco nascosto che sembra una ciabatta trendy.",
    features: [
      "Rialzo segreto +6cm invisibile",
      "Comfort cloud stile Crocs",
      "Design Labubu kawaii trendy",
      "Ultraleggere solo 280g",
    ],
    color: "#3b82f6",
    accentColor: "#93c5fd",
    soldOut: false,
    hasLanding: true,
    image: "/images/land/aureacloud/carosello/1.webp",
  },
  {
    slug: "aureastep",
    name: "AureaStep Pro",
    subtitle: "Scarpe Ortopediche con Supporto Avanzato",
    price: 49.90,
    originalPrice: 99.90,
    category: "ortopediche",
    description:
      "Le AureaStep Pro con supporto avanzato per arco plantare, suola ergonomica e materiali traspiranti. Comfort e benessere ad ogni passo.",
    features: [
      "Supporto avanzato arco plantare",
      "Suola ergonomica anti-fatica",
      "Materiali traspiranti premium",
      "Design ortopedico certificato",
    ],
    color: "#3b82f6",
    accentColor: "#93c5fd",
    soldOut: false,
    hasLanding: true,
    image: "/images/land/aureastep/carosello/destro.png",
  },
  {
    slug: "vitanovastep",
    name: "LuxeStep Pro",
    subtitle: "Scarpe Ortopediche con Supporto Avanzato",
    price: 49.90,
    originalPrice: 99.90,
    category: "ortopediche",
    description:
      "Le LuxeStep Pro con supporto avanzato per arco plantare, suola ergonomica e materiali traspiranti. Comfort e benessere ad ogni passo.",
    features: [
      "Supporto avanzato arco plantare",
      "Suola ergonomica anti-fatica",
      "Materiali traspiranti premium",
      "Design ortopedico certificato",
    ],
    color: "#16a34a",
    accentColor: "#4ade80",
    soldOut: false,
    hasLanding: true,
    image: "/images/land/vitanovastep/carosello/destro.png",
  },
  {
    slug: "snellawalk360",
    name: "SnellaWalk 360",
    subtitle: "Scarpe Dimagranti con Suola Rocker Ortopedica",
    price: 49.99,
    originalPrice: 99.98,
    category: "ortopediche",
    description:
      "Le SnellaWalk 360 con suola rocker ortopedica, effetto GluteLift e soletta OrtoLift\u2122. Cammina meglio, attiva i glutei, migliora la postura.",
    features: [
      "Suola rocker ortopedica curva",
      "Effetto GluteLift attiva i glutei",
      "Soletta OrtoLift\u2122 con supporto arco",
      "ThermoBalance\u2122 traspirante",
    ],
    color: "#16a34a",
    accentColor: "#4ade80",
    soldOut: false,
    hasLanding: true,
    image: "/images/land/snellawalk360/carosello/1.webp",
  },
  {
    slug: "orthostep",
    name: "OrthoStep Pro",
    subtitle: "Scarpe Ortopediche Professionali",
    price: 49.90,
    originalPrice: 99.90,
    category: "ortopediche",
    description:
      "Le OrthoStep Pro offrono supporto ortopedico professionale con suola anatomica, plantare integrato e materiali di alta qualità per il massimo comfort.",
    features: [
      "Suola anatomica professionale",
      "Plantare integrato removibile",
      "Tre colori disponibili",
      "Supporto tallone rinforzato",
    ],
    color: "#0d9488",
    accentColor: "#5eead4",
    soldOut: false,
    hasLanding: true,
    image: "/images/land/orthostep/carosello/beige.png",
  },
  {
    slug: "cloudstep",
    name: "VENOCARE\u2122 PRO",
    subtitle: "Scarpe a Compressione Graduata Anti-Gonfiore",
    price: 49.90,
    originalPrice: 99.90,
    category: "posturali",
    description:
      "Le VENOCARE\u2122 PRO con compressione graduata per gambe leggere, circolazione migliorata e comfort tutto il giorno.",
    features: [
      "Compressione graduata integrata",
      "Migliora la circolazione",
      "Riduce gonfiore e affaticamento",
      "Design elegante e confortevole",
    ],
    color: "#0369a1",
    accentColor: "#38bdf8",
    soldOut: false,
    hasLanding: true,
    image: "/images/land/cloudstep/unnamed (9).jpg",
  },

  // ── Calzature Ortopediche ──
  {
    slug: "plantare-comfort-daily",
    name: "Plantare Comfort Daily",
    subtitle: "Supporto anatomico per uso quotidiano",
    price: 59.99,
    originalPrice: 89.99,
    category: "ortopediche",
    description:
      "La Plantare Comfort Daily è progettata per chi cerca sollievo dai dolori ai piedi durante le lunghe giornate. Dotata di plantare anatomico in memory foam e suola ammortizzante, offre un supporto costante dall'alba al tramonto.",
    features: [
      "Plantare anatomico in memory foam",
      "Suola ammortizzante anti-shock",
      "Tomaia in pelle traspirante",
      "Chiusura regolabile a strappo",
    ],
    color: "#16a34a",
    accentColor: "#4ade80",

    soldOut: true,
    image: "/images/catalogo/1.jpg",
  },
  {
    slug: "ortho-sollievo-plus",
    name: "Ortho Sollievo Plus",
    subtitle: "Allevia fascite plantare e tallonite",
    price: 74.99,
    originalPrice: 109.99,
    category: "ortopediche",
    description:
      "La Ortho Sollievo Plus nasce dalla collaborazione con esperti ortopedici. Ideale per chi soffre di fascite plantare o tallonite, grazie al supporto dell'arco rinforzato e alla zona tallone con gel ad alta densità.",
    features: [
      "Supporto arco plantare rinforzato",
      "Tallone in gel ad alta densità",
      "Suola a dondolo ergonomica",
      "Fodera antibatterica",
    ],
    color: "#0d9488",
    accentColor: "#5eead4",

    soldOut: true,
    image: "/images/catalogo/2.jpg",
  },
  {
    slug: "scarpa-terapeutica-flex",
    name: "Terapeutica Flex",
    subtitle: "Calzatura medica per piedi sensibili",
    price: 79.99,
    originalPrice: 119.99,
    category: "ortopediche",
    description:
      "La Terapeutica Flex è studiata per piedi delicati e sensibili. Calzata extra larga, cuciture piatte interne e materiali anallergici la rendono perfetta per chi necessita di una calzatura terapeutica di qualità.",
    features: [
      "Calzata extra larga comfort",
      "Cuciture piatte anti-sfregamento",
      "Materiali anallergici certificati",
      "Soletta removibile e lavabile",
    ],
    color: "#1e3a5f",
    accentColor: "#60a5fa",

    soldOut: true,
    image: "/images/catalogo/3.jpg",
  },

  // ── Calzature Posturali ──
  {
    slug: "postura-active-walk",
    name: "Postura Active Walk",
    subtitle: "Correggi la postura camminando",
    price: 64.99,
    originalPrice: 99.99,
    category: "posturali",
    description:
      "La Postura Active Walk utilizza una suola a geometria variabile che guida il piede nella posizione corretta ad ogni passo. Ideale per chi vuole migliorare la propria postura senza rinunciare al comfort quotidiano.",
    features: [
      "Suola a geometria variabile",
      "Correzione progressiva dell'appoggio",
      "Ammortizzazione differenziata",
      "Design adatto a ogni outfit",
    ],
    color: "#7c3aed",
    accentColor: "#a78bfa",

    soldOut: true,
    image: "/images/catalogo/4.png",
  },
  {
    slug: "balance-pro-equilibrium",
    name: "Balance Pro Equilibrium",
    subtitle: "Equilibrio e stabilità ad ogni passo",
    price: 69.99,
    originalPrice: 104.99,
    category: "posturali",
    description:
      "La Balance Pro Equilibrium è la scelta ideale per chi cerca stabilità e allineamento. Il sistema di bilanciamento integrato nella suola distribuisce il peso in modo uniforme, riducendo lo stress su ginocchia e schiena.",
    features: [
      "Sistema di bilanciamento integrato",
      "Distribuzione uniforme del peso",
      "Riduce stress su ginocchia e schiena",
      "Tomaia in mesh ultraleggera",
    ],
    color: "#0369a1",
    accentColor: "#38bdf8",

    soldOut: true,
    image: "/images/catalogo/5.jpg",
  },
  {
    slug: "allineamento-ergo-step",
    name: "Ergo Step Allineamento",
    subtitle: "Allineamento naturale del corpo",
    price: 54.99,
    originalPrice: 84.99,
    category: "posturali",
    description:
      "La Ergo Step Allineamento promuove un allineamento naturale dalla caviglia fino alla colonna vertebrale. La suola a doppia densità e il plantare sagomato guidano il piede verso una postura corretta e naturale.",
    features: [
      "Suola a doppia densità",
      "Plantare sagomato ergonomico",
      "Allineamento caviglia-colonna",
      "Materiale traspirante e leggero",
    ],
    color: "#4338ca",
    accentColor: "#818cf8",

    soldOut: true,
    image: "/images/catalogo/6.jpg",
  },

  // ── Calzature Fitness ──
  {
    slug: "fitness-energy-boost",
    name: "Fitness Energy Boost",
    subtitle: "Energia e performance per il tuo allenamento",
    price: 49.99,
    originalPrice: 79.99,
    category: "fitness",
    description:
      "La Fitness Energy Boost è progettata per chi ama allenarsi con intensità. Suola reattiva con ritorno di energia, tomaia in mesh traspirante e supporto laterale per movimenti dinamici in palestra e all'aperto.",
    features: [
      "Suola reattiva con ritorno di energia",
      "Tomaia in mesh ad alta traspirabilità",
      "Supporto laterale rinforzato",
      "Grip multidirezionale",
    ],
    color: "#dc2626",
    accentColor: "#f87171",

    soldOut: true,
    image: "/images/catalogo/7.webp",
  },
  {
    slug: "training-flex-motion",
    name: "Training Flex Motion",
    subtitle: "Flessibilità e comfort per ogni esercizio",
    price: 44.99,
    originalPrice: 69.99,
    category: "fitness",
    description:
      "La Training Flex Motion offre la massima flessibilità per ogni tipo di esercizio. Dal crossfit allo yoga, la suola segmentata si adatta al movimento del piede garantendo libertà e protezione.",
    features: [
      "Suola segmentata ultra-flessibile",
      "Ammortizzazione zona avampiede",
      "Peso piuma: solo 220g",
      "Asciugatura rapida",
    ],
    color: "#ea580c",
    accentColor: "#fb923c",

    soldOut: true,
    image: "/images/catalogo/8.jpg",
  },
  {
    slug: "gym-power-stability",
    name: "Gym Power Stability",
    subtitle: "Stabilità massima per sollevamento pesi",
    price: 39.99,
    originalPrice: 64.99,
    category: "fitness",
    description:
      "La Gym Power Stability è la calzatura ideale per il sollevamento pesi e gli esercizi di forza. Suola piatta e rigida per una base stabile, cinturino di sicurezza alla caviglia e tomaia rinforzata.",
    features: [
      "Suola piatta e rigida per stabilità",
      "Cinturino di sicurezza alla caviglia",
      "Tomaia rinforzata anti-strappo",
      "Drop zero per posizione naturale",
    ],
    color: "#b91c1c",
    accentColor: "#fca5a5",

    soldOut: true,
    image: "/images/catalogo/9.webp",
  },

  // ── Calzature Trekking ──
  {
    slug: "trekking-mountain-pro",
    name: "Trekking Mountain Pro",
    subtitle: "Protezione e grip per sentieri impegnativi",
    price: 74.99,
    originalPrice: 114.99,
    category: "trekking",
    description:
      "La Trekking Mountain Pro è la compagna ideale per escursioni su terreni impegnativi. Suola in gomma ad alta aderenza, protezione alla caviglia e membrana impermeabile per affrontare ogni condizione meteo.",
    features: [
      "Suola in gomma ad alta aderenza",
      "Membrana impermeabile traspirante",
      "Protezione caviglia rinforzata",
      "Puntale anti-urto",
    ],
    color: "#78350f",
    accentColor: "#d97706",

    soldOut: true,
    image: "/images/catalogo/10.jpg",
  },
  {
    slug: "sentiero-explorer-lite",
    name: "Sentiero Explorer Lite",
    subtitle: "Leggerezza e comfort per escursioni leggere",
    price: 59.99,
    originalPrice: 89.99,
    category: "trekking",
    description:
      "La Sentiero Explorer Lite è perfetta per escursioni giornaliere e passeggiate nella natura. Ultra leggera ma resistente, con suola a tasselli profondi e ammortizzazione per camminare ore senza affaticarsi.",
    features: [
      "Ultra leggera: solo 340g",
      "Suola a tasselli profondi",
      "Ammortizzazione per lunghe distanze",
      "Tessuto resistente agli strappi",
    ],
    color: "#365314",
    accentColor: "#84cc16",

    soldOut: true,
    image: "/images/catalogo/11.webp",
  },
  {
    slug: "outdoor-allterrain-gtx",
    name: "Outdoor AllTerrain GTX",
    subtitle: "Impermeabile e resistente per ogni avventura",
    price: 69.99,
    originalPrice: 109.99,
    category: "trekking",
    description:
      "La Outdoor AllTerrain GTX è la calzatura definitiva per chi vive l'avventura tutto l'anno. Completamente impermeabile, con fodera termica e suola Vibram per la massima aderenza su roccia, fango e neve.",
    features: [
      "Completamente impermeabile",
      "Fodera termica per basse temperature",
      "Suola Vibram multi-terreno",
      "Sistema di allacciatura rapida",
    ],
    color: "#475569",
    accentColor: "#94a3b8",

    soldOut: true,
    image: "/images/catalogo/12.png",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const product = getProductBySlug(slug);
  if (!product) return products.slice(0, limit);
  return products
    .filter((p) => p.slug !== slug)
    .sort((a, b) =>
      a.category === product.category ? -1 : b.category === product.category ? 1 : 0
    )
    .slice(0, limit);
}

export function getProductsSorted(): Product[] {
  return [...products].sort((a, b) => {
    // Products with landing and not sold out come first
    const aActive = a.hasLanding && !a.soldOut ? 1 : 0;
    const bActive = b.hasLanding && !b.soldOut ? 1 : 0;
    if (aActive !== bActive) return bActive - aActive;
    // Then non-sold-out before sold-out
    if (a.soldOut !== b.soldOut) return a.soldOut ? 1 : -1;
    return 0;
  });
}

export function getFeaturedProducts(limit = 4): Product[] {
  return getProductsSorted().slice(0, limit);
}
