"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-stone-200/60">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <svg
            className="h-8 w-8 text-emerald-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="mt-4 font-serif text-xl font-semibold text-stone-900">
          Richiesta inviata
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-stone-600">
          Abbiamo elaborato la tua richiesta e risponderemo il piu&apos;
          presto possibile.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
        >
          Invia un&apos;altra richiesta
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200/60 sm:p-8"
    >
      <div className="space-y-5">
        {/* Nominativo */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-stone-700"
          >
            Nominativo <span className="text-emerald-600">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Mario Rossi"
            className="mt-1.5 block w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-stone-700"
          >
            Email <span className="text-emerald-600">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="mario@esempio.it"
            className="mt-1.5 block w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
          />
        </div>

        {/* Telefono */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-stone-700"
          >
            Numero di telefono{" "}
            <span className="text-stone-400">(facoltativo)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+39 333 1234567"
            className="mt-1.5 block w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
          />
        </div>

        {/* Richiesta */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-stone-700"
          >
            Richiesta <span className="text-emerald-600">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Descrivi la tua richiesta..."
            className="mt-1.5 block w-full resize-y rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
          />
        </div>
      </div>

      {/* Info resi */}
      <div className="mt-5 flex gap-2.5 rounded-lg bg-emerald-50 p-3.5">
        <svg
          className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
        <p className="text-xs leading-relaxed text-emerald-800">
          Per richieste di <strong>reso o rimborso</strong>, utilizza questo
          modulo indicando il numero d&apos;ordine e i dettagli del prodotto.
          Ti risponderemo con tutte le istruzioni necessarie.
        </p>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-emerald-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30"
      >
        Invia Richiesta
      </button>
    </form>
  );
}
