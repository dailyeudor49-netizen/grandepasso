import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Grande Passo Calzature",
  description: "Informativa sulla privacy di Grande Passo Calzature.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-stone-500">
          Ultimo aggiornamento: Gennaio 2025
        </p>

        <div className="mt-8 space-y-8 text-base leading-relaxed text-stone-600">
          <section>
            <h2 className="text-xl font-semibold text-stone-900">1. Titolare del trattamento</h2>
            <p className="mt-3">
              Il titolare del trattamento dei dati personali e&apos; Grande Passo Calzature S.r.l.,
              con sede legale in Via Garibaldi 45, 50123 Firenze (FI), P.IVA
              05793572339, iscritta al Registro delle Imprese di Firenze con
              numero REA FI-1847362. Per qualsiasi informazione relativa al
              trattamento dei tuoi dati personali puoi scrivere a
              info@grandepasso.it o tramite la pagina Contatti.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900">2. Dati raccolti</h2>
            <p className="mt-3">
              Raccogliamo i dati personali che ci fornisci al momento
              dell&apos;ordine (nome, indirizzo, telefono) esclusivamente
              per la gestione della spedizione e dell&apos;assistenza clienti.
              I dati di navigazione (cookie tecnici) possono essere raccolti
              automaticamente per garantire il corretto funzionamento del sito.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900">3. Cookie</h2>
            <p className="mt-3">
              Utilizziamo esclusivamente cookie tecnici necessari per il
              funzionamento del sito. Non utilizziamo cookie di profilazione o
              di terze parti per scopi pubblicitari.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900">4. Condivisione dei dati</h2>
            <p className="mt-3">
              I tuoi dati personali vengono condivisi esclusivamente con il
              corriere GLS per la gestione della spedizione. Non vendiamo
              ne&apos; cediamo i tuoi dati a terze parti per scopi di marketing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900">5. Diritti dell&apos;utente</h2>
            <p className="mt-3">
              Ai sensi del GDPR (Regolamento UE 2016/679), hai il diritto di
              accedere, rettificare, cancellare i tuoi dati personali, nonche&apos;
              il diritto di limitare e opporti al trattamento. Per esercitare
              questi diritti, contattaci tramite la pagina Contatti.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-900">6. Modifiche alla policy</h2>
            <p className="mt-3">
              Ci riserviamo il diritto di aggiornare questa informativa in
              qualsiasi momento. Le modifiche saranno pubblicate su questa
              pagina con la data di aggiornamento.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
