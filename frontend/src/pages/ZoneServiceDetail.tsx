import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle, MapPin, Clock, Shield } from "lucide-react";
import Layout from "../components/layout/Layout";
import SectionReveal from "../components/SectionReveal";
import { getService, getArrondissementLyon, getVilleLyon, ARRONDISSEMENTS_LYON, VILLES_LYON } from "@/data/services";
import { getStoredSubServices } from "../hooks/useServicesData";
import { useState } from "react";
import { toast } from "sonner";
import SEOHead from "../components/SEOHead";
import { getBreadcrumbJsonLd, getServiceJsonLd } from "../data/seo";

const ZoneServiceDetail = () => {
  const { serviceSlug, zoneSlug, subServiceSlug } = useParams<{
    serviceSlug: string;
    zoneSlug: string;
    subServiceSlug: string;
  }>();
  const [form, setForm] = useState({ nom: "", tel: "", email: "", message: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const service = getService(serviceSlug || "");
  if (!service || !zoneSlug || !subServiceSlug) return <Navigate to="/services" replace />;

  const subServices = getStoredSubServices(service.slug);
  const subService = subServices.find((s) => s.slug === subServiceSlug);
  if (!subService) return <Navigate to={`/services/${service.slug}/${zoneSlug}`} replace />;

  const lyonMatch = zoneSlug.match(/^lyon-(\d+)$/);
  const isLyon = !!lyonMatch;
  const arrNum = isLyon ? parseInt(lyonMatch![1]) : 0;
  const arr = isLyon ? getArrondissementLyon(arrNum) : null;
  const ville = !isLyon ? getVilleLyon(zoneSlug) : null;

  if (isLyon && !arr) return <Navigate to={`/services/${service.slug}`} replace />;
  if (!isLyon && !ville) return <Navigate to={`/services/${service.slug}`} replace />;

  const zoneName = isLyon ? `Lyon ${arrNum}e` : ville!.nom;
  const zoneNameFull = isLyon ? `${arrNum}e arrondissement de Lyon` : ville!.nom;
  const quartiers = isLyon ? arr!.quartiers : ville!.quartiers;
  const cp = isLyon ? `6900${arrNum}` : ville!.dep;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom || !form.tel) { toast.error("Veuillez remplir votre nom et téléphone."); return; }
    toast.success("Demande envoyée ! Nous vous rappelons sous 2h.");
    setForm({ nom: "", tel: "", email: "", message: "" });
  };

  const otherSubServices = subServices.filter((s) => s.slug !== subServiceSlug).slice(0, 6);

  const neighbors = isLyon
    ? arr!.voisins.map((n) => ({ label: `Lyon ${n}e`, to: `/services/${service.slug}/lyon-${n}/${subServiceSlug}` }))
    : VILLES_LYON.filter((v) => v.slug !== ville!.slug).slice(0, 6).map((v) => ({ label: v.nom, to: `/services/${service.slug}/${v.slug}/${subServiceSlug}` }));

  const faqs = [
    { q: `Quel est le délai pour un ${subService.title.toLowerCase()} à ${zoneName} ?`, a: "Nous intervenons généralement sous 24 à 72h après signature du devis. En cas d'urgence, une intervention le jour même est possible." },
    { q: `Combien coûte un ${subService.title.toLowerCase()} dans le ${zoneNameFull} ?`, a: "Les tarifs varient selon le volume et l'accessibilité. Devis gratuit et sans engagement sur simple appel au 06 09 99 17 36." },
    { q: `Intervenez-vous le week-end à ${zoneName} ?`, a: "Oui, nous intervenons 7j/7, y compris le week-end et les jours fériés." },
    { q: `Quelles garanties pour votre service de ${subService.title.toLowerCase()} ?`, a: "Nous sommes assurés et certifiés. Un devis détaillé vous est remis avant chaque intervention, sans frais cachés." },
  ];

  const pageTitle = `${subService.title} ${zoneName} (${cp})`;

  return (
    <Layout>
      <SEOHead
        title={`${subService.title} ${zoneName} — 3D Services Lyon`}
        description={`${subService.title} à ${zoneName} (${cp}). ${subService.desc} Devis gratuit, intervention rapide 7j/7. ☎ 06 09 99 17 36`}
        canonical={`/services/${service.slug}/${zoneSlug}/${subServiceSlug}`}
        jsonLd={[
          getServiceJsonLd(pageTitle, `${subService.title} professionnel à ${zoneName}`, `/services/${service.slug}/${zoneSlug}/${subServiceSlug}`),
          getBreadcrumbJsonLd([
            { name: "Accueil", url: "/" },
            { name: "Services", url: "/services" },
            { name: service.title, url: `/services/${service.slug}` },
            { name: zoneName, url: `/services/${service.slug}/${zoneSlug}` },
            { name: subService.title, url: `/services/${service.slug}/${zoneSlug}/${subServiceSlug}` },
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
            <Link to={`/services/${service.slug}`} className="hover:text-primary-foreground/80 transition-colors">{service.title}</Link>
            <span>/</span>
            <Link to={`/services/${service.slug}/${zoneSlug}`} className="hover:text-primary-foreground/80 transition-colors">{zoneName}</Link>
            <span>/</span>
            <span className="text-primary-foreground">{subService.title}</span>
          </nav>
          <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-primary-foreground mb-4">
            {subService.title} à {zoneName}
          </h1>
          <p className="text-primary-foreground/70 max-w-2xl mb-6">
            {subService.desc} Nous intervenons rapidement dans le {zoneNameFull} et les quartiers de {quartiers.join(", ")}.
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary-foreground/80"><Clock className="w-4 h-4 text-secondary" />Devis gratuit en 2h</span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary-foreground/80"><Shield className="w-4 h-4 text-gold" />Intervention 7j/7</span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary-foreground/80"><MapPin className="w-4 h-4 text-secondary" />{zoneName}</span>
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

      {/* Detailed content */}
      <SectionReveal>
        <section className="py-16 bg-card">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                    {subService.title} dans le {zoneNameFull}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">{subService.longDesc}</p>
                  <p className="text-muted-foreground leading-relaxed">
                    Notre équipe intervient régulièrement dans le {zoneNameFull}, notamment dans les quartiers de {quartiers.join(", ")}. Nous connaissons parfaitement les contraintes locales : stationnement, accès immeuble, monte-charge. Contactez-nous au <strong>06 09 99 17 36</strong> pour une estimation gratuite.
                  </p>
                </div>

                {subService.sections?.map((section, i) => (
                  <div key={i}>
                    <h3 className="font-display font-bold text-lg text-foreground mb-2">{section.title} — {zoneName}</h3>
                    <p className="text-muted-foreground leading-relaxed">{section.text}</p>
                  </div>
                ))}

                {/* Prestations */}
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-4">
                    Ce que comprend notre {subService.title.toLowerCase()} à {zoneName}
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

                {/* Zone specifics */}
                <div className="p-6 rounded-xl bg-surface border border-border">
                  <h3 className="font-display font-bold text-lg text-foreground mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary-accent" />
                    Intervention à {zoneName} — Quartiers desservis
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {quartiers.map((q) => (
                      <span key={q} className="px-3 py-1.5 rounded-full bg-card border border-border text-sm text-foreground">{q}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Quick contact */}
                  <div className="p-6 rounded-xl gradient-primary text-primary-foreground">
                    <h3 className="font-display font-bold text-lg mb-4">Devis gratuit en 2h</h3>
                    <p className="text-sm text-primary-foreground/70 mb-4">
                      {subService.title} à {zoneName} — appelez-nous ou demandez un devis en ligne.
                    </p>
                    <a href="tel:0609991736" className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-secondary text-primary-foreground font-semibold mb-3 hover:bg-secondary/90 transition-colors">
                      <Phone className="w-4 h-4" /> 06 09 99 17 36
                    </a>
                    <Link to="/devis" className="flex items-center justify-center gap-2 w-full py-3 rounded-full border border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-colors">
                      Devis en ligne <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Other services in this zone */}
                  {otherSubServices.length > 0 && (
                    <div className="p-6 rounded-xl bg-surface border border-border">
                      <h3 className="font-display font-bold text-base text-foreground mb-3">
                        Autres services à {zoneName}
                      </h3>
                      <ul className="space-y-2">
                        {otherSubServices.map((s) => (
                          <li key={s.slug}>
                            <Link
                              to={`/services/${service.slug}/${zoneSlug}/${s.slug}`}
                              className="text-sm text-muted-foreground hover:text-primary-accent transition-colors flex items-center gap-2"
                            >
                              <ArrowRight className="w-3 h-3" />
                              {s.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Same service in neighboring zones */}
      <SectionReveal>
        <section className="py-12 bg-surface">
          <div className="container text-center">
            <h2 className="font-display font-bold text-xl text-foreground mb-6">
              {subService.title} — {isLyon ? "Arrondissements voisins" : "Villes voisines"}
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {neighbors.map((n) => (
                <Link key={n.to} to={n.to} className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-foreground hover:border-primary-accent hover:text-primary-accent transition-colors">
                  {subService.title} {n.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Contact form */}
      <section className="py-16 gradient-primary relative noise-overlay">
        <div className="container relative z-10 max-w-xl">
          <h2 className="font-display font-bold text-2xl text-primary-foreground text-center mb-8">
            Devis gratuit — {subService.title} {zoneName}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} placeholder="Nom complet" className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-secondary" />
            <input value={form.tel} onChange={(e) => setForm({ ...form, tel: e.target.value })} placeholder="Téléphone" className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-secondary" />
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-secondary" />
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={`Décrivez votre besoin de ${subService.title.toLowerCase()} à ${zoneName}...`} rows={3} className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-secondary resize-none" />
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
              Questions fréquentes — {subService.title} {zoneName}
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
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

export default ZoneServiceDetail;
