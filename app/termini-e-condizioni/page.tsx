import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termini e Condizioni - Grande Passo Calzature",
  description: "Termini e condizioni d'uso del sito Grande Passo Calzature.",
};

export default function TerminiPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          Termini e Condizioni
        </h1>
        <p className="mt-4 text-sm text-stone-500">
          Ultimo aggiornamento: Gennaio 2025
        </p>

        <div className="mt-8 space-y-8 text-base leading-relaxed text-stone-600">
          <section>
            <h2 className="text-xl font-semibold text-stone-900">1. Premessa</h2>
            <p className="mt-3">
              Grande Passo Calzature S.r.l. (P.IVA 05793572339), con sede legale in
              Via Garibaldi 45, 50123 Firenze (FI), e&apos; un negozio online
              specializzato nella vendita di calzature comfort e benessere.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900">2. Natura del servizio</h2>
            <p className="mt-3">
              I prodotti presentati su questo sito sono venduti direttamente
              da Grande Passo Calzature S.r.l. I prezzi indicati sono comprensivi di IVA.
              La disponibilita&apos; dei prodotti e&apos; soggetta a variazione.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900">3. Ordini e pagamenti</h2>
            <p className="mt-3">
              Gli ordini vengono confermati tramite WhatsApp o telefono. Il
              pagamento avviene in contanti alla consegna. La spedizione e&apos;
              gratuita su tutti gli ordini tramite corriere espresso GLS.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900">4. Proprieta&apos; intellettuale</h2>
            <p className="mt-3">
              Tutti i contenuti del sito (testi, grafica, layout) sono di
              proprieta&apos; di Grande Passo Calzature S.r.l. e sono protetti dalle leggi
              sul diritto d&apos;autore. E&apos; vietata la riproduzione senza
              autorizzazione.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900">5. Legge applicabile</h2>
            <p className="mt-3">
              I presenti termini sono regolati dalla legge italiana. Per
              qualsiasi controversia sara&apos; competente il Foro di Firenze.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
