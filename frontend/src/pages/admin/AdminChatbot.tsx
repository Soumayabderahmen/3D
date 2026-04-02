import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Save, RotateCcw, MessageSquare, Clock, Zap } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

const defaultConfig = {
  welcomeMessage: "Bonjour ! 👋 Je suis l'assistant de 3D Services. Je peux vous aider pour :\n• Obtenir un devis de débarras\n• Connaître nos tarifs\n• Prendre rendez-vous\nComment puis-je vous aider ?",
  systemPrompt: "Tu es l'assistant virtuel de 3D Services, une entreprise de débarras en Île-de-France. Tu es professionnel, chaleureux et efficace. Tu connais les services : débarras maison/appartement, cave, garage, succession, nettoyage Diogène, dératisation. Zone : Paris et Île-de-France. Téléphone : 06 09 99 17 36.",
  proactiveDelay: 30,
  proactiveMessage: "Besoin d'un devis gratuit ? Je peux vous aider ! 😊",
  suggestions: [
    { text: "Obtenir un devis", response: "Pour obtenir un devis gratuit, il me faut quelques informations : votre adresse, le type de prestation souhaitée et le volume approximatif. Vous pouvez aussi appeler le 06 09 99 17 36." },
    { text: "Quels sont vos tarifs ?", response: "Nos tarifs démarrent à partir de 80€ pour un petit débarras. Le prix dépend du volume, de l'accessibilité et du type d'objets. Consultez notre page tarifs pour plus de détails." },
    { text: "Zones d'intervention", response: "Nous intervenons sur Paris et toute l'Île-de-France : 75, 77, 78, 91, 92, 93, 94, 95. Intervention possible sous 24-48h." },
    { text: "Prendre rendez-vous", response: "Pour prendre rendez-vous, appelez-nous au 06 09 99 17 36 ou remplissez le formulaire de devis en ligne. Nous vous recontactons sous 2h." },
  ],
  maxMessages: 50,
  enabled: true,
};

const AdminChatbot = () => {
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem("admin_chatbot_config");
    return saved ? JSON.parse(saved) : defaultConfig;
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem("admin_chatbot_config", JSON.stringify(config));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setConfig(defaultConfig);
    localStorage.setItem("admin_chatbot_config", JSON.stringify(defaultConfig));
  };

  const inputCls = "w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#1A56DB]/30 focus:border-[#1A56DB] outline-none";

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0D1B3E]">Configuration Chatbot</h1>
            <p className="text-sm text-[#888]">Personnalisez l'assistant virtuel du site</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm font-medium text-[#374151] hover:bg-[#F9FAFB] transition">
              <RotateCcw className="w-4 h-4" /> Réinitialiser
            </button>
            <motion.button whileTap={{ scale: 0.98 }} onClick={handleSave} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-bold transition ${saved ? "bg-[#16A34A]" : "bg-[#1A56DB] hover:bg-[#1347BE]"}`}>
              <Save className="w-4 h-4" /> {saved ? "Enregistré ✓" : "Enregistrer"}
            </motion.button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* General settings */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
              <h2 className="text-base font-bold text-[#0D1B3E] flex items-center gap-2 mb-4"><Bot className="w-5 h-5 text-[#1A56DB]" /> Paramètres généraux</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-[#374151]">Chatbot actif</label>
                  <button onClick={() => setConfig({ ...config, enabled: !config.enabled })} className={`w-12 h-6 rounded-full transition-colors relative ${config.enabled ? "bg-[#16A34A]" : "bg-[#E5E7EB]"}`}>
                    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${config.enabled ? "left-[26px]" : "left-0.5"}`} />
                  </button>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Message de bienvenue</label>
                  <textarea value={config.welcomeMessage} onChange={e => setConfig({ ...config, welcomeMessage: e.target.value })} rows={4} className={inputCls + " resize-none"} />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Prompt système</label>
                  <textarea value={config.systemPrompt} onChange={e => setConfig({ ...config, systemPrompt: e.target.value })} rows={5} className={inputCls + " resize-none"} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
              <h2 className="text-base font-bold text-[#0D1B3E] flex items-center gap-2 mb-4"><Zap className="w-5 h-5 text-[#D97706]" /> Message proactif</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Délai d'apparition (secondes)</label>
                  <input type="number" value={config.proactiveDelay} onChange={e => setConfig({ ...config, proactiveDelay: parseInt(e.target.value) || 0 })} className={inputCls + " w-32"} />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Texte du message proactif</label>
                  <input value={config.proactiveMessage} onChange={e => setConfig({ ...config, proactiveMessage: e.target.value })} className={inputCls} />
                </div>
              </div>
            </div>
          </div>

          {/* Suggestions & preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
              <h2 className="text-base font-bold text-[#0D1B3E] flex items-center gap-2 mb-4"><MessageSquare className="w-5 h-5 text-[#16A34A]" /> Suggestions rapides</h2>
              <div className="space-y-4">
                {config.suggestions.map((s: { text: string; response: string }, i: number) => (
                  <div key={i} className="border border-[#E5E7EB] rounded-xl p-3 space-y-2 bg-[#F9FAFB]">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#D97706] shrink-0" />
                      <input
                        value={s.text}
                        placeholder="Texte de la suggestion"
                        onChange={e => {
                          const newS = [...config.suggestions];
                          newS[i] = { ...newS[i], text: e.target.value };
                          setConfig({ ...config, suggestions: newS });
                        }}
                        className={inputCls}
                      />
                      <button onClick={() => setConfig({ ...config, suggestions: config.suggestions.filter((_: { text: string; response: string }, j: number) => j !== i) })} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition shrink-0">×</button>
                    </div>
                    <textarea
                      value={s.response}
                      placeholder="Réponse automatique du chatbot..."
                      onChange={e => {
                        const newS = [...config.suggestions];
                        newS[i] = { ...newS[i], response: e.target.value };
                        setConfig({ ...config, suggestions: newS });
                      }}
                      rows={2}
                      className={inputCls + " resize-none text-xs"}
                    />
                  </div>
                ))}
                <button onClick={() => setConfig({ ...config, suggestions: [...config.suggestions, { text: "", response: "" }] })} className="text-sm text-[#1A56DB] font-semibold hover:underline">+ Ajouter une suggestion</button>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
              <h2 className="text-base font-bold text-[#0D1B3E] mb-4">Aperçu</h2>
              <div className="bg-[#F9FAFB] rounded-xl p-4 border border-[#E5E7EB]">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#E5E7EB]">
                  <div className="w-8 h-8 rounded-full bg-[#1A56DB] flex items-center justify-center"><Bot className="w-4 h-4 text-white" /></div>
                  <span className="text-sm font-bold text-[#0D1B3E]">Assistant 3D Services</span>
                  <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-semibold ${config.enabled ? "bg-[#F0FDF4] text-[#16A34A]" : "bg-red-50 text-red-500"}`}>
                    {config.enabled ? "En ligne" : "Hors ligne"}
                  </span>
                </div>
                <div className="bg-white rounded-lg p-3 text-sm text-[#374151] whitespace-pre-line mb-3 shadow-sm">
                  {config.welcomeMessage}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {config.suggestions.filter((s: { text: string; response: string }) => s.text).map((s: { text: string; response: string }, i: number) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-[#EEF2FF] text-[#1A56DB] text-xs font-medium">{s.text}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminChatbot;
