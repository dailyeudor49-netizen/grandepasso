const testimonials = [
  {
    name: "Claudia F.",
    location: "Torino",
    rating: 5,
    title: "Finalmente comode davvero!",
    text: "Ho provato tante scarpe ma queste sono su un altro livello. Lavoro in piedi 8 ore e finalmente arrivo a fine giornata senza stanchezza. Qualità top.",
    product: "AureaStep Pro",
    date: "2 settimane fa",
  },
  {
    name: "Roberto M.",
    location: "Napoli",
    rating: 5,
    title: "Consigliate dal posturologo",
    text: "Cercavo scarpe con un supporto plantare serio, consigliate dal mio posturologo. Queste superano ogni aspettativa, comfort e sostegno incredibili.",
    product: "OrthoStep Pro",
    date: "1 mese fa",
  },
  {
    name: "Silvia B.",
    location: "Bologna",
    rating: 5,
    title: "Comfort ed eleganza insieme",
    text: "Cercavo scarpe comode per camminare che fossero anche belle. Con queste non devo più scegliere tra estetica e benessere. Le uso tutti i giorni, consigliatissime.",
    product: "AureaCloud",
    date: "3 settimane fa",
  },
  {
    name: "Marco L.",
    location: "Milano",
    rating: 5,
    title: "Spedizione velocissima",
    text: "Ordinate lunedì, arrivate mercoledì. Pagamento alla consegna comodissimo. Le scarpe sono perfette, morbide e con un supporto fantastico. Riordinerò sicuramente.",
    product: "LuxeStep Pro",
    date: "1 settimana fa",
  },
  {
    name: "Francesca T.",
    location: "Roma",
    rating: 5,
    title: "Perfette per i miei problemi ai piedi",
    text: "Soffro di fascite plantare e queste scarpe mi hanno cambiato la vita. Niente più dolore alla fine della giornata. Investimento che vale ogni centesimo.",
    product: "SnellaWalk 360",
    date: "2 settimane fa",
  },
  {
    name: "Andrea P.",
    location: "Firenze",
    rating: 5,
    title: "Assistenza clienti eccellente",
    text: "Avevo dubbi sulla taglia, mi hanno risposto su WhatsApp in 5 minuti e consigliato perfettamente. Scarpe comodissime e servizio impeccabile. Consigliatissimo!",
    product: "CloudStep",
    date: "4 giorni fa",
  },
];

export default function TestimonialsSection() {
  const averageRating = 4.9;
  const totalReviews = 2847;

  return (
    <section className="bg-stone-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with Aggregated Rating */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 sm:text-sm">
            Recensioni Verificate
          </p>
          <h2 className="mt-2 text-2xl font-bold text-stone-900 sm:mt-3 sm:text-4xl lg:text-5xl">
            Cosa Dicono i Nostri Clienti
          </h2>

          {/* Rating Summary */}
          <div className="mx-auto mt-6 flex max-w-md flex-col items-center gap-3 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-6 w-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div>
              <p className="text-3xl font-extrabold text-stone-900">{averageRating}/5</p>
              <p className="mt-1 text-sm text-stone-500">
                Basato su <strong>{totalReviews.toLocaleString()}</strong> recensioni
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg"
            >
              {/* Header: Stars + Date */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-stone-400">{t.date}</span>
              </div>

              {/* Title */}
              <h3 className="mb-2 text-base font-bold text-stone-900">
                {t.title}
              </h3>

              {/* Review Text */}
              <p className="mb-4 flex-1 text-sm leading-relaxed text-stone-600">
                {t.text}
              </p>

              {/* Footer: User + Badge */}
              <div className="border-t border-stone-100 pt-4">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-serif text-sm font-bold text-blue-700">
                    {t.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-stone-900">
                      {t.name}
                      <svg className="ml-1 inline h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </p>
                    <p className="text-xs text-stone-500">{t.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Acquisto verificato
                  </span>
                  <span className="text-xs text-stone-400">• {t.product}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
