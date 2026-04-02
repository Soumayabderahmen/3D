import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, FileText, ArrowRight } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

const surfaces = [
  { label: "Moins de 20 m²", base: 200 },
  { label: "20 à 40 m²", base: 400 },
  { label: "40 à 60 m²", base: 600 },
  { label: "60 à 80 m²", base: 800 },
  { label: "80 à 100 m²", base: 1000 },
  { label: "100 à 150 m²", base: 1400 },
  { label: "Plus de 150 m²", base: 1800 },
];

const elements = [
  { id: "garage", label: "Y a-t-il un garage ?", supplement: 150 },
  { id: "cave", label: "Y a-t-il une cave ?", supplement: 100 },
  { id: "soussol", label: "Y a-t-il un sous-sol ?", supplement: 120 },
  { id: "dependance", label: "Y a-t-il une dépendance ?", supplement: 200 },
];

const encombrements = [
  { label: "Encombrement normal", mult: 1.0 },
  { label: "Plutôt encombré", mult: 1.3 },
  { label: "Accumulation compulsive", mult: 1.7 },
];

const salubrites = [
  { label: "Normal (compris : balayage des sols)", mult: 1.0 },
  { label: "Poussiéreux (compris : balayage des sols)", mult: 1.1 },
  { label: "Insalubre (compris : lessivage des sols nettoyage)", mult: 1.3 },
  { label: "Syndrome de Diogène (compris : désinfection, lessivage des sols nettoyage)", mult: 1.6 },
];

const accessibilites = [
  { label: "Facile (rez-de-chaussée)", mult: 1.0 },
  { label: "Moyen (étage avec ascenseur)", mult: 1.1 },
  { label: "Compliqué (étage sans ascenseur)", mult: 1.2 },
  { label: "Très compliqué (étage avec accès étroit)", mult: 1.35 },
];

const PriceEstimator = () => {
  const [surfaceIdx, setSurfaceIdx] = useState<number>(-1);
  const [checkedElements, setCheckedElements] = useState<string[]>([]);
  const [annexSurface, setAnnexSurface] = useState(0);
  const [encIdx, setEncIdx] = useState(0);
  const [salIdx, setSalIdx] = useState(0);
  const [accIdx, setAccIdx] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({ min: 0, max: 0 });

  const toggleElement = (id: string) =>
    setCheckedElements(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const calculate = () => {
    if (surfaceIdx < 0) return;
    const base = surfaces[surfaceIdx].base;
    const elemSupplement = checkedElements.reduce((acc, id) => {
      const el = elements.find(e => e.id === id);
      return acc + (el ? el.supplement : 0);
    }, 0) + annexSurface * 3;
    const total = (base + elemSupplement) * encombrements[encIdx].mult * salubrites[salIdx].mult * accessibilites[accIdx].mult;
    setResult({ min: Math.round(total * 0.8), max: Math.round(total * 1.2) });
    setShowResult(true);
  };

  const radioClass = (selected: boolean) =>
    `flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${selected ? "border-primary-accent/40 bg-primary-accent/5" : "border-border hover:border-primary-accent/20"}`;

  return (
    <section className="py-16 bg-card">
      <SectionReveal>
        <div className="container max-w-3xl">
          <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-card">
            <div className="text-center mb-8">
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">
                Simulateur de prix pour débarras
              </h2>
              <p className="text-muted-foreground">Gratuit et sans engagement</p>
            </div>

            {/* Step 1 */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-foreground mb-3">1. Quelle est la surface du logement en m² ?</p>
              <select
                value={surfaceIdx}
                onChange={e => { setSurfaceIdx(Number(e.target.value)); setShowResult(false); }}
                className="w-full p-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent/30"
              >
                <option value={-1} disabled>Entrez la surface</option>
                {surfaces.map((s, i) => (
                  <option key={i} value={i}>{s.label}</option>
                ))}
              </select>
            </div>

            {/* Step 2 */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-foreground mb-3">2. Le logement dispose-t-il des éléments suivants ?</p>
              <div className="space-y-2">
                {elements.map(el => (
                  <label key={el.id} className={radioClass(checkedElements.includes(el.id))}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${checkedElements.includes(el.id) ? "border-primary-accent bg-primary-accent" : "border-muted-foreground/40"}`}>
                      {checkedElements.includes(el.id) && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                    </div>
                    <span className="text-sm text-foreground">{el.label}</span>
                  </label>
                ))}
              </div>
              {checkedElements.length > 0 && (
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Si oui, surface en m² :</span>
                  <input
                    type="number"
                    min={0}
                    value={annexSurface}
                    onChange={e => { setAnnexSurface(Number(e.target.value) || 0); setShowResult(false); }}
                    className="w-20 p-2 rounded-lg border border-border bg-card text-foreground text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary-accent/30"
                  />
                </div>
              )}
            </div>

            {/* Step 3 */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-foreground mb-3">3. Quel est le taux d'encombrement du logement ?</p>
              <div className="space-y-2">
                {encombrements.map((e, i) => (
                  <label key={i} className={radioClass(encIdx === i)} onClick={() => { setEncIdx(i); setShowResult(false); }}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${encIdx === i ? "border-primary-accent bg-primary-accent" : "border-muted-foreground/40"}`}>
                      {encIdx === i && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                    </div>
                    <span className="text-sm text-foreground">{e.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 4 */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-foreground mb-3">4. Dans quel état de salubrité est votre logement ?</p>
              <div className="space-y-2">
                {salubrites.map((s, i) => (
                  <label key={i} className={radioClass(salIdx === i)} onClick={() => { setSalIdx(i); setShowResult(false); }}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${salIdx === i ? "border-primary-accent bg-primary-accent" : "border-muted-foreground/40"}`}>
                      {salIdx === i && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                    </div>
                    <span className="text-sm text-foreground">{s.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 5 */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-foreground mb-3">5. Comment est l'accessibilité à l'habitation ?</p>
              <div className="space-y-2">
                {accessibilites.map((a, i) => (
                  <label key={i} className={radioClass(accIdx === i)} onClick={() => { setAccIdx(i); setShowResult(false); }}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${accIdx === i ? "border-primary-accent bg-primary-accent" : "border-muted-foreground/40"}`}>
                      {accIdx === i && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                    </div>
                    <span className="text-sm text-foreground">{a.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculate}
              disabled={surfaceIdx < 0}
              className="w-full py-3 rounded-lg bg-secondary text-primary-foreground font-bold text-base hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Calculer le Prix
            </button>

            {/* Result */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6"
                >
                  <div className="gradient-primary rounded-2xl p-6 text-center mb-4">
                    <p className="text-primary-foreground/60 text-sm mb-2">Estimation indicative</p>
                    <p className="text-3xl sm:text-4xl font-display font-bold text-gold">
                      {result.min}€ — {result.max}€
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <Link
                      to="/devis"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-secondary text-primary-foreground font-bold hover:bg-secondary/90 transition-colors"
                    >
                      <FileText className="w-5 h-5" /> Obtenir mon devis exact
                    </Link>
                    <a
                      href="tel:0609991736"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border-2 border-primary-accent text-primary-accent font-bold hover:bg-primary-accent/5 transition-colors"
                    >
                      <Phone className="w-5 h-5" /> Appeler : 06 09 99 17 36
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Note */}
            <p className="text-xs text-muted-foreground mt-5 text-center italic leading-relaxed">
              Cette estimation indicative dépend des objets récupérables, pouvant rendre votre{" "}
              <Link to="/debarras-gratuit" className="text-secondary underline hover:text-secondary/80">
                débarras gratuit
              </Link>.
            </p>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
};

export default PriceEstimator;
