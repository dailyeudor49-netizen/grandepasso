import Link from "next/link";
import Logo from "./Logo";

const footerLinks = {
  shop: [
    { href: "/catalogo", label: "Catalogo" },
    { href: "/catalogo", label: "Novità" },
    { href: "/catalogo", label: "Offerte" },
  ],
  info: [
    { href: "/contatti", label: "Contatti" },
    { href: "/politica-resi", label: "Resi e Rimborsi" },
    { href: "/contatti", label: "FAQ" },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/termini-e-condizioni", label: "Termini e Condizioni" },
    { href: "/politica-resi", label: "Politica Resi" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <Logo />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-stone-500">
              Il lusso del comfort. Calzature eleganti che valorizzano
              il benessere dei tuoi piedi con stile e qualità superiore.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
              Shop
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-500 transition-colors hover:text-blue-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
              Informazioni
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.info.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-500 transition-colors hover:text-blue-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-900">
              Legale
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-500 transition-colors hover:text-blue-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-stone-200 pt-6 text-center space-y-1">
          <p className="text-xs text-stone-400">
            &copy; {new Date().getFullYear()} Piede Luxe S.r.l. &mdash; Tutti i diritti riservati.
          </p>
          <p className="text-xs text-stone-400">
            Via Manzoni 21, 20121 Milano (MI) &middot; P.IVA 05793577488 &middot; REA MI-1847362 &middot; Cap. Soc. &euro;10.000 i.v.
          </p>
        </div>
      </div>
    </footer>
  );
}
