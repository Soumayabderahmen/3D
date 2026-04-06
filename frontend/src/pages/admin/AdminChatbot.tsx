// src/pages/admin/AdminChatbot.tsx
import { motion } from "framer-motion";
import { Bot, Save, RotateCcw, MessageSquare, Zap, Loader2, AlertCircle } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useChatbotConfig } from "../../hooks/useChatbotConfig";
import type { Suggestion } from "../../services/chatbotConfigService";

const AdminChatbot = () => {
  const {
    config,
    setConfig,
    loading,
    saving,
    saved,
    error,
    handleSave,
    handleToggle,
    handleReset,
  } = useChatbotConfig();

  const inputCls =
    "w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#1A56DB]/30 focus:border-[#1A56DB] outline-none";

  // ── Helpers suggestions ──────────────────────────────────────
  const updateSuggestion = (index: number, field: keyof Suggestion, value: string) => {
    const newS = [...config.suggestions];
    newS[index] = { ...newS[index], [field]: value };
    setConfig({ ...config, suggestions: newS });
  };

  const removeSuggestion = (index: number) => {
    setConfig({ ...config, suggestions: config.suggestions.filter((_, i) => i !== index) });
  };

  const addSuggestion = () => {
    setConfig({ ...config, suggestions: [...config.suggestions, { text: "", response: "" }] });
  };

  // ── Loading state ────────────────────────────────────────────
  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-[#1A56DB] animate-spin" />
          <span className="ml-3 text-[#374151] font-medium">Chargement de la configuration…</span>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0D1B3E]">Configuration Chatbot</h1>
            <p className="text-sm text-[#888]">Personnalisez l'assistant virtuel du site</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm font-medium text-[#374151] hover:bg-[#F9FAFB] transition"
            >
              <RotateCcw className="w-4 h-4" /> Réinitialiser
            </button>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={saving}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-bold transition
                ${saved ? "bg-[#16A34A]" : saving ? "bg-[#93AAED] cursor-not-allowed" : "bg-[#1A56DB] hover:bg-[#1347BE]"}`}
            >
              {saving ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Sauvegarde…</>
              ) : saved ? (
                <><Save className="w-4 h-4" /> Enregistré ✓</>
              ) : (
                <><Save className="w-4 h-4" /> Enregistrer</>
              )}
            </motion.button>
          </div>
        </div>

        {/* ── Bandeau d'erreur ── */}
        {error && (
          <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">

          {/* ── Colonne gauche ── */}
          <div className="space-y-6">

            {/* Paramètres généraux */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
              <h2 className="text-base font-bold text-[#0D1B3E] flex items-center gap-2 mb-4">
                <Bot className="w-5 h-5 text-[#1A56DB]" /> Paramètres généraux
              </h2>
              <div className="space-y-4">

                {/* Toggle */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-[#374151]">Chatbot actif</label>
                  <button
                    onClick={handleToggle}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      config.enabled ? "bg-[#16A34A]" : "bg-[#E5E7EB]"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                        config.enabled ? "left-[26px]" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>

                {/* Message de bienvenue */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">
                    Message de bienvenue
                  </label>
                  <textarea
                    value={config.welcome_message}
                    onChange={e => setConfig({ ...config, welcome_message: e.target.value })}
                    rows={4}
                    className={inputCls + " resize-none"}
                  />
                </div>

                {/* Prompt système */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">
                    Prompt système
                  </label>
                  <textarea
                    value={config.system_prompt}
                    onChange={e => setConfig({ ...config, system_prompt: e.target.value })}
                    rows={5}
                    className={inputCls + " resize-none"}
                  />
                </div>

                {/* Max messages */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">
                    Nombre max de messages
                  </label>
                  <input
                    type="number"
                    value={config.max_messages}
                    onChange={e => setConfig({ ...config, max_messages: parseInt(e.target.value) || 50 })}
                    className={inputCls + " w-32"}
                  />
                </div>
              </div>
            </div>

            {/* Message proactif */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
              <h2 className="text-base font-bold text-[#0D1B3E] flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-[#D97706]" /> Message proactif
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">
                    Délai d'apparition (secondes)
                  </label>
                  <input
                    type="number"
                    value={config.proactive_delay}
                    onChange={e => setConfig({ ...config, proactive_delay: parseInt(e.target.value) || 0 })}
                    className={inputCls + " w-32"}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">
                    Texte du message proactif
                  </label>
                  <input
                    value={config.proactive_message}
                    onChange={e => setConfig({ ...config, proactive_message: e.target.value })}
                    className={inputCls}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Colonne droite ── */}
          <div className="space-y-6">

            {/* Suggestions */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
              <h2 className="text-base font-bold text-[#0D1B3E] flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-[#16A34A]" /> Suggestions rapides
              </h2>
              <div className="space-y-4">
                {config.suggestions.map((s: Suggestion, i: number) => (
                  <div key={i} className="border border-[#E5E7EB] rounded-xl p-3 space-y-2 bg-[#F9FAFB]">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#D97706] shrink-0" />
                      <input
                        value={s.text}
                        placeholder="Texte de la suggestion"
                        onChange={e => updateSuggestion(i, 'text', e.target.value)}
                        className={inputCls}
                      />
                      <button
                        onClick={() => removeSuggestion(i)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition shrink-0"
                      >
                        ×
                      </button>
                    </div>
                    <textarea
                      value={s.response}
                      placeholder="Réponse automatique du chatbot…"
                      onChange={e => updateSuggestion(i, 'response', e.target.value)}
                      rows={2}
                      className={inputCls + " resize-none text-xs"}
                    />
                  </div>
                ))}
                <button
                  onClick={addSuggestion}
                  className="text-sm text-[#1A56DB] font-semibold hover:underline"
                >
                  + Ajouter une suggestion
                </button>
              </div>
            </div>

            {/* Aperçu */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
              <h2 className="text-base font-bold text-[#0D1B3E] mb-4">Aperçu</h2>
              <div className="bg-[#F9FAFB] rounded-xl p-4 border border-[#E5E7EB]">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#E5E7EB]">
                  <div className="w-8 h-8 rounded-full bg-[#1A56DB] flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-bold text-[#0D1B3E]">Assistant 3D Services</span>
                  <span
                    className={`ml-auto text-xs px-2 py-0.5 rounded-full font-semibold ${
                      config.enabled ? "bg-[#F0FDF4] text-[#16A34A]" : "bg-red-50 text-red-500"
                    }`}
                  >
                    {config.enabled ? "En ligne" : "Hors ligne"}
                  </span>
                </div>
                <div className="bg-white rounded-lg p-3 text-sm text-[#374151] whitespace-pre-line mb-3 shadow-sm">
                  {config.welcome_message}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {config.suggestions
                    .filter((s: Suggestion) => s.text)
                    .map((s: Suggestion, i: number) => (
                      <span key={i} className="px-3 py-1.5 rounded-full bg-[#EEF2FF] text-[#1A56DB] text-xs font-medium">
                        {s.text}
                      </span>
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