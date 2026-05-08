import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, GripVertical } from "lucide-react";
import Layout from "../components/layout/Layout";
import SectionReveal from "../components/SectionReveal";
import SEOHead from "../components/SEOHead";
import { getSEOForPath } from "../data/seo";
import api from "../lib/axios";

export interface Article {
  id: string;
  title: string;
  service: { id: number; title: string };
  date: string;
  location: string;
  image: string;
  image_before?: string;
  image_after?: string;
  description: string;
}

const categories = ["Tous", "Débarras", "Nettoyage", "Démolition", "Désamiantage"];

const categoryColor: Record<string, string> = {
  "Débarras": "bg-primary-accent text-primary-foreground",
  "Nettoyage": "bg-secondary text-primary-foreground",
  "Démolition": "bg-destructive text-primary-foreground",
  "Désamiantage": "bg-gold text-primary",
};

// ✅ Cache en mémoire — persiste tant que la page n'est pas rechargée
let articlesCache: Article[] | null = null;

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

// ✅ Skeleton card pendant le chargement
const SkeletonCard = () => (
  <div className="rounded-xl border border-border bg-card overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-muted" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-muted rounded w-3/4" />
      <div className="h-3 bg-muted rounded w-1/3" />
      <div className="h-3 bg-muted rounded w-full" />
      <div className="h-3 bg-muted rounded w-2/3" />
    </div>
  </div>
);

const Actualites = () => {
  const [filter, setFilter] = useState("Tous");
  // ✅ Initialise directement depuis le cache si dispo
  const [articles, setArticles] = useState<Article[]>(articlesCache ?? []);
  const [loading, setLoading] = useState(!articlesCache);

  useEffect(() => {
    // ✅ Si cache dispo → pas de requête
    if (articlesCache) return;

    const controller = new AbortController();

    api.get("/actualites", { signal: controller.signal })
      .then(res => {
        articlesCache = res.data.data;
        setArticles(articlesCache!);
      })
      .catch(err => {
        if (err.name !== "CanceledError") {
          console.error("Erreur lors du chargement des actualités :", err);
        }
      })
      .finally(() => setLoading(false));

    // ✅ Annule la requête si on quitte la page avant la fin
    return () => controller.abort();
  }, []);

  const filtered = filter === "Tous" ? articles : articles.filter(a => a.service.title === filter);

  return (
    <Layout>
      <SEOHead {...getSEOForPath("/actualites")} canonical="/actualites" url="/actualites" />

      <section className="gradient-primary py-16">
        <div className="container text-center">
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-primary-foreground mb-3">
            Nos Réalisations & Actualités
          </h1>
          <p className="text-primary-foreground/70">Découvrez nos derniers chantiers et interventions à Lyon et sa région</p>
        </div>
      </section>

      <section className="py-16 bg-surface">
        <SectionReveal>
          <div className="container">
            <div className="flex justify-center gap-2 mb-10 flex-wrap">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${filter === c ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                >
                  {c}
                </button>
              ))}
            </div>

            {loading ? (
              // ✅ Skeletons à la place du simple texte
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((a, i) => (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      to={`/actualites/${a.id}`}
                      state={{ article: a, allArticles: filtered }}
                      className="group block rounded-xl border border-border bg-card overflow-hidden hover:shadow-premium hover:-translate-y-1 transition-all duration-200"
                    >
                      {a.image_before && a.image_after ? (
                        <BeforeAfterMini before={a.image_before} after={a.image_after} />
                      ) : (
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={a.image_before || a.image_after || a.image}
                            alt={a.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <span
                        className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${
                          categoryColor[a.service.title] || "bg-muted text-foreground"
                        }`}
                      >
                        {a.service.title}
                      </span>

                      <div className="p-5">
                        <h3 className="font-bold text-[15px] text-foreground mb-1 line-clamp-2">{a.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{a.location}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{a.description}</p>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-accent group-hover:underline">
                          Lire la suite <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </SectionReveal>
      </section>
    </Layout>
  );
};

export default Actualites;