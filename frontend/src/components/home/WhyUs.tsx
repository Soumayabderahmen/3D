import { Phone, Camera, FileText, CalendarCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";

const steps = [
  { icon: Phone, title: "Vous appelez", desc: "Ou remplissez le formulaire en ligne" },
  { icon: Camera, title: "Estimation gratuite", desc: "Sur place ou sur photos" },
  { icon: FileText, title: "Devis en 2h", desc: "Reçu par email, clair et détaillé" },
  { icon: CalendarCheck, title: "Intervention planifiée", desc: "Selon votre agenda" },
  { icon: Sparkles, title: "Local impeccable", desc: "Satisfaction garantie" },
];

const WhyUs = () => (
  <section className="py-20 gradient-primary relative overflow-hidden">
    <div className="absolute inset-0 noise-overlay" />
    <SectionReveal>
      <div className="container relative z-10">
        <div className="text-center mb-14">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-primary-foreground mb-3">
            Pourquoi choisir 3D Services ?
          </h2>
          <p className="text-primary-foreground/60 max-w-lg mx-auto">
            Un processus simple et transparent, du premier appel au résultat final
          </p>
        </div>

        <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative min-w-[220px] snap-center flex-shrink-0 lg:min-w-0"
            >
              <div className="glass rounded-2xl p-6 text-center h-full">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-6 h-6 text-secondary" />
                </div>
                <div className="text-xs font-bold text-gold mb-2">0{i + 1}</div>
                <h3 className="font-display font-bold text-sm text-primary-foreground mb-1">{s.title}</h3>
                <p className="text-xs text-primary-foreground/60">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-primary-foreground/20" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  </section>
);

export default WhyUs;
