import { useParams, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, CheckCircle, Phone, FileText, ArrowRight, GripVertical } from "lucide-react";
import Layout from "../components/layout/Layout";
import SectionReveal from "../components/SectionReveal";
import type { Article } from "../pages/Actualites";
import { useState, useRef, useCallback } from "react";

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
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  // ✅ Données passées directement depuis Actualites.tsx via state — zéro fetch
  const article: Article | undefined = location.state?.article;
  const allArticles: Article[] = location.state?.allArticles ?? [];
  const similar = allArticles
    .filter(a => a.service.id === article?.service.id && a.id !== id)
    .slice(0, 3);

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
const BeforeAfterMini = ({ before, after }: { before: string; after: string }) => {
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
      className="relative w-full h-48 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onPointerDown={e => { dragging.current = true; (e.target as HTMLElement).setPointerCapture(e.pointerId); updatePos(e.clientX); }}
      onPointerMove={e => { if (dragging.current) updatePos(e.clientX); }}
      onPointerUp={() => { dragging.current = false; }}
    >
      <img src={before} alt="Avant" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <img src={after} alt="Après" className="absolute inset-0 w-full h-full object-cover" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} draggable={false} />
      <div className="absolute top-0 bottom-0 w-0.5 bg-white z-10" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center">
          <GripVertical className="w-4 h-4 text-gray-700" />
        </div>
      </div>
      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-red-600 text-white text-xs font-bold z-20">AVANT</span>
      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-green-600 text-white text-xs font-bold z-20">APRÈS</span>
    </div>
  );
};
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
            <span className="px-3 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground text-xs font-medium">{article.service.title}</span>
            <span className="px-3 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground text-xs font-medium">{article.location}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-surface">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Main content */}
            <div className="lg:col-span-3">
              {article.image_before && article.image_after ? (
                <BeforeAfterLarge before={article.image_before} after={article.image_after} />
              ) : (
                <img src={article.image} alt={article.title} className="w-full rounded-xl object-cover" style={{ height: 500 }} />
              )}

              <div className="mt-8 prose prose-sm max-w-none text-muted-foreground">
                <p className="text-base leading-relaxed">{article.description}</p>
              </div>

              {/* Gallery */}
              <div className="mt-10">
                <h3 className="font-display font-bold text-lg text-foreground mb-4">Photos du chantier</h3>
                <div className="grid grid-cols-3 gap-3">
                  <img src={article.image}  alt={article.title} className="rounded-lg w-full aspect-square object-cover" />
                  {article.image_before && <img src={article.image_before}  alt={article.title} className="rounded-lg w-full aspect-square object-cover" />}
                  {article.image_after && <img src={article.image_after}  alt={article.title} className="rounded-lg w-full aspect-square object-cover" />}
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
                      <MapPin className="w-4 h-4 text-primary-accent" /> {article.location}
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
      {/* Similar articles */}
{similar.length > 0 && (
  <SectionReveal>
    <section className="py-16 bg-card">
      <div className="container">
        <h2 className="font-display font-bold text-2xl text-foreground mb-8 text-center">Chantiers similaires</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {similar.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/actualites/${a.id}`}
                state={{ article: a, allArticles }}
                className="group block rounded-xl border border-border bg-card overflow-hidden hover:shadow-premium hover:-translate-y-1 transition-all"
              >
                {/* ✅ Mini slider avant/après comme dans la liste */}
                {a.image_before && a.image_after ? (
                  <BeforeAfterMini before={a.image_before} after={a.image_after} />
                ) : (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={a.image_after || a.image_before || a.image}
                      alt={a.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-sm text-foreground mb-1">{a.title}</h3>
                  <p className="text-xs text-muted-foreground">{a.location}</p>
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