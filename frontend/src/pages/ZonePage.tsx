import { useParams, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MapPin, CheckCircle, Clock, Shield, Loader2 } from "lucide-react";
import Layout from "../components/layout/Layout";
import SectionReveal from "../components/SectionReveal";
import { toast } from "sonner";
import SEOHead from "../components/SEOHead";
import { getBreadcrumbJsonLd, getServiceJsonLd } from "../data/seo";
import { useServicesHome } from "../hooks/useServiceHome";
import { useSubServices } from "../hooks/useSubServices";
import { useZoneDetail } from "../hooks/useZoneDetail";

const ZonePage = () => {
  const { serviceSlug, subSlug: zoneSlug } = useParams<{ serviceSlug: string; subSlug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ nom: "", tel: "", email: "", message: "" });

  // ── Données API ──────────────────────────────────────────────
  const { services, loading: loadingServices } = useServicesHome();
  const apiService = services.find((s) => s.slug === serviceSlug);

  const { subServices, loading: loadingSubs } = useSubServices(apiService?.id);

  const { zone, loading: loadingZone, error: zoneError } = useZoneDetail(serviceSlug, zoneSlug);

  // ── Loading global ───────────────────────────────────────────
  if (loadingServices || loadingSubs || loadingZone) return (
    <Layout>
      <div className="flex items-center justify-center py-40">
        <Loader2 className="w-8 h-8 animate-spin text-primary-accent" />
      </div>
    </Layout>
  );

  if (!apiService || !zoneSlug) return <Navigate to="/services" replace />;
  if (zoneError || !zone) return <Navigate to={`/services/${serviceSlug}`} replace />;

  // ── Dérivations depuis zone API ──────────────────────────────
  const isLyon       = zone.type === "arrondissement";
  const arrNum       = zone.num;
  const quartiers    = zone.quartiers ?? [];

  const zoneName      = isLyon ? `Lyon ${arrNum}e (6900${arrNum})` : `${zone.nom} (${zone.dep})`;
  const zoneNameShort = isLyon ? `Lyon ${arrNum}e` : zone.nom;
  const zoneNameFull  = isLyon ? `${arrNum}e arrondissement de Lyon` : zone.nom;
  const cp            = isLyon ? `6900${arrNum}` : zone.dep;

  const neighbors = isLyon
    ? Array.from({ length: 9 }, (_, i) => i + 1)
        .filter((n) => n !== arrNum)
        .slice(0, 6)
        .map((n) => ({ label: `Lyon ${n}e`, to: `/services/${apiService.slug}/lyon-${n}` }))
    : [];

  const faqs = [
    {
      q: `Quel est le délai d'intervention pour un ${apiService.title.toLowerCase()} ${isLyon ? `dans le ${arrNum}e` : `à ${zone.nom}`} ?`,
      a: "Nous intervenons généralement sous 24 à 72h après signature du devis. En cas d'urgence, une intervention le jour même est possible.",
    },
    {
      q: `Combien coûte un ${apiService.title.toLowerCase()} ${isLyon ? `dans le ${arrNum}e arrondissement de Lyon` : `à ${zone.nom}`} ?`,
      a: "Les tarifs varient selon le volume et l'accessibilité. Comptez entre 20 et 50€/m³ pour un débarras classique. Devis gratuit et sans engagement sur simple appel.",
    },
    {
      q: `Intervenez-vous le week-end ${isLyon ? `dans le ${arrNum}e` : `à ${zone.nom}`} ?`,
      a: "Oui, nous intervenons 7j/7, y compris le week-end et les jours fériés, pour nous adapter à votre emploi du temps.",
    },
    {
      q: `Quelles garanties offrez-vous pour le ${apiService.title.toLowerCase()} ?`,
      a: "Nous sommes assurés et certifiés. Un devis détaillé vous est remis avant chaque intervention, sans frais cachés.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom || !form.tel) { toast.error("Veuillez remplir votre nom et téléphone."); return; }
    toast.success("Demande envoyée ! Nous vous rappelons sous 2h.");
    setForm({ nom: "", tel: "", email: "", message: "" });
  };

  return (
    <Layout>
      <SEOHead
        title={`${apiService.title} ${zoneName} — 3D Services Lyon`}
        description={`${apiService.title} à ${zoneName}. ${subServices.map((s) => s.title).join(", ")}. Intervention rapide 7j/7, devis gratuit. ☎ 06 09 99 17 36`}
        canonical={`/services/${apiService.slug}/${zoneSlug}`}
        url={`/services/${apiService.slug}/${zoneSlug}`}
        jsonLd={[
          getServiceJsonLd(`${apiService.title} ${zoneName}`, `${apiService.title} professionnel à ${zoneName}`, `/services/${apiService.slug}/${zoneSlug}`),
          getBreadcrumbJsonLd([
            { name: "Accueil", url: "/" },
            { name: "Services", url: "/services" },
            { name: apiService.title, url: `/services/${apiService.slug}` },
            { name: zoneNameShort, url: `/services/${apiService.slug}/${zoneSlug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="gradient-primary py-16 relative noise-overlay">
        <div className="container relative z-10">
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-6 flex-wrap">
            <Link to="/" className="hover:text-primary-foreground/80 transition-colors">Accueil</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-primary-foreground/80 transition-colors">Services</Link>
            <span>/</span>
            <Link to={`/services/${apiService.slug}`} className="hover:text-primary-foreground/80 transition-colors">{apiService.title}</Link>
            <span>/</span>
            <span className="text-primary-foreground">{zoneNameShort}</span>
          </nav>
          <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-primary-foreground mb-4">
            {apiService.title} à {zoneNameShort}
          </h1>
          <p className="text-primary-foreground/70 max-w-2xl mb-6">
            Notre entreprise de {apiService.title.toLowerCase()} propose ses services professionnels dans le {zoneNameFull} ({cp}). Intervention rapide dans les quartiers de {quartiers.join(", ")}.
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary-foreground/80">
              <Clock className="w-4 h-4 text-secondary" /> Devis gratuit en 2h
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary-foreground/80">
              <Shield className="w-4 h-4 text-gold" /> Intervention 7j/7
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary-foreground/80">
              <MapPin className="w-4 h-4 text-secondary" /> {zoneNameShort}
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/devis" className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-cta text-primary-foreground font-semibold shadow-glow hover:-translate-y-0.5 transition-all shimmer">
              Demander un devis gratuit <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:0609991736" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-colors">
              <Phone className="w-4 h-4" /> 06 09 99 17 36
            </a>
          </div>
        </div>
      </section>

      <SectionReveal>
        <section className="py-16 bg-card">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                    {apiService.title} dans le {zoneNameFull}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Notre entreprise de {apiService.title.toLowerCase()} intervient régulièrement dans le {zoneNameFull}. Nous connaissons parfaitement les contraintes locales : stationnement, accès immeuble, monte-charge. Contactez-nous au <strong>06 09 99 17 36</strong> pour une estimation gratuite.
                  </p>
                </div>
                <div className="divide-y divide-border">
                  {subServices.map((sub, i) => (
                    <motion.div
                      key={sub.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="py-8 first:pt-0"
                    >
                      <h3 className="font-display font-bold text-lg text-foreground mb-2">{sub.title}</h3>
                      <p className="text-muted-foreground mb-4">{sub.desc}</p>
                      <ul className="space-y-2 mb-4">
                        {sub.prestations.slice(0, 4).map((p, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-secondary shrink-0" /> {p}
                          </li>
                        ))}
                      </ul>
                      <Link
                        to={`/services/${apiService.slug}/${zoneSlug}/${sub.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary-accent hover:underline"
                      >
                        En savoir plus <ArrowRight className="w-3 h-3" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <div className="p-6 rounded-xl gradient-primary text-primary-foreground">
                    <h3 className="font-display font-bold text-lg mb-4">Devis gratuit en 2h</h3>
                    <p className="text-sm text-primary-foreground/70 mb-4">
                      {apiService.title} à {zoneNameShort} — appelez-nous ou demandez un devis en ligne.
                    </p>
                    <a href="tel:0609991736" className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-secondary text-primary-foreground font-semibold mb-3 hover:bg-secondary/90 transition-colors">
                      <Phone className="w-4 h-4" /> 06 09 99 17 36
                    </a>
                    <Link to="/devis" className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-colors">
                      Devis en ligne <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="p-6 rounded-xl bg-surface border border-border">
                    <h3 className="font-display font-bold text-base text-foreground mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary-accent" /> Quartiers desservis
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {quartiers.map((q) => (
                        <span key={q} className="px-3 py-1.5 rounded-full bg-card border border-border text-xs text-foreground">{q}</span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-surface border border-border">
                    <h3 className="font-display font-bold text-base text-foreground mb-3">Sommaire</h3>
                    <ul className="space-y-2">
                      {subServices.map((sub) => (
                        <li key={sub.slug}>
                          <Link
                            to={`/services/${apiService.slug}/${zoneSlug}/${sub.slug}`}
                            className="text-sm text-muted-foreground hover:text-primary-accent transition-colors flex items-center gap-2"
                          >
                            <ArrowRight className="w-3 h-3" /> {sub.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Zones voisines */}
      {neighbors.length > 0 && (
        <SectionReveal>
          <section className="py-12 bg-surface">
            <div className="container text-center">
              <h2 className="font-display font-bold text-xl text-foreground mb-6">
                {apiService.title} — {isLyon ? "Arrondissements voisins" : "Villes voisines"}
              </h2>
              <div className="flex flex-wrap justify-center gap-2">
                {neighbors.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-foreground hover:border-primary-accent hover:text-primary-accent transition-colors"
                  >
                    {apiService.title} {n.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>
      )}

      {/* Formulaire */}
      <section className="py-16 gradient-primary relative noise-overlay">
        <div className="container relative z-10 max-w-xl">
          <h2 className="font-display font-bold text-2xl text-primary-foreground text-center mb-8">
            Devis gratuit — {apiService.title} {zoneNameShort}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} placeholder="Nom complet" className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-secondary" />
            <input value={form.tel} onChange={(e) => setForm({ ...form, tel: e.target.value })} placeholder="Téléphone" className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-secondary" />
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-secondary" />
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={`Décrivez votre besoin de ${apiService.title.toLowerCase()} à ${zoneNameShort}...`} rows={3} className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-secondary resize-none" />
            <button type="submit" className="w-full py-3 rounded-full bg-secondary text-primary-foreground font-semibold hover:bg-secondary/90 transition-colors">
              Envoyer ma demande
            </button>
            <p className="text-xs text-primary-foreground/40 text-center">🔒 Vos données sont confidentielles • ⚡ Réponse en 2h maximum</p>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <SectionReveal>
        <section className="py-12 bg-surface">
          <div className="container max-w-2xl">
            <h2 className="font-display font-bold text-xl text-foreground text-center mb-8">
              Questions fréquentes — {apiService.title} {zoneNameShort}
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="font-medium text-sm text-foreground">{faq.q}</span>
                    <span className="text-muted-foreground text-lg shrink-0 ml-2">{openFaq === i ? "×" : "+"}</span>
                  </button>
                  {openFaq === i && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 pb-4">
                      <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>
    </Layout>
  );
};

export default ZonePage;