import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Phone, ArrowRight, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionReveal from "@/components/SectionReveal";
import FinalCTA from "@/components/home/FinalCTA";
import { getService } from "@/data/services";
import { getStoredSubServices } from "@/hooks/useServicesData";
import SEOHead from "@/components/SEOHead";
import { getServiceJsonLd, getBreadcrumbJsonLd } from "@/data/seo";

const SubServiceDetail = () => {
  const { serviceSlug, subSlug } = useParams<{ serviceSlug: string; subSlug: string }>();
  const service = getService(serviceSlug || "");

  if (!service) return <Navigate to="/services" replace />;

  const storedSubs = getStoredSubServices(service.slug);
  const subService = storedSubs.find((s) => s.slug === subSlug);
  if (!subService) return <Navigate to={`/services/${service.slug}`} replace />;

  const Icon = service.icon;
  const otherSubs = storedSubs.filter((s) => s.slug !== subSlug).slice(0, 6);

  // Default image if none specified
  const heroImage = subService.image || "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=900&h=600&fit=crop";

  // Default sections from longDesc if none specified
  const sections = subService.sections || [
    { title: `${subService.title} — Notre expertise`, text: subService.longDesc },
    { title: "Un service complet de A à Z", text: `Nous intervenons à Lyon et dans un rayon de 200 km pour tous vos besoins de ${subService.title.toLowerCase()}. Notre équipe expérimentée garantit un travail soigné, dans le respect des délais et de votre budget. Contactez-nous pour un devis gratuit et sans engagement.` },
  ];

  return (
    <Layout>
      <SEOHead
        title={`${subService.title} Lyon — ${service.title} | 3D Services`}
        description={subService.desc}
        canonical={`/services/${service.slug}/${subService.slug}`}
        jsonLd={[
          getServiceJsonLd(subService.title, subService.desc, `/services/${service.slug}/${subService.slug}`),
          getBreadcrumbJsonLd([{ name: "Accueil", url: "/" }, { name: "Services", url: "/services" }, { name: service.title, url: `/services/${service.slug}` }, { name: subService.title, url: `/services/${service.slug}/${subService.slug}` }]),
        ]}
      />
      {/* Hero breadcrumb */}
      <section className="gradient-primary py-12 relative noise-overlay">
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/60 mb-4 flex-wrap">
            <Link to="/" className="hover:text-primary-foreground/90 transition-colors">Accueil</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to={`/services/${service.slug}`} className="hover:text-primary-foreground/90 transition-colors">{service.title}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-primary-foreground font-medium">{subService.title}</span>
          </div>
          <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-primary-foreground mb-3">
            {subService.title}
          </h1>
          <p className="text-primary-foreground/70 max-w-2xl text-lg leading-relaxed">
            {subService.desc}
          </p>
        </div>
      </section>

      {/* Main content: image + sidebar */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_380px] gap-10">
            {/* Left column */}
            <div>
              {/* Hero image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl overflow-hidden mb-10"
              >
                <img
                  src={heroImage}
                  alt={subService.title}
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
              </motion.div>

              {/* Content sections */}
              {sections.map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="mb-8"
                >
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground mb-3">
                    {section.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">{section.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Right sidebar - sticky */}
            <div className="lg:self-start lg:sticky lg:top-24">
              <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <h3 className="font-display font-bold text-lg text-foreground mb-5">Points clés</h3>
                <ul className="space-y-4 mb-6">
                  {subService.prestations.map((p, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
                      <span className="text-foreground text-sm">{p}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA buttons */}
                <Link
                  to="/devis"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl gradient-cta text-primary-foreground font-semibold shadow-glow hover:shadow-lg hover:-translate-y-0.5 transition-all shimmer mb-3"
                >
                  Devis Gratuit <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:0609991736"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border-2 border-primary/20 text-foreground font-semibold hover:border-primary/40 transition-colors"
                >
                  <Phone className="w-4 h-4 text-primary-accent" />
                  06 09 99 17 36
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other sub-services */}
      {otherSubs.length > 0 && (
        <SectionReveal>
          <section className="py-16 bg-surface">
            <div className="container">
              <h2 className="font-display font-bold text-2xl text-foreground mb-3 text-center">
                Nos autres services de {service.title.toLowerCase()}
              </h2>
              <p className="text-muted-foreground text-center mb-8">Découvrez l'ensemble de nos prestations</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherSubs.map((sub, i) => (
                  <motion.div
                    key={sub.slug}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={`/services/${service.slug}/${sub.slug}`}
                      className="group block p-5 rounded-xl bg-card border border-border hover:border-primary-accent hover:shadow-card transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: service.colorHex + "15" }}>
                          <Icon className="w-3.5 h-3.5" style={{ color: service.colorHex }} />
                        </div>
                        <h3 className="font-display font-bold text-sm text-foreground group-hover:text-primary-accent transition-colors">
                          {sub.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">{sub.desc}</p>
                      <span className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-primary-accent">
                        En savoir plus <ChevronRight className="w-3 h-3" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  to={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary-accent hover:gap-3 transition-all"
                >
                  Voir tous les services de {service.title.toLowerCase()} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        </SectionReveal>
      )}

      <FinalCTA />
    </Layout>
  );
};

export default SubServiceDetail;
