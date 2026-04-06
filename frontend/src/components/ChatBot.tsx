import { useState, useRef, useEffect, useCallback } from "react";
import { MessageSquare, X, Send, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Suggestion {
  text: string;
  response: string;
}

interface ChatbotConfig {
  welcome_message: string;
  system_prompt: string;
  proactive_delay: number;
  proactive_message: string;
  suggestions: Suggestion[];
  enabled: boolean;
}

const ChatBot = () => {
  const [config, setConfig] = useState<ChatbotConfig | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = sessionStorage.getItem("rps-chat");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showProactive, setShowProactive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const proactiveTimer = useRef<ReturnType<typeof setTimeout>>();

  // ── Fetch config depuis l'API Laravel ──────────────────────────
  useEffect(() => {
    axios.get("/api/chatbot-config")
      .then(res => setConfig(res.data.data))
      .catch(() => {
        // Fallback si l'API est indisponible
        setConfig({
          welcome_message: "Bonjour ! 👋 Je suis l'assistant de 3D Services.\n\nJe peux vous aider pour un devis, vérifier si on intervient chez vous, ou répondre à toutes vos questions.\n\nComment puis-je vous aider ?",
          system_prompt: "Tu es l'assistant virtuel de 3D Services.",
          proactive_delay: 30,
          proactive_message: "Vous avez des questions sur nos tarifs ou notre zone d'intervention ? 😊",
          suggestions: [
            { text: "Devis gratuit rapide", response: "Bien sûr ! Pour un devis rapide, j'ai besoin de quelques infos : quel type de prestation (débarras ou nettoyage) et quel lieu ? Vous pouvez aussi appeler le 06 09 99 17 36. 😊" },
            { text: "Vous intervenez où ?", response: "Nous intervenons dans tout Paris (75) et l'Île-de-France : 77, 78, 91, 92, 93, 94, 95." },
            { text: "C'est combien ?", response: "Nos tarifs varient de 20€ à 50€/m³. Le débarras peut être gratuit ou indemnisé si vos objets ont de la valeur !" },
            { text: "Débarras gratuit possible ?", response: "Oui ! Si la valeur de vos objets couvre les frais, le débarras est 100% gratuit. Contactez-nous pour évaluer votre situation. 🎁" },
          ],
          enabled: true,
        });
      });
  }, []);

  // ── Persistance session ─────────────────────────────────────────
  useEffect(() => {
    sessionStorage.setItem("rps-chat", JSON.stringify(messages));
  }, [messages]);

  // ── Scroll automatique ──────────────────────────────────────────
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // ── Timer message proactif ──────────────────────────────────────
  useEffect(() => {
    if (!config || isOpen || messages.length > 0) return;
    proactiveTimer.current = setTimeout(
      () => setShowProactive(true),
      (config.proactive_delay ?? 30) * 1000
    );
    return () => clearTimeout(proactiveTimer.current);
  }, [config, isOpen, messages.length]);

  // ── Envoi de message ────────────────────────────────────────────
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    setShowProactive(false);
    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Vérifier si le texte correspond à une suggestion rapide
    const matched = config?.suggestions?.find(
      s => s.text.toLowerCase() === text.trim().toLowerCase()
    );

    await new Promise(r => setTimeout(r, 900));

    if (matched) {
      setMessages(prev => [...prev, { role: "assistant", content: matched.response }]);
    } else {
      // Réponse générique pour les questions hors suggestions
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Merci pour votre message ! Pour vous répondre au mieux, n'hésitez pas à nous appeler au 06 09 99 17 36 ou à demander un devis gratuit. Notre équipe vous répondra sous 2 heures. 😊",
      }]);
    }

    setLoading(false);
  }, [messages, loading, config]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const hasContactInfo = messages.some(m =>
    m.role === "user" && /0[67]\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}/.test(m.content)
  );

  // N'affiche rien si le chatbot est désactivé ou config non chargée
  if (config && !config.enabled) return null;

  return (
    <>
      {/* ── Bulle proactive ───────────────────────────────────────── */}
      <AnimatePresence>
        {showProactive && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-[140px] right-6 z-50 max-w-[260px] bg-card rounded-2xl shadow-premium p-4 border border-border"
          >
            <button
              onClick={() => setShowProactive(false)}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <p className="text-sm text-foreground leading-relaxed">
              {config?.proactive_message ?? "Besoin d'aide ?"}
            </p>
            <button
              onClick={() => { setShowProactive(false); setIsOpen(true); }}
              className="mt-3 text-xs font-semibold text-primary-accent flex items-center gap-1 hover:gap-2 transition-all"
            >
              Discuter <ArrowRight className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bouton d'ouverture ────────────────────────────────────── */}
      <motion.button
        onClick={() => { setIsOpen(!isOpen); setShowProactive(false); }}
        className="fixed bottom-[88px] right-6 z-50 w-14 h-14 rounded-full bg-primary-accent text-primary-foreground shadow-glow flex items-center justify-center hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        aria-label="Chat IA"
        title="Posez-nous vos questions 24h/24"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold text-[9px] font-bold flex items-center justify-center text-primary">
          IA
        </span>
      </motion.button>

      {/* ── Fenêtre de chat ───────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-[160px] right-6 z-50 w-[320px] h-[480px] max-h-[70vh] bg-card rounded-2xl shadow-premium border border-border flex flex-col overflow-hidden
              max-[640px]:inset-0 max-[640px]:w-full max-[640px]:h-full max-[640px]:max-h-full max-[640px]:rounded-none max-[640px]:bottom-0 max-[640px]:right-0"
          >
            {/* Header */}
            <div className="px-4 py-3 gradient-primary flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-xs font-bold text-gold">3DS</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-primary-foreground truncate">Assistant 3D Services</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="text-[10px] text-primary-foreground/60">En ligne maintenant</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-primary-foreground/60 hover:text-primary-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">

              {/* Message de bienvenue */}
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-primary-accent/10 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-[8px] font-bold text-primary-accent">3DS</span>
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-sm px-3 py-2.5 max-w-[85%]">
                  <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
                    {config?.welcome_message ?? "Chargement..."}
                  </p>
                </div>
              </div>

              {/* Suggestions rapides (affichées seulement si aucun message) */}
              {messages.length === 0 && config?.suggestions && (
                <div className="flex flex-wrap gap-1.5 pl-9">
                  {config.suggestions.filter(s => s.text).map((s, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(s.text)}
                      className="px-3 py-1.5 rounded-full border border-primary-accent/20 text-xs font-medium text-primary-accent hover:bg-primary-accent/5 transition-colors"
                    >
                      {s.text}
                    </button>
                  ))}
                </div>
              )}

              {/* Historique des messages */}
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : ""}`}>
                  {m.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-primary-accent/10 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-[8px] font-bold text-primary-accent">3DS</span>
                    </div>
                  )}
                  <div className={`rounded-2xl px-3 py-2.5 max-w-[85%] text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary-accent text-primary-foreground rounded-tr-sm"
                      : "bg-muted text-foreground rounded-tl-sm"
                  }`}>
                    {m.content}
                  </div>
                </div>
              ))}

              {/* Confirmation numéro de téléphone détecté */}
              {hasContactInfo && (
                <div className="ml-9 bg-secondary/10 border border-secondary/20 rounded-xl p-3">
                  <p className="text-sm text-foreground font-medium">
                    ✅ Notre équipe vous rappelle dans les 2h !
                  </p>
                </div>
              )}

              {/* Indicateur de frappe */}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary-accent/10 flex items-center justify-center shrink-0">
                    <span className="text-[8px] font-bold text-primary-accent">3DS</span>
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
                    {[0, 1, 2].map(i => (
                      <motion.span
                        key={i}
                        className="w-2 h-2 rounded-full bg-muted-foreground/40"
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Zone de saisie */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-border flex gap-2 shrink-0">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Votre question..."
                className="flex-1 px-3 py-2 rounded-xl border border-border bg-background text-sm text-foreground focus:ring-2 focus:ring-primary-accent focus:border-transparent outline-none"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-xl bg-primary-accent text-primary-foreground flex items-center justify-center hover:bg-primary-accent/90 transition-colors disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;