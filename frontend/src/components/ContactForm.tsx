import { useState, FormEvent } from "react";
import { Send } from "lucide-react";
import SectionReveal from "./SectionReveal";
import { toast } from "sonner";

const ContactForm = () => {
  const [form, setForm] = useState({
    prenom: "", nom: "", telephone: "", email: "",
    service: "", lieu: "", message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.prenom || !form.telephone || !form.service) {
      toast.error("Veuillez remplir les champs obligatoires.");
      return;
    }
    toast.success("Votre demande a été envoyée ! Nous vous répondons sous 2h.");
    setForm({ prenom: "", nom: "", telephone: "", email: "", service: "", lieu: "", message: "" });
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:bg-background focus:text-foreground focus:border-accent outline-none transition-all";

  return (
    <section id="contact" className="py-20 bg-primary">
      <div className="container max-w-2xl">
        <SectionReveal>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary-foreground text-center">
            Demandez votre devis gratuit
          </h2>
          <p className="mt-4 text-primary-foreground/70 text-center">
            Réponse garantie sous 2h — Sans engagement
          </p>
        </SectionReveal>

        <form onSubmit={handleSubmit} className="mt-12 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Prénom *"
              value={form.prenom}
              onChange={(e) => setForm({ ...form, prenom: e.target.value })}
              className={inputClass}
              required
            />
            <input
              type="text"
              placeholder="Nom"
              value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="tel"
              placeholder="Téléphone *"
              value={form.telephone}
              onChange={(e) => setForm({ ...form, telephone: e.target.value })}
              className={inputClass}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              className={inputClass}
              required
            >
              <option value="">Type de service *</option>
              <option value="debarras">Débarras</option>
              <option value="nettoyage">Nettoyage</option>
              <option value="les-deux">Les deux</option>
            </select>
            <select
              value={form.lieu}
              onChange={(e) => setForm({ ...form, lieu: e.target.value })}
              className={inputClass}
            >
              <option value="">Type de lieu</option>
              <option value="appartement">Appartement</option>
              <option value="maison">Maison</option>
              <option value="cave-grenier">Cave / Grenier</option>
              <option value="autre">Autre</option>
            </select>
          </div>
          <textarea
            placeholder="Décrivez votre besoin..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={4}
            className={inputClass + " resize-none"}
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-7 py-4 rounded-lg bg-accent text-accent-foreground font-semibold text-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <Send className="w-5 h-5" />
            Envoyer ma demande
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
