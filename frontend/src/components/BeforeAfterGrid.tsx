import { useState, useRef, useCallback, useEffect } from "react";
import { GripVertical, Star } from "lucide-react";
import { motion } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";

interface SliderProps {
  before: string;
  after: string;
  legend: string;
  height?: number;
}

const SingleSlider = ({ before, after, legend, height = 260 }: SliderProps) => {
  const [pos, setPos] = useState(80);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const animated = useRef(false);

  useEffect(() => {
    if (!animated.current) {
      animated.current = true;
      const timeout = setTimeout(() => {
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / 800, 1);
          setPos(80 - 30 * progress);
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, []);

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

  const onPointerUp = useCallback(() => { dragging.current = false; }, []);

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        className="relative w-full rounded-xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
        style={{ height }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <img src={before} alt="Avant" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        <img src={after} alt="Après" className="absolute inset-0 w-full h-full object-cover" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} draggable={false} />
        <div className="absolute top-0 bottom-0 w-0.5 bg-card z-10" style={{ left: `${pos}%` }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card shadow-premium flex items-center justify-center">
            <GripVertical className="w-4 h-4 text-foreground" />
          </div>
        </div>
        <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-destructive/80 text-primary-foreground text-[10px] font-bold z-20">AVANT</span>
        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-secondary/80 text-primary-foreground text-[10px] font-bold z-20">APRÈS</span>
      </div>
      <div className="flex items-center gap-1 justify-center text-xs text-muted-foreground">
        <span>{legend}</span>
        <div className="flex gap-0.5 ml-1">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-gold fill-gold" />)}
        </div>
      </div>
    </div>
  );
};

interface BeforeAfterGridProps {
  items: { before: string; after: string; legend: string }[];
  title?: string;
  subtitle?: string;
}

const BeforeAfterGrid = ({ items, title = "Nos réalisations — Avant / Après", subtitle = "Faites glisser pour voir la transformation" }: BeforeAfterGridProps) => (
  <SectionReveal>
    <section className="py-16 bg-surface">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <SingleSlider {...item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </SectionReveal>
);

export default BeforeAfterGrid;
