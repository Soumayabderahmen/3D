import SectionReveal from "./SectionReveal";

const departements = [
  "Rhône (69)", "Ain (01)", "Isère (38)", "Loire (42)",
  "Saône-et-Loire (71)", "Drôme (26)", "Ardèche (07)", "Haute-Savoie (74)",
];

const ZoneIntervention = () => (
  <section className="py-20 bg-background">
    <div className="container">
      <SectionReveal>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-center">
          Nous intervenons dans un rayon de 200km autour de Lyon
        </h2>
        <p className="mt-4 text-muted-foreground text-center max-w-xl mx-auto">
          Lyon et tous les départements de la région, pour les particuliers comme les professionnels.
        </p>
      </SectionReveal>

      <div className="mt-12 flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
        {departements.map((d) => (
          <span
            key={d}
            className="px-5 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:border-accent hover:text-accent transition-colors cursor-default"
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default ZoneIntervention;
