const items = [
  "RESO 30 GIORNI",
  "SPEDIZIONE GRATUITA",
  "PAGAMENTO ALLA CONSEGNA",
  "ASSISTENZA ITALIANA",
];

export default function MarqueeBanner() {
  return (
    <div className="overflow-hidden bg-blue-700 py-2.5">
      <div className="animate-marquee flex w-max whitespace-nowrap">
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="mx-8 flex items-center gap-2 text-xs font-bold tracking-wide text-white sm:mx-10 sm:text-sm">
            <span className="text-white">·</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
