import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionReveal from "@/components/SectionReveal";
import FinalCTA from "@/components/home/FinalCTA";
import { SERVICES, ARRONDISSEMENTS_LYON, VILLES_LYON } from "@/data/services";
import SEOHead from "@/components/SEOHead";
import { getSEOForPath } from "@/data/seo";


const ZonesIntervention = () => {
  const [activeService, setActiveService] = useState<string>(SERVICES[0].slug);

  return (
    <Layout>
      <SEOHead {...getSEOForPath("/zones-intervention")} canonical="/zones-intervention" />
      {/* Hero */}
      <section className="gradient-primary py-16 relative noise-overlay">
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-6">
            <Link to="/" className="hover:text-primary-foreground/80 transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-primary-foreground">Zones d'intervention</span>
          </div>
          <h1 className="font-serif-display text-4xl sm:text-5xl text-primary-foreground mb-4">
            Nos zones d'intervention
          </h1>
          <p className="text-lg text-primary-foreground/70">Lyon et sa région dans un rayon de 200 km</p>
        </div>
      </section>

      {/* Service tabs */}
      <section className="py-6 bg-card border-b border-border sticky top-16 z-20">
        <div className="container flex justify-center gap-2 flex-wrap">
          {SERVICES.map((s) => (
            <button
              key={s.slug}
              onClick={() => setActiveService(s.slug)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                activeService === s.slug ? "bg-primary-accent text-primary-foreground" : "bg-surface text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </section>

      {/* Lyon arrondissements */}
      <SectionReveal>
        <section className="py-16 bg-surface">
          <div className="container">
            <div className="flex items-center gap-3 mb-8">
              <MapPin className="w-6 h-6 text-primary-accent" />
              <h2 className="font-display font-bold text-2xl text-foreground">Lyon — 9 arrondissements</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
              {ARRONDISSEMENTS_LYON.map((a, i) => (
                <motion.div key={a.num} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                  <Link
                    to={`/services/${activeService}/lyon-${a.num}`}
                    className="block p-4 rounded-xl bg-card border border-border hover:border-primary-accent hover:shadow-card transition-all text-center group"
                  >
                    <span className="text-lg font-display font-bold text-foreground group-hover:text-primary-accent transition-colors">
                      Lyon {a.num}e
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{a.nom}</p>
                    <p className="text-[10px] text-muted-foreground/60 mt-0.5">{a.quartiers.join(", ")}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {["01", "07", "26", "38", "42", "69", "71", "73", "74"].map((dep) => (
                <span key={dep} className="px-4 py-2 rounded-full bg-card border border-border text-sm text-muted-foreground">
                  Département {dep}
                </span>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Villes */}
      <SectionReveal>
        <section className="py-16 bg-card">
          <div className="container">
            <div className="flex items-center gap-3 mb-8">
              <MapPin className="w-6 h-6 text-secondary" />
              <h2 className="font-display font-bold text-2xl text-foreground">Région Lyonnaise — 200 km</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {VILLES_LYON.map((v, i) => (
                <motion.div key={v.slug} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
                  <Link
                    to={`/services/${activeService}/${v.slug}`}
                    className="block p-4 rounded-xl bg-surface border border-border hover:border-secondary hover:shadow-card transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-display font-bold text-foreground group-hover:text-secondary transition-colors">
                        {v.nom}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{v.dist} km</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Département {v.dep}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      <FinalCTA />
    </Layout>
  );
};

export default ZonesIntervention;
