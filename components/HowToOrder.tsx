interface HowToOrderProps {
  accentColor: string;
}

export default function HowToOrder({ accentColor }: HowToOrderProps) {
  const steps = [
    { step: "1", title: "Scegli taglia e colore", desc: "Seleziona la tua misura EU. Se sei tra due taglie, scegli la più grande — calzata regolare." },
    { step: "2", title: "Clicca «Ordina ora»", desc: "Inserisci i dati di spedizione. Nessun pagamento anticipato, nessun account necessario." },
    { step: "3", title: "Ti chiamiamo o scriviamo", desc: "Ti contattiamo (Lun–Ven 9:00–17:00) per confermare l'ordine. Ordini del venerdì dopo le 17:00 → spediti lunedì." },
    { step: "4", title: "Ricevi e paga al corriere", desc: "Il pacco arriva in 24-48h con GLS Express. Spedizione gratuita, paghi in contanti al corriere." },
  ];

  return (
    <div className="mt-4 rounded-[14px] border border-[#E2E4E8] bg-white p-5 shadow-[0_1px_3px_rgba(26,25,23,0.04)]">
      <h3 className="mb-4 text-[18px] font-bold text-[#1A1917]">Come funziona l&apos;ordine?</h3>
      <div className="space-y-3">
        {steps.map((s) => (
          <div key={s.step} className="flex items-start gap-3">
            <div
              className="flex h-6 w-6 min-w-[24px] shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
              style={{ backgroundColor: accentColor }}
            >
              {s.step}
            </div>
            <div>
              <p className="mb-0.5 text-[14px] font-bold text-[#1A1917]">{s.title}</p>
              <p className="text-[13px] leading-[1.65] text-[#5A5752]">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
