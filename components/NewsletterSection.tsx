"use client";

import { useState, type FormEvent } from "react";

export default function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="border-y border-stone-200 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-bold text-stone-900 sm:text-3xl">
            Consigli per il tuo benessere
          </h2>
          <p className="mt-2 text-xs text-stone-500 sm:mt-3 sm:text-sm">
            Iscriviti alla newsletter per consigli sul benessere, offerte esclusive e novita&apos; dal nostro store.
          </p>

          {submitted ? (
            <div className="mt-5 rounded-xl bg-blue-50 p-3 sm:mt-6 sm:p-4">
              <p className="text-xs font-medium text-blue-800 sm:text-sm">
                Grazie per l&apos;iscrizione! Ti terremo aggiornato.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-center"
            >
              <input
                type="email"
                required
                placeholder="La tua email"
                className="w-full rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none sm:w-80 sm:px-5 sm:py-3"
              />
              <button
                type="submit"
                className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 sm:px-8 sm:py-3"
              >
                Iscriviti
              </button>
            </form>
          )}

          <p className="mt-3 text-[10px] text-stone-400 sm:mt-4 sm:text-xs">
            Niente spam, promesso. Puoi disiscriverti in qualsiasi momento.
          </p>
        </div>
      </div>
    </section>
  );
}
