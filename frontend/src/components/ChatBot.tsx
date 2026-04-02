import { useState, useRef, useEffect, useCallback } from "react";
import { MessageSquare, X, Send, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "Devis gratuit rapide",
  "Vous intervenez où ?",
  "C'est combien ?",
  "Débarras gratuit possible ?",
];

const WELCOME = `Bonjour ! 👋 Je suis l'assistant de 3D Services.\n\nJe peux vous aider pour un devis, vérifier si on intervient chez vous, ou répondre à toutes vos questions.\n\nComment puis-je vous aider ?`;

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de 3D Services, entreprise de débarras et nettoyage à Paris depuis 2015.
Réponds TOUJOURS en français, avec chaleur et professionnalisme. Sois concis (max 3-4 phrases par réponse).

INFORMATIONS SUR L'ENTREPRISE :
- Nom : 3D Services
- Adresse : 24 Avenue Joannés Masset, Lyon 69009
- Téléphone : 06 09 99 17 36
- Email : 3dservicefrance@gmail.com
- Horaires : 7j/7, 7h30–20h00
- Zone : Paris (75) + IDF : 77, 78, 91, 92, 93, 94, 95

SERVICES : Débarras appartement, maison, cave, grenier, box/garage, jardin, succession, SOS urgent. Nettoyage appartement, fin de chantier, insalubre, Diogène. Encombrants, archives entreprises.

3 FORMULES :
1. Débarras GRATUIT : si valeur des objets couvre l'intervention
2. Débarras INDEMNISÉ : si valeur > coût (on vous paie la différence)
3. Débarras FACTURÉ : 20 à 50€/m³

DÉLAIS : Devis sous 2h, intervention sous 24-72h.
OBJECTIF : Répondre, puis si la conversation avance demander prénom + téléphone pour rappel. En cas de succession, répondre avec empathie. Ne jamais inventer de prix précis, orienter vers devis gratuit.`;

const ChatBot = () => {
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

  useEffect(() => {
    sessionStorage.setItem("rps-chat", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (!isOpen && messages.length === 0) {
      proactiveTimer.current = setTimeout(() => setShowProactive(true), 30000);
    }
    return () => clearTimeout(proactiveTimer.current);
  }, [isOpen, messages.length]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    setShowProactive(false);
    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Simulate AI response (replace with real API call via edge function)
    const responses: Record<string, string> = {
      "devis gratuit rapide": "Bien sûr ! Pour un devis rapide, j'ai besoin de quelques infos : quel type de prestation (débarras ou nettoyage) et quel lieu (appartement, maison, cave…) ? Vous pouvez aussi appeler directement le 06 09 99 17 36 pour une réponse immédiate. 😊",
      "vous intervenez où ?": "Nous intervenons dans tout Paris (75) et l'Île-de-France : Seine-et-Marne (77), Yvelines (78), Essonne (91), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94) et Val-d'Oise (95). Tous les arrondissements parisiens sont couverts !",
      "c'est combien ?": "Nos tarifs varient de 20€ à 50€ par m³ selon le volume et l'accessibilité. Mais si vos objets ont de la valeur, le débarras peut être gratuit, voire indemnisé ! Demandez un devis gratuit pour une estimation précise. 📋",
      "débarras gratuit possible ?": "Oui, c'est tout à fait possible ! Si la valeur marchande de vos objets (meubles, électroménager, etc.) couvre les frais d'intervention, le débarras est 100% gratuit. Nous pouvons même vous rémunérer si la valeur dépasse le coût. Contactez-nous pour évaluer votre situation ! 🎁",
    };

    await new Promise(r => setTimeout(r, 1200));
    const lower = text.trim().toLowerCase();
    const matched = Object.entries(responses).find(([k]) => lower.includes(k) || k.includes(lower));
    const reply = matched
      ? matched[1]
      : "Merci pour votre message ! Pour vous répondre au mieux, n'hésitez pas à nous appeler au 06 09 99 17 36 ou à demander un devis gratuit sur notre page dédiée. Notre équipe vous répondra sous 2 heures. 😊";

    setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    setLoading(false);
  }, [messages, loading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  // Detect if user shared contact info
  const hasContactInfo = messages.some(m =>
    m.role === "user" && /0[67]\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}/.test(m.content)
  );

  return (
    <>
      {/* Proactive bubble */}
      <AnimatePresence>
        {showProactive && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-[140px] right-6 z-50 max-w-[260px] bg-card rounded-2xl shadow-premium p-4 border border-border"
          >
            <button onClick={() => setShowProactive(false)} className="absolute top-2 right-2 text-muted-foreground hover:text-foreground">
              <X className="w-3.5 h-3.5" />
            </button>
            <p className="text-sm text-foreground leading-relaxed">
              Vous avez des questions sur nos tarifs ou notre zone d'intervention ? 😊
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

      {/* Chat trigger */}
      <motion.button
        onClick={() => { setIsOpen(!isOpen); setShowProactive(false); }}
        className="fixed bottom-[88px] right-6 z-50 w-14 h-14 rounded-full bg-primary-accent text-primary-foreground shadow-glow flex items-center justify-center hover:scale-110 transition-transform group"
        whileHover={{ scale: 1.1 }}
        aria-label="Chat IA"
        title="Posez-nous vos questions 24h/24"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold text-[9px] font-bold flex items-center justify-center text-primary">
          IA
        </span>
      </motion.button>

      {/* Chat window */}
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
              {/* Welcome */}
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-primary-accent/10 flex items-center justify-center shrink-0 mt-1">
                  <span className="text-[8px] font-bold text-primary-accent">3DS</span>
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-sm px-3 py-2.5 max-w-[85%]">
                  <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">{WELCOME}</p>
                </div>
              </div>

              {/* Suggestions */}
              {messages.length === 0 && (
                <div className="flex flex-wrap gap-1.5 pl-9">
                  {SUGGESTIONS.map(s => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="px-3 py-1.5 rounded-full border border-primary-accent/20 text-xs font-medium text-primary-accent hover:bg-primary-accent/5 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

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

              {/* Contact info detected */}
              {hasContactInfo && (
                <div className="ml-9 bg-secondary/10 border border-secondary/20 rounded-xl p-3">
                  <p className="text-sm text-foreground font-medium">
                    ✅ Notre équipe vous rappelle dans les 2h !
                  </p>
                </div>
              )}

              {/* Typing indicator */}
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

            {/* Input */}
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
