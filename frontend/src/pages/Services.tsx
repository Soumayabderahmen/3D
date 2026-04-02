import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Building2, Heart, Warehouse, Hammer, Wind, Building, AlertTriangle, Recycle, Leaf, ArrowRight, Zap, Clock, Shield, Bath } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

import Formulas from "@/components/home/Formulas";
import ZoneIntervention from "@/components/home/ZoneIntervention";
import FinalCTA from "@/components/home/FinalCTA";
import SEOHead from "@/components/SEOHead";
import { getSEOForPath } from "@/data/seo";


const tabs = [
  {
    id: "debarras",
    label: "Débarras",
    services: [
      { icon: Home, title: "Débarras Appartement", desc: "Du studio au grand appartement, vidage complet ou partiel à Paris et en IDF.", badge: "Populaire", badgeColor: "bg-primary-accent" },
      { icon: Building2, title: "Vide Maison", desc: "Du cave au grenier, meubles, déchets, encombrants.", badge: null, badgeColor: "" },
      { icon: Heart, title: "Débarras Succession", desc: "Accompagnement après décès, avec respect et discrétion.", badge: "Spécialisé", badgeColor: "bg-gold" },
      { icon: Warehouse, title: "Cave & Grenier", desc: "Stockages anciens, objets oubliés, nettoyage inclus.", badge: null, badgeColor: "" },
      { icon: Building, title: "Box & Garage", desc: "Vidage complet de boxes, garages, parkings.", badge: null, badgeColor: "" },
      { icon: Leaf, title: "Débarras Jardin", desc: "Enlèvement déchets verts, mobilier extérieur.", badge: null, badgeColor: "" },
      { icon: AlertTriangle, title: "SOS Débarras", desc: "Intervention d'urgence, disponible 7j/7.", badge: "Urgent", badgeColor: "bg-destructive" },
    ],
  },
  {
    id: "nettoyage",
    label: "Nettoyage",
    services: [
      { icon: Bath, title: "Nettoyage Appartement", desc: "Nettoyage complet, vitres, sols, cuisines, sanitaires.", badge: "Populaire", badgeColor: "bg-primary-accent" },
      { icon: Hammer, title: "Fin de Chantier", desc: "Locaux remis à neuf après travaux.", badge: null, badgeColor: "" },
      { icon: Wind, title: "Syndrome de Diogène", desc: "Intervention spécialisée et confidentielle.", badge: "Spécialisé", badgeColor: "bg-gold" },
      { icon: Recycle, title: "Nettoyage Insalubre", desc: "Désinfection complète, hygiène garantie.", badge: null, badgeColor: "" },
    ],
  },
  {
    id: "pro",
    label: "Entretien Pro",
    services: [
      { icon: Building, title: "Local Professionnel", desc: "Bureaux, commerces, entrepôts.", badge: null, badgeColor: "" },
      { icon: Recycle, title: "Archives Entreprises", desc: "Évacuation et destruction sécurisée de documents.", badge: null, badgeColor: "" },
      { icon: Building2, title: "Encombrants Entreprises", desc: "Enlèvement encombrants pour entreprises.", badge: null, badgeColor: "" },
    ],
  },
];

const engagements = [
  { icon: Zap, title: "Rapidité", desc: "Intervention sous 24h à 48h" },
  { icon: Clock, title: "Devis gratuit en 2h", desc: "Réponse rapide et sans engagement" },
  { icon: Recycle, title: "Éco-responsable", desc: "Tri sélectif, don, recyclage" },
  { icon: Shield, title: "Discrétion", desc: "Respect total pour les successions" },
];

const processSteps = [
  { step: "01", title: "Vous appelez", desc: "Ou remplissez le formulaire de devis" },
  { step: "02", title: "Estimation", desc: "Visite ou estimation sur photos (gratuit)" },
  { step: "03", title: "Devis en 2h", desc: "Devis détaillé reçu par email" },
  { step: "04", title: "Intervention", desc: "Planifiée selon votre agenda" },
  { step: "05", title: "Résultat", desc: "Local impeccable, satisfaction garantie" },
];

const Services = () => {
  const [activeTab, setActiveTab] = useState("debarras");
  const currentTab = tabs.find(t => t.id === activeTab)!;

  return (
    <Layout>
      <SEOHead {...getSEOForPath("/services")} canonical="/services" />
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
            <Zap className="w-4 h-4 text-secondary" />
            Devis gratuit en 2h
          </span>
        </div>
      </section>

      {/* Tabs + Grid */}
      <SectionReveal>
        <section className="py-16 bg-surface">
          <div className="container">
            <div className="flex justify-center gap-2 mb-10 flex-wrap">
              {tabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                    activeTab === t.id
                      ? "bg-primary-accent text-primary-foreground"
                      : "bg-card text-muted-foreground hover:text-foreground border border-border"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {currentTab.services.map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="relative bg-card rounded-2xl p-6 shadow-card hover:shadow-premium hover:-translate-y-1 transition-all border border-border"
                  >
                    {s.badge && (
                      <span className={`absolute top-4 right-4 px-2.5 py-0.5 rounded-full ${s.badgeColor} text-primary-foreground text-xs font-bold`}>
                        {s.badge}
                      </span>
                    )}
                    <div className="w-12 h-12 rounded-xl bg-primary-accent/10 flex items-center justify-center mb-4">
                      <s.icon className="w-6 h-6 text-primary-accent" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                    <Link to="/devis" className="inline-flex items-center gap-1 text-sm font-semibold text-primary-accent hover:gap-2 transition-all">
                      En savoir plus <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
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
