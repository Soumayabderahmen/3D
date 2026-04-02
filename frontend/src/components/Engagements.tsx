import { Recycle, Zap, MessageSquare, Handshake } from "lucide-react";
import SectionReveal from "./SectionReveal";

const items = [
  { icon: Recycle, title: "Éco-responsable", desc: "Tri sélectif systématique, don d'objets récupérés aux associations." },
  { icon: Zap, title: "Rapidité", desc: "Intervention sous 24h à 48h, devis en 2h maximum." },
  { icon: MessageSquare, title: "Devis gratuit", desc: "Estimation transparente et sans engagement, réponse en moins de 2h." },
  { icon: Handshake, title: "Professionnalisme", desc: "Équipe formée, assurée et respectueuse de vos biens." },
];

const Engagements = () => (
  <section id="engagements" className="py-20 bg-surface">
    <div className="container">
      <SectionReveal>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-center">
          Nos engagements
        </h2>
      </SectionReveal>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item) => (
          <SectionReveal key={item.title}>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                <item.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
);

export default Engagements;
