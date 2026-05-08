// src/pages/Reviews.tsx
import { useState, useEffect, useRef } from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import { Star, ArrowRight, Quote } from "lucide-react";
import { motion } from "framer-motion";
import SectionReveal from "../components/SectionReveal";
import SEOHead from "../components/SEOHead";
import { getSEOForPath } from "../data/seo";
import api from "../lib/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Review {
  id: number;
  author_name: string;
  text: string;
  rating: number;
  place_name: string | null;
  created_at: string;
  review_url: string | null; // ← URL directe vers l'avis Google
}

// ─── Constants ────────────────────────────────────────────────────────────────

const filters = ["Tous"];

const GOOGLE_REVIEW_URL = "https://g.page/r/CSm1dcchpa4IEAI/review";

// ─── Google Logo SVG ──────────────────────────────────────────────────────────

const GoogleLogo = ({ size = 20 }: { size?: number }) => (
  <svg viewBox="0 0 48 48" width={size} height={size} aria-label="Google" className="shrink-0">
    <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
    <path fill="#34A853" d="M6.3 14.7l7 5.1C15.2 16.2 19.3 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.7 7.4 6.3 14.7z"/>
    <path fill="#FBBC05" d="M24 46c5.8 0 10.8-1.9 14.8-5.2l-6.8-5.6C29.8 36.9 27 38 24 38c-6.1 0-11.2-4.1-13-9.6l-7 5.4C7.6 41.6 15.3 46 24 46z"/>
    <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.9 2.8-2.8 5.1-5.3 6.7l6.8 5.6C41 37.1 45 31.2 45 24c0-1.3-.2-2.7-.5-4z"/>
  </svg>
);

// ─── StatBar ──────────────────────────────────────────────────────────────────

const StatBar = ({ label, pct }: { label: string; pct: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.5 }
    );
    ref.current && obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex items-center gap-3">
      <span className="text-sm text-primary-foreground/70 w-24 shrink-0">{label}</span>
      <div className="flex-1 h-3 rounded-full bg-primary-foreground/10 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gold"
          initial={{ width: 0 }}
          animate={visible ? { width: `${pct}%` } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <span className="text-sm font-bold text-primary-foreground w-10 text-right">{pct}%</span>
    </div>
  );
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const ReviewSkeleton = () => (
  <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm animate-pulse text-center">
    <div className="flex justify-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-5 h-5 bg-gray-200 rounded-sm" />
      ))}
    </div>
    <div className="space-y-2 mb-5 max-w-md mx-auto">
      <div className="h-3 bg-gray-200 rounded w-full mx-auto" />
      <div className="h-3 bg-gray-200 rounded w-4/5 mx-auto" />
      <div className="h-3 bg-gray-200 rounded w-3/5 mx-auto" />
    </div>
    <div className="h-3.5 w-32 bg-gray-200 rounded mx-auto mb-4" />
    <div className="flex items-center justify-center gap-2">
      <div className="w-5 h-5 bg-gray-200 rounded-full" />
      <div className="h-2.5 w-20 bg-gray-200 rounded" />
    </div>
  </div>
);

// ─── ReviewCard ───────────────────────────────────────────────────────────────

const ReviewCard = ({ review, index }: { review: Review; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const MAX = 180;
  const isLong = (review.text?.length ?? 0) > MAX;
  const displayText =
    isLong && !expanded ? review.text.slice(0, MAX) + "…" : review.text;

  // URL vers l'avis spécifique, sinon vers la page générale Google
  const reviewLink = review.review_url ?? GOOGLE_REVIEW_URL;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.06, 0.3) }}
      className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm text-center"
    >
      {/* Stars */}
      <div className="flex justify-center gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i <= (review.rating ?? 0)
                ? "text-[#FBBC05] fill-[#FBBC05]"
                : "text-gray-200 fill-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Text */}
      <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-5 max-w-xl mx-auto">
        {displayText}
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-1 text-[#4285F4] text-xs font-medium hover:underline focus:outline-none"
          >
            {expanded ? "Voir moins" : "Voir plus"}
          </button>
        )}
      </p>

      {/* Author — cliquable → avis Google */}
      <a
        href={reviewLink}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-gray-900 text-sm mb-3 hover:text-[#4285F4] transition-colors inline-block"
      >
        {review.author_name ?? "Anonyme"}
      </a>

      {/* Google badge — cliquable → avis Google */}
      <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-400">
        <a
          href={reviewLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
          aria-label={`Voir l'avis de ${review.author_name} sur Google`}
        >
          <GoogleLogo size={18} />
          <span className="text-gray-400">Publié le</span>
          <span className="text-[#4285F4] font-medium underline underline-offset-2">Google</span>
        </a>
      </div>
    </motion.div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);
  const [filter, setFilter]   = useState("Tous");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get("/reviews");
        setReviews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erreur reviews:", err);
        setError("Impossible de charger les avis.");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const total     = reviews.length;
  const pct5      = total ? Math.round((reviews.filter((r) => r.rating === 5).length / total) * 100) : 92;
  const pct4      = total ? Math.round((reviews.filter((r) => r.rating === 4).length / total) * 100) : 6;
  const pct3      = total ? Math.round((reviews.filter((r) => r.rating <= 3).length / total) * 100) : 2;
  const avgRating = total > 0
    ? (reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / total).toFixed(1)
    : "4.9";

  const filtered = filter === "Tous"
    ? reviews
    : reviews.filter((r) => (r as any).tag === filter);

  const featured = [...reviews]
    .filter((r) => r.rating === 5 && (r.text?.length ?? 0) > 60)
    .sort((a, b) => (b.text?.length ?? 0) - (a.text?.length ?? 0))[0];

  return (
    <Layout>
      <SEOHead {...getSEOForPath("/avis")} canonical="/avis" url="/avis" />

      {/* ── Hero (INCHANGÉ) ───────────────────────────────────────────────── */}
      <section className="gradient-primary py-20 relative noise-overlay">
        <div className="container relative z-10 text-center">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-6 justify-center">
            <Link to="/" className="hover:text-primary-foreground/80 transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <span className="text-primary-foreground">Avis Clients</span>
          </div>

          <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-primary-foreground mb-6">
            Ils nous font confiance
          </h1>

          <div className="flex items-center justify-center gap-2 mb-3">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.15, type: "spring" }}
              >
                <Star className="w-8 h-8 text-gold fill-gold" />
              </motion.div>
            ))}
          </div>

          <p className="text-3xl font-display font-bold text-primary-foreground">
            {avgRating} / 5
          </p>
          <p className="text-primary-foreground/60 mb-8">
            basé sur {total > 0 ? `${total}+` : "200+"} avis Google
          </p>

          <div className="max-w-md mx-auto space-y-2">
            <StatBar label="⭐⭐⭐⭐⭐" pct={pct5} />
            <StatBar label="⭐⭐⭐⭐"   pct={pct4} />
            <StatBar label="⭐⭐⭐"     pct={pct3} />
          </div>
        </div>
      </section>

      {/* ── Filters (INCHANGÉ) ────────────────────────────────────────────── */}
      <section className="py-6 bg-surface border-b border-border">
        <div className="container flex justify-center gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-primary-accent text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* ── Section Google Avis ───────────────────────────────────────────── */}
      <SectionReveal>
        <section className="py-12 bg-gray-50">
          <div className="container max-w-3xl">

            <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900 mb-6">
              Avis de nos clients :{" "}
              <span className="text-[#34A853]">Satisfaction assurée à 99%</span>
            </h2>

            {/* Badge Google + bouton */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm mb-6">
              <div className="flex items-center gap-3">
                <GoogleLogo size={26} />
                <div>
                  <p className="font-bold text-gray-800 text-sm">Google Avis</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xl font-bold text-gray-900">{avgRating}</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-[#FBBC05] fill-[#FBBC05]" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">
                      ({total > 0 ? total : "439"})
                    </span>
                  </div>
                </div>
              </div>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#4285F4] hover:bg-[#3367D6] text-white text-sm font-semibold transition-colors whitespace-nowrap"
              >
                Laissez-nous un avis sur Google
              </a>
            </div>

            {/* Error */}
            {error && (
              <div className="text-center py-10">
                <p className="text-red-500 font-medium mb-3">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-5 py-2 rounded-lg border border-gray-200 text-sm hover:bg-white transition"
                >
                  Réessayer
                </button>
              </div>
            )}

            {/* Skeletons */}
            {loading && !error && (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => <ReviewSkeleton key={i} />)}
              </div>
            )}

            {/* Liste des avis */}
            {!loading && !error && (
              <>
                {filtered.length === 0 ? (
                  <p className="text-center text-gray-400 py-10">Aucun avis disponible.</p>
                ) : (
                  <div className="space-y-4">
                    {filtered.map((r, i) => (
                      <ReviewCard key={r.id} review={r} index={i} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </SectionReveal>

      {/* ── Featured Testimonial ──────────────────────────────────────────── */}
      {!loading && featured && (
        <section className="gradient-primary py-16 noise-overlay">
          <div className="container relative z-10 max-w-3xl text-center">
            <Quote className="w-12 h-12 text-gold/30 mx-auto mb-4" />
            <p className="font-serif-display text-xl sm:text-2xl text-primary-foreground leading-relaxed mb-6">
              "{featured.text}"
            </p>
            {/* Nom cliquable dans le featured aussi */}
            <a
              href={featured.review_url ?? GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold font-display font-bold hover:underline"
            >
              {featured.author_name}
            </a>
            {featured.place_name && (
              <p className="text-primary-foreground/50 text-sm mt-1">{featured.place_name}</p>
            )}
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <SectionReveal>
        <section className="py-16 bg-card">
          <div className="container text-center">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-4">
              Rejoignez nos clients satisfaits
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Demandez votre devis gratuit et découvrez pourquoi plus de{" "}
              {total > 0 ? total.toLocaleString("fr-FR") : "1 500"} clients nous font confiance.
            </p>
            <Link
              to="/devis"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-cta text-primary-foreground font-bold text-base shadow-glow hover:shadow-lg hover:-translate-y-0.5 transition-all shimmer"
            >
              Demander un devis gratuit <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </SectionReveal>
    </Layout>
  );
};

export default Reviews;