import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, CheckCircle, Phone, FileText, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionReveal from "@/components/SectionReveal";
import { articles } from "@/pages/Actualites";
import { useState, useRef, useCallback } from "react";
import { GripVertical } from "lucide-react";

const BeforeAfterLarge = ({ before, after }: { before: string; after: string }) => {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{ height: 500 }}
      onPointerDown={e => { dragging.current = true; (e.target as HTMLElement).setPointerCapture(e.pointerId); updatePos(e.clientX); }}
      onPointerMove={e => { if (dragging.current) updatePos(e.clientX); }}
      onPointerUp={() => { dragging.current = false; }}
    >
      <img src={before} alt="Avant" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <img src={after} alt="Après" className="absolute inset-0 w-full h-full object-cover" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} draggable={false} />
      <div className="absolute top-0 bottom-0 w-0.5 bg-card z-10" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card shadow-premium flex items-center justify-center">
          <GripVertical className="w-6 h-6 text-foreground" />
        </div>
      </div>
      <span className="absolute bottom-4 left-4 px-3 py-1.5 rounded-md bg-destructive/80 text-primary-foreground text-sm font-bold z-20">AVANT</span>
      <span className="absolute bottom-4 right-4 px-3 py-1.5 rounded-md bg-secondary/80 text-primary-foreground text-sm font-bold z-20">APRÈS</span>
    </div>
  );
};

const ActualiteDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article non trouvé</h1>
          <Link to="/actualites" className="text-primary-accent underline">Retour aux actualités</Link>
        </div>
      </Layout>
    );
  }

  const similar = articles.filter(a => a.category === article.category && a.slug !== article.slug).slice(0, 3);

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-primary py-12">
        <div className="container">
          <div className="flex items-center gap-2 text-primary-foreground/60 text-sm mb-4">
            <Link to="/" className="hover:text-primary-foreground">Accueil</Link>
            <span>/</span>
            <Link to="/actualites" className="hover:text-primary-foreground">Actualités</Link>
            <span>/</span>
            <span className="text-primary-foreground">{article.title}</span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-primary-foreground mb-3">{article.title}</h1>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground text-xs font-medium">{article.category}</span>
            <span className="px-3 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground text-xs font-medium">{article.date}</span>
            <span className="px-3 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground text-xs font-medium">{article.lieu}</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-surface">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Main content */}
            <div className="lg:col-span-3">
              {article.imageBefore && article.imageAfter ? (
                <BeforeAfterLarge before={article.imageBefore} after={article.imageAfter} />
              ) : (
                <img src={article.image} alt={article.title} className="w-full rounded-xl object-cover" style={{ height: 500 }} />
              )}

              <div className="mt-8 prose prose-sm max-w-none text-muted-foreground">
                <p className="text-base leading-relaxed">{article.description}</p>
                <p className="mt-4 leading-relaxed">
                  L'intervention a été réalisée par notre équipe de professionnels expérimentés. Chaque étape du chantier a été soigneusement planifiée pour garantir un résultat optimal dans les meilleurs délais.
                </p>
                <p className="mt-4 leading-relaxed">
                  Notre équipe a procédé au tri sélectif de l'ensemble des éléments présents, en séparant les objets valorisables, recyclables et les déchets à évacuer. Cette approche éco-responsable nous permet de limiter l'impact environnemental.
                </p>
                <p className="mt-4 leading-relaxed">
                  Le client a exprimé sa pleine satisfaction quant à la qualité du travail réalisé, le respect des délais annoncés et la conformité au devis initial. Un nettoyage complet des lieux a été effectué en fin d'intervention.
                </p>
              </div>

              {/* Gallery */}
              <div className="mt-10">
                <h3 className="font-display font-bold text-lg text-foreground mb-4">Photos du chantier</h3>
                <div className="grid grid-cols-3 gap-3">
                  <img src={article.image} alt="" className="rounded-lg w-full aspect-square object-cover" />
                  {article.imageBefore && <img src={article.imageBefore} alt="" className="rounded-lg w-full aspect-square object-cover" />}
                  {article.imageAfter && <img src={article.imageAfter} alt="" className="rounded-lg w-full aspect-square object-cover" />}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 space-y-6">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-bold text-foreground mb-4">Vous avez un projet similaire ?</h3>
                  <div className="space-y-3">
                    <Link to="/devis" className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-secondary text-primary-foreground font-bold hover:bg-secondary/90 transition-colors">
                      <FileText className="w-5 h-5" /> Devis gratuit
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a href="tel:0609991736" className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-primary-accent text-primary-foreground font-bold hover:bg-primary-accent/90 transition-colors">
                      <Phone className="w-5 h-5" /> 06 09 99 17 36
                    </a>
                    <a
                      href="https://wa.me/33609991736?text=Bonjour, je souhaite un devis"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-[#25D366] text-white font-bold hover:bg-[#20bd5a] transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>

                  <div className="border-t border-border mt-5 pt-5 space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary-accent" /> {article.lieu}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary-accent" /> {article.date}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary-accent" /> 1-2 jours
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-secondary" /> Client satisfait
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar articles */}
      {similar.length > 0 && (
        <SectionReveal>
          <section className="py-16 bg-card">
            <div className="container">
              <h2 className="font-display font-bold text-2xl text-foreground mb-8 text-center">Chantiers similaires</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similar.map((a, i) => (
                  <motion.div key={a.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <Link to={`/actualites/${a.slug}`} className="group block rounded-xl border border-border bg-card overflow-hidden hover:shadow-premium hover:-translate-y-1 transition-all">
                      <div className="aspect-video overflow-hidden">
                        <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-sm text-foreground mb-1">{a.title}</h3>
                        <p className="text-xs text-muted-foreground">{a.lieu} • {a.date}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link to="/actualites" className="inline-flex items-center gap-2 text-primary-accent font-semibold hover:underline">
                  Voir tous nos chantiers <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        </SectionReveal>
      )}

      {/* CTA */}
      <section className="gradient-primary py-16">
        <div className="container text-center">
          <h2 className="font-display font-bold text-2xl text-primary-foreground mb-3">Vous avez un projet similaire ?</h2>
          <p className="text-primary-foreground/70 mb-6">Devis gratuit en 2h • Intervention rapide</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/devis" className="px-8 py-3 rounded-lg bg-secondary text-primary-foreground font-bold hover:bg-secondary/90 transition-colors">
              Demander un devis gratuit
            </Link>
            <a href="tel:0609991736" className="px-8 py-3 rounded-lg border-2 border-primary-foreground/30 text-primary-foreground font-bold hover:bg-primary-foreground/10 transition-colors">
              Appeler le 06 09 99 17 36
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ActualiteDetail;
