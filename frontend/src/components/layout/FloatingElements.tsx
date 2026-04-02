import { useState, useEffect } from "react";
import { MessageCircle, Phone, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingElements = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* WhatsApp */}
      <a
        href="https://wa.me/33609991736"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-whatsapp p-4 rounded-full shadow-2xl hover:scale-110 transition-transform group"
        style={{ animation: "pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite" }}
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-accent-foreground" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-card text-foreground text-xs font-medium px-3 py-1.5 rounded-lg shadow-card whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Réponse en moins de 5 min
        </span>
      </a>

      {/* Mobile call */}
      <a
        href="tel:0609991736"
        className="fixed bottom-6 left-6 z-50 md:hidden bg-primary-accent p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
        aria-label="Appeler"
      >
        <Phone className="w-6 h-6 text-primary-foreground" />
      </a>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-20 right-6 z-50 md:bottom-6 md:right-20 w-10 h-10 rounded-full bg-card shadow-premium border border-border flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-4 h-4 text-foreground" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingElements;
