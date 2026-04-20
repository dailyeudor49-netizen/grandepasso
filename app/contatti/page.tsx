import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contatti - Grande Passo Calzature",
  description: "Contattaci per informazioni sulle nostre calzature italiane comfort e benessere.",
};

export default function ContattiPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
            Siamo qui per te
          </p>
          <h1 className="mt-3 text-3xl font-bold text-stone-900 sm:text-4xl">
            Contattaci
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-stone-500">
            Hai domande sui nostri prodotti o hai bisogno di assistenza?
            Non esitare a contattarci.
          </p>
        </div>

        <div className="mt-12">
          <ContactForm />
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200/60">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h3 className="mt-4 font-serif text-lg font-semibold text-stone-900">Email</h3>
            <p className="mt-2 text-sm text-stone-500">Scrivici per qualsiasi domanda o richiesta di informazioni.</p>
            <p className="mt-3 text-sm font-medium text-emerald-600">info@grandepasso.it</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200/60">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mt-4 font-serif text-lg font-semibold text-stone-900">Orari di assistenza</h3>
            <p className="mt-2 text-sm text-stone-500">Il nostro team risponde nelle seguenti fasce orarie.</p>
            <p className="mt-3 text-sm font-medium text-stone-700">Lun - Ven: 9:00 - 18:00</p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-center text-2xl font-bold text-stone-900">Domande Frequenti</h2>
          <div className="mt-8 space-y-6">
            {[
              {
                q: "Come funziona l'acquisto?",
                a: "Scegli il prodotto, seleziona la taglia e completa l'ordine. Puoi pagare comodamente in contanti alla consegna. La spedizione con GLS è gratuita.",
              },
              {
                q: "Le scarpe offrono davvero supporto?",
                a: "Sì, tutti i prodotti sono sviluppati in collaborazione con ortopedici e posturologi per garantire comfort e benessere reali.",
              },
              {
                q: "Posso effettuare un reso?",
                a: "Certo, hai 30 giorni dalla consegna per richiedere un reso. Contattaci via email o WhatsApp e ti invieremo le istruzioni per la restituzione gratuita.",
              },
            ].map((faq) => (
              <div key={faq.q} className="rounded-xl bg-stone-50 p-5">
                <h3 className="font-semibold text-stone-900">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
