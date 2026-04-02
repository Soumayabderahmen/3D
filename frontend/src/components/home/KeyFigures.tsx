import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionReveal from "@/components/SectionReveal";

const figures = [
  { value: 1500, suffix: "+", label: "Clients satisfaits" },
  { value: 15, suffix: "+", label: "Ans d'expérience" },
  { value: 1000, suffix: "+", label: "Débarras réalisés" },
  { value: 8, suffix: "", label: "Départements couverts (200km)" },
];

const Counter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-primary-accent tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const KeyFigures = () => (
  <section className="py-20 bg-card">
    <SectionReveal>
      <div className="container">
        <h2 className="sr-only">3D Services en chiffres</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {figures.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`text-center ${i < figures.length - 1 ? "lg:border-r lg:border-gold/20" : ""}`}
            >
              <Counter target={f.value} suffix={f.suffix} />
              <p className="mt-2 text-sm text-muted-foreground font-medium">{f.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  </section>
);

export default KeyFigures;
