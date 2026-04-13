import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

const serviceLinks = [
  "Débarras Appartement",
  "Vide Maison",
  "Débarras Succession",
  "Nettoyage Fin de Chantier",
  "SOS Débarras",
  "Nettoyage Diogène",
];

const zones = ["Paris (75)", "Hauts-de-Seine (92)", "Seine-Saint-Denis (93)", "Val-de-Marne (94)", "Essonne (91)", "Yvelines (78)"];

const Footer = () => (
  <footer className="bg-foreground py-16">
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Col 1 */}
        <div>
          <p className="text-xl font-black text-background tracking-tight">
            3D Services<span className="text-accent">.</span>
          </p>
          <div className="mt-6 space-y-3 text-sm text-background/70">
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4" />24 Avenue Joannés Masset, Lyon 69009</p>
            <a href="tel:0609991736" className="flex items-center gap-2 hover:text-background transition-colors"><Phone className="w-4 h-4" />06 09 99 17 36</a>
            <a href="mailto:3dservicefrance@gmail.com" className="flex items-center gap-2 hover:text-background transition-colors"><Mail className="w-4 h-4" />3dservicefrance@gmail.com</a>
            <a href="https://wa.me/33609991736" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-background transition-colors"><MessageCircle className="w-4 h-4" />WhatsApp</a>
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="text-sm font-semibold text-background mb-4">Services</h4>
          <ul className="space-y-2">
            {serviceLinks.map((s) => (
              <li key={s}>
                <a href="#services" className="text-sm text-background/70 hover:text-background transition-colors">{s}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="text-sm font-semibold text-background mb-4">Zones d'intervention</h4>
          <div className="flex flex-wrap gap-2">
            {zones.map((z) => (
              <span key={z} className="px-3 py-1 rounded-md text-xs text-background/70 border border-background/20">{z}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-background/10 text-center text-sm text-background/50">
        © 2026 3D Services. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default Footer;
