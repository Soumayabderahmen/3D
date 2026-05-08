import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Clock, Shield, Recycle } from "lucide-react";
import SectionReveal from "../components/SectionReveal";
import Formulas from "../components/home/Formulas";
import ZoneIntervention from "../components/home/ZoneIntervention";
import FinalCTA from "../components/home/FinalCTA";
import SEOHead from "../components/SEOHead";
import { getSEOForPath } from "../data/seo";
import { useServicesHome } from "../hooks/useServiceHome";
import { useSubServices } from "../hooks/useSubServices";

const engagements = [
  { icon: Zap,     title: "Rapidité",           desc: "Intervention sous 24h à 48h" },
  { icon: Clock,   title: "Devis gratuit en 2h", desc: "Réponse rapide et sans engagement" },
  { icon: Recycle, title: "Éco-responsable",     desc: "Tri sélectif, don, recyclage" },
  { icon: Shield,  title: "Discrétion",          desc: "Respect total pour les successions" },
];

const processSteps = [
  { step: "01", title: "Vous appelez",  desc: "Ou remplissez le formulaire de devis" },
  { step: "02", title: "Estimation",    desc: "Visite ou estimation sur photos (gratuit)" },
  { step: "03", title: "Devis en 2h",   desc: "Devis détaillé reçu par email" },
  { step: "04", title: "Intervention",  desc: "Planifiée selon votre agenda" },
  { step: "05", title: "Résultat",      desc: "Local impeccable, satisfaction garantie" },
];

const SkeletonCard = () => (
  <div className="bg-card rounded-2xl p-6 border border-border animate-pulse space-y-3">
    <div className="w-12 h-12 rounded-xl bg-muted" />
    <div className="h-4 bg-muted rounded w-2/3" />
    <div className="h-3 bg-muted rounded w-full" />
    <div className="h-3 bg-muted rounded w-4/5" />
  </div>
);

const Services = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // ── Services depuis API ──────────────────────────────────────
  const { services, loading: loadingServices, error: errorServices } = useServicesHome();

  // Initialise l'onglet actif au premier chargement
  const activeService = services.find(s => s.slug === activeTab)
    ?? (services.length > 0 ? services[0] : null);

  // Sync activeTab avec le premier service disponible
  if (!activeTab && activeService) {
    setActiveTab(activeService.slug);
  }

  // ── Sub-services selon service actif ────────────────────────
  const { subServices, loading: loadingSubs } = useSubServices(activeService?.id);

  const loading = loadingServices || loadingSubs;

  return (
    <Layout>
      <SEOHead {...getSEOForPath("/services")} canonical="/services" url="/services" />

      {/* Hero */}
      <section className="gradient-primary py-20 relative noise-overlay">
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-6">
            <Link to="/" className="hover:text-primary-foreground/80 transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-primary-foreground">Services</span>
          </div>
          <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-primary-foreground mb-4">
            Nos Services
          </h1>
          <p className="text-lg text-primary-foreground/70 max-w-xl">
            Solutions complètes de débarras et nettoyage pour particuliers et professionnels
          </p>
          <span className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full glass text-sm text-primary-foreground/80">
            <Zap className="w-4 h-4 text-secondary" /> Devis gratuit en 2h
          </span>
        </div>
      </section>

      {/* Tabs + Grid */}
      <SectionReveal>
        <section className="py-16 bg-surface">
          <div className="container">

            {/* Tabs */}
            {loadingServices ? (
              <div className="flex justify-center gap-2 mb-10 flex-wrap">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-10 w-28 bg-muted rounded-full animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="flex justify-center gap-2 mb-10 flex-wrap">
                {services.filter(s => s.active).map(s => (
                  <button
                    key={s.slug}
                    onClick={() => setActiveTab(s.slug)}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                      activeTab === s.slug
                        ? "bg-primary-accent text-primary-foreground"
                        : "bg-card text-muted-foreground hover:text-foreground border border-border"
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            )}

            {/* Erreur */}
            {errorServices && (
              <p className="text-center text-destructive text-sm mb-6">{errorServices}</p>
            )}

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab ?? ""}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {/* Carte service principal */}
                  {activeService && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative bg-card rounded-2xl p-6 shadow-card hover:shadow-premium hover:-translate-y-1 transition-all border border-border"
                    >
                      {activeService.badge && (
                        <span
                          className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-primary-foreground text-xs font-bold"
                          style={{ backgroundColor: activeService.color_hex }}
                        >
                          {activeService.badge}
                        </span>
                      )}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: activeService.color_hex + "20" }}
                      >
                        <span className="text-xl font-bold" style={{ color: activeService.color_hex }}>
                          {activeService.title.charAt(0)}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-lg text-foreground mb-2">{activeService.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{activeService.short_desc}</p>
                      <Link
                        to={`/services/${activeService.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary-accent hover:gap-2 transition-all"
                      >
                        En savoir plus <ArrowRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  )}

                  {/* Cartes sous-services */}
                  {subServices.map((sub, i) => (
                    <motion.div
                      key={sub.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (i + 1) * 0.05 }}
                      className="relative bg-card rounded-2xl p-6 shadow-card hover:shadow-premium hover:-translate-y-1 transition-all border border-border"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: activeService?.color_hex + "20" }}
                      >
                        <span className="text-xl font-bold" style={{ color: activeService?.color_hex }}>
                          {sub.title.charAt(0)}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-lg text-foreground mb-2">{sub.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{sub.desc}</p>
                      <Link
                        to={`/services/${activeService?.slug}/${sub.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary-accent hover:gap-2 transition-all"
                      >
                        En savoir plus <ArrowRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </section>
      </SectionReveal>

      <Formulas />

      {/* Process */}
      <SectionReveal>
        <section className="py-16 bg-surface">
          <div className="container">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-10 text-center">
              Comment ça marche ?
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {processSteps.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-full gradient-cta text-primary-foreground font-display font-bold text-sm flex items-center justify-center mx-auto mb-3">
                    {s.step}
                  </div>
                  <h3 className="font-display font-bold text-sm text-foreground mb-1">{s.title}</h3>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Engagements */}
      <SectionReveal>
        <section className="py-16 bg-card">
          <div className="container">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-10 text-center">
              Nos Engagements
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {engagements.map((e, i) => (
                <motion.div
                  key={e.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <e.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-1">{e.title}</h3>
                  <p className="text-sm text-muted-foreground">{e.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      <ZoneIntervention />
      <FinalCTA />
    </Layout>
  );
};

export default Services;