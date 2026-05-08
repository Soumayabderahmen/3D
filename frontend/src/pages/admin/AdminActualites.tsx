import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, X, Save, Calendar, MapPin,
  Upload, Image as ImageIcon, Loader2, AlertCircle,
  RefreshCw, Eye, EyeOff, Search, Filter,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { actualitesApi } from "../../services/actualitesApi";
import { servicesApi } from "../../services/servicesApi";         // ← nouveau
import type { Actualite, ActualiteFormData } from "../../types/actualites";
import type { ServiceConfig } from "../../types/services";         // ← nouveau
import { toast } from "sonner";

// ─── Helpers ────────────────────────────────────────────────────────
const BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ??
  (import.meta.env.DEV ? "http://localhost:8000" : "")
).replace(/\/$/, "");

const resolveImageUrl = (path: string): string => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });

// ─── Image upload field ──────────────────────────────────────────────
const ImageUploadField = ({
  label, value, onChange,
}: { label: string; value: string; onChange: (url: string) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [imgError, setImgError]   = useState(false);

  useEffect(() => { setImgError(false); }, [value]);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const url = await actualitesApi.uploadImage(file);
      onChange(url);
    } catch {
      toast.error("Erreur lors de l'upload de l'image.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="text-xs text-[#888] mb-1 block">{label}</label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
      />
      {value ? (
        <div className="relative group">
          {!imgError ? (
            <img
              src={resolveImageUrl(value)}
              alt={label}
              className="rounded-lg h-28 w-full object-cover border border-[#E5E7EB]"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="rounded-lg h-28 w-full border border-dashed border-[#E5E7EB] bg-gray-50 flex flex-col items-center justify-center gap-1 text-[#AAA]">
              <ImageIcon className="w-5 h-5" />
              <span className="text-xs">Image introuvable</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-lg flex items-center justify-center gap-2">
            <button type="button" onClick={() => inputRef.current?.click()}
              className="p-2 bg-white/90 rounded-lg hover:bg-white transition">
              <Upload className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => onChange("")}
              className="p-2 bg-white/90 rounded-lg text-red-500 hover:bg-white transition">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}
          className="w-full h-28 border-2 border-dashed border-[#E5E7EB] rounded-lg flex flex-col items-center justify-center gap-1 text-[#888] hover:border-[#1A56DB]/50 hover:text-[#1A56DB] transition disabled:opacity-50">
          {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5" />}
          <span className="text-xs font-medium">{uploading ? "Upload..." : "Choisir"}</span>
        </button>
      )}
    </div>
  );
};

// ─── Article Form Modal ──────────────────────────────────────────────
const ArticleForm = ({
  article, services, onSave, onClose,
}: {
  article: Actualite | null;
  services: ServiceConfig[];
  onSave: (data: ActualiteFormData, id?: number) => Promise<void>;
  onClose: () => void;
}) => {
  const defaultServiceId = services[0]?.id ?? 0;

  const [form, setForm]     = useState<ActualiteFormData>(
    article ? {
      title:        article.title,
      service_id:   article.service_id,
      date:         article.date,
      location:     article.location ?? "",
      description:  article.description ?? "",
      image_before: article.image_before ?? "",
      image_after:  article.image_after ?? "",
      published:    article.published,
      order:        article.order,
    } : {
      title: "", service_id: defaultServiceId,
      date: new Date().toISOString().split("T")[0],
      location: "", description: "",
      image_before: "", image_after: "",
      published: true, order: 0,
    }
  );
  useEffect(() => {
  if (!article && services.length > 0 && !form.service_id) {
    setForm((prev) => ({
      ...prev,
      service_id: services[0].id,
    }));
  }
}, [services, article, form.service_id]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof ActualiteFormData>(k: K, v: ActualiteFormData[K]) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  };

  const inputCls = (field: string) =>
    `w-full px-3 py-2.5 border ${
      errors[field] ? "border-red-400 bg-red-50" : "border-[#E5E7EB]"
    } rounded-lg text-sm focus:ring-2 focus:ring-[#1A56DB]/30 focus:border-[#1A56DB] outline-none bg-white`;

  const handleSubmit = async () => {
    setSaving(true);
    setErrors({});
    try {
      await onSave(form, article?.id);
    } catch (err: any) {
      if (err?.response?.status === 422) {
        const flat: Record<string, string> = {};
        Object.entries(err.response.data.errors ?? {}).forEach(
          ([k, v]: any) => { flat[k] = v[0]; }
        );
        setErrors(flat);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
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
        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] sticky top-0 bg-white z-10">
          <h2 className="text-lg font-bold text-[#0D1B3E]">
            {article ? "Modifier l'article" : "Nouvel article"}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100">
            <X className="w-5 h-5 text-[#6B7280]" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">

          {/* Titre */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">
              Titre *
            </label>
            <input
              value={form.title}
              onChange={e => set("title", e.target.value)}
              placeholder="Ex: Débarras complet maison 120m²"
              className={inputCls("title")}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Service + Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">
                Service *
              </label>
              {services.length === 0 ? (
                <div className="flex items-center gap-2 px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm text-[#888]">
                  <Loader2 className="w-4 h-4 animate-spin" /> Chargement...
                </div>
              ) : (
             <select
  value={String(form.service_id)}
  onChange={(e) => set("service_id", Number(e.target.value))}
  className={inputCls("service_id")}
>
  {services.map((s) => (
    <option key={s.id} value={String(s.id)}>
      {s.title}
    </option>
  ))}
</select>
              )}
              {errors.service_id && <p className="text-red-500 text-xs mt-1">{errors.service_id}</p>}
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">
                Date *
              </label>
              <input
                type="date"
                value={form.date}
                onChange={e => set("date", e.target.value)}
                className={inputCls("date")}
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>
          </div>

          {/* Lieu */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">
              Lieu
            </label>
            <input
              value={form.location ?? ""}
              onChange={e => set("location", e.target.value)}
              placeholder="Ex: Boulogne-Billancourt (92)"
              className={inputCls("location")}
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">
              Description
            </label>
            <textarea
              value={form.description ?? ""}
              onChange={e => set("description", e.target.value)}
              rows={4}
              placeholder="Décrivez l'intervention..."
              className={`${inputCls("description")} resize-none`}
            />
          </div>

          {/* Images avant/après */}
          <div className="border border-dashed border-[#E5E7EB] rounded-xl p-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#374151]">
              📸 Images Avant / Après
            </p>
            <div className="grid grid-cols-2 gap-4">
              <ImageUploadField
                label="Image AVANT"
                value={form.image_before ?? ""}
                onChange={url => set("image_before", url)}
              />
              <ImageUploadField
                label="Image APRÈS"
                value={form.image_after ?? ""}
                onChange={url => set("image_after", url)}
              />
            </div>
          </div>

          {/* Publié */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.published}
              onChange={e => set("published", e.target.checked)}
              className="w-4 h-4 rounded border-[#E5E7EB] text-[#1A56DB] focus:ring-[#1A56DB]"
            />
            <span className="text-sm font-medium text-[#374151]">Article publié</span>
          </label>

        </div>

        {/* Footer */}
        <div className="px-6 pb-5">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={saving || !form.title.trim()}
            className="w-full py-3 rounded-xl bg-[#16A34A] text-white font-bold text-sm hover:bg-[#15803D] transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Sauvegarde...</>
              : <><Save className="w-4 h-4" /> Enregistrer</>
            }
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Main Page ──────────────────────────────────────────────────────
const AdminActualites = () => {
  const [articles, setArticles]     = useState<Actualite[]>([]);
  const [services, setServices]     = useState<ServiceConfig[]>([]);   // ← nouveau
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);
  const [page, setPage]             = useState(1);
  const [lastPage, setLastPage]     = useState(1);
  const [total, setTotal]           = useState(0);
  const [search, setSearch]         = useState("");
  const [filterService, setFilterService] = useState<number | "">("");  // ← était filterCat
  const [showForm, setShowForm]     = useState(false);
  const [editing, setEditing]       = useState<Actualite | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Actualite | null>(null);

  // ── Fetch services (une seule fois) ─────────────────────────────
  useEffect(() => {
    servicesApi.list().then(setServices).catch(() => {});
  }, []);

  // ── Fetch articles ───────────────────────────────────────────────
  const fetchArticles = useCallback(async (p = 1) => {
    setLoading(true);
    setError(null);
    try {
      const data = await actualitesApi.list({
        page: p,
        service_id: filterService || undefined,
        search: search || undefined,
      });
      setArticles(data.data);
      setPage(data.current_page);
      setLastPage(data.last_page);
      setTotal(data.total);
    } catch {
      setError("Impossible de charger les actualités.");
    } finally {
      setLoading(false);
    }
  }, [filterService, search]);

  useEffect(() => { fetchArticles(1); }, [fetchArticles]);

  // ── Save ────────────────────────────────────────────────────────
  const handleSave = async (data: ActualiteFormData, id?: number) => {
    if (id) {
      const updated = await actualitesApi.update(id, data);
      setArticles(prev => prev.map(a => a.id === id ? updated : a));
      toast.success("Article mis à jour !");
    } else {
      const created = await actualitesApi.create(data);
      setArticles(prev => [created, ...prev]);
      setTotal(t => t + 1);
      toast.success("Article créé !");
    }
    setShowForm(false);
    setEditing(null);
  };

  // ── Toggle ──────────────────────────────────────────────────────
  const handleToggle = async (article: Actualite) => {
    setTogglingId(article.id);
    try {
      const result = await actualitesApi.toggle(article.id);
      setArticles(prev => prev.map(a => a.id === article.id ? { ...a, published: result.published } : a));
    } catch {
      toast.error("Erreur lors de la mise à jour.");
    } finally {
      setTogglingId(null);
    }
  };

  // ── Delete ──────────────────────────────────────────────────────
  const handleDelete = async (article: Actualite) => {
    setDeletingId(article.id);
    setConfirmDelete(null);
    try {
      await actualitesApi.delete(article.id);
      setArticles(prev => prev.filter(a => a.id !== article.id));
      setTotal(t => t - 1);
      toast.success("Article supprimé.");
    } catch {
      toast.error("Impossible de supprimer cet article.");
    } finally {
      setDeletingId(null);
    }
  };

  // ── Helper : nom du service ──────────────────────────────────────
  const serviceName = (a: Actualite) =>
    a.service?.title ?? services.find(s => s.id === a.service_id)?.title ?? `#${a.service_id}`;

  const serviceIcon = (a: Actualite) =>
    a.service?.icon ?? services.find(s => s.id === a.service_id)?.icon ?? "";

  // ── Render ──────────────────────────────────────────────────────
  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0D1B3E]">Actualités</h1>
            <p className="text-sm text-[#888]">
              {loading ? "Chargement..." : `${total} article${total > 1 ? "s" : ""}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => fetchArticles(page)} disabled={loading}
              className="p-2 rounded-lg hover:bg-[#EEF2FF] text-[#1A56DB] transition disabled:opacity-40">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => { setEditing(null); setShowForm(true); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#16A34A] text-white text-sm font-bold hover:bg-[#15803D] transition"
            >
              <Plus className="w-4 h-4" /> Nouvel article
            </motion.button>
          </div>
        </div>

        {/* Filtres */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="w-full pl-9 pr-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#1A56DB]/30 focus:border-[#1A56DB] outline-none"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
            <select
              value={filterService}
              onChange={e => setFilterService(e.target.value === "" ? "" : Number(e.target.value))}
              className="pl-9 pr-4 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#1A56DB]/30 focus:border-[#1A56DB] outline-none appearance-none bg-white"
            >
              <option value="">Tous les services</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>
                  {s.icon ? `${s.icon} ` : ""}{s.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />{error}
            <button onClick={() => setError(null)} className="ml-auto"><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* Skeleton */}
        {loading && articles.length === 0 && (
          <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-[1fr_140px_140px_120px] gap-4 px-5 py-4 border-b border-[#E5E7EB] last:border-0 animate-pulse">
                <div className="space-y-2">
                  <div className="h-4 bg-[#E5E7EB] rounded w-2/3" />
                  <div className="h-3 bg-[#E5E7EB] rounded w-1/3" />
                </div>
                <div className="h-6 bg-[#E5E7EB] rounded-full w-24" />
                <div className="h-4 bg-[#E5E7EB] rounded w-24" />
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-[#E5E7EB] rounded-lg" />
                  <div className="w-8 h-8 bg-[#E5E7EB] rounded-lg" />
                  <div className="w-8 h-8 bg-[#E5E7EB] rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && articles.length === 0 && !error && (
          <div className="bg-white rounded-xl border border-[#E5E7EB] py-16 text-center">
            <ImageIcon className="w-10 h-10 text-[#D1D5DB] mx-auto mb-3" />
            <p className="text-[#888] font-medium">Aucun article trouvé.</p>
            <p className="text-sm text-[#888] mt-1">Cliquez sur "Nouvel article" pour commencer.</p>
          </div>
        )}

        {/* Table */}
        {articles.length > 0 && (
          <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
            <div className="grid grid-cols-[1fr_140px_140px_120px] gap-4 px-5 py-3 border-b border-[#E5E7EB] bg-[#F9FAFB]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#888]">Article</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#888]">Service</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#888]">Date</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#888]">Actions</span>
            </div>

            <AnimatePresence>
              {articles.map((a, i) => (
                <motion.div
                  key={a.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`grid grid-cols-[1fr_140px_140px_120px] gap-4 px-5 py-4 border-b border-[#E5E7EB] last:border-0 hover:bg-[#F9FAFB] transition items-center ${!a.published ? "opacity-60" : ""}`}
                >
                  {/* Titre + lieu + aperçu images */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm text-[#0D1B3E] truncate">{a.title}</p>
                      {!a.published && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-700 font-medium shrink-0">
                          Brouillon
                        </span>
                      )}
                    </div>
                    {a.location && (
                      <p className="text-xs text-[#888] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />{a.location}
                      </p>
                    )}
                    {(a.image_before || a.image_after) && (
                      <div className="flex gap-1 mt-1">
                        {a.image_before && (
                          <img
                            src={resolveImageUrl(a.image_before)}
                            alt="avant"
                            className="w-8 h-6 rounded object-cover border border-[#E5E7EB]"
                          />
                        )}
                        {a.image_after && (
                          <img
                            src={resolveImageUrl(a.image_after)}
                            alt="après"
                            className="w-8 h-6 rounded object-cover border border-[#E5E7EB]"
                          />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Service badge */}
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full w-fit bg-[#EEF2FF] text-[#1A56DB] truncate max-w-[130px]">
                    {serviceIcon(a) && <span className="mr-1">{serviceIcon(a)}</span>}
                    {serviceName(a)}
                  </span>

                  {/* Date */}
                  <span className="text-xs text-[#888] flex items-center gap-1">
                    <Calendar className="w-3 h-3" />{formatDate(a.date)}
                  </span>

                  {/* Actions */}
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleToggle(a)}
                      disabled={togglingId === a.id}
                      title={a.published ? "Dépublier" : "Publier"}
                      className={`p-2 rounded-lg transition disabled:opacity-40 ${
                        a.published ? "text-[#16A34A] hover:bg-[#F0FDF4]" : "text-[#888] hover:bg-gray-100"
                      }`}
                    >
                      {togglingId === a.id
                        ? <Loader2 className="w-4 h-4 animate-spin" />
                        : a.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => { setEditing(a); setShowForm(true); }}
                      className="p-2 rounded-lg hover:bg-[#EEF2FF] text-[#1A56DB] transition"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setConfirmDelete(a)}
                      disabled={deletingId === a.id}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition disabled:opacity-40"
                    >
                      {deletingId === a.id
                        ? <Loader2 className="w-4 h-4 animate-spin" />
                        : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Pagination */}
        {lastPage > 1 && (
          <div className="flex items-center justify-center gap-2 mt-5">
            <button
              onClick={() => fetchArticles(page - 1)}
              disabled={page <= 1 || loading}
              className="px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-sm text-[#374151] hover:bg-[#F9FAFB] disabled:opacity-40 transition"
            >
              ← Précédent
            </button>
            <span className="text-sm text-[#888]">Page {page} / {lastPage}</span>
            <button
              onClick={() => fetchArticles(page + 1)}
              disabled={page >= lastPage || loading}
              className="px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-sm text-[#374151] hover:bg-[#F9FAFB] disabled:opacity-40 transition"
            >
              Suivant →
            </button>
          </div>
        )}

        {/* Confirm delete */}
        <AnimatePresence>
          {confirmDelete && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
              onClick={() => setConfirmDelete(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                onClick={e => e.stopPropagation()}
                className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              >
                <h3 className="font-bold text-[#0D1B3E] text-lg mb-2">Supprimer cet article ?</h3>
                <p className="text-sm text-[#888] mb-1">
                  <strong className="text-[#374151]">"{confirmDelete.title}"</strong> sera supprimé définitivement.
                </p>
                {(confirmDelete.image_before || confirmDelete.image_after) && (
                  <p className="text-xs text-red-500 mb-4">Les images associées seront également supprimées.</p>
                )}
                <div className="flex gap-3 mt-5">
                  <button onClick={() => setConfirmDelete(null)}
                    className="flex-1 py-2.5 rounded-lg border border-[#E5E7EB] text-sm font-medium hover:bg-gray-50">
                    Annuler
                  </button>
                  <button onClick={() => handleDelete(confirmDelete)}
                    className="flex-1 py-2.5 rounded-lg bg-red-500 text-white text-sm font-bold hover:bg-red-600">
                    Supprimer
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Article form modal */}
        <AnimatePresence>
          {showForm && (
            <ArticleForm
              article={editing}
              services={services}          
              onSave={handleSave}
              onClose={() => { setShowForm(false); setEditing(null); }}
            />
          )}
        </AnimatePresence>

      </motion.div>
    </AdminLayout>
  );
};

export default AdminActualites;
