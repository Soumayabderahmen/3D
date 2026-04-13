// src/pages/admin/AdminDevis.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, Trash2, X, FileText, Clock,
  CheckCircle2, XCircle, Loader2, AlertCircle, RefreshCw, ChevronLeft, ChevronRight,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useDevis } from "../../hooks/useDevis";
import type { Devis, DevisStatut } from "../../services/Devisservice";

// ─────────────────────────────────────────────────────────────
// Config des statuts — alignée sur les valeurs Laravel
// ─────────────────────────────────────────────────────────────
const statusConfig: Record<DevisStatut, { label: string; color: string; icon: React.ElementType }> = {
  nouveau: { label: "Nouveau", color: "bg-[#EEF2FF] text-[#1A56DB]", icon: FileText },
  en_cours: { label: "En cours", color: "bg-[#FEF3C7] text-[#D97706]", icon: Clock },
  traite: { label: "Traité", color: "bg-[#F0FDF4] text-[#16A34A]", icon: CheckCircle2 },
  annule: { label: "Annulé", color: "bg-red-50 text-red-500", icon: XCircle },
};

const FILTRES = [
  { key: "all", label: "Tous" },
  { key: "nouveau", label: "Nouveaux" },
  { key: "en_cours", label: "En cours" },
  { key: "traite", label: "Traités" },
  { key: "annule", label: "Annulés" },
] as const;

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });

// ─────────────────────────────────────────────────────────────
// Composant principal
// ─────────────────────────────────────────────────────────────
const AdminDevis = () => {
  const { devis, pagination, page, loading, error, fetchDevis, handleStatutChange, handleDelete } = useDevis();
  const [viewing, setViewing] = useState<Devis | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [deleting, setDeleting] = useState<number | null>(null);

  // ── Filtrage local (les données viennent déjà paginées) ────
  const filtered = filter === "all" ? devis : devis.filter(d => d.statut === filter);

  // ── Compteurs par statut ───────────────────────────────────
  const counts = {
    all: devis.length,
    nouveau: devis.filter(d => d.statut === "nouveau").length,
    en_cours: devis.filter(d => d.statut === "en_cours").length,
    traite: devis.filter(d => d.statut === "traite").length,
    annule: devis.filter(d => d.statut === "annule").length,
  } as Record<string, number>;

  // ── Supprimer avec confirmation ────────────────────────────
  const confirmDelete = async (id: number) => {
    setDeleting(id);
    await handleDelete(id);
    if (viewing?.id === id) setViewing(null);
    setDeleting(null);
  };

  // ── Changer le statut depuis le modal ─────────────────────
  const handleModalStatut = async (statut: DevisStatut) => {
    if (!viewing) return;
    await handleStatutChange(viewing.id, statut);
    setViewing(prev => prev ? { ...prev, statut } : null);
  };

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0D1B3E]">Demandes de devis</h1>
            <p className="text-sm text-[#888]">
              {counts.nouveau} nouveaux · {pagination?.total ?? devis.length} demandes au total
            </p>
          </div>
          <button
            onClick={() => fetchDevis(page)}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E5E7EB] text-sm font-medium text-[#374151] hover:bg-[#F9FAFB] transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Actualiser
          </button>
        </div>

        {/* ── Erreur ── */}
        {error && (
          <div className="mb-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}

        {/* ── Filtres ── */}
        <div className="flex flex-wrap gap-2 mb-4">
          {FILTRES.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${filter === f.key
                  ? "bg-[#0D1B3E] text-white"
                  : "bg-white border border-[#E5E7EB] text-[#888] hover:bg-[#F9FAFB]"
                }`}
            >
              {f.label} ({counts[f.key] ?? 0})
            </button>
          ))}
        </div>

        {/* ── Loader initial ── */}
        {loading && devis.length === 0 && (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="w-7 h-7 text-[#1A56DB] animate-spin" />
            <span className="ml-3 text-[#374151]">Chargement…</span>
          </div>
        )}

        {/* ── Liste ── */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 text-[#888] text-sm">Aucune demande trouvée.</div>
        )}

        <div className="space-y-2">
          <AnimatePresence>
            {filtered.map((d, i) => {
              const sc = statusConfig[d.statut];
              const Icon = sc.icon;
              return (
                <motion.div
                  key={d.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-[#1A56DB]" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#0D1B3E] text-sm">{d.nom} {d.prenom}</p>
                    <p className="text-xs text-[#888] truncate">{d.service} — {d.departement}</p>
                  </div>

                  {/* Date */}
                  <span className="text-xs text-[#888] shrink-0 hidden sm:block">
                    {formatDate(d.created_at)}
                  </span>

                  {/* Badge statut */}
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shrink-0 ${sc.color}`}>
                    <Icon className="w-3 h-3" /> {sc.label}
                  </span>

                  {/* Actions */}
                  <button
                    onClick={() => setViewing(d)}
                    className="p-2 rounded-lg hover:bg-[#EEF2FF] text-[#1A56DB] transition"
                    title="Voir le détail"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => confirmDelete(d.id)}
                    disabled={deleting === d.id}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition disabled:opacity-40"
                    title="Supprimer"
                  >
                    {deleting === d.id
                      ? <Loader2 className="w-4 h-4 animate-spin" />
                      : <Trash2 className="w-4 h-4" />
                    }
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── Pagination ── */}
        {pagination && pagination.last_page > 1 && (
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => fetchDevis(page - 1)}
              disabled={page === 1 || loading}
              className="p-2 rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] disabled:opacity-40 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-[#374151] font-medium">
              Page {pagination.current_page} / {pagination.last_page}
            </span>
            <button
              onClick={() => fetchDevis(page + 1)}
              disabled={page === pagination.last_page || loading}
              className="p-2 rounded-lg border border-[#E5E7EB] hover:bg-[#F9FAFB] disabled:opacity-40 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── Modal détail ── */}
        <AnimatePresence>
          {viewing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
              onClick={() => setViewing(null)}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                onClick={e => e.stopPropagation()}
                className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
              >
                {/* Header modal */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-[#0D1B3E]">Détail du devis #{viewing.id}</h2>
                  <button onClick={() => setViewing(null)} className="p-1 rounded-lg hover:bg-gray-100">
                    <X className="w-5 h-5" />
                  </button>
                </div>

               <div className="space-y-5">
  {/* Informations client */}
  <div className="grid grid-cols-2 gap-4">
    <div>
      <p className="text-xs text-[#888] uppercase font-semibold">Prénom</p>
      <p className="text-sm font-medium">{viewing.prenom}</p>
    </div>

    <div>
      <p className="text-xs text-[#888] uppercase font-semibold">Nom</p>
      <p className="text-sm font-medium">{viewing.nom}</p>
    </div>

    <div>
      <p className="text-xs text-[#888] uppercase font-semibold">Téléphone</p>
      <p className="text-sm">{viewing.tel}</p>
    </div>

    <div>
      <p className="text-xs text-[#888] uppercase font-semibold">Email</p>
      <p className="text-sm break-all">{viewing.email}</p>
    </div>
  </div>

  {/* Informations devis */}
  <div className="grid grid-cols-2 gap-4">
    <div>
      <p className="text-xs text-[#888] uppercase font-semibold">Service</p>
      <p className="text-sm">{viewing.service}</p>
    </div>

    <div>
      <p className="text-xs text-[#888] uppercase font-semibold">Lieu</p>
      <p className="text-sm">{viewing.place}</p>
    </div>

    <div>
      <p className="text-xs text-[#888] uppercase font-semibold">Volume</p>
      <p className="text-sm">{viewing.volume}</p>
    </div>

    <div>
      <p className="text-xs text-[#888] uppercase font-semibold">Département</p>
      <p className="text-sm">{viewing.departement}</p>
    </div>

    <div>
      <p className="text-xs text-[#888] uppercase font-semibold">
        Date souhaitée
      </p>
      <p className="text-sm">
        {viewing.date_souhaitee
          ? formatDate(viewing.date_souhaitee)
          : "Non renseignée"}
      </p>
    </div>

    <div>
      <p className="text-xs text-[#888] uppercase font-semibold">Urgent</p>
      <p
        className={`text-sm font-medium ${
          viewing.urgent ? "text-red-500" : "text-green-600"
        }`}
      >
        {viewing.urgent ? "Oui" : "Non"}
      </p>
    </div>

    <div>
      <p className="text-xs text-[#888] uppercase font-semibold">Créé le</p>
      <p className="text-sm">{formatDate(viewing.created_at)}</p>
    </div>
  </div>

  {/* Message */}
  <div>
    <p className="text-xs text-[#888] uppercase font-semibold mb-1">
      Message
    </p>
    <div className="bg-[#F9FAFB] rounded-lg p-3 text-sm">
      {viewing.message || "Aucun message"}
    </div>
  </div>

  {/* Changement de statut */}
  <div>
    <p className="text-xs text-[#888] uppercase font-semibold mb-2">
      Changer le statut
    </p>

    <div className="flex flex-wrap gap-2">
      {(Object.keys(statusConfig) as DevisStatut[]).map((s) => {
        const sc = statusConfig[s];
        const isActive = viewing.statut === s;

        return (
          <button
            key={s}
            onClick={() => handleModalStatut(s)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition border ${
              isActive
                ? `${sc.color} border-current`
                : "border-[#E5E7EB] text-[#888] hover:bg-[#F9FAFB]"
            }`}
          >
            {sc.label}
          </button>
        );
      })}
    </div>
  </div>

  {/* Bouton supprimer */}
  <button
    onClick={() => confirmDelete(viewing.id)}
    disabled={deleting === viewing.id}
    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition disabled:opacity-40"
  >
    {deleting === viewing.id ? (
      <>
        <Loader2 className="w-4 h-4 animate-spin" />
        Suppression…
      </>
    ) : (
      <>
        <Trash2 className="w-4 h-4" />
        Supprimer ce devis
      </>
    )}
  </button>
</div>
              </motion.div>
    </motion.div>
  )
}
        </AnimatePresence >

      </motion.div >
    </AdminLayout >
  );
};

export default AdminDevis;