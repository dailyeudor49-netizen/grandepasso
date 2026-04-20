import Link from "next/link";
import Logo from "./Logo";

const footerLinks = {
  catalogo: [
    { href: "/catalogo?categoria=ortopediche", label: "Ortopediche" },
    { href: "/catalogo?categoria=posturali", label: "Posturali" },
    { href: "/catalogo?categoria=fitness", label: "Fitness" },
    { href: "/catalogo?categoria=trekking", label: "Trekking" },
  ],
  assistenza: [
    { href: "/contatti", label: "Contattaci" },
    { href: "/contatti", label: "FAQ" },
    { href: "/politica-resi", label: "Resi e Rimborsi" },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/termini-e-condizioni", label: "Termini e Condizioni" },
    { href: "/politica-resi", label: "Politica Resi" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-emerald-700">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Logo variant="white" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-emerald-100">
              Calzature italiane che uniscono comfort, postura e benessere. La qualità del Made in Italy per i tuoi piedi.
            </p>
          </div>

          {/* Catalogo */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Catalogo
            </h4>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.catalogo.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-emerald-100 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Assistenza */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Assistenza
            </h4>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.assistenza.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-emerald-100 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <p className="text-sm text-emerald-200">
                  <span className="font-semibold text-white">Orari:</span><br />
                  Lun-Ven 9:00-18:00
                </p>
              </li>
            </ul>
          </div>

          {/* Legale */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Legale
            </h4>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-emerald-100 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Contatti
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-emerald-100">
              <li>
                <a href="mailto:info@grandepasso.it" className="transition-colors hover:text-white">
                  info@grandepasso.it
                </a>
              </li>
              <li>
                Via Garibaldi 45<br />
                50123 Firenze (FI)
              </li>
              <li className="text-emerald-200">
                P.IVA 05793572339
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-emerald-600 pt-8 text-center">
          <p className="text-sm text-emerald-200">
            &copy; {new Date().getFullYear()} Grande Passo S.r.l. &mdash; Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
}
