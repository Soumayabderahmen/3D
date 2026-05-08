import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../components/layout/Layout";
import SEOHead from "../components/SEOHead";
import { Home, ArrowLeft, Phone } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
<SEOHead
  title="Page introuvable"
  description="La page que vous recherchez n'existe pas ou a été déplacée."
  noindex={true}
  canonical="/404"
  url="/404"
/>      <section className="py-24 bg-surface">
        <div className="container max-w-xl text-center">
          <p className="text-8xl font-black text-primary-accent mb-4">404</p>
          <h1 className="font-display text-2xl font-bold text-foreground mb-3">Page introuvable</h1>
          <p className="text-muted-foreground mb-8">
            La page <code className="bg-muted px-2 py-0.5 rounded text-sm">{location.pathname}</code> n'existe pas ou a été déplacée.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-cta text-primary-foreground font-semibold">
              <Home className="w-4 h-4" /> Retour à l'accueil
            </Link>
            <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-semibold hover:bg-muted transition-colors">
              <ArrowLeft className="w-4 h-4" /> Nos services
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-semibold hover:bg-muted transition-colors">
              <Phone className="w-4 h-4" /> Contact
            </Link>
          </div>
          <div className="mt-12 text-sm text-muted-foreground">
            <p className="mb-2">Pages populaires :</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { label: "Débarras", to: "/services/debarras" },
                { label: "Nettoyage", to: "/services/nettoyage" },
                { label: "Démolition", to: "/services/demolition" },
                { label: "Tarifs", to: "/tarifs" },
                { label: "Devis gratuit", to: "/devis" },
                { label: "Zones d'intervention", to: "/zones-intervention" },
                { label: "Avis clients", to: "/avis" },
              ].map(l => (
                <Link key={l.to} to={l.to} className="px-3 py-1.5 rounded-full bg-card border border-border text-xs hover:border-primary-accent hover:text-primary-accent transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
