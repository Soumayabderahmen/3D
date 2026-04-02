import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save, GripVertical, Eye, EyeOff, ChevronDown, RotateCcw, Image, ListChecks, FileText } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useServicesData } from "../../hooks/useServicesData";
import type { AdminSubService} from "../../hooks/useServicesData";
import { SERVICES } from "../../data/services";

const AdminSubServices = () => {
  const { subServices, addSubService, updateSubService, deleteSubService, getByParent, resetToDefaults } = useServicesData();
  const [activeTab, setActiveTab] = useState(SERVICES[0].slug);
  const [editing, setEditing] = useState<AdminSubService | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const currentService = SERVICES.find(s => s.slug === activeTab)!;
  const currentSubs = getByParent(activeTab);

  const handleSave = (data: AdminSubService) => {
    if (editing) {
      updateSubService(data.id, data);
    } else {
      addSubService({ ...data, parentSlug: activeTab });
    }
    setEditing(null);
    setShowForm(false);
  };

  const handleToggle = (id: string, active: boolean) => {
    updateSubService(id, { active: !active });
  };

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0D1B3E]">Sous-Services</h1>
            <p className="text-sm text-[#888]">{subServices.length} sous-services au total</p>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setConfirmReset(true)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#888] hover:text-[#0D1B3E] hover:border-[#0D1B3E] transition"
            >
              <RotateCcw className="w-4 h-4" /> Réinitialiser
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setEditing(null); setShowForm(true); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1A56DB] text-white text-sm font-bold hover:bg-[#1347BE] transition"
            >
              <Plus className="w-4 h-4" /> Ajouter
            </motion.button>
          </div>
        </div>

        {/* Service tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {SERVICES.map(s => (
            <button
              key={s.slug}
              onClick={() => setActiveTab(s.slug)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition ${
                activeTab === s.slug
                  ? "text-white shadow-lg"
                  : "bg-white border border-[#E5E7EB] text-[#374151] hover:border-[#1A56DB] hover:text-[#1A56DB]"
              }`}
              style={activeTab === s.slug ? { backgroundColor: s.colorHex } : {}}
            >
              {s.title} ({getByParent(s.slug).length})
            </button>
          ))}
        </div>

        {/* Sub-services list */}
        <div className="grid gap-3">
          <AnimatePresence mode="popLayout">
            {currentSubs.map((sub, i) => (
              <motion.div
                key={sub.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: i * 0.03 }}
                className="bg-white border border-[#E5E7EB] rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <GripVertical className="w-4 h-4 text-[#CCC] shrink-0 cursor-grab" />
                  
                  {/* Thumbnail */}
                  {sub.image ? (
                    <img src={sub.image} alt={sub.title} className="w-14 h-10 rounded-lg object-cover shrink-0" />
                  ) : (
                    <div className="w-14 h-10 rounded-lg bg-[#F3F4F6] flex items-center justify-center shrink-0">
                      <Image className="w-4 h-4 text-[#CCC]" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#0D1B3E] text-sm">{sub.title}</p>
                    <p className="text-xs text-[#888] truncate">{sub.desc}</p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EEF2FF] text-[#1A56DB] font-medium">
                        {sub.prestations.length} prestations
                      </span>
                      {sub.sections && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] font-medium">
                          {sub.sections.length} sections
                        </span>
                      )}
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F3F4F6] text-[#888] font-medium">
                        /{currentService.slug}/{sub.slug}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggle(sub.id, sub.active)}
                    className={`p-2 rounded-lg transition ${sub.active ? "text-[#16A34A] hover:bg-[#F0FDF4]" : "text-[#888] hover:bg-gray-100"}`}
                    title={sub.active ? "Actif" : "Inactif"}
                  >
                    {sub.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => { setEditing(sub); setShowForm(true); }}
                    className="p-2 rounded-lg hover:bg-[#EEF2FF] text-[#1A56DB] transition"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => { if (confirm("Supprimer ce sous-service ?")) deleteSubService(sub.id); }}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {currentSubs.length === 0 && (
            <div className="text-center py-12 text-[#888]">
              <ListChecks className="w-10 h-10 mx-auto mb-3 text-[#CCC]" />
              <p className="font-medium">Aucun sous-service</p>
              <p className="text-sm mt-1">Cliquez sur "Ajouter" pour créer le premier</p>
            </div>
          )}
        </div>

        {/* Reset confirmation */}
        <AnimatePresence>
          {confirmReset && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
              onClick={() => setConfirmReset(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                onClick={e => e.stopPropagation()}
                className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              >
                <h3 className="font-bold text-[#0D1B3E] text-lg mb-2">Réinitialiser ?</h3>
                <p className="text-sm text-[#888] mb-6">Toutes les modifications seront perdues. Les sous-services par défaut seront restaurés.</p>
                <div className="flex gap-3">
                  <button onClick={() => setConfirmReset(false)} className="flex-1 py-2.5 rounded-lg border border-[#E5E7EB] text-sm font-medium hover:bg-gray-50">Annuler</button>
                  <button onClick={() => { resetToDefaults(); setConfirmReset(false); }} className="flex-1 py-2.5 rounded-lg bg-red-500 text-white text-sm font-bold hover:bg-red-600">Réinitialiser</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form modal */}
        <AnimatePresence>
          {showForm && (
            <SubServiceForm
              subService={editing}
              parentSlug={activeTab}
              onSave={handleSave}
              onClose={() => { setShowForm(false); setEditing(null); }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AdminLayout>
  );
};

// ─── Form Modal ───
interface FormProps {
  subService: AdminSubService | null;
  parentSlug: string;
  onSave: (data: AdminSubService) => void;
  onClose: () => void;
}

const emptyForm = (parentSlug: string): AdminSubService => ({
  id: "",
  parentSlug,
  title: "",
  slug: "",
  desc: "",
  longDesc: "",
  image: "",
  prestations: [""],
  sections: [{ title: "", text: "" }],
  active: true,
  order: 0,
});

const SubServiceForm = ({ subService, parentSlug, onSave, onClose }: FormProps) => {
  const [form, setForm] = useState<AdminSubService>(
    subService || emptyForm(parentSlug)
  );
  const [activeSection, setActiveSection] = useState<"general" | "prestations" | "sections" | "seo">("general");

  const autoSlug = (title: string) =>
    title.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const updateField = (field: string, value: any) => {
    setForm(prev => {
      const updated = { ...prev, [field]: value };
      if (field === "title" && !subService) {
        updated.slug = autoSlug(value);
      }
      return updated;
    });
  };

  // Prestations
  const addPrestation = () => setForm(prev => ({ ...prev, prestations: [...prev.prestations, ""] }));
  const removePrestation = (i: number) => setForm(prev => ({ ...prev, prestations: prev.prestations.filter((_, idx) => idx !== i) }));
  const updatePrestation = (i: number, val: string) => setForm(prev => ({
    ...prev, prestations: prev.prestations.map((p, idx) => idx === i ? val : p)
  }));

  // Sections
  const addSection = () => setForm(prev => ({ ...prev, sections: [...(prev.sections || []), { title: "", text: "" }] }));
  const removeSection = (i: number) => setForm(prev => ({ ...prev, sections: (prev.sections || []).filter((_, idx) => idx !== i) }));
  const updateSection = (i: number, field: "title" | "text", val: string) => setForm(prev => ({
    ...prev, sections: (prev.sections || []).map((s, idx) => idx === i ? { ...s, [field]: val } : s)
  }));

  const handleSubmit = () => {
    if (!form.title.trim() || !form.slug.trim()) return;
    const cleaned = {
      ...form,
      prestations: form.prestations.filter(p => p.trim()),
      sections: (form.sections || []).filter(s => s.title.trim() || s.text.trim()),
    };
    onSave(cleaned);
  };

  const tabs = [
    { key: "general" as const, label: "Général", icon: FileText },
    { key: "prestations" as const, label: "Prestations", icon: ListChecks },
    { key: "sections" as const, label: "Sections", icon: ChevronDown },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
          <h2 className="text-lg font-bold text-[#0D1B3E]">
            {subService ? "Modifier" : "Ajouter"} un sous-service
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#E5E7EB] px-6">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveSection(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition ${
                activeSection === tab.key
                  ? "border-[#1A56DB] text-[#1A56DB]"
                  : "border-transparent text-[#888] hover:text-[#374151]"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeSection === "general" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Titre *</label>
                  <input
                    value={form.title}
                    onChange={e => updateField("title", e.target.value)}
                    className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#1A56DB]/30 focus:border-[#1A56DB] outline-none"
                    placeholder="Ex: Débarras Appartement"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Slug *</label>
                  <input
                    value={form.slug}
                    onChange={e => updateField("slug", e.target.value)}
                    className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm font-mono focus:ring-2 focus:ring-[#1A56DB]/30 focus:border-[#1A56DB] outline-none"
                    placeholder="debarras-appartement"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Description courte</label>
                <textarea
                  value={form.desc}
                  onChange={e => updateField("desc", e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#1A56DB]/30 focus:border-[#1A56DB] outline-none resize-none"
                  placeholder="Description en 1-2 phrases pour la liste des services..."
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Description longue</label>
                <textarea
                  value={form.longDesc}
                  onChange={e => updateField("longDesc", e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#1A56DB]/30 focus:border-[#1A56DB] outline-none resize-none"
                  placeholder="Description détaillée affichée sur la page du sous-service..."
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">
                  <Image className="w-3.5 h-3.5 inline mr-1" />
                  URL de l'image
                </label>
                <input
                  value={form.image || ""}
                  onChange={e => updateField("image", e.target.value)}
                  className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#1A56DB]/30 focus:border-[#1A56DB] outline-none"
                  placeholder="https://images.unsplash.com/..."
                />
                {form.image && (
                  <img src={form.image} alt="Aperçu" className="mt-2 rounded-lg h-32 w-full object-cover border border-[#E5E7EB]" />
                )}
              </div>
            </div>
          )}

          {activeSection === "prestations" && (
            <div className="space-y-3">
              <p className="text-xs text-[#888] mb-2">Points clés affichés dans la sidebar de la page de détail.</p>
              {form.prestations.map((p, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <span className="text-xs text-[#CCC] w-5 text-right shrink-0">{i + 1}.</span>
                  <input
                    value={p}
                    onChange={e => updatePrestation(i, e.target.value)}
                    className="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#1A56DB]/30 focus:border-[#1A56DB] outline-none"
                    placeholder="Ex: Vidage complet studio à T5"
                  />
                  <button onClick={() => removePrestation(i)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button onClick={addPrestation} className="flex items-center gap-2 text-sm text-[#1A56DB] font-medium hover:text-[#1347BE] transition mt-2">
                <Plus className="w-4 h-4" /> Ajouter une prestation
              </button>
            </div>
          )}

          {activeSection === "sections" && (
            <div className="space-y-6">
              <p className="text-xs text-[#888] mb-2">Sections de contenu affichées sous l'image sur la page de détail.</p>
              {(form.sections || []).map((section, i) => (
                <div key={i} className="border border-[#E5E7EB] rounded-xl p-4 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#374151] uppercase">Section {i + 1}</span>
                    <button onClick={() => removeSection(i)} className="p-1 rounded hover:bg-red-50 text-red-400">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    value={section.title}
                    onChange={e => updateSection(i, "title", e.target.value)}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm font-semibold focus:ring-2 focus:ring-[#1A56DB]/30 focus:border-[#1A56DB] outline-none"
                    placeholder="Titre de la section"
                  />
                  <textarea
                    value={section.text}
                    onChange={e => updateSection(i, "text", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#1A56DB]/30 focus:border-[#1A56DB] outline-none resize-none"
                    placeholder="Contenu de la section..."
                  />
                </div>
              ))}
              <button onClick={addSection} className="flex items-center gap-2 text-sm text-[#1A56DB] font-medium hover:text-[#1347BE] transition">
                <Plus className="w-4 h-4" /> Ajouter une section
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#E5E7EB] flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm font-medium hover:bg-gray-50 transition">
            Annuler
          </button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#1A56DB] text-white font-bold text-sm hover:bg-[#1347BE] transition"
          >
            <Save className="w-4 h-4" /> Enregistrer
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminSubServices;
