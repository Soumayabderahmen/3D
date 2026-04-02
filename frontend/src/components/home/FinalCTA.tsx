import { Link } from "react-router-dom";
import { ArrowRight, Phone, Shield, Zap, Star } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

const FinalCTA = () => (
  <section className="py-24 gradient-primary relative overflow-hidden">
    <div className="absolute inset-0 noise-overlay" />
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-accent/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
    </div>

    <SectionReveal>
      <div className="container relative z-10 text-center">
        <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-primary-foreground mb-6">
          Prêt à libérer votre espace ?
        </h2>
        <p className="text-lg text-primary-foreground/70 max-w-xl mx-auto mb-10">
          Devis gratuit en 2h • Intervention rapide • Résultat garanti
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link
            to="/devis"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-secondary text-secondary-foreground font-bold text-base hover:bg-secondary/90 hover:-translate-y-0.5 transition-all shadow-lg"
          >
            Demander un devis gratuit
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="tel:0609991736"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-primary-foreground/30 text-primary-foreground font-bold text-base hover:bg-primary-foreground/10 transition-colors"
          >
            <Phone className="w-5 h-5" />
            06 09 99 17 36
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/60">
          <span className="flex items-center gap-1.5"><Shield className="w-4 h-4" />Sans engagement</span>
          <span className="flex items-center gap-1.5"><Zap className="w-4 h-4" />Réponse en 2h</span>
          <span className="flex items-center gap-1.5"><Star className="w-4 h-4" />99% satisfaits</span>
        </div>
      </div>
    </SectionReveal>
  </section>
);

export default FinalCTA;
