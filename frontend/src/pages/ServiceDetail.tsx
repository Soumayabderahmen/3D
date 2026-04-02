import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Zap, Phone, ArrowRight, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionReveal from "@/components/SectionReveal";
import BeforeAfterGrid from "@/components/BeforeAfterGrid";
import FinalCTA from "@/components/home/FinalCTA";
import { SERVICES, getService, ARRONDISSEMENTS_LYON, VILLES_LYON } from "@/data/services";
import { getStoredSubServices } from "@/hooks/useServicesData";
import SEOHead from "@/components/SEOHead";
import { getServiceJsonLd, getBreadcrumbJsonLd } from "@/data/seo";

const ServiceDetail = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const service = getService(serviceSlug || "");

  if (!service) return <Navigate to="/services" replace />;

  const Icon = service.icon;
  const storedSubs = getStoredSubServices(service.slug);

  return (
    <Layout>
      <SEOHead
        title={`${service.title} à Lyon et Région — 3D Services`}
        description={service.shortDesc}
        canonical={`/services/${service.slug}`}
        jsonLd={[
          getServiceJsonLd(service.title, service.shortDesc, `/services/${service.slug}`),
          getBreadcrumbJsonLd([{ name: "Accueil", url: "/" }, { name: "Services", url: "/services" }, { name: service.title, url: `/services/${service.slug}` }]),
        ]}
      />
      {/* Hero */}
      <section className="gradient-primary py-20 relative noise-overlay">
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-6">
            <Link to="/" className="hover:text-primary-foreground/80 transition-colors">Accueil</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-primary-foreground/80 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-primary-foreground">{service.title}</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: service.colorHex + "20" }}>
              <Icon className="w-7 h-7" style={{ color: service.colorHex }} />
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold text-primary-foreground" style={{ backgroundColor: service.colorHex }}>
              {service.badge}
            </span>
          </div>
          <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-primary-foreground mb-4">
            {service.title} Lyon & Région
          </h1>
          <p className="text-lg text-primary-foreground/70 max-w-xl mb-6">{service.shortDesc}</p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary-foreground/80">
              <Zap className="w-4 h-4 text-secondary" /> Devis gratuit en 2h
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary-foreground/80">
              <Zap className="w-4 h-4 text-gold" /> Intervention 7j/7
            </span>
          </div>
          <Link to="/devis" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full gradient-cta text-primary-foreground font-semibold shadow-glow hover:shadow-lg hover:-translate-y-0.5 transition-all shimmer">
            Demander un devis gratuit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Description 2 colonnes */}
      <SectionReveal>
        <section className="py-16 bg-card">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-6">
                  {service.title} — Notre expertise
                </h2>
                {service.longDesc.split("\n\n").map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
                ))}
              </div>
              <div className="bg-surface rounded-2xl p-8 border border-border">
                <h3 className="font-display font-bold text-lg text-foreground mb-6">Prestations incluses</h3>
                <ul className="space-y-4">
                  {service.prestations.map((p, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: service.colorHex + "20" }}>
                        <Check className="w-3.5 h-3.5" style={{ color: service.colorHex }} />
                      </div>
                      <span className="text-foreground text-sm">{p}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <a href="tel:0609991736" className="flex items-center gap-3 text-foreground font-semibold">
                    <Phone className="w-5 h-5 text-primary-accent" />
                    Appelez le 06 09 99 17 36
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">Devis gratuit • Réponse en 2h</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Sub-services sections */}
      {storedSubs.length > 0 && (
        <SectionReveal>
          <section className="py-16 bg-surface">
            <div className="container">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-3 text-center">
                Nos services de {service.title.toLowerCase()}
              </h2>
              <p className="text-muted-foreground text-center max-w-xl mx-auto mb-10">
                Découvrez l'ensemble de nos prestations spécialisées
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {storedSubs.map((sub, i) => (
                  <motion.div
                    key={sub.slug}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group p-6 rounded-xl bg-card border border-border hover:border-primary-accent hover:shadow-card transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: service.colorHex + "15" }}>
                        <Icon className="w-4 h-4" style={{ color: service.colorHex }} />
                      </div>
                      <h3 className="font-display font-bold text-sm text-foreground group-hover:text-primary-accent transition-colors">
                        {sub.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">{sub.desc}</p>
                    <Link
                      to={`/services/${service.slug}/${sub.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-primary-accent hover:gap-2 transition-all"
                    >
                      En savoir plus <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>
      )}

      {/* Gallery */}
      <BeforeAfterGrid items={service.gallery} />

      {/* Zones links — Lyon arrondissements + villes */}
      <SectionReveal>
        <section className="py-16 bg-card">
          <div className="container text-center">
            <h2 className="font-display font-bold text-2xl text-foreground mb-4">
              {service.title} par zone
            </h2>
            <p className="text-muted-foreground mb-8">Retrouvez nos interventions près de chez vous</p>

            {/* Lyon arrondissements */}
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">Lyon — 9 arrondissements</h3>
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto mb-8">
              {ARRONDISSEMENTS_LYON.map((a) => (
                <Link
                  key={a.num}
                  to={`/services/${service.slug}/lyon-${a.num}`}
                  className="px-4 py-2 rounded-full bg-surface border border-border text-sm font-medium text-foreground hover:border-primary-accent hover:text-primary-accent transition-colors"
                >
                  Lyon {a.num}e
                </Link>
              ))}
            </div>

            {/* Villes */}
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">Villes de la région (200 km)</h3>
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto mb-6">
              {VILLES_LYON.filter(v => v.slug !== "lyon").map((v) => (
                <Link
                  key={v.slug}
                  to={`/services/${service.slug}/${v.slug}`}
                  className="px-4 py-2 rounded-full bg-surface border border-border text-sm font-medium text-foreground hover:border-secondary hover:text-secondary transition-colors"
                >
                  {v.nom}
                </Link>
              ))}
            </div>

            <Link to="/zones-intervention" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-accent hover:gap-3 transition-all">
              Voir toutes les zones <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </SectionReveal>

      <FinalCTA />
    </Layout>
  );
};

export default ServiceDetail;
