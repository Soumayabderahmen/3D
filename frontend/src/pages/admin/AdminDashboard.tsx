import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wrench, Newspaper, MessageSquare, Bot, TrendingUp, Clock, Loader2, AlertCircle } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { Link } from "react-router-dom";
import api from "../../lib/axios";

// ─── Types ─────────────────────────────────────────────────────────
interface Message {
  id: number;
  prenom: string;
  nom: string | null;
  sujet: string | null;
  statut: "nouveau" | "lu" | "traite";
  created_at: string;
}

interface PaginatedResponse {
  data: Message[];
  total: number;
}

// ─── Helpers ───────────────────────────────────────────────────────
const timeAgo = (iso: string): string => {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return "À l'instant";
  if (diff < 3600) return `Il y a ${Math.floor(diff / 60)}min`;
  if (diff < 86400) return `Il y a ${Math.floor(diff / 3600)}h`;
  if (diff < 172800) return "Hier";
  return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" });
};

const fullName = (m: Message) => [m.prenom, m.nom].filter(Boolean).join(" ");

const quickLinks = [
  { label: "Gérer les services", href: "/admin/services", icon: Wrench },
  { label: "Voir les messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Modifier les tarifs", href: "/admin/tarifs", icon: TrendingUp },
  { label: "Config chatbot", href: "/admin/chatbot", icon: Bot },
];

// ─── Component ─────────────────────────────────────────────────────
const AdminDashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [total, setTotal] = useState(0);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [errorMessages, setErrorMessages] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoadingMessages(true);
      setErrorMessages(false);
      try {
        const { data } = await api.get<PaginatedResponse>("/admin/contacts?page=1");
        setMessages(data.data.slice(0, 4)); // Afficher les 4 plus récents
        setTotal(data.total);
      } catch {
        setErrorMessages(true);
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
  }, []);

  const unreadCount = messages.filter(m => m.statut === "nouveau").length;

  const stats = [
    { label: "Services actifs",     value: "9",               icon: Wrench,       color: "#1A56DB", bg: "#EEF2FF" },
    { label: "Actualités",          value: "6",               icon: Newspaper,    color: "#16A34A", bg: "#F0FDF4" },
    { label: "Messages non lus",    value: loadingMessages ? "—" : String(unreadCount), icon: MessageSquare, color: "#D97706", bg: "#FFFBEB" },
    { label: "Conversations bot",   value: "47",              icon: Bot,          color: "#7C3AED", bg: "#F5F3FF" },
  ];

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-extrabold text-[#0D1B3E] mb-1">Tableau de bord</h1>
        <p className="text-sm text-[#888] mb-8">Vue d'ensemble de votre activité</p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl border border-[#E5E7EB] p-5 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: s.bg }}>
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                {loadingMessages && s.label === "Messages non lus" ? (
                  <Loader2 className="w-5 h-5 animate-spin text-[#D97706]" />
                ) : (
                  <span className="text-2xl font-extrabold" style={{ color: s.color }}>{s.value}</span>
                )}
              </div>
              <p className="text-sm text-[#374151] font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent messages */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-[#E5E7EB] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#0D1B3E]">Messages récents</h2>
              <Link to="/admin/messages" className="text-sm text-[#1A56DB] font-semibold hover:underline">
                Voir tout →
              </Link>
            </div>

            {/* Loading skeleton */}
            {loadingMessages && (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-[#E5E7EB] shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3.5 bg-[#E5E7EB] rounded w-1/3" />
                      <div className="h-3 bg-[#E5E7EB] rounded w-1/2" />
                    </div>
                    <div className="h-3 bg-[#E5E7EB] rounded w-14" />
                  </div>
                ))}
              </div>
            )}

            {/* Error state */}
            {!loadingMessages && errorMessages && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                Impossible de charger les messages.
              </div>
            )}

            {/* Empty state */}
            {!loadingMessages && !errorMessages && messages.length === 0 && (
              <p className="text-sm text-[#888] text-center py-6">Aucun message pour l'instant.</p>
            )}

            {/* Messages list */}
            {!loadingMessages && !errorMessages && messages.length > 0 && (
              <div className="space-y-3">
                {messages.map((m, i) => {
                  const isNew = m.statut === "nouveau";
                  return (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      className={`flex items-center gap-3 p-3 rounded-lg transition ${isNew ? "bg-[#EEF2FF]" : "hover:bg-[#F9FAFB]"}`}
                    >
                      <div className={`w-2 h-2 rounded-full shrink-0 ${isNew ? "bg-[#1A56DB]" : "bg-transparent"}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm truncate ${isNew ? "font-bold text-[#0D1B3E]" : "font-semibold text-[#0D1B3E]"}`}>
                          {fullName(m)}
                        </p>
                        <p className="text-xs text-[#888] truncate">
                          {m.sujet ?? "Sans sujet"}
                        </p>
                      </div>
                      <span className="text-xs text-[#888] shrink-0 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {timeAgo(m.created_at)}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6">
            <h2 className="text-lg font-bold text-[#0D1B3E] mb-4">Accès rapide</h2>
            <div className="space-y-2">
              {quickLinks.map((l, i) => (
                <motion.div key={l.href} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.1 }}>
                  <Link
                    to={l.href}
                    className="flex items-center gap-3 p-3 rounded-lg text-sm font-medium text-[#374151] hover:bg-[#EEF2FF] hover:text-[#1A56DB] transition"
                  >
                    <l.icon className="w-4 h-4" />
                    {l.label}
                    {l.label === "Voir les messages" && !loadingMessages && unreadCount > 0 && (
                      <span className="ml-auto bg-[#1A56DB] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminDashboard;