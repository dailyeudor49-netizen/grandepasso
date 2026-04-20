const features = [
  {
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: "Spedizione Gratuita",
    desc: "Consegna in 24-48h",
  },
  {
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Comfort Certificato",
    desc: "Validato da specialisti",
  },
  {
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: "Benessere Reale",
    desc: "Comfort tutto il giorno",
  },
  {
    icon: (
      <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
    title: "Pagamenti Sicuri",
    desc: "Transazioni protette",
  },
];

export default function FeaturesBar() {
  return (
    <section className="border-y border-stone-200 bg-white">
      <div className="mx-auto max-w-7xl px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center gap-1.5 text-center sm:flex-row sm:gap-2 sm:text-left"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 sm:h-12 sm:w-12">
                {feature.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-stone-900 sm:text-sm">
                  {feature.title}
                </p>
                <p className="text-[10px] text-stone-500 sm:text-xs">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
