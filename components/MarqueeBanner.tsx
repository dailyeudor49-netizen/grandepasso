const items = [
  "SPEDIZIONE GRATUITA",
  "RESO ENTRO 30 GIORNI",
  "BENESSERE GARANTITO",
  "POSTURA E COMFORT",
  "PAGAMENTI SICURI",
  "MADE IN ITALY",
];

export default function MarqueeBanner() {
  return (
    <div className="overflow-hidden bg-stone-900 py-2">
      <div className="animate-marquee flex w-max whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="mx-4 flex items-center gap-1.5 text-[10px] font-medium tracking-widest text-stone-300 sm:mx-6 sm:text-xs">
            <span className="h-1 w-1 shrink-0 rounded-full bg-blue-400" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
