import { Plus, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "../../components/SectionReveal";

const faqs = [
  {
    q: "Quels sont vos délais d'intervention ?",
    a: "Selon notre calendrier, nous pouvons intervenir le jour même de votre appel. En général, nous intervenons sous 72h après signature du devis.",
  },
  {
    q: "Comment profiter d'un débarras gratuit ?",
    a: "Si la valeur marchande de vos objets couvre les frais d'intervention, le débarras est entièrement gratuit. Contactez-nous pour évaluation.",
  },
  {
    q: "Quel est le prix d'un débarras à Lyon ?",
    a: "Entre 20 et 50€ le mètre cube selon le volume et l'accessibilité du lieu. Devis précis et gratuit sur simple demande ou envoi de photos.",
  },
  {
    q: "Dans quelles zones intervenez-vous ?",
    a: "Nous intervenons à Lyon et dans un rayon de 200km : Saint-Étienne, Grenoble, Valence, Annecy, Chambéry, Bourg-en-Bresse et toutes les communes alentours.",
  },
  {
    q: "Comment se déroule un débarras après décès ?",
    a: "Nous vous accompagnons avec discrétion et respect. Inventaire, tri, évacuation et nettoyage si besoin. Nous gérons tout pour vous alléger cette épreuve.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-card">
      <SectionReveal>
        <div className="container max-w-3xl">
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
              Questions fréquentes
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-display font-semibold text-foreground pr-4">{f.q}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? "bg-primary-accent text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      {isOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="px-5 pb-5 text-muted-foreground leading-relaxed">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
};

export default FAQ;
