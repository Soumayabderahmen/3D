import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, ChevronDown, Check, Truck, Gem, Euro, AlertTriangle, Facebook, Instagram, Youtube } from "lucide-react";
import SEOHead from "../components/SEOHead";
import { getSEOForPath } from "../data/seo";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const Tarifs = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const seo = getSEOForPath("/tarifs");

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEOHead title={seo.title} description={seo.description} canonical="/tarifs" url="/tarifs" />
      {/* HERO */}
      <section className="relative bg-[hsl(224,47%,15%)] py-20 sm:py-28 overflow-hidden">
        <span className="absolute inset-0 flex items-center justify-center text-[120px] sm:text-[180px] font-black text-white/[0.06] tracking-widest select-none pointer-events-none leading-none">
          DÉBARRAS
        </span>
        <div className="relative z-10 max-w-[700px] mx-auto px-6 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[38px] sm:text-[52px] font-black text-white leading-tight mb-4">
            Combien coûte un débarras ?
          </motion.h1>
          <p className="text-white/90 text-sm mb-3">Un prix juste, transparent, sans mauvaise surprise.</p>
          <p className="text-white/80 text-sm leading-relaxed max-w-[600px] mx-auto">
            Nos tarifs de débarras sont transparents et calculés au plus juste. Nous prenons en compte le volume, l'accessibilité et surtout la{" "}
            <strong className="underline">valeur des objets récupérables</strong> qui vient déduire la facture.
          </p>
        </div>
      </section>

      {/* FORMULES */}
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-[28px] font-extrabold text-[hsl(224,47%,15%)] text-center mb-12">Nos Formules de Débarras</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {/* Card 1 */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
              className="bg-white border border-[#E5E7EB] rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-200">
              <span className="text-4xl mb-4">📦</span>
              <h3 className="text-lg font-bold text-[hsl(224,47%,15%)] mb-1">Petits Volumes</h3>
              <p className="text-sm text-[#6B7280] mb-4">Cave, Grenier, Garage</p>
              <p className="text-[52px] font-black text-[hsl(221,76%,48%)] leading-none">90€ <span className="text-lg font-normal">*</span></p>
              <p className="text-xs text-[#9CA3AF] mb-5">à partir de</p>
              <ul className="space-y-2.5 text-left w-full mb-6">
                {["Intervention possible sous 48h", "Débarras intégral", "Transport en déchetterie", "Coup de balai final", "Garage (dès 120€)"].map(t => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-[#374151]">
                    <span className="w-[18px] h-[18px] rounded bg-[hsl(142,64%,39%)] flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3 h-3 text-white" /></span>
                    {t}
                  </li>
                ))}
              </ul>
              <Link to="/devis" className="mt-auto w-full py-3 rounded-lg border-2 border-[hsl(221,76%,48%)] text-[hsl(221,76%,48%)] font-bold text-sm text-center hover:bg-[hsl(226,100%,97%)] transition-colors">
                Demander un devis
              </Link>
            </motion.div>

            {/* Card 2 — Featured */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
              className="relative bg-white border-2 border-[hsl(221,76%,48%)] rounded-xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-200">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[hsl(142,64%,39%)] text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1 rounded-full">Le plus demandé</span>
              <span className="text-4xl mb-4 mt-2">🏠</span>
              <h3 className="text-lg font-bold text-[hsl(224,47%,15%)] mb-1">Maison & Appartement</h3>
              <p className="text-sm text-[#6B7280] mb-4">Logement complet</p>
              <p className="text-[38px] font-black text-[hsl(221,76%,48%)] leading-none">Sur Devis</p>
              <p className="text-sm font-semibold text-[hsl(142,64%,39%)] mb-5">Gratuit</p>
              <ul className="space-y-2.5 text-left w-full mb-6">
                {["Déduction objets valorisables", "Tri sélectif & dons associations", "Main d'œuvre incluse", "Nettoyage des sols inclus"].map(t => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-[#374151]">
                    <span className="w-[18px] h-[18px] rounded bg-[hsl(142,64%,39%)] flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3 h-3 text-white" /></span>
                    {t}
                  </li>
                ))}
              </ul>
              <Link to="/devis" className="mt-auto w-full py-3 rounded-lg bg-[hsl(221,76%,48%)] text-white font-bold text-sm text-center hover:bg-[hsl(221,76%,42%)] transition-colors">
                Obtenir mon devis gratuit
              </Link>
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
              className="bg-white border border-[#E5E7EB] rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-200">
              <span className="text-4xl mb-4">🏢</span>
              <h3 className="text-lg font-bold text-[hsl(224,47%,15%)] mb-1">Spécifique</h3>
              <p className="text-sm text-[#6B7280] mb-4">Diogène & Locaux Pro</p>
              <p className="text-[28px] font-black text-[hsl(221,76%,48%)] leading-none mb-5">Personnalisé</p>
              <ul className="space-y-2.5 text-left w-full mb-6">
                {["Logement Insalubre", "Encombrement extrême", "Locaux professionnels", "Destruction d'archives"].map(t => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-[#374151]">
                    <span className="w-[18px] h-[18px] rounded bg-[hsl(142,64%,39%)] flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3 h-3 text-white" /></span>
                    {t}
                  </li>
                ))}
              </ul>
              <a href="tel:0609991736" className="mt-auto w-full py-3 rounded-lg border-2 border-[hsl(221,76%,48%)] text-[hsl(221,76%,48%)] font-bold text-sm text-center hover:bg-[hsl(226,100%,97%)] transition-colors inline-flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> Parlons de votre situation
              </a>
            </motion.div>
          </div>

          {/* Note */}
          <div className="mt-8 bg-[hsl(48,96%,96%)] border-l-4 border-[hsl(32,87%,44%)] rounded-lg p-4">
            <p className="text-[13px] text-[#6B7280] italic">
              * Les tarifs indiqués (90€ pour une cave, 120€ pour un garage) sont des prix de départ indicatifs pour un débarras en Saône-et-Loire. Le prix final dépend du volume exact et de l'accessibilité.
            </p>
          </div>
        </div>
      </section>

      {/* COMMENT EST CALCULÉ */}
      <section className="py-20 bg-[hsl(220,20%,98%)]">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-[28px] font-extrabold text-[hsl(224,47%,15%)] text-center mb-10">Comment est calculé votre devis de débarras ?</h2>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white rounded-xl border border-[#E5E7EB] p-8 max-w-[700px] mx-auto">
            <p className="text-sm text-[#6B7280] mb-8">Le coût d'un débarras de maison à Lyon n'est pas fixe, il résulte d'un calcul simple :</p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-[hsl(226,100%,97%)] flex items-center justify-center mx-auto mb-2"><Truck className="w-7 h-7 text-[hsl(221,76%,48%)]" /></div>
                <p className="text-sm font-bold text-[hsl(224,47%,15%)]">Coût du service</p>
                <p className="text-xs text-[#9CA3AF]">Volume × tarif d'œuvre<br />+ Frais de déchetterie</p>
              </div>
              <span className="text-2xl font-bold text-[#D1D5DB] hidden sm:block">—</span>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-[hsl(226,100%,97%)] flex items-center justify-center mx-auto mb-2"><Gem className="w-7 h-7 text-[hsl(221,76%,48%)]" /></div>
                <p className="text-sm font-bold text-[hsl(224,47%,15%)]">Valorisation</p>
                <p className="text-xs text-[#9CA3AF]">Meubles & objets revendables</p>
              </div>
              <span className="text-2xl font-bold text-[#D1D5DB] hidden sm:block">=</span>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-[hsl(224,47%,15%)] flex items-center justify-center mx-auto mb-2"><Euro className="w-7 h-7 text-white" /></div>
                <p className="text-sm font-bold text-[hsl(224,47%,15%)]">Votre Prix Final</p>
                <p className="text-xs text-[#9CA3AF]">sur devis !</p>
              </div>
            </div>

            {/* Alert */}
            <div className="bg-[hsl(48,96%,96%)] border border-[hsl(32,87%,44%)] rounded-xl p-6">
              <div className="flex items-start gap-3 mb-3">
                <AlertTriangle className="w-5 h-5 text-[hsl(32,87%,44%)] shrink-0 mt-0.5" />
                <h3 className="text-[15px] font-bold text-[hsl(224,47%,15%)]">Pourquoi un débarras sérieux ne peut pas coûter 'rien du tout'</h3>
              </div>
              <p className="text-sm text-[#6B7280] mb-4">
                Nous le disons clairement : un débarras professionnel est une prestation payante. Ce n'est pas un vide-grenier, ni un particulier qui 'récupère ce qui l'intéresse' et abandonne le reste.
              </p>
              <p className="text-[15px] font-bold text-[hsl(224,47%,15%)] mb-3">Chez 3D Services, chaque intervention inclut :</p>
              <ul className="space-y-2.5 mb-4">
                {[
                  "Assurance professionnelle — vous êtes protégé en cas d'incident",
                  "Entreprise déclarée — pas de travail au noir, pas de risque pour vous.",
                  "Déchetterie professionnelle — vos déchets sont traités légalement, avec certificat de destruction à l'appui.",
                  "Zéro dépôt sauvage — vous ne risquez aucune amende ni poursuite pour abandon illégal de déchets.",
                ].map(t => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-[#374151]">
                    <span className="w-[18px] h-[18px] rounded bg-[hsl(142,64%,39%)] flex items-center justify-center shrink-0 mt-0.5"><Check className="w-3 h-3 text-white" /></span>
                    {t}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-[#6B7280] italic mb-3">
                Les frais de déchetterie professionnelle sont réels et incompressibles. Contrairement à un particulier qui jette dans la nature ou remplit illégalement une benne de chantier, nous assumons ces coûts — et nous vous en rendons compte avec une facture détaillée.
              </p>
              <p className="text-sm text-[#6B7280] italic border-l-[3px] border-[hsl(221,76%,48%)] pl-4">
                Si vous cherchez 'pas cher à tout prix', nous ne sommes peut-être pas le bon prestataire. Mais si vous voulez un débarras fait proprement, légalement, sans mauvaise surprise — vous êtes au bon endroit.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ZONES */}
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-8 rounded-full bg-[hsl(0,72%,51%)]" />
            <h2 className="text-[28px] font-extrabold text-[hsl(224,47%,15%)]">Débarras à Lyon et région — Devis gratuit</h2>
          </div>
          <p className="text-sm text-[#6B7280] mb-8 max-w-2xl">
            Vous avez une idée du volume à évacuer ? Contactez-nous directement — le devis est gratuit, sans engagement. Le prix final tient compte du volume, de l'accès et des objets valorisables qui peuvent réduire votre facture.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {[
              { label: "Débarras Lyon 69", to: "/services/debarras/lyon-1" },
              { label: "Débarras Villeurbanne", to: "/services/debarras/villeurbanne" },
              { label: "Saint-Étienne & Loire 42", to: "/services/debarras/saint-etienne" },
              { label: "Bourg-en-Bresse & Ain 01", to: "/services/debarras/bourg-en-bresse" },
              { label: "Chalon-sur-Saône 71", to: "/services/debarras/chalon-sur-saone" },
              { label: "Grenoble & Isère 38", to: "/services/debarras/grenoble" },
            ].map(z => (
              <Link key={z.to} to={z.to} className="flex items-center gap-2.5 bg-[hsl(226,100%,97%)] rounded-lg px-4 py-3 hover:shadow-md transition-shadow">
                <span className="w-[18px] h-[18px] rounded bg-[hsl(142,64%,39%)] flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-white" /></span>
                <span className="text-sm font-medium text-[hsl(224,47%,15%)]">{z.label}</span>
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link to="/zones-intervention" className="text-sm font-semibold text-[hsl(221,76%,48%)] hover:underline">→ Voir toutes nos zones d'intervention</Link>
            <Link to="/services" className="text-sm font-semibold text-[hsl(221,76%,48%)] hover:underline">→ Tous nos services</Link>
          </div>
          <p className="mt-3 text-sm text-[#9CA3AF] italic">Votre ville ne figure pas ? Appelez-nous — nous intervenons dans un rayon de 200km autour de Lyon.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[hsl(220,20%,98%)]">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="text-[28px] font-extrabold text-[hsl(224,47%,15%)] text-center mb-10">Questions Fréquentes</h2>
          <div className="space-y-3">
            {[
              { q: "Comment obtenir un devis ?", a: "Contactez-nous par téléphone, WhatsApp ou via notre formulaire en ligne. Nous organisons une visite gratuite ou estimons sur photos. Le devis est envoyé sous 2h, sans engagement." },
              { q: "Qu'est-ce qui influence le prix final ?", a: "Le volume à évacuer, l'accessibilité du logement (étage, ascenseur, monte-meubles), l'état de salubrité et la valeur des objets récupérables qui peut réduire votre facture." },
              { q: "Faites-vous des tarifs pour les successions ?", a: "Oui. Nous accompagnons régulièrement des familles suite à un décès. Nous proposons un devis adapté, avec souplesse sur les délais et une approche humaine et discrète." },
            ].map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left text-[15px] font-bold text-[hsl(224,47%,15%)] hover:bg-[hsl(220,20%,98%)] transition-colors">
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 text-[#9CA3AF] transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <p className="px-6 pb-5 text-sm text-[#6B7280] leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 bg-[hsl(224,47%,15%)]">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <h2 className="text-[28px] font-extrabold text-white mb-8">Besoin d'un devis immédiat ?</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80 text-sm mb-8">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" />Lyon et région — 200km</span>
            <a href="tel:0609991736" className="flex items-center gap-2 hover:text-white transition-colors"><Phone className="w-4 h-4" />06 09 99 17 36</a>
            <a href="mailto:3dservicefrance@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors"><Mail className="w-4 h-4" />3dservicefrance@gmail.com</a>
          </div>
          <div className="flex items-center justify-center gap-4">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Icon className="w-5 h-5 text-white" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tarifs;
