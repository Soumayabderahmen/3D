import { useState, useEffect, useRef } from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import { Star, ArrowRight, Quote } from "lucide-react";
import { motion } from "framer-motion";
import SectionReveal from "../components/SectionReveal";
import SEOHead from "../components/SEOHead";
import { getSEOForPath } from "../data/seo";


const reviews = [
  { name: "Nicolas S.", city: "Paris (75)", type: "Débarras", tag: "Débarras", date: "Mars 2026", text: "Professionnalisme irréprochable, tarif compétitif, travail dans les délais. Je recommande sans hésiter.", stars: 5 },
  { name: "Philippe D.", city: "Val-de-Marne (94)", type: "Débarras maison", tag: "Débarras", date: "Février 2026", text: "Aucune surprise à la fin, conforme au devis. Équipe discrète, courtoise et efficace.", stars: 5 },
  { name: "Bernard A.", city: "Paris (75)", type: "Syndrome de Diogène", tag: "Urgence", date: "Décembre 2025", text: "Travail difficile réalisé dans les délais, avec efficacité et soin. Satisfaction totale.", stars: 5 },
  { name: "Irénée-Gilles M.", city: "Yvelines (78)", type: "Succession", tag: "Succession", date: "Novembre 2025", text: "Ponctualité, sérieux, équipe très bien organisée. Je recommande totalement.", stars: 5 },
  { name: "Marie-Claire L.", city: "Essonne (91)", type: "Débarras cave", tag: "Débarras", date: "Octobre 2025", text: "Cave vidée en demi-journée. Propre, rapide, devis respecté.", stars: 5 },
  { name: "Laurent F.", city: "Paris (75)", type: "Encombrants", tag: "Débarras", date: "Septembre 2025", text: "Réponse rapide, intervention le lendemain. Super équipe.", stars: 5 },
  { name: "David C.", city: "Paris (75)", type: "Débarras bureaux", tag: "Pro", date: "Août 2025", text: "Ils se sont parfaitement adaptés à mes contraintes. Service top lors de leurs deux interventions.", stars: 5 },
  { name: "Sophie T.", city: "Seine-Saint-Denis (93)", type: "Vide maison", tag: "Succession", date: "Juillet 2025", text: "Service exceptionnel pour le vidage de la maison de mes parents. Discrétion et respect.", stars: 5 },
  { name: "François M.", city: "Val-d'Oise (95)", type: "Débarras garage", tag: "Débarras", date: "Juin 2025", text: "Équipe ponctuelle et professionnelle. Garage complètement vidé en une demi-journée.", stars: 5 },
  { name: "Camille R.", city: "Hauts-de-Seine (92)", type: "Nettoyage chantier", tag: "Pro", date: "Mai 2025", text: "Résultat impeccable après un gros chantier de rénovation. Je ferai de nouveau appel à eux.", stars: 5 },
  { name: "Jean-Pierre R.", city: "Paris (75)", type: "SOS Débarras", tag: "Urgence", date: "Avril 2025", text: "Intervention le jour même. Rapide, efficace et très bien organisé. Ma cave est méconnaissable !", stars: 5 },
  { name: "Hélène B.", city: "Seine-et-Marne (77)", type: "Succession", tag: "Succession", date: "Mars 2025", text: "Équipe très humaine et respectueuse dans un moment difficile. Merci pour votre empathie.", stars: 5 },
];

const filters = ["Tous", "Débarras", "Succession", "Urgence", "Pro"];
const colors = ["bg-primary-accent", "bg-secondary", "bg-gold", "bg-destructive/70", "bg-primary"];

const StatBar = ({ label, pct }: { label: string; pct: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.5 });
    ref.current && obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex items-center gap-3">
      <span className="text-sm text-primary-foreground/70 w-24 shrink-0">{label}</span>
      <div className="flex-1 h-3 rounded-full bg-primary-foreground/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gold"
          initial={{ width: 0 }}
          animate={visible ? { width: `${pct}%` } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <span className="text-sm font-bold text-primary-foreground w-10 text-right">{pct}%</span>
    </div>
  );
};

const Reviews = () => {
  const [filter, setFilter] = useState("Tous");
  const filtered = filter === "Tous" ? reviews : reviews.filter(r => r.tag === filter);

  return (
    <Layout>
      <SEOHead {...getSEOForPath("/avis")} canonical="/avis" />
      {/* Hero */}
      <section className="gradient-primary py-20 relative noise-overlay">
        <div className="container relative z-10 text-center">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-6 justify-center">
            <Link to="/" className="hover:text-primary-foreground/80 transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-primary-foreground">Avis Clients</span>
          </div>
          <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-primary-foreground mb-6">
            Ils nous font confiance
          </h1>
          <div className="flex items-center justify-center gap-2 mb-3">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.15, type: "spring" }}
              >
                <Star className="w-8 h-8 text-gold fill-gold" />
              </motion.div>
            ))}
          </div>
          <p className="text-3xl font-display font-bold text-primary-foreground">4.9 / 5</p>
          <p className="text-primary-foreground/60 mb-8">basé sur 200+ avis Google</p>

          {/* Stats bars */}
          <div className="max-w-md mx-auto space-y-2">
            <StatBar label="⭐⭐⭐⭐⭐" pct={92} />
            <StatBar label="⭐⭐⭐⭐" pct={6} />
            <StatBar label="⭐⭐⭐" pct={2} />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-surface border-b border-border">
        <div className="container flex justify-center gap-2 flex-wrap">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-primary-accent text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Reviews Grid */}
      <SectionReveal>
        <section className="py-16 bg-surface">
          <div className="container">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
              {filtered.map((r, i) => (
                <motion.div
                  key={r.name + r.type}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1 }}
                  className="break-inside-avoid bg-card rounded-2xl p-6 shadow-card border border-border"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full ${colors[i % colors.length]} flex items-center justify-center`}>
                      <span className="text-sm font-bold text-primary-foreground">{r.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-display font-bold text-sm text-foreground">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.city}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(r.stars)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-3">"{r.text}"</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{r.type}</span>
                    <span>{r.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Featured Testimonial */}
      <section className="gradient-primary py-16 noise-overlay">
        <div className="container relative z-10 max-w-3xl text-center">
          <Quote className="w-12 h-12 text-gold/30 mx-auto mb-4" />
          <p className="font-serif-display text-xl sm:text-2xl text-primary-foreground leading-relaxed mb-6">
            "Ponctualité, sérieux, équipe très bien organisée. Ils ont géré la succession de ma mère avec une empathie et un professionnalisme remarquables. Je recommande totalement."
          </p>
          <p className="text-gold font-display font-bold">Irénée-Gilles M.</p>
          <p className="text-primary-foreground/50 text-sm">Yvelines (78) — Succession</p>
        </div>
      </section>

      {/* CTA */}
      <SectionReveal>
        <section className="py-16 bg-card">
          <div className="container text-center">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-4">
              Rejoignez nos clients satisfaits
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Demandez votre devis gratuit et découvrez pourquoi plus de 1500 clients nous font confiance.
            </p>
            <Link to="/devis" className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-cta text-primary-foreground font-bold text-base shadow-glow hover:shadow-lg hover:-translate-y-0.5 transition-all shimmer">
              Demander un devis gratuit <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </SectionReveal>
    </Layout>
  );
};

export default Reviews;
