import { Bath, Hammer, Wind } from "lucide-react";
import SectionReveal from "./SectionReveal";

const services = [
  { icon: Bath, title: "Nettoyage Appartement Paris", desc: "Nettoyage complet de votre appartement, du sol au plafond." },
  { icon: Hammer, title: "Nettoyage Fin de Chantier", desc: "Remise en état après travaux, prêt à emménager." },
  { icon: Wind, title: "Nettoyage Diogène", desc: "Prise en charge des cas extrêmes avec discrétion et efficacité." },
];

const ServicesNettoyage = () => (
  <section className="py-20 bg-background">
    <div className="container">
      <SectionReveal>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-center">
          Nos services de nettoyage
        </h2>
        <p className="mt-4 text-muted-foreground text-center max-w-xl mx-auto">
          Un nettoyage professionnel pour retrouver un intérieur impeccable.
        </p>
      </SectionReveal>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {services.map((s) => (
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

export default ServicesNettoyage;
