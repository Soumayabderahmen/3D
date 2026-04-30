import { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GripVertical, ArrowRight, ExternalLink } from "lucide-react";
import SectionReveal from "../components/SectionReveal";

interface SliderData {
  label: string;
  before: string;
  after: string;
  caption: string;
  slug: string;
}

const sliders: SliderData[] = [
  {
    label: "Appartement Paris 75",
    before: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    after: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
    caption: "Appartement Paris 75 — Débarras complet",
    slug: "debarras-appartement-paris-75",
  },
  {
    label: "Cave Seine-et-Marne 77",
    before: "https://images.unsplash.com/photo-1584467735871-8e4e9d979e7d?w=800&h=600&fit=crop",
    after: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    caption: "Cave Meaux 77 — Vidage total",
    slug: "debarras-cave-seine-marne-77",
  },
  {
    label: "Bureau Hauts-de-Seine 92",
    before: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&h=600&fit=crop",
    after: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    caption: "Bureau Boulogne 92 — Débarras professionnel",
    slug: "debarras-bureau-hauts-de-seine-92",
  },
];

const Slider = ({ data }: { data: SliderData }) => {
  const [pos, setPos] = useState(50);
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePos(e.clientX);
  }, [updatePos]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (dragging.current) updatePos(e.clientX);
  }, [updatePos]);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <div className="space-y-2">
      <div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          ref={containerRef}
          className="relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <img src={data.before} alt="Avant" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
          <img
            src={data.after}
            alt="Après"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            draggable={false}
          />
          <div className="absolute top-0 bottom-0 w-0.5 bg-card z-10" style={{ left: `${pos}%` }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card shadow-premium flex items-center justify-center">
              <GripVertical className="w-5 h-5 text-foreground" />
            </div>
          </div>
          <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-destructive/80 text-primary-foreground text-xs font-bold z-20">AVANT</span>
          <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-secondary/80 text-primary-foreground text-xs font-bold z-20">APRÈS</span>
        </div>

        {/* Hover overlay with link */}
        <Link
          to={`/actualites/${data.slug}`}
          className={`absolute inset-0 rounded-xl z-30 flex flex-col items-center justify-center gap-2 bg-black/30 transition-opacity duration-200 ${hovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <ExternalLink className="w-8 h-8 text-primary-foreground" />
          <span className="text-primary-foreground font-semibold text-sm">Voir le détail</span>
        </Link>
      </div>
      <p className="text-center text-xs text-muted-foreground">{data.caption}</p>
    </div>
  );
};

const BeforeAfterSection = () => {
  const [active, setActive] = useState(0);

  return (
    <SectionReveal>
      <section className="py-16 bg-surface">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">
              Nos résultats parlent d'eux-mêmes
            </h2>
            <p className="text-muted-foreground">Faites glisser pour voir la transformation</p>
          </div>

          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {sliders.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setActive(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${active === i ? "bg-primary-accent text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:grid grid-cols-3 gap-6">
            {sliders.map((s) => (
              <Slider key={s.label} data={s} />
            ))}
          </div>

          <div className="lg:hidden max-w-md mx-auto">
            <Slider data={sliders[active]} />
          </div>

          {/* "Voir plus" button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              to="/actualites"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 hover:-translate-y-0.5 transition-all"
            >
              Voir plus de réalisations
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </SectionReveal>
  );
};

export default BeforeAfterSection;
