import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle, Clock, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import SectionReveal from "@/components/SectionReveal";
import SEOHead from "@/components/SEOHead";
import { getSEOForPath } from "@/data/seo";


const zones = ["Rhône (69)", "Ain (01)", "Isère (38)", "Loire (42)", "Saône-et-Loire (71)", "Drôme (26)", "Ardèche (07)", "Haute-Savoie (74)"];

const Contact = () => {
  const [form, setForm] = useState({ prenom: "", nom: "", tel: "", email: "", sujet: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const now = new Date();
    const h = now.getHours() + now.getMinutes() / 60;
    const day = now.getDay();
    setIsOpen(h >= 7.5 && (day === 0 ? h <= 17 : h <= 20));
  }, []);

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.prenom || !form.tel || !form.email) {
      toast.error("Veuillez remplir les champs obligatoires");
      return;
    }
    setSubmitted(true);
    toast.success("Message envoyé !");
  };

  return (
    <Layout>
      <SEOHead {...getSEOForPath("/contact")} canonical="/contact" />
      <section className="gradient-primary py-16 relative noise-overlay">
        <div className="container relative z-10">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/50 mb-6">
            <Link to="/" className="hover:text-primary-foreground/80 transition-colors">Accueil</Link>
            <span>/</span>
            <span className="text-primary-foreground">Contact</span>
          </div>
          <h1 className="font-serif-display text-4xl sm:text-5xl text-primary-foreground mb-3">
            Contactez-nous
          </h1>
          <p className="text-lg text-primary-foreground/70">Réponse garantie sous 2 heures</p>
        </div>
      </section>

      <section className="py-16 bg-surface">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Col 1: Coordonnées */}
            <SectionReveal>
              <div className="space-y-5">
                <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
                  <h2 className="font-display font-bold text-lg text-foreground mb-5">Nos coordonnées</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary-accent/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-primary-accent" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">Adresse</p>
                        <p className="text-xs text-muted-foreground">Lyon et région — 200km</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary-accent/10 flex items-center justify-center shrink-0">
                        <Phone className="w-4 h-4 text-primary-accent" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">Téléphone</p>
                        <a href="tel:0609991736" className="text-xl font-display font-bold text-primary-accent hover:underline">06 09 99 17 36</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary-accent/10 flex items-center justify-center shrink-0">
                        <Mail className="w-4 h-4 text-primary-accent" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">Email</p>
                        <a href="mailto:3dservicefrance@gmail.com" className="text-xs text-primary-accent hover:underline">3dservicefrance@gmail.com</a>
                      </div>
                    </div>
                    <a href="https://wa.me/33609991736" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 rounded-xl bg-whatsapp/10 text-whatsapp font-semibold text-sm hover:bg-whatsapp/20 transition-colors">
                      <MessageCircle className="w-5 h-5" /> WhatsApp
                    </a>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Lun–Dim : 7h30–20h00</span>
                      <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-bold ${isOpen ? "bg-secondary/10 text-secondary" : "bg-destructive/10 text-destructive"}`}>
                        {isOpen ? "Ouvert" : "Fermé"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border h-48">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.3!2d2.3488!3d48.8747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDUyJzI5LjAiTiAywrAyMCc1NS43IkU!5e0!3m2!1sfr!2sfr!4v1"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade" title="3D Services"
                  />
                </div>
              </div>
            </SectionReveal>

            {/* Col 2: Form */}
            <SectionReveal>
              <div className="bg-card rounded-2xl p-6 shadow-premium border border-border">
                {submitted ? (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-foreground mb-2">Message envoyé !</h3>
                    <p className="text-muted-foreground text-sm">Nous vous recontacterons très rapidement.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h2 className="font-display font-bold text-lg text-foreground mb-5">Envoyez-nous un message</h2>
                    <div className="grid sm:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">Prénom *</label>
                        <input value={form.prenom} onChange={e => update("prenom", e.target.value)} placeholder="Votre prénom"
                          className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary-accent focus:border-transparent outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">Nom</label>
                        <input value={form.nom} onChange={e => update("nom", e.target.value)} placeholder="Votre nom"
                          className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary-accent focus:border-transparent outline-none" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">Téléphone *</label>
                        <input value={form.tel} onChange={e => update("tel", e.target.value)} type="tel" placeholder="06 / 07..."
                          className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary-accent focus:border-transparent outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-foreground mb-1">Email *</label>
                        <input value={form.email} onChange={e => update("email", e.target.value)} type="email" placeholder="votre@email.com"
                          className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary-accent focus:border-transparent outline-none" />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="block text-xs font-medium text-foreground mb-1">Sujet</label>
                      <select value={form.sujet} onChange={e => update("sujet", e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary-accent focus:border-transparent outline-none">
                        <option value="">Sélectionner...</option>
                        <option>Demande de devis</option>
                        <option>Renseignement</option>
                        <option>Réclamation</option>
                        <option>Autre</option>
                      </select>
                    </div>
                    <div className="mb-5">
                      <label className="block text-xs font-medium text-foreground mb-1">Message</label>
                      <textarea value={form.message} onChange={e => update("message", e.target.value)} rows={4} placeholder="Votre message..."
                        className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary-accent focus:border-transparent outline-none resize-none" />
                    </div>
                    <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full gradient-cta text-primary-foreground font-bold shimmer">
                      Envoyer <ArrowRight className="w-5 h-5" />
                    </button>
                  </form>
                )}
              </div>
            </SectionReveal>

            {/* Col 3: Info rapide */}
            <SectionReveal>
              <div className="space-y-5">
                <div className="gradient-primary rounded-2xl p-6 text-primary-foreground">
                  <h3 className="font-display font-bold text-lg mb-4">Comment ça marche ?</h3>
                  <div className="space-y-4">
                    {["Appelez ou remplissez le formulaire", "Devis gratuit sous 2h", "Intervention planifiée"].map((s, i) => (
                      <div key={s} className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0 text-xs font-bold">
                          {i + 1}
                        </div>
                        <p className="text-sm text-primary-foreground/80">{s}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-5 border border-border">
                  <h3 className="font-display font-bold text-sm text-foreground mb-3">Zones d'intervention</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {zones.map(z => (
                      <span key={z} className="px-2.5 py-1 rounded-full bg-primary-accent/5 text-xs font-medium text-primary-accent border border-primary-accent/10">
                        {z}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-destructive/5 border border-destructive/20 rounded-2xl p-5 flex items-center gap-3">
                  <AlertTriangle className="w-8 h-8 text-destructive shrink-0 animate-pulse" />
                  <div>
                    <p className="font-display font-bold text-sm text-foreground">Urgence ?</p>
                    <p className="text-xs text-muted-foreground">Intervention possible le jour même.</p>
                    <a href="tel:0609991736" className="text-sm font-bold text-primary-accent">06 09 99 17 36</a>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
