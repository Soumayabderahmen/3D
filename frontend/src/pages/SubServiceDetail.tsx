import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Phone, Loader2 } from "lucide-react";
import Layout from "../components/layout/Layout";
import SectionReveal from "../components/SectionReveal";
import FinalCTA from "../components/home/FinalCTA";
import SEOHead from "../components/SEOHead";
import { useSubServiceDetail } from "../hooks/useSubServiceDetail";

const SubServiceDetail = () => {
  const { serviceSlug, subSlug } = useParams<{
    serviceSlug: string;
    subSlug: string;
  }>();

  const { subService, loading, error } = useSubServiceDetail(subSlug);

  if (loading) return (
    <Layout>
      <div className="flex items-center justify-center py-40">
        <Loader2 className="w-8 h-8 animate-spin text-primary-accent" />
      </div>
    </Layout>
  );

  if (error || !subService) return <Navigate to={`/services/${serviceSlug}`} replace />;

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";
  const imageUrl = subService.image
    ? subService.image.startsWith("http")
      ? subService.image
      : `${apiBaseUrl}${subService.image}`
    : null;

  return (
    <Layout>
      <SEOHead
        title={`${subService.title} — 3D Services Lyon`}
        description={subService.desc}
        canonical={`/services/${subService.service.slug}/${subService.slug}`}
        url={`/services/${subService.service.slug}/${subService.slug}`}
      />

      {/* Hero */}
      <section className="gradient-primary py-16 relative noise-overlay">
        <div className="container relative z-10">
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-6 flex-wrap">
            <Link to="/" className="hover:text-primary-foreground/80 transition-colors">Accueil</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-primary-foreground/80 transition-colors">Services</Link>
            <span>/</span>
            <Link to={`/services/${subService.service.slug}`} className="hover:text-primary-foreground/80 transition-colors">
              {subService.service.title}
            </Link>
            <span>/</span>
            <span className="text-primary-foreground">{subService.title}</span>
          </nav>

          <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-primary-foreground mb-4">
            {subService.title}
          </h1>
          <p className="text-primary-foreground/70 max-w-2xl mb-6">{subService.desc}</p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/devis"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-cta text-primary-foreground font-semibold shadow-glow hover:-translate-y-0.5 transition-all shimmer"
            >
              Demander un devis gratuit <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:0609991736"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-colors"
            >
              <Phone className="w-4 h-4" /> 06 09 99 17 36
            </a>
          </div>
        </div>
      </section>

      {/* Contenu principal */}
      <SectionReveal>
        <section className="py-16 bg-card">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-12">

              {/* Colonne principale */}
              <div className="lg:col-span-2 space-y-8">

                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={subService.title}
                    className="w-full h-90 object-cover rounded-xl"
                  />
                )}

                <div>
                  <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                    {subService.title} — Notre expertise
                  </h2>
                  {subService.long_desc?.split("\n\n").map((p, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed mb-4">{p}</p>
                  ))}
                </div>

                {subService.sections?.map((section, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <h3 className="font-display font-bold text-lg text-foreground mb-2">
                      {section.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{section.text}</p>
                  </motion.div>
                ))}

                {subService.prestations?.length > 0 && (
                  <div>
                    <h3 className="font-display font-bold text-lg text-foreground mb-4">
                      Ce que comprend notre prestation
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {subService.prestations.map((p, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-surface border border-border">
                          <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground">{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <div className="p-6 rounded-xl gradient-primary text-primary-foreground">
                    <h3 className="font-display font-bold text-lg mb-4">Devis gratuit en 2h</h3>
                    <p className="text-sm text-primary-foreground/70 mb-4">
                      {subService.title} — appelez-nous ou demandez un devis en ligne.
                    </p>
                    
                      <a href="tel:0609991736"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-secondary text-primary-foreground font-semibold mb-3 hover:bg-secondary/90 transition-colors"
                    >
                      <Phone className="w-4 h-4" /> 06 09 99 17 36
                    </a>
                    <Link
                      to="/devis"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-colors"
                    >
                      Devis en ligne <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="p-6 rounded-xl bg-surface border border-border">
                    <h3 className="font-display font-bold text-base text-foreground mb-3">
                      Service parent
                    </h3>
                    <Link
                      to={`/services/${subService.service.slug}`}
                      className="flex items-center gap-2 text-sm text-primary-accent hover:underline"
                    >
                      <ArrowRight className="w-3 h-3" />
                      {subService.service.title}
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </SectionReveal>

      <FinalCTA />
    </Layout>
  );
};

export default SubServiceDetail;