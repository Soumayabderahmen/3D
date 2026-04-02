import { Home, Building, Heart, Warehouse, Car, TreePine, Building2, FileText, Siren } from "lucide-react";
import SectionReveal from "./SectionReveal";

const services = [
  { icon: Home, title: "Débarras Appartement", desc: "Vidage complet ou partiel, Paris et Île-de-France." },
  { icon: Building, title: "Vide Maison", desc: "Du cave au grenier, meubles, déchets, encombrants." },
  { icon: Heart, title: "Débarras Succession", desc: "Accompagnement après décès, avec respect et discrétion." },
  { icon: Warehouse, title: "Débarras Cave & Grenier", desc: "Stockages anciens, objets oubliés, nettoyage inclus." },
  { icon: Car, title: "Débarras Box & Garage", desc: "Vidage de boxes, garages et parkings." },
  { icon: TreePine, title: "Débarras Jardin", desc: "Enlèvement déchets verts, mobilier extérieur." },
  { icon: Building2, title: "Encombrants Paris", desc: "Enlèvement encombrants particuliers et entreprises." },
  { icon: FileText, title: "Archives Entreprises", desc: "Évacuation et destruction sécurisée de documents." },
  { icon: Siren, title: "SOS Débarras", desc: "Intervention d'urgence, disponible 7j/7." },
];

const ServicesDebarras = () => (
  <section id="services" className="py-20 bg-surface">
    <div className="container">
      <SectionReveal>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-center">
          Nos services de débarras
        </h2>
        <p className="mt-4 text-muted-foreground text-center max-w-xl mx-auto">
          Des solutions adaptées à chaque situation, avec professionnalisme et rapidité.
        </p>
      </SectionReveal>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <SectionReveal key={s.title}>
            <div className="group bg-card rounded-xl p-8 shadow-card hover:-translate-y-1 hover:shadow-premium transition-all duration-200 cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center mb-4">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              <span className="mt-4 inline-block text-sm font-medium text-accent group-hover:underline">
                En savoir plus →
              </span>
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesDebarras;
