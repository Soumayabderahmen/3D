import { motion } from "framer-motion";
import { Phone, CheckCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const badges = [
  "Devis gratuit",
  "Intervention immédiate",
  "Éco-responsable",
];

const HeroSection = () => (
  <section
    id="accueil"
    className="relative min-h-[85vh] flex items-center overflow-hidden"
  >
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    />
    <div className="absolute inset-0 bg-background/85" />

    <div className="container relative z-10 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="max-w-2xl"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight text-balance">
          Débarras & Nettoyage à Lyon — Intervention Rapide
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
          Appartement, maison, cave, grenier, succession… Devis gratuit en 2h, intervention 7j/7.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg bg-accent text-accent-foreground font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Demander un devis gratuit
          </a>
          <a
            href="tel:0609991736"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <Phone className="w-4 h-4" />
            Appeler : 06 09 99 17 36
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          {badges.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface text-muted-foreground text-sm font-medium"
            >
              <CheckCircle className="w-4 h-4 text-accent" />
              {b}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
