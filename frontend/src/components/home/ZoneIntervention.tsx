import { motion } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";

const departments = [
  "Rhône (69)", "Ain (01)", "Isère (38)", "Loire (42)",
  "Saône-et-Loire (71)", "Drôme (26)", "Ardèche (07)", "Haute-Savoie (74)",
];

const ZoneIntervention = () => (
  <section className="py-20 bg-surface">
    <SectionReveal>
      <div className="container text-center">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
          Nous intervenons dans un rayon de 200km autour de Lyon
        </h2>
        <p className="text-muted-foreground mb-10 max-w-md mx-auto">
          Lyon et les départements de la région
        </p>

        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
          {departments.map((d, i) => (
            <motion.span
              key={d}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(27,79,216,0.2)" }}
              className="px-5 py-2.5 rounded-full bg-card border border-border text-sm font-medium text-foreground shadow-card cursor-default hover:border-primary-accent transition-colors"
            >
              {d}
            </motion.span>
          ))}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          Lyon et toutes les communes dans un rayon de 200km
        </p>
      </div>
    </SectionReveal>
  </section>
);

export default ZoneIntervention;
