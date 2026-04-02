import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";
import { getSEOForPath } from "@/data/seo";


export interface Article {
  slug: string;
  title: string;
  category: string;
  date: string;
  lieu: string;
  image: string;
  imageBefore?: string;
  imageAfter?: string;
  description: string;
}

export const articles: Article[] = [
  // === MISSIONS DÉBARRAS ===
  {
    slug: "evacuation-dechets-lyon-3",
    title: "Évacuation de déchets — Lyon 3e",
    category: "Débarras",
    date: "Mars 2026",
    lieu: "Lyon 3e (69003)",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    imageBefore: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    imageAfter: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
    description: "Évacuation complète de déchets et encombrants dans un appartement de 70m². Tri sélectif, recyclage et nettoyage inclus.",
  },
  {
    slug: "debarras-nettoyage-appartement-villeurbanne",
    title: "Débarras et nettoyage d'un appartement — Villeurbanne",
    category: "Débarras",
    date: "Février 2026",
    lieu: "Villeurbanne (69100)",
    image: "https://images.unsplash.com/photo-1584467735871-8e4e9d979e7d?w=800",
    imageBefore: "https://images.unsplash.com/photo-1584467735871-8e4e9d979e7d?w=800",
    imageAfter: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    description: "Débarras complet d'un appartement de 55m² suite à une succession. Mobilier, archives et électroménager évacués en une journée.",
  },
  {
    slug: "debarras-encombrants-venissieux",
    title: "Débarras encombrants — Vénissieux",
    category: "Débarras",
    date: "Janvier 2026",
    lieu: "Vénissieux (69200)",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    imageBefore: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    imageAfter: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
    description: "Enlèvement d'encombrants dans un garage de 40m² : vieux meubles, électroménager, matériaux divers. Intervention rapide.",
  },
  {
    slug: "debarras-cave-caluire",
    title: "Vidage de cave — Caluire-et-Cuire",
    category: "Débarras",
    date: "Décembre 2025",
    lieu: "Caluire-et-Cuire (69300)",
    image: "https://images.unsplash.com/photo-1584467735871-8e4e9d979e7d?w=800",
    imageBefore: "https://images.unsplash.com/photo-1584467735871-8e4e9d979e7d?w=800",
    imageAfter: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    description: "Débarras d'une cave accumulée depuis 20 ans. Meubles anciens, archives, cartons — tout évacué en une demi-journée.",
  },
  // === MISSIONS NETTOYAGE ===
  {
    slug: "nettoyage-diogene-lyon-7",
    title: "Nettoyage syndrome de Diogène — Lyon 7e",
    category: "Nettoyage",
    date: "Mars 2026",
    lieu: "Lyon 7e (69007)",
    image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800",
    description: "Prise en charge complète d'un appartement touché par le syndrome de Diogène. Débarras, désinfection et remise en état.",
  },
  {
    slug: "nettoyage-fin-chantier-bron",
    title: "Nettoyage fin de chantier — Bron",
    category: "Nettoyage",
    date: "Février 2026",
    lieu: "Bron (69500)",
    image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800",
    description: "Nettoyage complet après rénovation d'un local commercial de 120m². Poussière, résidus de peinture, vitres — tout impeccable.",
  },
  {
    slug: "nettoyage-vitres-creche-villeurbanne",
    title: "Nettoyage vitres d'une crèche — Villeurbanne",
    category: "Nettoyage",
    date: "Janvier 2026",
    lieu: "Villeurbanne (69100)",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    description: "Nettoyage professionnel de toutes les vitres intérieures et extérieures d'une crèche municipale. Produits écologiques utilisés.",
  },
  {
    slug: "poncage-carrelage-saint-etienne",
    title: "Ponçage carrelage professionnel — Saint-Étienne",
    category: "Nettoyage",
    date: "Décembre 2025",
    lieu: "Saint-Étienne (42000)",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800",
    description: "Ponçage et cristallisation de carrelage dans un hall d'immeuble. Résultat brillant et durable.",
  },
  // === MISSIONS DÉMOLITION ===
  {
    slug: "demolition-cloisons-lyon-6",
    title: "Démolition cloisons — Lyon 6e",
    category: "Démolition",
    date: "Février 2026",
    lieu: "Lyon 6e (69006)",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800",
    description: "Démolition de 3 cloisons pour créer un grand espace ouvert dans un appartement de 90m². Gravats évacués le jour même.",
  },
  // === MISSIONS DÉSAMIANTAGE ===
  {
    slug: "desamiantage-toiture-lyon-8",
    title: "Désamiantage toiture — Lyon 8e",
    category: "Désamiantage",
    date: "Janvier 2026",
    lieu: "Lyon 8e (69008)",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    description: "Retrait de plaques de fibrociment amiantées sur une surface de 50m². Intervention certifiée, rapport de fin de travaux remis.",
  },
];

const categories = ["Tous", "Débarras", "Nettoyage", "Démolition", "Désamiantage"];

const categoryColor: Record<string, string> = {
  "Débarras": "bg-primary-accent text-primary-foreground",
  "Nettoyage": "bg-secondary text-primary-foreground",
  "Démolition": "bg-destructive text-primary-foreground",
  "Désamiantage": "bg-gold text-primary",
};

const Actualites = () => {
  const [filter, setFilter] = useState("Tous");

  const filtered = filter === "Tous" ? articles : articles.filter(a => a.category === filter);

  return (
    <Layout>
      <SEOHead {...getSEOForPath("/actualites")} canonical="/actualites" />
      {/* Hero */}
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
            {/* Filters */}
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

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((a, i) => (
                <motion.div
                  key={a.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={`/actualites/${a.slug}`}
                    className="group block rounded-xl border border-border bg-card overflow-hidden hover:shadow-premium hover:-translate-y-1 transition-all duration-200"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${categoryColor[a.category] || "bg-muted text-foreground"}`}>
                        {a.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-[15px] text-foreground mb-1 line-clamp-2">{a.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{a.lieu} • {a.date}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{a.description}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-accent group-hover:underline">
                        Lire la suite <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </section>
    </Layout>
  );
};

export default Actualites;
