import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Check, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionReveal from "@/components/SectionReveal";

const VALID_PREFIXES = ["01", "07", "26", "38", "42", "43", "63", "69", "71", "73", "74", "03", "15", "39", "25", "70"];

const ZoneChecker = () => {
  const [cp, setCp] = useState("");
  const [result, setResult] = useState<"valid" | "invalid" | null>(null);

  const check = () => {
    if (cp.length !== 5 || !/^\d{5}$/.test(cp)) return;
    setResult(VALID_PREFIXES.includes(cp.substring(0, 2)) ? "valid" : "invalid");
  };

  return (
    <SectionReveal>
      <section className="py-16 bg-card">
        <div className="container max-w-xl text-center">
          <MapPin className="w-10 h-10 text-primary-accent mx-auto mb-4" />
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">
            Intervenons-nous chez vous ?
          </h2>
          <p className="text-muted-foreground mb-6">Entrez votre code postal pour vérifier</p>

          <div className="flex gap-2 max-w-xs mx-auto mb-4">
            <input
              value={cp}
              onChange={e => { setCp(e.target.value.replace(/\D/g, "").slice(0, 5)); setResult(null); }}
              placeholder="Ex : 69001"
              maxLength={5}
              className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground text-center text-lg font-bold tracking-widest focus:ring-2 focus:ring-primary-accent focus:border-transparent outline-none"
              onKeyDown={e => e.key === "Enter" && check()}
            />
            <button
              onClick={check}
              disabled={cp.length !== 5}
              className="px-6 py-3 rounded-xl bg-primary-accent text-primary-foreground font-bold hover:bg-primary-accent/90 transition-colors disabled:opacity-40"
            >
              Vérifier
            </button>
          </div>

          <AnimatePresence mode="wait">
            {result === "valid" && (
              <motion.div
                key="valid"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-secondary/10 border border-secondary/20 rounded-xl p-4 max-w-sm mx-auto"
              >
                <div className="flex items-center justify-center gap-2 text-secondary font-bold mb-1">
                  <Check className="w-5 h-5" /> Oui ! Nous intervenons dans le {cp.substring(0, 2)}.
                </div>
                <Link to="/devis" className="inline-flex items-center gap-1 text-sm font-semibold text-primary-accent mt-1 hover:gap-2 transition-all">
                  Devis gratuit <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}
            {result === "invalid" && (
              <motion.div
                key="invalid"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 max-w-sm mx-auto"
              >
                <div className="flex items-center justify-center gap-2 text-destructive font-bold mb-1">
                  <X className="w-5 h-5" /> Hors zone pour le moment.
                </div>
                <p className="text-xs text-muted-foreground">Appelez-nous au 06 09 99 17 36, nous étudions chaque demande.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </SectionReveal>
  );
};

export default ZoneChecker;
