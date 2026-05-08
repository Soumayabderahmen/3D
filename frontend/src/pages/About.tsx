import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Check,
  MapPin,
  Phone,
  Mail,
  Zap,
  Facebook,
  Instagram,
  Youtube,
  ChevronRight
} from "lucide-react";

import Layout from "../components/layout/Layout";
import SEOHead from "../components/SEOHead";
import { getSEOForPath } from "../data/seo";
import logo3d from "@/assets/logo-3d-services.png";

/* =========================
   SEO SCHEMA (ONLY ADDITION)
========================= */
import {
  getLocalBusinessSchema,
  getBreadcrumbSchema,
} from "../data/schema";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

/* Counter (UNCHANGED) */
const Counter = ({
  target,
  suffix = "",
  label,
}: {
  target: number;
  suffix?: string;
  label: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;

        const duration = 1500;
        const steps = 40;
        const inc = target / steps;
        let cur = 0;

        const interval = setInterval(() => {
          cur += inc;
          if (cur >= target) {
            setCount(target);
            clearInterval(interval);
          } else {
            setCount(Math.floor(cur));
          }
        }, duration / steps);
      }
    }, { threshold: 0.3 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-[52px] font-black text-[hsl(221,76%,48%)] leading-none mb-2">
        +{count}{suffix}
      </p>
      <p className="text-[13px] text-[#6B7280] max-w-[200px] mx-auto">
        {label}
      </p>
    </div>
  );
};

const About = () => {
  const seo = getSEOForPath("/qui-sommes-nous");

  return (
    <Layout>

      {/* ================= SEO ONLY (NO UI CHANGE) ================= */}
      <SEOHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical="/qui-sommes-nous"
        url="/qui-sommes-nous"
      />

      {/* JSON-LD ONLY (SAFE ADDITION) */}
      <script type="application/ld+json">
        {JSON.stringify(getLocalBusinessSchema())}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(
          getBreadcrumbSchema([
            { name: "Accueil", url: "/" },
            { name: "Qui sommes-nous", url: "/qui-sommes-nous" },
          ])
        )}
      </script>

      {/* ================= EVERYTHING BELOW IS 100% YOUR ORIGINAL CODE ================= */}

      <section className="relative bg-[hsl(224,47%,15%)] py-20 sm:py-28 overflow-hidden">
        <span className="absolute inset-0 flex items-center justify-center text-[60px] sm:text-[120px] font-black text-white/[0.05] tracking-widest select-none pointer-events-none leading-none whitespace-nowrap">
          3D Services
        </span>

        <div className="relative z-10 max-w-[700px] mx-auto px-6 text-center">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[32px] sm:text-[46px] font-black text-white leading-tight mb-4"
          >
            Qui sommes-nous ?<br />L'équipe 3D Services
          </motion.h1>

          <p className="text-white/80 text-sm">
            Fondée en 2026 — Au service des particuliers et professionnels à Lyon et dans la région (200km)
          </p>

        </div>
      </section>

      {/* ================= REST OF YOUR ORIGINAL PAGE (UNCHANGED) ================= */}

      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#F0F9FF] border-l-4 border-[hsl(221,76%,48%)] rounded-xl p-8 relative"
          >

            <div className="grid md:grid-cols-[280px_1fr] gap-8">

              <div className="flex flex-col items-center md:items-start gap-4">
                <img
                  src={logo3d}
                  alt="3D Services"
                  className="w-[120px] h-[120px] rounded-full border-4 border-white shadow-lg"
                />

                <div>
                  <p className="text-base font-bold text-[hsl(224,47%,15%)]">3D Services</p>
                  <p className="text-[13px] text-[#6B7280]">Fondateur : Omar Oueslati</p>
                </div>

                <div className="space-y-2 w-full">
                  {["Équipe professionnelle", "Fondé depuis 2026", "Basé à Lyon (69)", "CERTIFICATION QUALITÉ"].map(b => (
                    <div key={b} className="flex items-center gap-2 bg-[hsl(138,76%,97%)] rounded-lg px-3 py-2">
                      <Check className="w-3 h-3 text-green-600" />
                      <span className="text-xs font-semibold text-[hsl(142,64%,39%)]">{b}</span>
                    </div>
                  ))}
                </div>

              </div>

              <div>
                <p className="text-[15px] text-[#374151] leading-[1.8] mb-4">
                  Fondée en 2026, 3D Services propose un service de débarras à la fois professionnel, humain et sans jugement. Rigueur, discrétion et sens de l'organisation sont les qualités héritées de notre parcours, appliquées à chaque intervention dans la région lyonnaise.
                </p>

                <p className="text-[15px] text-[#374151] leading-[1.8] mb-6">
                  Notre équipe intervient avec soin sur chaque chantier, qu'il s'agisse d'une succession, d'un débarras complet ou d'un débarras d'appartement à Lyon ou dans la région.
                </p>

                <div className="bg-white border-l-[3px] border-[hsl(221,76%,48%)] rounded-r-lg px-5 py-4">
                  <p className="text-[15px] text-[#374151] italic">
                    "Chaque débarras mérite d'être mené avec sérieux, méthode et humanité."
                  </p>
                  <p className="text-sm font-bold text-[hsl(224,47%,15%)] mt-2">
                    — L'équipe 3D Services
                  </p>
                </div>
              </div>

            </div>

          </motion.div>
        </div>
      </section>


    {/* REPÈRES */}
    <section className="py-20 bg-[hsl(220,20%,98%)]">
      <div className="max-w-[1100px] mx-auto px-6 text-center">
        <h2 className="text-[28px] font-extrabold text-[hsl(224,47%,15%)] mb-2">Quelques repères concrets</h2>
        <p className="text-sm text-[#6B7280] mb-12">Des chiffres simples pour mieux situer notre activité et notre expérience sur le terrain.</p>
        <div className="grid sm:grid-cols-3 gap-8">
          <Counter target={15} label="ans d'expérience dans le débarras et la remise en état" />
          <Counter target={1500} label="logements débarrassés depuis la création" />
          <Counter target={500} suffix=" T" label="triés et évacués dans des filières adaptées" />
        </div>
      </div>
    </section>

    {/* DESCRIPTION 2 COL */}
    <section className="py-20 bg-white">
      <div className="max-w-[1100px] mx-auto px-6 grid lg:grid-cols-[55%_45%] gap-12 items-center">
        <div>
          <p className="text-[15px] text-[#374151] leading-[1.8] mb-4">
            Fondée avec la volonté de simplifier la vie de ses clients, 3D Services est devenue une référence locale dans la région lyonnaise pour le débarras de maison, de tri et la remise au propre. Vider un logement n'est jamais une simple opération logistique : c'est souvent une étape liée à une succession, un déménagement, une vente immobilière ou une situation personnelle délicate.
          </p>
          <p className="text-[15px] text-[#374151] leading-[1.8] mb-6">
            Notre force ? Une équipe soudée, réactive et respectueuse. Nous intervenons aussi bien pour débarrasser une maison encombrée que pour vider intégralement une succession dans la région lyonnaise. Lyon, Villeurbanne, Saint-Étienne, Chalon-sur-Saône — nous couvrons un rayon de 200km.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/devis" className="px-7 py-3 rounded-lg bg-[hsl(221,76%,48%)] text-white font-bold text-sm hover:bg-[hsl(221,76%,42%)] transition-colors">
              Demander un devis gratuit
            </Link>
            <a href="tel:0609991736" className="px-7 py-3 rounded-lg border-2 border-[hsl(221,76%,48%)] text-[hsl(221,76%,48%)] font-bold text-sm hover:bg-[hsl(226,100%,97%)] transition-colors inline-flex items-center gap-2">
              <Phone className="w-4 h-4" /> 06 09 99 17 36
            </a>
          </div>
        </div>
        <div>
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700" alt="Intervention débarras" className="w-full rounded-xl shadow-lg object-cover aspect-[4/3]" loading="lazy" />
        </div>
      </div>
    </section>

    {/* ZONES */}
    <section className="py-16 bg-white">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="bg-[hsl(224,47%,15%)] rounded-xl p-7 sm:p-10">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="w-5 h-5 text-[hsl(0,72%,51%)]" />
            <h3 className="text-lg font-bold text-white">Débarras à Lyon & dans un rayon de 200km</h3>
          </div>
          <p className="text-white/80 text-sm mb-6 max-w-2xl">
            Depuis 2026, nous intervenons dans toute la région lyonnaise et selon les besoins dans les secteurs voisins. Plus de 200km couverts, avec des interventions chez des particuliers, des notaires et des professionnels.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {["Lyon (69)", "Villeurbanne & environs", "Saint-Étienne (42)", "Chalon-sur-Saône (71)", "Bourg-en-Bresse (01)", "Grenoble & Isère (38)"].map(z => (
              <div key={z} className="flex items-center gap-2.5 bg-white/10 rounded-lg px-4 py-3">
                <span className="w-[16px] h-[16px] rounded bg-[hsl(142,64%,39%)] flex items-center justify-center"><Check className="w-2.5 h-2.5 text-white" /></span>
                <span className="text-sm text-white">{z}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* SERVICE COMPLET */}
    <section className="py-20 bg-[hsl(220,20%,98%)]">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-white border-l-4 border-[hsl(32,87%,44%)] rounded-xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-5 h-5 text-[hsl(32,87%,44%)]" />
            <h3 className="text-lg font-bold text-[hsl(224,47%,15%)]">Un service complet, de A à Z</h3>
          </div>
          <p className="text-sm text-[#6B7280] leading-[1.8] mb-4">
            Chez 3D Services, notre métier ne s'arrête pas au simple enlèvement des encombrants. Lorsqu'un logement est très encombré, insalubre ou resté fermé longtemps, il peut y avoir des odeurs, des souillures et parfois la présence de nuisibles. C'est pourquoi nous proposons une approche globale de remise en état : débarras, nettoyage, démolition et si nécessaire, désamiantage.
          </p>
          <p className="text-sm text-[#6B7280]">
            Si vous cherchez une entreprise de dératisation ou de désinsectisation dans la région lyonnaise, découvrez nos services dédiés.
          </p>
        </motion.div>
      </div>
    </section>

    {/* TOUTES NOS PRESTATIONS */}
    <section className="py-20 bg-[hsl(224,47%,15%)]">
      <div className="max-w-[1100px] mx-auto px-6">
        <h2 className="text-[28px] font-extrabold text-white mb-2">Découvrez toutes nos prestations :</h2>
        <p className="text-[13px] text-white/70 mb-10">Tri, valorisation, évacuation et mise au propre — une méthode claire à chaque intervention.</p>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            { emoji: "🏠", title: "Maison & Appartement", href: "/services/debarras" },
            { emoji: "🤝", title: "Succession", href: "/services/debarras/succession" },
            { emoji: "📦", title: "Cave, Grenier & Garage", href: "/services/debarras/cave-grenier" },
            { emoji: "🌀", title: "Nettoyage Diogène", href: "/services/nettoyage/diogene" },
          ].map((c, i) => (
            <motion.div key={c.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
              <Link to={c.href} className="block bg-white/[0.08] border border-white/[0.15] rounded-xl p-5 hover:bg-white/[0.12] transition-colors group">
                <span className="text-[32px] block mb-2">{c.emoji}</span>
                <p className="text-white font-bold mb-1">{c.title}</p>
                <span className="text-white/70 text-sm group-hover:text-white transition-colors">Découvrir →</span>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 items-center text-[13px] text-white/60">
          <Link to="/services/debarras/professionnel" className="underline hover:text-white/80">Locaux pros : débarras professionnels</Link>
          <Link to="/services/debarras/sinistre" className="underline hover:text-white/80">Après sinistre : débarras après sinistre</Link>
          <Link to="/tarifs" className="underline hover:text-white/80">Tarifs</Link>
          <Link to="/devis" className="ml-auto px-5 py-2 rounded-full bg-[hsl(221,76%,48%)] text-white text-sm font-bold hover:bg-[hsl(221,76%,42%)] transition-colors">
            Devis gratuit →
          </Link>
        </div>
      </div>
    </section>

    {/* POURQUOI NOUS */}
    <section className="py-20 bg-white">
      <div className="max-w-[1100px] mx-auto px-6 text-center">
        <h2 className="text-[28px] font-extrabold text-[hsl(224,47%,15%)] mb-2">Pourquoi nous choisir ?</h2>
        <p className="text-sm text-[#6B7280] mb-12">Nos engagements pour un service de qualité dans la région lyonnaise</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { emoji: "♻️", title: "Éco-responsable", desc: "Nous traitons avec attention ce qui peut être remémorisé ou donné. Le reste est évacué dans des filières professionnelles agréées." },
            { emoji: "🤝", title: "Approche humaine", desc: "Discrétion, respect et empathie guident nos interventions, en particulier dans les contextes sensibles comme les successions ou les logements très encombrés." },
            { emoji: "⚡", title: "Rapidité & efficacité", desc: "Une vente immobilière, une fin de bail ou un besoin urgent ? Nous intervenons rapidement pour rétablir les lieux dans de bonnes conditions." },
            { emoji: "📋", title: "Entreprise sérieuse et organisée", desc: "Devis clair, intervention dans les délais, respect du logement et possibilité de justificatifs selon la prestation." },
          ].map((c, i) => (
            <motion.div key={c.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
              className="bg-white border border-[#E5E7EB] rounded-xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <span className="text-[40px] block mb-4">{c.emoji}</span>
              <h3 className="text-base font-bold text-[hsl(224,47%,15%)] mb-2">{c.title}</h3>
              <p className="text-[13px] text-[#6B7280] leading-relaxed">{c.desc}</p>
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
          <span className="flex items-center gap-2"><MapPin className="w-4 h-4" />24 Avenue Joannés Masset, Lyon 69009
</span>
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
  </Layout>
);
}
export default About;
