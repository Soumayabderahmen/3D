import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Zap, Phone, ArrowRight, ChevronRight } from "lucide-react";

import Layout from "../components/layout/Layout";
import SectionReveal from "../components/SectionReveal";
import BeforeAfterGrid from "../components/BeforeAfterGrid";
import FinalCTA from "../components/home/FinalCTA";
import SEOHead from "../components/SEOHead";

import { getServiceSchema, getBreadcrumbSchema } from "../data/schema";
import { useServicesHome } from "../hooks/useServiceHome";
import { useSubServices } from "../hooks/useSubServices";
import { useServiceZones } from "../hooks/useServiceZones";

const ServiceDetail = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();

  const { services, loading: loadingService, error: errorService } = useServicesHome();

  const service = services.find((s) => s.slug === serviceSlug);

  const { subServices, loading: loadingSubs, error: errorSubs } =
    useSubServices(service?.id);

  const { arrondissements, villes, loading: loadingZones, error: errorZones } =
    useServiceZones(serviceSlug);

  if (!loadingService && !service) {
    return <Navigate to="/services" replace />;
  }

  if (!service) return null;

  const Icon = service.icon;

  const color = service.color_hex;

  return (
    <Layout>
      <SEOHead
        title={`${service.title} — 3D Services`}
        description={service.short_desc || ""}
        canonical={`/services/${service.slug}`}
        url={`/services/${service.slug}`}
      />

      <script type="application/ld+json">
        {JSON.stringify(
          getServiceSchema(
            service.title,
            service.short_desc || "",
            `/services/${service.slug}`
          )
        )}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(
          getBreadcrumbSchema([
            { name: "Accueil", url: "/" },
            { name: "Services", url: "/services" },
            { name: service.title, url: `/services/${service.slug}` },
          ])
        )}
      </script>

      {/* HERO */}
      <section className="gradient-primary py-20 relative">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: color + "20" }}
            >
              <Icon   />
            </div>

            {service.badge && (
              <span
                className="px-3 py-1 rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: color }}
              >
                {service.badge}
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">
            {service.title}
          </h1>

          <p className="text-white/70 max-w-xl">
            {service.short_desc}
          </p>
        </div>
      </section>

      {/* DESCRIPTION */}
      <SectionReveal>
        <section className="py-16 bg-card">
          <div className="container grid lg:grid-cols-2 gap-12">

            {/* LEFT */}
            <div>
              <h2 className="text-2xl font-bold mb-6">
                {service.title} — Expertise
              </h2>

              {errorService && (
                <p className="text-red-500">{errorService}</p>
              )}

              {service.long_desc?.split("\n\n").map((p, i) => (
                <p key={i} className="mb-4 text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>

            {/* RIGHT */}
            <div className="p-6 bg-surface rounded-xl border">
              <h3 className="font-bold mb-4">Prestations</h3>

              <ul className="space-y-3">
                {service.prestations?.map((p, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4" style={{ color }} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <a
                href="tel:0609991736"
                className="flex items-center gap-2 mt-6 font-semibold"
              >
                <Phone className="w-4 h-4" /> Appeler maintenant
              </a>
            </div>

          </div>
        </section>
      </SectionReveal>

      {/* SUB SERVICES */}
      {subServices?.length > 0 && (
        <SectionReveal>
          <section className="py-16 bg-surface">
            <div className="container">
              <h2 className="text-2xl font-bold mb-8 text-center">
                Sous-services
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {subServices.map((sub, i) => (
                  <div key={sub.slug} className="p-6 bg-card rounded-xl border">
                    <h3 className="font-bold mb-2">{sub.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {sub.desc}
                    </p>

                    <Link
                      to={`/services/${service.slug}/${sub.slug}`}
                      className="text-sm text-primary flex items-center gap-1"
                    >
                      En savoir plus <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>
      )}

      {/* ZONES */}
      <SectionReveal>
        <section className="py-16 bg-card">
          <div className="container text-center">
            <h2 className="text-xl font-bold mb-6">
              Zones d’intervention
            </h2>

            {arrondissements?.map((a) => (
              <Link
                key={a.slug}
                to={`/services/${service.slug}/${a.slug}`}
                className="inline-block px-3 py-1 m-1 border rounded-full"
              >
                Lyon {a.num}e
              </Link>
            ))}
          </div>
        </section>
      </SectionReveal>

      <FinalCTA />
    </Layout>
  );
};

export default ServiceDetail;