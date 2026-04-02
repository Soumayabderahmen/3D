import { Star } from "lucide-react";
import SectionReveal from "./SectionReveal";

const temoignages = [
  {
    name: "Marie Dupont",
    text: "Équipe très professionnelle et rapide. Mon appartement a été vidé en une demi-journée. Je recommande vivement !",
  },
  {
    name: "Jean-Pierre Martin",
    text: "Après le décès de ma mère, ils ont géré le débarras avec beaucoup de respect et d'humanité. Merci infiniment.",
  },
  {
    name: "Sophie Lambert",
    text: "Nettoyage fin de chantier impeccable. L'appartement était comme neuf, prêt pour les locataires. Service au top.",
  },
];

const Stars = () => (
  <div className="flex gap-0.5 mb-3">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
    ))}
  </div>
);

const Temoignages = () => (
  <section className="py-20 bg-background">
    <div className="container">
      <SectionReveal>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-center">
          Ce que disent nos clients
        </h2>
      </SectionReveal>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {temoignages.map((t) => (
          <SectionReveal key={t.name}>
            <div className="bg-card rounded-xl p-8 shadow-card">
              <Stars />
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">"{t.text}"</p>
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
);

export default Temoignages;
