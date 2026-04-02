import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import logo3d from "@/assets/logo-3d-services.png";

const serviceLinks = [
  { label: "Débarras", href: "/services/debarras" },
  { label: "Démolition", href: "/services/demolition" },
  { label: "Désamiantage", href: "/services/desamiantage" },
  { label: "Nettoyage", href: "/services/nettoyage" },
];

const pageLinks = [
  { label: "Accueil", href: "/" },
  { label: "Qui sommes-nous", href: "/qui-sommes-nous" },
  { label: "Devis gratuit", href: "/devis" },
  { label: "Avis clients", href: "/avis-clients" },
  { label: "Contact", href: "/contact" },
];

const Footer = () => (
  <footer className="gradient-primary py-16 relative">
    <div className="container relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col 1 */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src={logo3d} alt="3D Services" className="h-10 w-auto brightness-0 invert" />
          </Link>
          <p className="text-sm text-primary-foreground/60 mb-4">
            Débarras & Nettoyage à Lyon et région depuis 2015
          </p>
          <div className="flex gap-3">
            <a href="https://wa.me/33609991736" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
              <MessageCircle className="w-4 h-4 text-primary-foreground" />
            </a>
            <a href="tel:0609991736" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
              <Phone className="w-4 h-4 text-primary-foreground" />
            </a>
            <a href="mailto:3dservicefrance@gmail.com" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
              <Mail className="w-4 h-4 text-primary-foreground" />
            </a>
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="text-sm font-display font-semibold text-primary-foreground mb-4 uppercase tracking-wider">
            Services
          </h4>
          <ul className="space-y-2.5">
            {serviceLinks.map((s) => (
              <li key={s.label}>
                <Link to={s.href} className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="text-sm font-display font-semibold text-primary-foreground mb-4 uppercase tracking-wider">
            Pages
          </h4>
          <ul className="space-y-2.5">
            {pageLinks.map((p) => (
              <li key={p.label}>
                <Link to={p.href} className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="text-sm font-display font-semibold text-primary-foreground mb-4 uppercase tracking-wider">
            Contact
          </h4>
          <div className="space-y-3 text-sm text-primary-foreground/60">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0" />Lyon et région — 200km
            </p>
            <a href="tel:0609991736" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Phone className="w-4 h-4 shrink-0" />06 09 99 17 36
            </a>
            <a href="mailto:3dservicefrance@gmail.com" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Mail className="w-4 h-4 shrink-0" />3dservicefrance@gmail.com
            </a>
            <a href="https://wa.me/33609991736" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <MessageCircle className="w-4 h-4 shrink-0" />WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="mt-12 pt-8 border-t border-gold/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/40">
          <span>© 2015–2026 3D Services — Tous droits réservés</span>
          <div className="flex gap-4">
            <Link to="/mentions-legales" className="hover:text-primary-foreground/60 transition-colors">Mentions légales</Link>
            <Link to="/politique-de-confidentialite" className="hover:text-primary-foreground/60 transition-colors">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
