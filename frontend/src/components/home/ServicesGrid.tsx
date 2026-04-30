import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionReveal from "../../components/SectionReveal";
import { useServiceConfig } from "../../types/services"; // ✅ import hook
const ServicesGrid = () => {
  const { services, loading, error } = useServiceConfig(); // ✅ data API

  if (loading) return null; // ou skeleton si tu veux
  if (error) return <p className="text-center">{error}</p>;
const iconEmojis: Record<string, string> = {
  Home: "🏠",
  Hammer: "🔨",
  AlertTriangle: "⚠️",
  Sparkles: "✨",
  // ... ajoute les tiens
};
  return (
    <section className="py-20 bg-card" id="services">
      <SectionReveal>
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
              Nos services professionnels
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Une offre claire pour les particuliers, les familles, les notaires et les professionnels.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/services/${s.slug}`} // ✅ dynamique
                  className="group flex flex-col items-center text-center p-6 rounded-xl border border-border bg-card hover:shadow-premium hover:-translate-y-1 transition-all duration-200 h-full"
                >
                  {/* ✅ ici on garde le style MAIS on injecte icon */}
                 <span className="text-5xl mb-4">
  {iconEmojis[s.icon] ?? s.icon}
</span>

                  <h3 className="font-bold text-[15px] text-foreground mb-2">
                    {s.title}
                  </h3>

                  <p className="text-muted-foreground text-[13px] leading-relaxed mb-4 flex-1">
                    {s.short_desc}
                  </p>

                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm font-medium text-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                    Découvrir <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
};

export default ServicesGrid;