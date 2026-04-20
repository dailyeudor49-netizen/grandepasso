import Link from "next/link";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/home/benessere.webp"
                alt="Grande Passo Calzature - Comfort e Benessere"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-4 -right-2 rounded-xl bg-white p-4 shadow-xl ring-1 ring-stone-200/60 sm:-right-6 sm:p-5">
              <p className="text-2xl font-bold text-emerald-600 sm:text-3xl">10+</p>
              <p className="text-[10px] font-medium text-stone-500 sm:text-xs">
                Anni di esperienza
              </p>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 sm:text-sm">
              La Nostra Storia
            </p>
            <h2 className="mt-2 text-2xl font-bold text-stone-900 sm:mt-3 sm:text-4xl lg:text-5xl">
              Grande Passo — Tradizione Italiana dal 2014
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-stone-600 sm:mt-6 sm:text-base">
              Con <strong>oltre 10 anni di esperienza</strong> nel settore calzaturiero italiano, Grande Passo è nata dalla passione per il benessere dei piedi e dalla convinzione che comfort ed eleganza non debbano mai essere un compromesso.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:mt-4 sm:text-base">
              Ogni modello che selezioniamo viene testato personalmente dal nostro team. Scegliamo solo calzature che rispettano la biomeccanica naturale del passo, con materiali premium e design ortopedici certificati. <strong>Quando i piedi stanno bene, tutto il corpo ringrazia.</strong>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:mt-4 sm:text-base">
              Oggi serviamo con orgoglio oltre <strong>15.000 clienti soddisfatti</strong> in tutta Italia, offrendo spedizione gratuita, pagamento alla consegna e un'assistenza dedicata che ti segue prima, durante e dopo l'acquisto.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8 sm:gap-6">
              {[
                { value: "10+", label: "Anni di esperienza" },
                { value: "15k+", label: "Clienti felici" },
                { value: "4.9/5", label: "Rating medio" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-xl font-bold text-emerald-600 sm:text-2xl">{stat.value}</p>
                  <p className="text-[10px] text-stone-500 sm:text-xs">{stat.label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/catalogo"
              className="mt-6 inline-flex items-center rounded-full bg-stone-900 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-stone-800 sm:mt-8 sm:px-6 sm:py-3 sm:text-sm"
            >
              Scopri le soluzioni
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
