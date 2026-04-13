import { useState } from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Building2, Trash2, Bath,
  ArrowRight, ArrowLeft, CheckCircle,
  Phone, MessageCircle, Clock, Star, Loader2,
} from "lucide-react";
import { toast } from "sonner";
import SectionReveal from "../components/SectionReveal";
import { Progress } from "../components/ui/progress";
import SEOHead from "../components/SEOHead";
import { getSEOForPath } from "../data/seo";
import api from "../lib/axios";
import ReCAPTCHA from "react-google-recaptcha";
// ─── Données statiques ──────────────────────────────────────────────
const serviceTypes = [
  { id: "debarras",     label: "Débarras",     icon: Trash2    },
  { id: "demolition",   label: "Démolition",   icon: Building2 },
  { id: "desamiantage", label: "Désamiantage", icon: Home      },
  { id: "nettoyage",    label: "Nettoyage",    icon: Bath      },
];

const placeTypes = [
  { id: "appartement", label: "Appartement",  icon: Home      },
  { id: "maison",      label: "Maison",        icon: Building2 },
  { id: "cave",        label: "Cave / Grenier",icon: Trash2    },
  { id: "bureau",      label: "Bureau",        icon: Building2 },
  { id: "autre",       label: "Autre",         icon: Home      },
];

const volumes = [
  "Petit (< 10m³)",
  "Moyen (10-30m³)",
  "Grand (30-50m³)",
  "Très grand (50m³+)",
];

const departments = [
  "Rhône (69)", "Ain (01)", "Isère (38)", "Loire (42)",
  "Saône-et-Loire (71)", "Drôme (26)", "Ardèche (07)", "Haute-Savoie (74)",
];

// ─── Types ──────────────────────────────────────────────────────────
interface DevisForm {
  service: string;
  place: string;
  volume: string;
  departement: string;
  date_souhaitee: string;
  urgent: boolean;
  prenom: string;
  nom: string;
  tel: string;
  email: string;
  message: string;
    captcha: string; // ← nouveau

}

const INITIAL_FORM: DevisForm = {
  service: "", place: "", volume: "", departement: "",
  date_souhaitee: "", urgent: false,
  prenom: "", nom: "", tel: "", email: "", message: "",captcha: "",
};

// ─── Component ──────────────────────────────────────────────────────
const Devis = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<DevisForm>(INITIAL_FORM);

  const update = <K extends keyof DevisForm>(field: K, value: DevisForm[K]) => {
    setForm(f => ({ ...f, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors(e => { const n = { ...e }; delete n[field]; return n; });
    }
  };

  // ── Soumission ────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!form.captcha) {
  toast.error("Veuillez valider le captcha");
  return;
}
    setFieldErrors({});

    if (!form.prenom || !form.tel || !form.email) {
      toast.error("Veuillez remplir les champs obligatoires");
      return;
    }

    setLoading(true);
    try {
      await api.post("/devis", {
        ...form,
        // Envoyer null si vide pour correspondre aux règles Laravel nullable
        volume:         form.volume         || null,
        departement:    form.departement    || null,
        date_souhaitee: form.date_souhaitee || null,
        nom:            form.nom            || null,
        message:        form.message        || null,
      });

      setSubmitted(true);
      toast.success("Demande envoyée avec succès !");
    } catch (err: any) {
      if (err?.response?.status === 422 && err.response.data?.errors) {
        const flat: Record<string, string> = {};
        Object.entries(err.response.data.errors as Record<string, string[]>).forEach(
          ([key, msgs]) => { flat[key] = msgs[0]; }
        );
        setFieldErrors(flat);
        toast.error("Veuillez corriger les erreurs du formulaire.");
      } else if (err?.response?.status === 429) {
        toast.error("Trop de tentatives. Réessayez dans quelques minutes.");
      } else {
        toast.error("Une erreur est survenue. Veuillez réessayer ou nous appeler.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ── Écran de succès ───────────────────────────────────────────────
  if (submitted) {
    return (
      <Layout>
        <SEOHead {...getSEOForPath("/admin/devis")} canonical="/admin/devis" />
        <section className="py-32 bg-card">
          <div className="container text-center max-w-lg">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
            >
              <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-secondary" />
              </div>
            </motion.div>
            <h1 className="font-display font-bold text-3xl text-foreground mb-4">
              Merci pour votre demande !
            </h1>
            <p className="text-muted-foreground mb-8">
              Notre équipe vous recontactera dans les 2 heures avec un devis personnalisé.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-cta text-primary-foreground font-semibold"
            >
              Retour à l'accueil <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  // ── Helpers de style ──────────────────────────────────────────────
  const inputCls = (field: keyof DevisForm) =>
    `w-full px-4 py-2.5 rounded-xl border ${
      fieldErrors[field] ? "border-destructive bg-destructive/5" : "border-border bg-card"
    } text-foreground text-sm focus:ring-2 focus:ring-primary-accent focus:border-transparent outline-none transition-colors`;

  // ── Rendu principal ───────────────────────────────────────────────
  return (
    <Layout>
      <SEOHead {...getSEOForPath("/admin/devis")} canonical="/admin/devis" />

      {/* Hero */}
      <section className="gradient-primary py-16 relative noise-overlay">
        <div className="container relative z-10 text-center">
          <h1 className="font-serif-display text-4xl sm:text-5xl text-primary-foreground mb-3">
            Demandez votre devis gratuit
          </h1>
          <p className="text-primary-foreground/70 text-lg">Réponse garantie en 2h</p>
        </div>
      </section>

      <section className="py-16 bg-surface">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* ── Formulaire ── */}
            <div className="lg:col-span-2">
              <SectionReveal>
                <div className="bg-card rounded-2xl p-8 shadow-premium">

                  {/* Barre de progression */}
                  <div className="mb-8">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-display font-semibold text-foreground">Étape {step} / 3</span>
                      <span className="text-muted-foreground">
                        {step === 1 ? "Votre besoin" : step === 2 ? "Votre situation" : "Vos coordonnées"}
                      </span>
                    </div>
                    <Progress value={(step / 3) * 100} className="h-2" />
                  </div>

                  <AnimatePresence mode="wait">

                    {/* ── Étape 1 ── */}
                    {step === 1 && (
                      <motion.div
                        key="s1"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                      >
                        <h2 className="font-display font-bold text-xl text-foreground mb-6">Type de service</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                          {serviceTypes.map((s) => (
                            <button
                              key={s.id}
                              onClick={() => update("service", s.id)}
                              className={`p-4 rounded-xl border-2 text-center transition-all ${
                                form.service === s.id
                                  ? "border-primary-accent bg-primary-accent/5"
                                  : "border-border hover:border-muted-foreground/30"
                              }`}
                            >
                              <s.icon className={`w-6 h-6 mx-auto mb-2 ${form.service === s.id ? "text-primary-accent" : "text-muted-foreground"}`} />
                              <span className="text-sm font-medium">{s.label}</span>
                            </button>
                          ))}
                        </div>

                        <h2 className="font-display font-bold text-xl text-foreground mb-6">Type de lieu</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
                          {placeTypes.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => update("place", p.id)}
                              className={`p-4 rounded-xl border-2 text-center transition-all ${
                                form.place === p.id
                                  ? "border-primary-accent bg-primary-accent/5"
                                  : "border-border hover:border-muted-foreground/30"
                              }`}
                            >
                              <p.icon className={`w-5 h-5 mx-auto mb-2 ${form.place === p.id ? "text-primary-accent" : "text-muted-foreground"}`} />
                              <span className="text-xs font-medium">{p.label}</span>
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => setStep(2)}
                          disabled={!form.service || !form.place}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-cta text-primary-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Suivant <ArrowRight className="w-4 h-4" />
                        </button>
                      </motion.div>
                    )}

                    {/* ── Étape 2 ── */}
                    {step === 2 && (
                      <motion.div
                        key="s2"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                      >
                        <h2 className="font-display font-bold text-xl text-foreground mb-6">Volume estimé</h2>
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {volumes.map((v) => (
                            <button
                              key={v}
                              onClick={() => update("volume", v)}
                              className={`p-3 rounded-xl border-2 text-sm text-center transition-all ${
                                form.volume === v
                                  ? "border-primary-accent bg-primary-accent/5 font-semibold"
                                  : "border-border hover:border-muted-foreground/30"
                              }`}
                            >
                              {v}
                            </button>
                          ))}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 mb-6">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Département</label>
                            <select
                              value={form.departement}
                              onChange={(e) => update("departement", e.target.value)}
                              className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm focus:ring-2 focus:ring-primary-accent focus:border-transparent outline-none"
                            >
                              <option value="">Sélectionner...</option>
                              {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Date souhaitée</label>
                            <input
                              type="date"
                              value={form.date_souhaitee}
                              min={new Date().toISOString().split("T")[0]}
                              onChange={(e) => update("date_souhaitee", e.target.value)}
                              className="w-full px-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm focus:ring-2 focus:ring-primary-accent focus:border-transparent outline-none"
                            />
                            {fieldErrors.date_souhaitee && (
                              <p className="text-destructive text-xs mt-1">{fieldErrors.date_souhaitee}</p>
                            )}
                          </div>
                        </div>

                        <label className="flex items-center gap-3 mb-8 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.urgent}
                            onChange={(e) => update("urgent", e.target.checked)}
                            className="w-5 h-5 rounded border-border text-primary-accent focus:ring-primary-accent"
                          />
                          <span className="text-sm text-foreground">Intervention urgente souhaitée</span>
                        </label>

                        <div className="flex gap-3">
                          <button
                            onClick={() => setStep(1)}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-semibold hover:bg-muted transition-colors"
                          >
                            <ArrowLeft className="w-4 h-4" /> Retour
                          </button>
                          <button
                            onClick={() => setStep(3)}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-cta text-primary-foreground font-semibold"
                          >
                            Suivant <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* ── Étape 3 ── */}
                    {step === 3 && (
                      <motion.div
                        key="s3"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                      >
                        <h2 className="font-display font-bold text-xl text-foreground mb-6">Vos coordonnées</h2>

                        <div className="grid sm:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Prénom *</label>
                            <input
                              value={form.prenom}
                              onChange={(e) => update("prenom", e.target.value)}
                              placeholder="Votre prénom"
                              className={inputCls("prenom")}
                            />
                            {fieldErrors.prenom && <p className="text-destructive text-xs mt-1">{fieldErrors.prenom}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Nom</label>
                            <input
                              value={form.nom}
                              onChange={(e) => update("nom", e.target.value)}
                              placeholder="Votre nom"
                              className={inputCls("nom")}
                            />
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Téléphone *</label>
                            <input
                              value={form.tel}
                              onChange={(e) => update("tel", e.target.value)}
                              type="tel"
                              placeholder="06 / 07..."
                              className={inputCls("tel")}
                            />
                            {fieldErrors.tel && <p className="text-destructive text-xs mt-1">{fieldErrors.tel}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                            <input
                              value={form.email}
                              onChange={(e) => update("email", e.target.value)}
                              type="email"
                              placeholder="votre@email.com"
                              className={inputCls("email")}
                            />
                            {fieldErrors.email && <p className="text-destructive text-xs mt-1">{fieldErrors.email}</p>}
                          </div>
                        </div>

                        <div className="mb-6">
                          <label className="block text-sm font-medium text-foreground mb-1.5">Message (optionnel)</label>
                          <textarea
                            value={form.message}
                            onChange={(e) => update("message", e.target.value)}
                            rows={3}
                            placeholder="Décrivez votre besoin..."
                            className={`${inputCls("message")} resize-none`}
                          />
                        </div>
<div className="mb-6">
  <ReCAPTCHA
    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} // à mettre dans .env
    onChange={(token) => update("captcha", token || "")}
  />
  {fieldErrors.captcha && (
    <p className="text-destructive text-xs mt-1">{fieldErrors.captcha}</p>
  )}
</div>
                        <div className="flex gap-3 mb-6">
                          <button
                            onClick={() => setStep(2)}
                            disabled={loading}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-semibold hover:bg-muted transition-colors disabled:opacity-50"
                          >
                            <ArrowLeft className="w-4 h-4" /> Retour
                          </button>
                          
                          <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full gradient-cta text-primary-foreground font-bold text-base shimmer disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
                          >
                            {loading ? (
                              <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Envoi en cours...
                              </>
                            ) : (
                              <>
                                Envoyer ma demande <ArrowRight className="w-5 h-5" />
                              </>
                            )}
                          </button>
                        </div>

                        <p className="text-xs text-muted-foreground text-center">
                          🔒 Vos données sont confidentielles • ⚡ Réponse en 2h maximum
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </SectionReveal>
            </div>

            {/* ── Sidebar ── */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-4">
                <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
                  <h3 className="font-display font-bold text-foreground mb-4">Contact direct</h3>
                  <a
                    href="tel:0609991736"
                    className="flex items-center gap-3 p-3 rounded-xl bg-primary-accent/5 text-primary-accent font-semibold mb-3 hover:bg-primary-accent/10 transition-colors"
                  >
                    <Phone className="w-5 h-5" />06 09 99 17 36
                  </a>
                  <a
                    href="https://wa.me/33609991736"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-secondary/5 text-secondary font-semibold mb-4 hover:bg-secondary/10 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />WhatsApp
                  </a>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />Lun – Dim : 7h30 – 20h00
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-card border border-border text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-foreground">99% clients satisfaits</p>
                  <p className="text-xs text-muted-foreground">Basé sur 200+ avis</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Devis;