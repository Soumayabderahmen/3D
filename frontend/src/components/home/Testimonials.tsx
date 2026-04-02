import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";

const reviews = [
  { name: "Nicolas S.", city: "Paris (75)", type: "Débarras appartement", text: "Professionnalisme irréprochable, tarif compétitif, travail dans les délais. Je recommande sans hésiter." },
  { name: "Philippe D.", city: "Val-de-Marne (94)", type: "Débarras maison", text: "Aucune surprise à la fin, conforme au devis. Équipe discrète, courtoise et efficace." },
  { name: "David C.", city: "Paris (75)", type: "Débarras bureaux", text: "Ils se sont parfaitement adaptés à mes contraintes. Service top lors de leurs deux interventions." },
  { name: "Bernard A.", city: "Paris (75)", type: "Syndrome de Diogène", text: "Travail difficile réalisé dans les délais, avec efficacité et soin. Satisfaction totale." },
  { name: "Irénée-Gilles M.", city: "Yvelines (78)", type: "Succession", text: "Ponctualité, sérieux, équipe très bien organisée. Je recommande totalement." },
];

const colors = ["bg-primary-accent", "bg-secondary", "bg-gold", "bg-destructive/70", "bg-primary"];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % reviews.length), []);
  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section className="py-20 bg-surface">
      <SectionReveal>
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
              Ce que disent nos clients
            </h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gold fill-gold" />
              ))}
            </div>
            <p className="text-muted-foreground">4.9 / 5 basé sur 200+ avis</p>
          </div>

          <div
            className="relative max-w-2xl mx-auto"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="bg-card rounded-2xl p-8 shadow-premium text-center"
              >
                <div className={`w-14 h-14 rounded-full ${colors[current]} flex items-center justify-center mx-auto mb-5`}>
                  <span className="text-xl font-bold text-primary-foreground">
                    {reviews[current].name.charAt(0)}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-foreground text-lg leading-relaxed mb-6 italic">
                  "{reviews[current].text}"
                </p>
                <p className="font-display font-bold text-foreground">{reviews[current].name}</p>
                <p className="text-sm text-muted-foreground">
                  {reviews[current].city} — {reviews[current].type}
                </p>
              </motion.div>
            </AnimatePresence>

            <button onClick={prev} className="absolute top-1/2 -left-4 -translate-y-1/2 w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center hover:bg-muted transition-colors hidden md:flex">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button onClick={next} className="absolute top-1/2 -right-4 -translate-y-1/2 w-10 h-10 rounded-full bg-card shadow-card flex items-center justify-center hover:bg-muted transition-colors hidden md:flex">
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all ${i === current ? "w-8 bg-primary-accent" : "w-3 bg-border"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
};

export default Testimonials;
