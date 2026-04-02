import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, FileText, Star, Phone as PhoneIcon, Sparkles, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo3d from "@/assets/logo-3d-services.png";

const navLinks = [
  { label: "Accueil", href: "/", icon: Home },
  { label: "Services", href: "/services", icon: Sparkles, hasDropdown: true },
  { label: "Tarifs", href: "/tarifs", icon: FileText },
  { label: "Zones", href: "/zones-intervention", icon: Sparkles },
  { label: "Devis", href: "/devis", icon: FileText },
  { label: "Avis", href: "/avis", icon: Star },
  { label: "Actualités", href: "/actualites", icon: Sparkles },
  { label: "À propos", href: "/qui-sommes-nous", icon: Home },
  { label: "Contact", href: "/contact", icon: PhoneIcon },
];

const dropdownServices = [
  { label: "Débarras", href: "/services/debarras", emoji: "🏠" },
  { label: "Démolition", href: "/services/demolition", emoji: "🔨" },
  { label: "Désamiantage", href: "/services/desamiantage", emoji: "⚠️" },
  { label: "Nettoyage", href: "/services/nettoyage", emoji: "✨" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownTimeout = { current: undefined as ReturnType<typeof setTimeout> | undefined };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href.split("#")[0]);
  };

  const openDropdown = () => {
    clearTimeout(dropdownTimeout.current);
    setDropdownOpen(true);
  };
  const closeDropdown = () => {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 200);
  };

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "bg-card/90 backdrop-blur-xl shadow-premium" : "bg-card"}`}>
      <div className="container flex items-center justify-between h-16 lg:h-18">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo3d} alt="3D Services" className="h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) =>
            l.hasDropdown ? (
              <div key={l.href} className="relative" onMouseEnter={openDropdown} onMouseLeave={closeDropdown}>
                <button className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(l.href) ? "text-primary-accent bg-primary-accent/5" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                  {l.label}
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-90" : ""}`} />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-64 bg-card rounded-xl shadow-premium border border-border overflow-hidden py-2"
                    >
                      {dropdownServices.map((s) => (
                        <Link
                          key={s.href}
                          to={s.href}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors group"
                        >
                          <span className="text-lg">{s.emoji}</span>
                          <span className="flex-1 font-medium">{s.label}</span>
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link key={l.href} to={l.href} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(l.href) ? "text-primary-accent bg-primary-accent/5" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                {l.label}
              </Link>
            )
          )}
        </nav>

        <Link to="/devis" className="hidden lg:inline-flex items-center px-5 py-2.5 rounded-full gradient-cta text-primary-foreground text-sm font-semibold shadow-glow hover:shadow-lg hover:-translate-y-0.5 transition-all shimmer">
          Devis Gratuit
        </Link>

        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-foreground" aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-card border-t border-border overflow-hidden">
            <div className="container py-4 space-y-1">
              {navLinks.filter(l => !l.hasDropdown).map((l) => (
                <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive(l.href) ? "text-primary-accent bg-primary-accent/5" : "text-foreground hover:bg-muted"}`}>
                  <l.icon className="w-4 h-4" />
                  {l.label}
                </Link>
              ))}
              <div className="px-4 pt-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Services</p>
                {dropdownServices.map((s) => (
                  <Link key={s.href} to={s.href} onClick={() => setOpen(false)} className="flex items-center gap-2 py-2 text-sm text-foreground">
                    <span>{s.emoji}</span>
                    {s.label}
                  </Link>
                ))}
              </div>
              <Link to="/devis" onClick={() => setOpen(false)} className="block text-center mt-3 px-5 py-3 rounded-full gradient-cta text-primary-foreground font-semibold">
                Devis Gratuit
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
