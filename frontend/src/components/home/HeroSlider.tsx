import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone, CheckCircle, Zap, Recycle, Star } from "lucide-react";

const slides = [
  {
    tag: "✦ Intervention rapide 24h",
    title: "Débarras & Nettoyage\nà Lyon et alentours",
    subtitle: "Particuliers & Professionnels — Devis gratuit en 2h — 200km autour de Lyon",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
  },
  {
    tag: "✦ Éco-responsable",
    title: "Vos objets méritent\nune seconde vie",
    subtitle: "Nous donnons, revendons ou recyclons tout ce que nous récupérons",
    image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1920&q=80",
  },
  {
    tag: "✦ Débarras gratuit possible",
    title: "Votre débarras peut\nêtre 100% gratuit",
    subtitle: "Selon la valeur de vos objets, nous pouvons vous rémunérer",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80",
  },
];

const badges = [
  { icon: CheckCircle, label: "Devis gratuit" },
  { icon: Zap, label: "Intervention sous 24h" },
  { icon: Recycle, label: "Éco-responsable" },
  { icon: Star, label: "99% satisfaits" },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
      {/* Background images with crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-[#0D1B3E]/75" />

      <div className="container relative z-10 py-20 lg:py-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-semibold mb-6 backdrop-blur-sm"
            >
              {slides[current].tag}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[900] text-white leading-[1.1] mb-6 whitespace-pre-line"
            >
              {slides[current].title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="text-lg sm:text-xl text-white/75 max-w-xl mb-8"
            >
              {slides[current].subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/devis"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#1A56DB] text-white font-bold text-base shadow-lg hover:bg-[#1347BE] hover:-translate-y-0.5 transition-all"
              >
                Devis Gratuit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:0609991736"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border-2 border-white/30 text-white font-semibold text-base hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                <Phone className="w-4 h-4" />
                06 09 99 17 36
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="flex gap-2 mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current ? "w-10 bg-[#16A34A]" : "w-4 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trust badges */}
      <div className="container relative z-10 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {badges.map((b) => (
            <div
              key={b.label}
              className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl px-4 py-3 flex items-center gap-3"
            >
              <b.icon className="w-5 h-5 text-[#16A34A] shrink-0" />
              <span className="text-sm font-medium text-white/90">{b.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSlider;
