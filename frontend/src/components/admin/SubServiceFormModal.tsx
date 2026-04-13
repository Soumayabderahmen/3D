// src/components/admin/SubServiceFormModal.tsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Save, Loader2, Plus, Upload,
  FileText, ListChecks, ChevronRight,
} from "lucide-react";
import type { SubServiceConfig, SubServiceFormData, ServiceConfig } from "../../types/services";
import { subServicesApi } from "../../services/servicesApi";

interface Props {
  open: boolean;
  subService: SubServiceConfig | null;
  services: ServiceConfig[];
  defaultServiceId?: number;
  onSave: (data: SubServiceFormData, id?: number) => Promise<void>;
  onClose: () => void;
}

const ICON_LIST = [
  "🏠","📦","🏢","🧹","🔨","🚛","⚠️","🪳","🐀","🌀","🤝","📋","🔥","🏗️","💧","🧼",
];

const autoSlug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const emptyForm = (serviceId: number): SubServiceFormData => ({
  service_id: serviceId, slug: "", title: "", icon: "📦",
  desc: "", long_desc: "", image: "",
  prestations: [""], sections: [{ title: "", text: "" }],
  order: 0, active: true,
});

// ── Résolution URL image ──────────────────────────────────────────
const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000").replace(/\/$/, "");

const resolveImageUrl = (path: string): string => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};

// ── Image upload field ────────────────────────────────────────────
function ImageField({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Reset imgError quand value change
  useEffect(() => { setImgError(false); }, [value]);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await subServicesApi.uploadImage(file);
      onChange(url);
    } catch {
      // silencieux — l'utilisateur verra que l'image n'a pas changé
    } finally {
      setUploading(false);
      if (ref.current) ref.current.value = "";
    }
  };

  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1">
        Image
      </label>

      <button
        type="button"
        onClick={() => ref.current?.click()}
        disabled={uploading}
        className="flex items-center gap-2 px-4 py-2.5 border border-dashed border-[#E5E7EB] rounded-lg text-sm text-[#888] hover:border-[#1A56DB] hover:text-[#1A56DB] transition disabled:opacity-50"
      >
        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
        {uploading ? "Upload..." : "Choisir une image"}
      </button>

      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />

      {value && (
        <div className="mt-2 relative inline-block">
          {!imgError ? (
            <img
              src={resolveImageUrl(value)}
              alt="Aperçu"
              className="rounded-lg h-28 w-48 object-cover border border-[#E5E7EB]"
              onError={() => setImgError(true)}
            />
          ) : (
            // Fallback si l'image ne charge pas
            <div className="rounded-lg h-28 w-48 border border-dashed border-[#E5E7EB] bg-gray-50 flex flex-col items-center justify-center gap-1 text-[#AAA]">
              <Upload className="w-6 h-6" />
              <span className="text-xs">Image introuvable</span>
            </div>
          )}
          <button
            onClick={() => onChange("")}
            className="absolute top-1 right-1 p-1 rounded-full bg-white/80 hover:bg-white text-red-500 shadow"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────
export default function SubServiceFormModal({ open, subService, services, defaultServiceId, onSave, onClose }: Props) {
  const [tab, setTab] = useState<"general" | "prestations" | "sections">("general");
  const [form, setForm] = useState<SubServiceFormData>(emptyForm(defaultServiceId ?? services[0]?.id ?? 0));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (subService) {
      setForm({
        service_id:  subService.service_id,
        slug:        subService.slug,
        title:       subService.title,
        icon:        subService.icon,
        desc:        subService.desc ?? "",
        long_desc:   subService.long_desc ?? "",
        image:       subService.image ?? "",
        prestations: subService.prestations?.length ? subService.prestations : [""],
        sections:    subService.sections?.length ? subService.sections : [{ title: "", text: "" }],
        order:       subService.order,
        active:      subService.active,
      });
    } else {
      setForm(emptyForm(defaultServiceId ?? services[0]?.id ?? 0));
    }
    setTab("general");
    setErrors({});
  }, [subService, open, defaultServiceId]);

  const set = <K extends keyof SubServiceFormData>(k: K, v: SubServiceFormData[K]) => {
    setForm(f => {
      const next = { ...f, [k]: v };
      if (k === "title" && !subService) next.slug = autoSlug(v as string);
      return next;
    });
    if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  };

  // Prestations helpers
  const setPrest = (i: number, v: string) => setForm(f => ({ ...f, prestations: f.prestations.map((p, idx) => idx === i ? v : p) }));
  const addPrest = () => setForm(f => ({ ...f, prestations: [...f.prestations, ""] }));
  const delPrest = (i: number) => setForm(f => ({ ...f, prestations: f.prestations.filter((_, idx) => idx !== i) }));

  // Sections helpers
  const setSection = (i: number, field: "title" | "text", v: string) =>
    setForm(f => ({ ...f, sections: f.sections.map((s, idx) => idx === i ? { ...s, [field]: v } : s) }));
  const addSection = () => setForm(f => ({ ...f, sections: [...f.sections, { title: "", text: "" }] }));
  const delSection = (i: number) => setForm(f => ({ ...f, sections: f.sections.filter((_, idx) => idx !== i) }));

  const handleSubmit = async () => {
    setSaving(true);
    setErrors({});
    try {
      await onSave({
        ...form,
        prestations: form.prestations.filter(p => p.trim()),
        sections: form.sections.filter(s => s.title.trim() || s.text.trim()),
      }, subService?.id);
      onClose();
    } catch (err: any) {
      if (err?.response?.status === 422) {
        const flat: Record<string, string> = {};
        Object.entries(err.response.data.errors ?? {}).forEach(([k, v]: any) => flat[k] = v[0]);
        setErrors(flat);
      }
    } finally {
      setSaving(false);
    }
  };

  const inputCls = (field: string) =>
    `w-full px-3 py-2.5 border ${errors[field] ? "border-red-400 bg-red-50" : "border-[#E5E7EB]"} rounded-lg text-sm focus:ring-2 focus:ring-[#1A56DB]/30 focus:border-[#1A56DB] outline-none`;

  const tabs = [
    { key: "general" as const,     label: "Général",     icon: FileText   },
    { key: "prestations" as const, label: "Prestations", icon: ListChecks },
    { key: "sections" as const,    label: "Sections",    icon: ChevronRight },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
              <h2 className="text-lg font-bold text-[#0D1B3E]">
                {subService ? "Modifier le sous-service" : "Ajouter un sous-service"}
              </h2>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5 text-[#6B7280]" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#E5E7EB] px-6">
              {tabs.map(t => (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition ${
                    tab === t.key ? "border-[#1A56DB] text-[#1A56DB]" : "border-transparent text-[#888] hover:text-[#374151]"
                  }`}>
                  <t.icon className="w-4 h-4" />{t.label}
                </button>
              ))}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">

              {/* ── Général ── */}
              {tab === "general" && (
                <div className="space-y-4">
                  {/* Service parent */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1">Service parent *</label>
                    <select value={form.service_id} onChange={e => set("service_id", Number(e.target.value))}
                      className={inputCls("service_id")}>
                      {services.map(s => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                    </select>
                    {errors.service_id && <p className="text-red-500 text-xs mt-1">{errors.service_id}</p>}
                  </div>

                  {/* Icône + titre + slug */}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1">Icône</label>
                      <select value={form.icon} onChange={e => set("icon", e.target.value)} className={inputCls("icon")}>
                        {ICON_LIST.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1">Titre *</label>
                      <input value={form.title} onChange={e => set("title", e.target.value)} placeholder="Ex: Débarras appt." className={inputCls("title")} />
                      {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1">Slug *</label>
                      <input value={form.slug} onChange={e => set("slug", e.target.value)} placeholder="debarras-appt" className={`${inputCls("slug")} font-mono text-xs`} />
                      {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1">Description courte</label>
                    <textarea value={form.desc ?? ""} onChange={e => set("desc", e.target.value)} rows={2}
                      className={`${inputCls("desc")} resize-none`} placeholder="Résumé en 1-2 phrases..." />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1">Description longue</label>
                    <textarea value={form.long_desc ?? ""} onChange={e => set("long_desc", e.target.value)} rows={3}
                      className={`${inputCls("long_desc")} resize-none`} placeholder="Description détaillée..." />
                  </div>

                  {/* Image */}
                  <ImageField value={form.image ?? ""} onChange={url => set("image", url)} />

                  {/* Ordre + Actif */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1">Ordre</label>
                      <input type="number" min={0} value={form.order} onChange={e => set("order", Number(e.target.value))} className={inputCls("order")} />
                    </div>
                    <div className="flex items-end pb-0.5">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={form.active} onChange={e => set("active", e.target.checked)}
                          className="w-4 h-4 rounded border-[#E5E7EB] text-[#1A56DB] focus:ring-[#1A56DB]" />
                        <span className="text-sm font-medium text-[#374151]">Actif</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Prestations ── */}
              {tab === "prestations" && (
                <div className="space-y-3">
                  <p className="text-xs text-[#888] mb-3">Points clés affichés dans la sidebar de la page de détail.</p>
                  {form.prestations.map((p, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <span className="text-xs text-[#CCC] w-5 text-right shrink-0">{i + 1}.</span>
                      <input value={p} onChange={e => setPrest(i, e.target.value)}
                        className="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#1A56DB]/30 focus:border-[#1A56DB] outline-none"
                        placeholder="Ex: Vidage complet studio à T5" />
                      <button onClick={() => delPrest(i)} className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <button onClick={addPrest} className="flex items-center gap-1.5 text-sm text-[#1A56DB] font-medium hover:underline mt-2">
                    <Plus className="w-4 h-4" /> Ajouter
                  </button>
                </div>
              )}

              {/* ── Sections ── */}
              {tab === "sections" && (
                <div className="space-y-5">
                  <p className="text-xs text-[#888] mb-2">Sections de contenu affichées sur la page de détail.</p>
                  {form.sections.map((s, i) => (
                    <div key={i} className="border border-[#E5E7EB] rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#374151] uppercase">Section {i + 1}</span>
                        <button onClick={() => delSection(i)} className="p-1 rounded hover:bg-red-50 text-red-400">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input value={s.title} onChange={e => setSection(i, "title", e.target.value)}
                        className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm font-semibold focus:ring-2 focus:ring-[#1A56DB]/30 focus:border-[#1A56DB] outline-none"
                        placeholder="Titre de la section" />
                      <textarea value={s.text} onChange={e => setSection(i, "text", e.target.value)} rows={3}
                        className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#1A56DB]/30 focus:border-[#1A56DB] outline-none resize-none"
                        placeholder="Contenu..." />
                    </div>
                  ))}
                  <button onClick={addSection} className="flex items-center gap-1.5 text-sm text-[#1A56DB] font-medium hover:underline">
                    <Plus className="w-4 h-4" /> Ajouter une section
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[#E5E7EB] flex justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm font-medium hover:bg-gray-50">
                Annuler
              </button>
              <button onClick={handleSubmit} disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1A56DB] text-white font-bold text-sm hover:bg-[#1347BE] transition disabled:opacity-60">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? "Sauvegarde..." : "Enregistrer"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}