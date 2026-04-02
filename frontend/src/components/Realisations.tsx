import SectionReveal from "./SectionReveal";
import real1 from "@/assets/realisation-1.jpg";
import real2 from "@/assets/realisation-2.jpg";
import real3 from "@/assets/realisation-3.jpg";

const missions = [
  { img: real1, title: "Nettoyage vitres crèche à Vigneux-sur-Seine (91)", date: "Février 2026" },
  { img: real2, title: "Débarras encombrants au 91", date: "Janvier 2026" },
  { img: real3, title: "Nettoyage fin de chantier à Brétigny-sur-Orge", date: "Décembre 2025" },
];

const Realisations = () => (
  <section id="realisations" className="py-20 bg-surface">
    <div className="container">
      <SectionReveal>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-center">
          Missions récentes
        </h2>
      </SectionReveal>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        {missions.map((m) => (
          <SectionReveal key={m.title}>
            <div className="bg-card rounded-xl overflow-hidden shadow-card hover:-translate-y-1 hover:shadow-premium transition-all duration-200">
              <img src={m.img} alt={m.title} className="w-full h-52 object-cover" loading="lazy" />
              <div className="p-6">
                <p className="text-xs text-muted-foreground font-medium mb-2">{m.date}</p>
                <h3 className="text-base font-semibold text-foreground leading-snug">{m.title}</h3>
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>
    </div>
  </section>
);

export default Realisations;
