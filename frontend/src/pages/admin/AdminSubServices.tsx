// src/pages/admin/AdminSubServices.tsx
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, Eye, EyeOff,
  GripVertical, Image, ListChecks, Loader2,
  AlertCircle, RefreshCw, RotateCcw, X,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import   SubServiceFormModal from "../../components/admin/SubServiceFormModal";
import { servicesApi, subServicesApi } from "../../services/servicesApi";
import type { ServiceConfig, SubServiceConfig, SubServiceFormData } from "../../types/services";
import { toast } from "sonner";

const AdminSubServices = () => {
  const [services, setServices]       = useState<ServiceConfig[]>([]);
  const [subServices, setSubServices] = useState<SubServiceConfig[]>([]);
  const [activeTab, setActiveTab]     = useState<number | null>(null);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState<string | null>(null);
  const [showForm, setShowForm]       = useState(false);
  const [editing, setEditing]         = useState<SubServiceConfig | null>(null);
  const [deletingId, setDeletingId]   = useState<number | null>(null);
  const [togglingId, setTogglingId]   = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<SubServiceConfig | null>(null);
  const [confirmReset, setConfirmReset]   = useState(false);

  // ── Load services + sub-services ───────────────────────────────
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [svcs, subs] = await Promise.all([servicesApi.list(), subServicesApi.list()]);
      setServices(svcs);
      setSubServices(subs);
      if (!activeTab && svcs.length) setActiveTab(svcs[0].id);
    } catch {
      setError("Impossible de charger les données.");
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => { fetchAll(); }, []);

  const currentSubs = subServices.filter(s => s.service_id === activeTab);
  const currentService = services.find(s => s.id === activeTab);

  // ── Save ────────────────────────────────────────────────────────
  const handleSave = async (data: SubServiceFormData, id?: number) => {
    if (id) {
      const updated = await subServicesApi.update(id, data);
      setSubServices(prev => prev.map(s => s.id === id ? updated : s));
      toast.success("Sous-service mis à jour !");
    } else {
      const created = await subServicesApi.create(data);
      setSubServices(prev => [...prev, created]);
      toast.success("Sous-service créé !");
    }
    setShowForm(false);
    setEditing(null);
  };

  // ── Toggle active ───────────────────────────────────────────────
  const handleToggle = async (sub: SubServiceConfig) => {
    setTogglingId(sub.id);
    try {
      const result = await subServicesApi.toggle(sub.id);
      setSubServices(prev => prev.map(s => s.id === sub.id ? { ...s, active: result.active } : s));
    } catch {
      toast.error("Erreur lors de la mise à jour.");
    } finally {
      setTogglingId(null);
    }
  };

  // ── Delete ──────────────────────────────────────────────────────
  const handleDelete = async (sub: SubServiceConfig) => {
    setDeletingId(sub.id);
    setConfirmDelete(null);
    try {
      await subServicesApi.delete(sub.id);
      setSubServices(prev => prev.filter(s => s.id !== sub.id));
      toast.success("Sous-service supprimé.");
    } catch {
      toast.error("Impossible de supprimer.");
    } finally {
      setDeletingId(null);
    }
  };

  // ── Reset (supprimer tous les sous-services du tab courant) ─────
  const handleReset = async () => {
    setConfirmReset(false);
    if (!activeTab) return;
    const toDelete = subServices.filter(s => s.service_id === activeTab);
    try {
      await Promise.all(toDelete.map(s => subServicesApi.delete(s.id)));
      setSubServices(prev => prev.filter(s => s.service_id !== activeTab));
      toast.success("Sous-services supprimés.");
    } catch {
      toast.error("Erreur lors de la suppression.");
    }
  };

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0D1B3E]">Sous-Services</h1>
            <p className="text-sm text-[#888]">
              {loading ? "Chargement..." : `${subServices.length} sous-service${subServices.length > 1 ? "s" : ""} au total`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchAll} disabled={loading}
              className="p-2 rounded-lg hover:bg-[#EEF2FF] text-[#1A56DB] transition disabled:opacity-40">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            {currentSubs.length > 0 && (
              <button onClick={() => setConfirmReset(true)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#888] hover:text-[#0D1B3E] hover:border-[#0D1B3E] transition">
                <RotateCcw className="w-4 h-4" /> Tout supprimer
              </button>
            )}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => { setEditing(null); setShowForm(true); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1A56DB] text-white text-sm font-bold hover:bg-[#1347BE] transition">
              <Plus className="w-4 h-4" /> Ajouter
            </motion.button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />{error}
            <button onClick={() => setError(null)} className="ml-auto"><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* Service tabs */}
        {!loading && (
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
            {services.map(s => (
              <button key={s.id} onClick={() => setActiveTab(s.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition ${
                  activeTab === s.id ? "text-white shadow-lg" : "bg-white border border-[#E5E7EB] text-[#374151] hover:border-[#1A56DB] hover:text-[#1A56DB]"
                }`}
                style={activeTab === s.id ? { backgroundColor: s.color_hex } : {}}>
                {s.title} ({subServices.filter(sub => sub.service_id === s.id).length})
              </button>
            ))}
          </div>
        )}

        {/* Skeleton */}
        {loading && (
          <div className="grid gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white border border-[#E5E7EB] rounded-xl p-4 animate-pulse flex items-center gap-4">
                <div className="w-4 h-4 bg-[#E5E7EB] rounded" />
                <div className="w-14 h-10 bg-[#E5E7EB] rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-[#E5E7EB] rounded w-1/3" />
                  <div className="h-3 bg-[#E5E7EB] rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && currentSubs.length === 0 && !error && (
          <div className="bg-white rounded-xl border border-[#E5E7EB] py-16 text-center">
            <ListChecks className="w-10 h-10 text-[#D1D5DB] mx-auto mb-3" />
            <p className="text-[#888] font-medium">Aucun sous-service</p>
            <p className="text-sm text-[#888] mt-1">Cliquez sur "Ajouter" pour créer le premier.</p>
          </div>
        )}

        {/* Sub-services list */}
        <div className="grid gap-3">
          <AnimatePresence mode="popLayout">
            {currentSubs.map((sub, i) => (
              <motion.div key={sub.id} layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -80, height: 0 }}
                transition={{ delay: i * 0.03 }}
                className={`bg-white border border-[#E5E7EB] rounded-xl p-4 hover:shadow-md transition-shadow ${!sub.active ? "opacity-60" : ""}`}>
                <div className="flex items-center gap-4">
                  <GripVertical className="w-4 h-4 text-[#CCC] shrink-0 cursor-grab" />

                  {/* Thumbnail */}
{sub.image ? (
  <img
    src={`http://localhost:8000${sub.image}`}
    alt={sub.title}
    className="w-14 h-10 rounded-lg object-cover shrink-0 border border-[#E5E7EB]"
    onError={(e) => {
      e.currentTarget.style.display = "none";
    }}
  />
) : (
                    <div className="w-14 h-10 rounded-lg bg-[#F3F4F6] flex items-center justify-center shrink-0 text-xl">
                      {sub.icon}
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#0D1B3E] text-sm truncate">{sub.title}</p>
                    {sub.desc && <p className="text-xs text-[#888] truncate mt-0.5">{sub.desc}</p>}
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EEF2FF] text-[#1A56DB] font-medium">
                        {sub.prestations?.length ?? 0} prestations
                      </span>
                      {sub.sections?.length > 0 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] font-medium">
                          {sub.sections.length} sections
                        </span>
                      )}
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F3F4F6] text-[#888] font-mono">
                        /{currentService?.slug}/{sub.slug}
                      </span>
                      {!sub.active && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-medium">Inactif</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => handleToggle(sub)} disabled={togglingId === sub.id}
                      title={sub.active ? "Désactiver" : "Activer"}
                      className={`p-2 rounded-lg transition disabled:opacity-40 ${sub.active ? "text-[#16A34A] hover:bg-[#F0FDF4]" : "text-[#888] hover:bg-gray-100"}`}>
                      {togglingId === sub.id
                        ? <Loader2 className="w-4 h-4 animate-spin" />
                        : sub.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button onClick={() => { setEditing(sub); setShowForm(true); }}
                      className="p-2 rounded-lg hover:bg-[#EEF2FF] text-[#1A56DB] transition">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => setConfirmDelete(sub)} disabled={deletingId === sub.id}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition disabled:opacity-40">
                      {deletingId === sub.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Confirm delete sub */}
        <AnimatePresence>
          {confirmDelete && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
              onClick={() => setConfirmDelete(null)}>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                onClick={e => e.stopPropagation()}
                className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                <h3 className="font-bold text-[#0D1B3E] text-lg mb-2">Supprimer ce sous-service ?</h3>
                <p className="text-sm text-[#888] mb-5">
                  <strong className="text-[#374151]">"{confirmDelete.title}"</strong> sera supprimé définitivement.
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setConfirmDelete(null)}
                    className="flex-1 py-2.5 rounded-lg border border-[#E5E7EB] text-sm font-medium hover:bg-gray-50">Annuler</button>
                  <button onClick={() => handleDelete(confirmDelete)}
                    className="flex-1 py-2.5 rounded-lg bg-red-500 text-white text-sm font-bold hover:bg-red-600">Supprimer</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirm reset */}
        <AnimatePresence>
          {confirmReset && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
              onClick={() => setConfirmReset(false)}>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                onClick={e => e.stopPropagation()}
                className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                <h3 className="font-bold text-[#0D1B3E] text-lg mb-2">Supprimer tous les sous-services ?</h3>
                <p className="text-sm text-[#888] mb-5">
                  Tous les sous-services de <strong className="text-[#374151]">"{currentService?.title}"</strong> seront supprimés définitivement.
                </p>
                <div className="flex gap-3">
                  <button onClick={() => setConfirmReset(false)}
                    className="flex-1 py-2.5 rounded-lg border border-[#E5E7EB] text-sm font-medium hover:bg-gray-50">Annuler</button>
                  <button onClick={handleReset}
                    className="flex-1 py-2.5 rounded-lg bg-red-500 text-white text-sm font-bold hover:bg-red-600">Supprimer tout</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sub-service form modal */}
        <SubServiceFormModal
          open={showForm}
          subService={editing}
          services={services}
          defaultServiceId={activeTab ?? undefined}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditing(null); }}
        />
      </motion.div>
    </AdminLayout>
  );
};

export default AdminSubServices;