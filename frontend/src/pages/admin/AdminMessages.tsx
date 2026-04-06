import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, MailOpen, Trash2, X, Clock,
  Phone, User, RefreshCw, AlertCircle, Loader2, CheckCheck,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../lib/axios";

// ─── Types ─────────────────────────────────────────────────────────
interface Message {
  id: number;
  prenom: string;
  nom: string | null;
  tel: string;
  email: string;
  sujet: string | null;
  message: string | null;
  statut: "nouveau" | "lu" | "traite";
  lu_at: string | null;
  created_at: string;
}

interface PaginatedResponse {
  data: Message[];
  current_page: number;
  last_page: number;
  total: number;
}

// ─── Helpers ───────────────────────────────────────────────────────
const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });

const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }) +
  " à " +
  new Date(iso).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

const fullName = (m: Message) => [m.prenom, m.nom].filter(Boolean).join(" ");

// ─── Component ─────────────────────────────────────────────────────
const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [viewing, setViewing] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [markingAllRead, setMarkingAllRead] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  // ── Fetch ───────────────────────────────────────────────────────
  const fetchMessages = useCallback(async (p = 1) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<PaginatedResponse>(`/admin/contacts?page=${p}`);
      setMessages(data.data);
      setPage(data.current_page);
      setLastPage(data.last_page);
      setTotal(data.total);
    } catch (err: any) {
      setError(
        err?.response?.status === 401
          ? "Session expirée. Veuillez vous reconnecter."
          : "Impossible de charger les messages."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMessages(1); }, [fetchMessages]);

  // ── Mark as read ────────────────────────────────────────────────
  const markRead = async (msg: Message) => {
    if (msg.statut !== "nouveau") return;
    try {
      await api.patch(`/admin/contacts/${msg.id}/read`);
      setMessages(prev =>
        prev.map(m => m.id === msg.id ? { ...m, statut: "lu", lu_at: new Date().toISOString() } : m)
      );
      if (viewing?.id === msg.id) setViewing(v => v ? { ...v, statut: "lu" } : v);
    } catch { /* silencieux */ }
  };

  const openMessage = (msg: Message) => {
    setViewing(msg);
    markRead(msg);
  };

  // ── Mark all read ───────────────────────────────────────────────
  const markAllRead = async () => {
    const nouveaux = messages.filter(m => m.statut === "nouveau");
    if (!nouveaux.length) return;
    setMarkingAllRead(true);
    try {
      await Promise.all(nouveaux.map(m => api.patch(`/admin/contacts/${m.id}/read`)));
      setMessages(prev =>
        prev.map(m => m.statut === "nouveau" ? { ...m, statut: "lu", lu_at: new Date().toISOString() } : m)
      );
    } catch {
      setError("Erreur lors de la mise à jour.");
    } finally {
      setMarkingAllRead(false);
    }
  };

  // ── Delete ──────────────────────────────────────────────────────
  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setDeletingId(id);
    try {
      await api.delete(`/admin/contacts/${id}`);
      setMessages(prev => prev.filter(m => m.id !== id));
      if (viewing?.id === id) setViewing(null);
    } catch {
      setError("Impossible de supprimer ce message.");
    } finally {
      setDeletingId(null);
    }
  };

  const unreadCount = messages.filter(m => m.statut === "nouveau").length;

  // ── Render ──────────────────────────────────────────────────────
  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0D1B3E]">Messages</h1>
            <p className="text-sm text-[#888]">
              {loading
                ? "Chargement..."
                : `${unreadCount} non lu${unreadCount > 1 ? "s" : ""} sur ${total}`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                disabled={markingAllRead}
                className="flex items-center gap-1.5 text-sm text-[#1A56DB] font-semibold hover:underline disabled:opacity-50"
              >
                {markingAllRead
                  ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  : <CheckCheck className="w-3.5 h-3.5" />}
                Tout marquer comme lu
              </button>
            )}
            <button
              onClick={() => fetchMessages(page)}
              disabled={loading}
              className="p-2 rounded-lg hover:bg-[#EEF2FF] text-[#1A56DB] transition disabled:opacity-40"
              title="Rafraîchir"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-5 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
            <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && messages.length === 0 && (
          <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-[#E5E7EB] last:border-0 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-[#E5E7EB]" />
                <div className="flex-1 space-y-2">
                  <div className="h-3.5 bg-[#E5E7EB] rounded w-1/4" />
                  <div className="h-3 bg-[#E5E7EB] rounded w-1/2" />
                  <div className="h-3 bg-[#E5E7EB] rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && messages.length === 0 && !error && (
          <div className="bg-white rounded-xl border border-[#E5E7EB] py-16 text-center">
            <Mail className="w-10 h-10 text-[#D1D5DB] mx-auto mb-3" />
            <p className="text-[#888] text-sm">Aucun message pour l'instant.</p>
          </div>
        )}

        {/* Messages list */}
        {messages.length > 0 && (
          <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
            <AnimatePresence>
              {messages.map((m, i) => {
                const isNew = m.statut === "nouveau";
                return (
                  <motion.div
                    key={m.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={`flex items-center gap-4 px-5 py-4 border-b border-[#E5E7EB] last:border-0 cursor-pointer transition-colors ${
                      isNew ? "bg-[#EEF2FF]/50 hover:bg-[#EEF2FF]" : "hover:bg-[#F9FAFB]"
                    }`}
                    onClick={() => openMessage(m)}
                  >
                    {/* Icône */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isNew ? "bg-[#1A56DB]" : "bg-[#E5E7EB]"}`}>
                      {isNew
                        ? <Mail className="w-4 h-4 text-white" />
                        : <MailOpen className="w-4 h-4 text-[#888]" />}
                    </div>

                    {/* Contenu */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm truncate ${isNew ? "font-bold text-[#0D1B3E]" : "font-medium text-[#374151]"}`}>
                          {fullName(m)}
                        </span>
                        {isNew && <span className="w-2 h-2 rounded-full bg-[#1A56DB] shrink-0" />}
                        {m.sujet && (
                          <span className="hidden sm:inline text-xs px-2 py-0.5 rounded-full bg-[#EEF2FF] text-[#1A56DB] font-medium shrink-0">
                            {m.sujet}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#888] truncate mt-0.5 flex items-center gap-1.5">
                        <Phone className="w-3 h-3 shrink-0" />{m.tel}
                        <span className="mx-1 text-[#D1D5DB]">·</span>
                        {m.email}
                      </p>
                      {m.message && (
                        <p className="text-xs text-[#6B7280] truncate mt-0.5">{m.message}</p>
                      )}
                    </div>

                    {/* Meta + delete */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-[#888] flex items-center gap-1">
                        <Clock className="w-3 h-3" />{formatDate(m.created_at)}
                      </span>
                      <button
                        onClick={(e) => handleDelete(e, m.id)}
                        disabled={deletingId === m.id}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition disabled:opacity-40"
                      >
                        {deletingId === m.id
                          ? <Loader2 className="w-4 h-4 animate-spin" />
                          : <Trash2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Pagination */}
        {lastPage > 1 && (
          <div className="flex items-center justify-center gap-2 mt-5">
            <button
              onClick={() => fetchMessages(page - 1)}
              disabled={page <= 1 || loading}
              className="px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-sm text-[#374151] hover:bg-[#F9FAFB] disabled:opacity-40 transition"
            >
              ← Précédent
            </button>
            <span className="text-sm text-[#888]">Page {page} / {lastPage}</span>
            <button
              onClick={() => fetchMessages(page + 1)}
              disabled={page >= lastPage || loading}
              className="px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-sm text-[#374151] hover:bg-[#F9FAFB] disabled:opacity-40 transition"
            >
              Suivant →
            </button>
          </div>
        )}

        {/* Modal détail */}
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
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                onClick={e => e.stopPropagation()}
                className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
              >
                {/* Modal header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
                  <div>
                    <h2 className="text-base font-bold text-[#0D1B3E] leading-tight">
                      {viewing.sujet ?? "Message sans sujet"}
                    </h2>
                    <p className="text-xs text-[#888] mt-0.5">{formatDateTime(viewing.created_at)}</p>
                  </div>
                  <button onClick={() => setViewing(null)} className="p-1.5 rounded-lg hover:bg-[#F3F4F6] transition">
                    <X className="w-5 h-5 text-[#6B7280]" />
                  </button>
                </div>

                {/* Coordonnées */}
                <div className="px-6 py-4 space-y-2.5 border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-2.5 text-sm text-[#374151]">
                    <User className="w-4 h-4 text-[#1A56DB] shrink-0" />
                    <span className="font-semibold">{fullName(viewing)}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <Mail className="w-4 h-4 text-[#1A56DB] shrink-0" />
                    <a href={`mailto:${viewing.email}`} className="text-[#1A56DB] hover:underline">{viewing.email}</a>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <Phone className="w-4 h-4 text-[#1A56DB] shrink-0" />
                    <a href={`tel:${viewing.tel.replace(/\s/g, "")}`} className="text-[#1A56DB] hover:underline">{viewing.tel}</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      viewing.statut === "nouveau"
                        ? "bg-blue-100 text-blue-700"
                        : viewing.statut === "lu"
                        ? "bg-gray-100 text-gray-600"
                        : "bg-green-100 text-green-700"
                    }`}>
                      {viewing.statut === "nouveau" ? "Nouveau" : viewing.statut === "lu" ? "Lu" : "Traité"}
                    </span>
                    {viewing.lu_at && (
                      <span className="text-xs text-[#888]">lu le {formatDateTime(viewing.lu_at)}</span>
                    )}
                  </div>
                </div>

                {/* Corps du message */}
                <div className="px-6 py-4">
                  {viewing.message ? (
                    <div className="bg-[#F9FAFB] rounded-xl p-4 text-sm text-[#374151] leading-relaxed whitespace-pre-line">
                      {viewing.message}
                    </div>
                  ) : (
                    <p className="text-sm text-[#9CA3AF] italic">Aucun message.</p>
                  )}
                </div>

                {/* Actions */}
                <div className="px-6 pb-5 flex gap-3">
                  <a
                    href={`mailto:${viewing.email}`}
                    className="flex-1 py-2.5 rounded-xl bg-[#1A56DB] text-white text-sm font-bold text-center hover:bg-[#1347BE] transition"
                  >
                    Répondre par email
                  </a>
                  <a
                    href={`tel:${viewing.tel.replace(/\s/g, "")}`}
                    className="flex-1 py-2.5 rounded-xl border-2 border-[#1A56DB] text-[#1A56DB] text-sm font-bold text-center hover:bg-[#EEF2FF] transition"
                  >
                    Appeler
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </AdminLayout>
  );
};

export default AdminMessages;