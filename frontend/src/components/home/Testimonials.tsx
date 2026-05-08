import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "../../components/SectionReveal";
import api from "../../lib/axios";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Review {
  id: number;
  author_name: string;
  text: string;
  rating: number;
  place_name: string | null;
  created_at: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const COLORS = [
  "bg-primary-accent",
  "bg-secondary",
  "bg-gold",
  "bg-destructive/70",
  "bg-primary",
];

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const TestimonialSkeleton = () => (
  <div className="bg-card rounded-2xl p-8 shadow-premium text-center animate-pulse">
    <div className="w-14 h-14 rounded-full bg-muted mx-auto mb-5" />
    <div className="flex justify-center gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-4 h-4 bg-muted rounded-sm" />
      ))}
    </div>
    <div className="space-y-2 mb-6 max-w-sm mx-auto">
      <div className="h-4 bg-muted rounded w-full" />
      <div className="h-4 bg-muted rounded w-4/5 mx-auto" />
      <div className="h-4 bg-muted rounded w-3/5 mx-auto" />
    </div>
    <div className="h-4 w-28 bg-muted rounded mx-auto mb-2" />
    <div className="h-3 w-40 bg-muted rounded mx-auto" />
  </div>
);

// ─── Component ────────────────────────────────────────────────────────────────

const Testimonials = () => {
  const [reviews, setReviews]   = useState<Review[]>([]);
  const [loading, setLoading]   = useState(true);
  const [current, setCurrent]   = useState(0);
  const [paused, setPaused]     = useState(false);

  // Fetch depuis Laravel
  useEffect(() => {
    api.get<Review[]>("/reviews")
      .then(({ data }) => {
        // Garde seulement les avis avec du texte et une note 5★
        const filtered = Array.isArray(data)
          ? data.filter((r) => r.text && r.rating >= 4)
          : [];
        setReviews(filtered);
      })
      .catch((err) => console.error("Erreur reviews:", err))
      .finally(() => setLoading(false));
  }, []);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % reviews.length),
    [reviews.length]
  );
  const prev = () =>
    setCurrent((c) => (c - 1 + reviews.length) % reviews.length);

  // Auto-play
  useEffect(() => {
    if (paused || reviews.length === 0) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [paused, next, reviews.length]);

  // Stats dynamiques
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : "4.9";
  const total = reviews.length;

  return (
    <section className="py-20 bg-surface">
      <SectionReveal>
        <div className="container">
          {/* Header */}
          <div className="text-center mb-14">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-3">
              Ce que disent nos clients
            </h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gold fill-gold" />
              ))}
            </div>
            <p className="text-muted-foreground">
              {avgRating} / 5 basé sur {total > 0 ? `${total}+` : "200+"} avis
            </p>
          </div>

          {/* Skeleton */}
          {loading && (
            <div className="max-w-2xl mx-auto">
              <TestimonialSkeleton />
            </div>
          )}

          {/* Carousel */}
          {!loading && reviews.length > 0 && (
            <div
              className="relative max-w-2xl mx-auto"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={reviews[current].id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4 }}
                  className="bg-card rounded-2xl p-8 shadow-premium text-center"
                >
                  {/* Avatar */}
                  <div
                    className={`w-14 h-14 rounded-full ${COLORS[current % COLORS.length]} flex items-center justify-center mx-auto mb-5`}
                  >
                    <span className="text-xl font-bold text-primary-foreground">
                      {reviews[current].author_name?.charAt(0).toUpperCase() ?? "?"}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center justify-center gap-0.5 mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i <= reviews[current].rating
                            ? "text-gold fill-gold"
                            : "text-muted fill-muted"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-foreground text-lg leading-relaxed mb-6 italic">
                    "{reviews[current].text}"
                  </p>

                  {/* Author */}
                  <p className="font-display font-bold text-foreground">
                    {reviews[current].author_name}
                  </p>
                  {reviews[current].place_name && (
                    <p className="text-sm text-muted-foreground">
                      {reviews[current].place_name}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Nav arrows */}
              <button
                onClick={prev}
                className="absolute top-1/2 -left-4 -translate-y-1/2 w-10 h-10 rounded-full bg-card shadow-card items-center justify-center hover:bg-muted transition-colors hidden md:flex"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={next}
                className="absolute top-1/2 -right-4 -translate-y-1/2 w-10 h-10 rounded-full bg-card shadow-card items-center justify-center hover:bg-muted transition-colors hidden md:flex"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === current ? "w-8 bg-primary-accent" : "w-3 bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {!loading && reviews.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              Aucun avis disponible pour le moment.
            </p>
          )}
        </div>
      </SectionReveal>
    </section>
  );
};

export default Testimonials;