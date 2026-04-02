import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

const services = [
  { emoji: "🏠", title: "Débarras", desc: "Maison, appartement, cave, grenier, succession — évacuation complète et responsable.", href: "/services/debarras" },
  { emoji: "🔨", title: "Démolition", desc: "Démolition intérieure et extérieure, cloisons, murs, sols — préparation de chantier.", href: "/services/demolition" },
  { emoji: "⚠️", title: "Désamiantage", desc: "Retrait d'amiante certifié, diagnostic et traitement conforme à la réglementation.", href: "/services/desamiantage" },
  { emoji: "✨", title: "Nettoyage", desc: "Nettoyage professionnel, fin de chantier, locaux, Diogène — remise en état complète.", href: "/services/nettoyage" },
];

const ServicesGrid = () => (
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
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={s.href}
                className="group flex flex-col items-center text-center p-6 rounded-xl border border-border bg-card hover:shadow-premium hover:-translate-y-1 transition-all duration-200 h-full"
              >
                <span className="text-5xl mb-4">{s.emoji}</span>
                <h3 className="font-bold text-[15px] text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-[13px] leading-relaxed mb-4 flex-1">{s.desc}</p>
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

export default ServicesGrid;
