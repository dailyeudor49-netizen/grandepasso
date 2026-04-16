const testimonials = [
  {
    name: "Claudia F.",
    location: "Torino",
    rating: 5,
    text: "Ho provato tante scarpe ma queste sono su un altro livello. Lavoro in piedi 8 ore e finalmente arrivo a fine giornata senza stanchezza. Qualità top.",
    product: "Plantare Comfort Daily",
  },
  {
    name: "Roberto M.",
    location: "Napoli",
    rating: 5,
    text: "Cercavo scarpe con un supporto plantare serio, consigliate dal mio posturologo. Queste superano ogni aspettativa, comfort e sostegno incredibili.",
    product: "Ortho Sollievo Plus",
  },
  {
    name: "Silvia B.",
    location: "Bologna",
    rating: 5,
    text: "Cercavo scarpe comode per camminare che fossero anche belle. Con queste non devo più scegliere tra estetica e benessere. Le uso tutti i giorni, consigliatissime.",
    product: "Postura Active Walk",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-stone-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 sm:text-sm">
            Recensioni Verificate
          </p>
          <h2 className="mt-2 text-2xl font-bold text-stone-900 sm:mt-3 sm:text-4xl">
            I nostri clienti parlano
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200/60 sm:p-6"
            >
              <div className="flex gap-0.5">
                {[...Array(t.rating)].map((_, i) => (
                  <svg key={i} className="h-3.5 w-3.5 text-amber-400 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="mt-3 flex-1 text-xs leading-relaxed text-stone-600 sm:mt-4 sm:text-sm">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-4 sm:mt-6">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 font-serif text-xs font-bold text-blue-700 sm:h-10 sm:w-10 sm:text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-stone-900 sm:text-sm">{t.name}</p>
                    <p className="text-[10px] text-stone-500 sm:text-xs">{t.location}</p>
                  </div>
                </div>
                <span className="hidden rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-medium text-stone-500 sm:inline-block">
                  {t.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
