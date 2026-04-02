import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Zap, MapPin } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionReveal from "@/components/SectionReveal";
import BeforeAfterGrid from "@/components/BeforeAfterGrid";
import { getService, getArrondissementLyon, getVilleLyon, ARRONDISSEMENTS_LYON, VILLES_LYON } from "@/data/services";
import { useState } from "react";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";
import { getBreadcrumbJsonLd, getServiceJsonLd } from "@/data/seo";

const ZonePage = () => {
  const { serviceSlug, zoneSlug } = useParams<{ serviceSlug: string; zoneSlug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ nom: "", tel: "", email: "", message: "" });

  const service = getService(serviceSlug || "");

  if (!service || !zoneSlug) return <Navigate to="/services" replace />;

  const lyonMatch = zoneSlug.match(/^lyon-(\d+)$/);
  const isLyon = !!lyonMatch;
  const arrNum = isLyon ? parseInt(lyonMatch![1]) : 0;
  const arr = isLyon ? getArrondissementLyon(arrNum) : null;
  const ville = !isLyon ? getVilleLyon(zoneSlug) : null;

  if (isLyon && !arr) return <Navigate to={`/services/${service.slug}`} replace />;
  if (!isLyon && !ville) return <Navigate to={`/services/${service.slug}`} replace />;

  const zoneName = isLyon ? `Lyon ${arrNum}e (6900${arrNum})` : `${ville!.nom} (${ville!.dep})`;
  const quartiers = isLyon ? arr!.quartiers : ville!.quartiers;
  const cp = isLyon ? `6900${arrNum}` : "";

  const neighbors = isLyon
    ? arr!.voisins.map((n) => ({ label: `Lyon ${n}e`, to: `/services/${service.slug}/lyon-${n}` }))
    : VILLES_LYON.filter((v) => v.slug !== ville!.slug).slice(0, 6).map((v) => ({ label: v.nom, to: `/services/${service.slug}/${v.slug}` }));

  const faqs = [
    { q: `Quel est le délai d'intervention pour un ${service.title.toLowerCase()} ${isLyon ? `dans le ${arrNum}e` : `à ${ville!.nom}`} ?`, a: "Nous intervenons généralement sous 24 à 72h après signature du devis. En cas d'urgence, une intervention le jour même est possible." },
    { q: `Combien coûte un ${service.title.toLowerCase()} ${isLyon ? `dans le ${arrNum}e arrondissement de Lyon` : `à ${ville!.nom}`} ?`, a: "Les tarifs varient selon le volume et l'accessibilité. Comptez entre 20 et 50€/m³ pour un débarras classique. Devis gratuit et sans engagement sur simple appel." },
    { q: `Intervenez-vous le week-end ${isLyon ? `dans le ${arrNum}e` : `à ${ville!.nom}`} ?`, a: "Oui, nous intervenons 7j/7, y compris le week-end et les jours fériés, pour nous adapter à votre emploi du temps." },
  ];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nom || !form.tel) { toast.error("Veuillez remplir votre nom et téléphone."); return; }
    toast.success("Demande envoyée ! Nous vous rappelons sous 2h.");
    setForm({ nom: "", tel: "", email: "", message: "" });
  };

  const seoText = isLyon
    ? `${service.title} dans le ${arrNum}e arrondissement de Lyon — nous intervenons rapidement dans tout le ${arrNum}e (${cp}) et les arrondissements limitrophes. Nos équipes connaissent parfaitement le quartier ${arr!.nom} et ses contraintes : stationnement, accès immeuble, monte-meubles. Que vous ayez besoin d'un ${service.title.toLowerCase()} complet ou partiel, nous vous proposons un devis gratuit sous 2h. Notre expertise locale nous permet d'optimiser chaque intervention pour un service rapide et efficace. Contactez-nous au 06 09 99 17 36 pour une estimation gratuite. Nous intervenons également dans les quartiers de ${quartiers.join(" et ")}.`
    : `${service.title} à ${ville!.nom} (${ville!.dep}) — nous intervenons dans toute la ville et ses environs, à seulement ${ville!.dist} km de Lyon. Nos équipes se déplacent rapidement dans les quartiers de ${quartiers.join(" et ")} pour tous vos besoins de ${service.title.toLowerCase()}. Devis gratuit sous 2h, intervention sous 24 à 72h. Notre proximité avec ${ville!.nom} nous permet d'assurer un service réactif et de qualité. Contactez 3D Services au 06 09 99 17 36 pour une estimation gratuite et sans engagement.`;

  return (
    <Layout>
      <SEOHead
        title={`${service.title} ${zoneName} — 3D Services`}
        description={`${service.title} à ${zoneName}. Intervention rapide, devis gratuit. 3D Services intervient 7j/7 à ${zoneName} et environs.`}
        canonical={`/services/${service.slug}/${zoneSlug}`}
        jsonLd={[
          getServiceJsonLd(`${service.title} ${zoneName}`, `${service.title} professionnel à ${zoneName}`, `/services/${service.slug}/${zoneSlug}`),
          getBreadcrumbJsonLd([{ name: "Accueil", url: "/" }, { name: "Services", url: "/services" }, { name: service.title, url: `/services/${service.slug}` }, { name: zoneName, url: `/services/${service.slug}/${zoneSlug}` }]),
        ]}
      />
      {/* Hero */}
      <section className="gradient-primary py-16 relative noise-overlay">
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-6 flex-wrap">
            <Link to="/" className="hover:text-primary-foreground/80 transition-colors">Accueil</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-primary-foreground/80 transition-colors">Services</Link>
            <span>/</span>
            <Link to={`/services/${service.slug}`} className="hover:text-primary-foreground/80 transition-colors">{service.title}</Link>
            <span>/</span>
            <span className="text-primary-foreground">{zoneName}</span>
          </div>
          <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-primary-foreground mb-4">
            {service.title} {zoneName}
          </h1>
          <p className="text-primary-foreground/70 max-w-xl mb-6">
            Service de {service.title.toLowerCase()} {isLyon ? `dans le ${arrNum}e arrondissement de Lyon` : `à ${ville!.nom}`}. Intervention rapide, devis gratuit en 2h.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary-foreground/80"><Zap className="w-4 h-4 text-secondary" />Devis gratuit en 2h</span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary-foreground/80"><Zap className="w-4 h-4 text-gold" />Intervention 7j/7</span>
          </div>
          <Link to="/devis" className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full gradient-cta text-primary-foreground font-semibold shadow-glow hover:-translate-y-0.5 transition-all shimmer">
            Demander un devis gratuit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SEO text */}
      <SectionReveal>
        <section className="py-12 bg-card">
          <div className="container max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary-accent" />
              <h2 className="font-display font-bold text-xl text-foreground">
                {service.title} — {isLyon ? `${arrNum}e arrondissement` : ville!.nom}
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">{seoText}</p>
          </div>
        </section>
      </SectionReveal>

      {/* Gallery */}
      <BeforeAfterGrid items={service.gallery.slice(0, 3)} />

      {/* Neighbors */}
      <SectionReveal>
        <section className="py-12 bg-card">
          <div className="container text-center">
            <h2 className="font-display font-bold text-xl text-foreground mb-6">
              {isLyon ? "Arrondissements limitrophes de Lyon" : "Villes voisines"}
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {neighbors.map((n) => (
                <Link key={n.to} to={n.to} className="px-4 py-2 rounded-full bg-surface border border-border text-sm font-medium text-foreground hover:border-primary-accent hover:text-primary-accent transition-colors">
                  {n.label}
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
            Demandez votre devis gratuit
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} placeholder="Nom complet" className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-secondary" />
            <input value={form.tel} onChange={(e) => setForm({ ...form, tel: e.target.value })} placeholder="Téléphone" className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-secondary" />
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-secondary" />
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Décrivez votre besoin..." rows={3} className="w-full px-4 py-3 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-secondary resize-none" />
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
            <h2 className="font-display font-bold text-xl text-foreground text-center mb-8">Questions fréquentes</h2>
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

export default ZonePage;
