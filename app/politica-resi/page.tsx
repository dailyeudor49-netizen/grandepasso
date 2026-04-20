import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica Resi - Grande Passo Calzature",
  description: "Informazioni sulla politica resi e rimborsi di Grande Passo Calzature.",
};

export default function PoliticaResiPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          Politica Resi e Rimborsi
        </h1>
        <p className="mt-4 text-sm text-stone-500">
          Ultimo aggiornamento: Gennaio 2025
        </p>

        <div className="mt-8 space-y-8 text-base leading-relaxed text-stone-600">
          <section>
            <h2 className="text-xl font-semibold text-stone-900">Garanzia soddisfatti o rimborsati</h2>
            <p className="mt-3">
              Grande Passo Calzature S.r.l. (P.IVA 05793572339, sede in Via Garibaldi 45,
              50123 Firenze) offre una garanzia di rimborso entro 30 giorni
              dalla consegna su tutti i prodotti acquistati sul nostro sito.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900">Diritto di recesso</h2>
            <p className="mt-3">
              Ai sensi del Codice del Consumo (D.Lgs. 206/2005), hai diritto
              di recedere dall&apos;acquisto entro 30 giorni dalla ricezione
              del prodotto, senza dover fornire alcuna motivazione.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900">Condizioni per il reso</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Il prodotto deve essere restituito integro e non utilizzato</li>
              <li>La confezione originale deve essere intatta</li>
              <li>Il reso deve essere richiesto entro 30 giorni dalla consegna</li>
              <li>Le spese di spedizione per il reso sono gratuite</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900">Come effettuare un reso</h2>
            <p className="mt-3">
              Per effettuare un reso, contatta il nostro servizio clienti
              scrivendo a info@grandepasso.it o tramite WhatsApp.
              Ti invieremo le istruzioni e l&apos;etichetta per la
              spedizione gratuita del reso.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900">Rimborsi</h2>
            <p className="mt-3">
              Il rimborso viene elaborato entro 14 giorni lavorativi dalla
              ricezione del reso, tramite bonifico bancario o sullo stesso
              metodo di pagamento utilizzato per l&apos;acquisto.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
