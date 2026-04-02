import { useState } from "react";
import { motion } from "framer-motion";
import { Save, DollarSign, Percent, AlertTriangle } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

const defaultPricing = {
  surfaces: [
    { label: "Moins de 20 m²", base: 200 },
    { label: "20 à 40 m²", base: 400 },
    { label: "40 à 60 m²", base: 600 },
    { label: "60 à 80 m²", base: 800 },
    { label: "80 à 100 m²", base: 1000 },
    { label: "100 à 150 m²", base: 1400 },
    { label: "Plus de 150 m²", base: 1800 },
  ],
  supplements: [
    { label: "Garage", price: 150 },
    { label: "Cave", price: 100 },
    { label: "Sous-sol", price: 120 },
    { label: "Dépendance", price: 200 },
  ],
  annexePricePerM2: 3,
  encombrement: [
    { label: "Normal", multiplier: 1.0 },
    { label: "Plutôt encombré", multiplier: 1.3 },
    { label: "Accumulation compulsive", multiplier: 1.7 },
  ],
  salubrite: [
    { label: "Normal", multiplier: 1.0 },
    { label: "Poussiéreux", multiplier: 1.1 },
    { label: "Insalubre", multiplier: 1.3 },
    { label: "Syndrome de Diogène", multiplier: 1.6 },
  ],
  accessibilite: [
    { label: "Facile", multiplier: 1.0 },
    { label: "Moyen", multiplier: 1.1 },
    { label: "Compliqué", multiplier: 1.2 },
    { label: "Très compliqué", multiplier: 1.35 },
  ],
  fourchette: { min: 0.8, max: 1.2 },
};

const AdminTarifs = () => {
  const [pricing, setPricing] = useState(() => {
    const saved = localStorage.getItem("admin_pricing");
    return saved ? JSON.parse(saved) : defaultPricing;
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem("admin_pricing", JSON.stringify(pricing));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateSurface = (i: number, base: number) => {
    const s = [...pricing.surfaces];
    s[i] = { ...s[i], base };
    setPricing({ ...pricing, surfaces: s });
  };

  const updateSupplement = (i: number, price: number) => {
    const s = [...pricing.supplements];
    s[i] = { ...s[i], price };
    setPricing({ ...pricing, supplements: s });
  };

  const updateMultiplier = (key: string, i: number, multiplier: number) => {
    const arr = [...pricing[key]];
    arr[i] = { ...arr[i], multiplier };
    setPricing({ ...pricing, [key]: arr });
  };

  const inputCls = "px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#1A56DB]/30 focus:border-[#1A56DB] outline-none";

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0D1B3E]">Configuration Tarifs</h1>
            <p className="text-sm text-[#888]">Gérez la grille tarifaire du simulateur</p>
          </div>
          <motion.button whileTap={{ scale: 0.98 }} onClick={handleSave} className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-bold transition ${saved ? "bg-[#16A34A]" : "bg-[#1A56DB] hover:bg-[#1347BE]"}`}>
            <Save className="w-4 h-4" /> {saved ? "Enregistré ✓" : "Enregistrer"}
          </motion.button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Tarifs de base */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
            <h2 className="text-base font-bold text-[#0D1B3E] flex items-center gap-2 mb-4"><DollarSign className="w-5 h-5 text-[#1A56DB]" /> Tarifs de base par surface</h2>
            <div className="space-y-3">
              {pricing.surfaces.map((s: any, i: number) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <span className="text-sm text-[#374151] flex-1">{s.label}</span>
                  <div className="flex items-center gap-1">
                    <input type="number" value={s.base} onChange={e => updateSurface(i, parseInt(e.target.value) || 0)} className={inputCls + " w-24 text-right"} />
                    <span className="text-sm text-[#888]">€</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Supplements */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
            <h2 className="text-base font-bold text-[#0D1B3E] flex items-center gap-2 mb-4"><DollarSign className="w-5 h-5 text-[#16A34A]" /> Suppléments annexes</h2>
            <div className="space-y-3">
              {pricing.supplements.map((s: any, i: number) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <span className="text-sm text-[#374151]">{s.label}</span>
                  <div className="flex items-center gap-1">
                    <input type="number" value={s.price} onChange={e => updateSupplement(i, parseInt(e.target.value) || 0)} className={inputCls + " w-24 text-right"} />
                    <span className="text-sm text-[#888]">€</span>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between gap-4 pt-3 border-t border-[#E5E7EB]">
                <span className="text-sm text-[#374151]">Prix par m² annexe</span>
                <div className="flex items-center gap-1">
                  <input type="number" value={pricing.annexePricePerM2} onChange={e => setPricing({ ...pricing, annexePricePerM2: parseInt(e.target.value) || 0 })} className={inputCls + " w-24 text-right"} />
                  <span className="text-sm text-[#888]">€/m²</span>
                </div>
              </div>
            </div>
          </div>

          {/* Multiplicateurs */}
          {[
            { key: "encombrement", title: "Taux d'encombrement", icon: AlertTriangle, color: "#D97706" },
            { key: "salubrite", title: "État de salubrité", icon: AlertTriangle, color: "#DC2626" },
            { key: "accessibilite", title: "Accessibilité", icon: Percent, color: "#1A56DB" },
          ].map(({ key, title, icon: Icon, color }) => (
            <div key={key} className="bg-white rounded-xl border border-[#E5E7EB] p-6">
              <h2 className="text-base font-bold text-[#0D1B3E] flex items-center gap-2 mb-4"><Icon className="w-5 h-5" style={{ color }} /> {title}</h2>
              <div className="space-y-3">
                {pricing[key].map((item: any, i: number) => (
                  <div key={i} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-[#374151]">{item.label}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-[#888]">×</span>
                      <input type="number" step="0.05" value={item.multiplier} onChange={e => updateMultiplier(key, i, parseFloat(e.target.value) || 1)} className={inputCls + " w-20 text-right"} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Fourchette */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
            <h2 className="text-base font-bold text-[#0D1B3E] flex items-center gap-2 mb-4"><Percent className="w-5 h-5 text-[#16A34A]" /> Fourchette de prix</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-[#374151]">Coefficient minimum</span>
                <input type="number" step="0.05" value={pricing.fourchette.min} onChange={e => setPricing({ ...pricing, fourchette: { ...pricing.fourchette, min: parseFloat(e.target.value) || 0.8 } })} className={inputCls + " w-20 text-right"} />
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-[#374151]">Coefficient maximum</span>
                <input type="number" step="0.05" value={pricing.fourchette.max} onChange={e => setPricing({ ...pricing, fourchette: { ...pricing.fourchette, max: parseFloat(e.target.value) || 1.2 } })} className={inputCls + " w-20 text-right"} />
              </div>
              <p className="text-xs text-[#888] italic mt-2">Le prix affiché sera : total × min — total × max</p>
            </div>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminTarifs;
