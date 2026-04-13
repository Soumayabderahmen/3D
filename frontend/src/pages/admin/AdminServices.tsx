// src/pages/admin/AdminServices.tsx
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Pencil, Trash2, Palette, ListChecks,
  Loader2, AlertCircle, RefreshCw, Eye, EyeOff, X,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import ServiceFormModal from "../../components/admin/ServiceFormModal";
import { servicesApi } from "../../services/servicesApi";
import type { ServiceConfig, ServiceFormData } from "../../types/services";
import { toast } from "sonner";

const AdminServices = () => {
  const [services, setServices]   = useState<ServiceConfig[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState<string | null>(null);
  const [showForm, setShowForm]   = useState(false);
  const [editing, setEditing]     = useState<ServiceConfig | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<ServiceConfig | null>(null);

  // ── Fetch ───────────────────────────────────────────────────────
  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await servicesApi.list();
      setServices(data);
    } catch {
      setError("Impossible de charger les services.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  // ── Save (create/update) ────────────────────────────────────────
  const handleSave = async (data: ServiceFormData, id?: number) => {
    if (id) {
      const updated = await servicesApi.update(id, data);
      setServices(prev => prev.map(s => s.id === id ? { ...updated, sub_services_count: s.sub_services_count } : s));
      toast.success("Service mis à jour !");
    } else {
      const created = await servicesApi.create(data);
      setServices(prev => [...prev, created]);
      toast.success("Service créé !");
    }
    setShowForm(false);
    setEditing(null);
  };

  // ── Toggle active ───────────────────────────────────────────────
  const handleToggle = async (service: ServiceConfig) => {
    try {
      await servicesApi.update(service.id, { active: !service.active });
      setServices(prev => prev.map(s => s.id === service.id ? { ...s, active: !s.active } : s));
    } catch {
      toast.error("Erreur lors de la mise à jour.");
    }
  };

  // ── Delete ──────────────────────────────────────────────────────
  const handleDelete = async (service: ServiceConfig) => {
    setDeletingId(service.id);
    setConfirmDelete(null);
    try {
      await servicesApi.delete(service.id);
      setServices(prev => prev.filter(s => s.id !== service.id));
      toast.success("Service supprimé.");
    } catch {
      toast.error("Impossible de supprimer ce service.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0D1B3E]">Services principaux</h1>
            <p className="text-sm text-[#888]">
              {loading ? "Chargement..." : `${services.length} service${services.length > 1 ? "s" : ""} configuré${services.length > 1 ? "s" : ""}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchServices} disabled={loading}
              className="p-2 rounded-lg hover:bg-[#EEF2FF] text-[#1A56DB] transition disabled:opacity-40">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => { setEditing(null); setShowForm(true); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1A56DB] text-white text-sm font-bold hover:bg-[#1347BE] transition"
            >
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

        {/* Skeleton */}
        {loading && services.length === 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white border border-[#E5E7EB] rounded-xl p-5 animate-pulse">
                <div className="flex gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E5E7EB]" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-[#E5E7EB] rounded w-1/2" />
                    <div className="h-3 bg-[#E5E7EB] rounded w-1/4" />
                  </div>
                </div>
                <div className="h-3 bg-[#E5E7EB] rounded w-3/4" />
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && services.length === 0 && !error && (
          <div className="bg-white rounded-xl border border-[#E5E7EB] py-16 text-center">
            <ListChecks className="w-10 h-10 text-[#D1D5DB] mx-auto mb-3" />
            <p className="text-[#888]">Aucun service. Cliquez sur "Ajouter" pour commencer.</p>
          </div>
        )}

        {/* Services grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          <AnimatePresence>
            {services.map((s, i) => (
              <motion.div
                key={s.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04 }}
                className={`bg-white border border-[#E5E7EB] rounded-xl p-5 hover:shadow-md transition-shadow relative overflow-hidden ${!s.active ? "opacity-60" : ""}`}
              >
                {/* Barre couleur */}
                <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: s.color_hex }} />

                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg font-bold"
                        style={{ backgroundColor: s.color_hex }}>
                        {s.title.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#0D1B3E]">{s.title}</h3>
                        {s.badge && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                            style={{ backgroundColor: s.color_hex + "20", color: s.color_hex }}>
                            {s.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    {s.short_desc && (
                      <p className="text-xs text-[#888] line-clamp-2 mt-1">{s.short_desc}</p>
                    )}
                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <Palette className="w-3.5 h-3.5 text-[#888]" />
                        <div className="w-4 h-4 rounded-full border border-[#E5E7EB]" style={{ backgroundColor: s.color_hex }} />
                        <span className="text-xs font-mono text-[#888]">{s.color_hex}</span>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F3F4F6] text-[#888] font-medium">
                        <ListChecks className="w-3 h-3 inline mr-0.5" />
                        {s.sub_services_count ?? 0} sous-services
                      </span>
                      {!s.active && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-medium">Inactif</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-1 ml-2">
                    <button onClick={() => handleToggle(s)} title={s.active ? "Désactiver" : "Activer"}
                      className={`p-2 rounded-lg transition ${s.active ? "text-[#16A34A] hover:bg-[#F0FDF4]" : "text-[#888] hover:bg-gray-100"}`}>
                      {s.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button onClick={() => { setEditing(s); setShowForm(true); }}
                      className="p-2 rounded-lg hover:bg-[#EEF2FF] text-[#1A56DB] transition">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => setConfirmDelete(s)} disabled={deletingId === s.id}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition disabled:opacity-40">
                      {deletingId === s.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Confirm delete modal */}
        <AnimatePresence>
          {confirmDelete && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
              onClick={() => setConfirmDelete(null)}>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                onClick={e => e.stopPropagation()}
                className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
                <h3 className="font-bold text-[#0D1B3E] text-lg mb-2">Supprimer ce service ?</h3>
                <p className="text-sm text-[#888] mb-1">
                  <strong className="text-[#374151]">"{confirmDelete.title}"</strong> et tous ses sous-services seront supprimés définitivement.
                </p>
                <p className="text-xs text-red-500 mb-5">Cette action est irréversible.</p>
                <div className="flex gap-3">
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

        {/* Service form modal */}
        <ServiceFormModal
          open={showForm}
          service={editing}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditing(null); }}
        />
      </motion.div>
    </AdminLayout>
  );
};

export default AdminServices;