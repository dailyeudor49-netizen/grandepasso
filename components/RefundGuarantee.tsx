interface RefundGuaranteeProps {
  accentColor: string;
}

export default function RefundGuarantee({ accentColor }: RefundGuaranteeProps) {
  return (
    <div className="mt-4 rounded-[14px] border border-[#E2E4E8] bg-white p-4 shadow-[0_1px_3px_rgba(26,25,23,0.04)]">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[#EEF1F7]">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" style={{ color: accentColor }}>
            <path
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <h3 className="mb-1 text-[15px] font-bold text-[#1A1917]">Garanzia soddisfatto o rimborsato — 30 giorni</h3>
          <p className="text-[13px] leading-[1.65] text-[#5A5752]">
            Non sei soddisfatto? Scrivi a{" "}
            <a href="mailto:supporto@grandepasso.it" className="underline" style={{ color: accentColor }}>
              supporto@grandepasso.it
            </a>{" "}
            entro 30 giorni. Ritiriamo noi il pacco e il rimborso è immediato. <strong>Zero rischi.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
