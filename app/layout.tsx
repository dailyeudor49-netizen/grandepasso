import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Piede Luxe - Comfort e Benessere per i Tuoi Piedi",
  description:
    "Calzature premium che uniscono stile e comfort. Design elegante, materiali di qualità e tecnologia avanzata per il benessere dei tuoi piedi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <div className="piedeluxe-top-banner bg-blue-700 py-2.5 px-4 text-center">
          <p className="text-xs font-bold tracking-wide text-white">
            SPEDIZIONE GRATUITA IN 24/48H &middot; RESO FACILE 30 GIORNI &middot; PAGA ALLA CONSEGNA
          </p>
        </div>
        <div className="piedeluxe-header">
          <Header />
        </div>
        <main className="min-h-screen">{children}</main>
        <div className="piedeluxe-footer">
          <Footer />
        </div>
      </body>
    </html>
  );
}
