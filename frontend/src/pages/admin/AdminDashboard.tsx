import { motion } from "framer-motion";
import { Wrench, Newspaper, MessageSquare, Bot, TrendingUp, Users, Eye, Clock } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Link } from "react-router-dom";

const stats = [
  { label: "Services actifs", value: "9", icon: Wrench, color: "#1A56DB", bg: "#EEF2FF" },
  { label: "Actualités", value: "6", icon: Newspaper, color: "#16A34A", bg: "#F0FDF4" },
  { label: "Messages non lus", value: "3", icon: MessageSquare, color: "#D97706", bg: "#FFFBEB" },
  { label: "Conversations bot", value: "47", icon: Bot, color: "#7C3AED", bg: "#F5F3FF" },
];

const recentMessages = [
  { name: "Marie Dupont", subject: "Devis débarras maison", date: "Il y a 2h", read: false },
  { name: "Jean Martin", subject: "Question sur les tarifs", date: "Il y a 5h", read: false },
  { name: "Sophie Bernard", subject: "Débarras succession 92", date: "Hier", read: true },
  { name: "Pierre Leroy", subject: "Nettoyage Diogène urgent", date: "Hier", read: false },
];

const quickLinks = [
  { label: "Gérer les services", href: "/admin/services", icon: Wrench },
  { label: "Voir les messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Modifier les tarifs", href: "/admin/tarifs", icon: TrendingUp },
  { label: "Config chatbot", href: "/admin/chatbot", icon: Bot },
];

const AdminDashboard = () => (
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
              <span className="text-2xl font-extrabold" style={{ color: s.color }}>{s.value}</span>
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
            <Link to="/admin/messages" className="text-sm text-[#1A56DB] font-semibold hover:underline">Voir tout →</Link>
          </div>
          <div className="space-y-3">
            {recentMessages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className={`flex items-center gap-3 p-3 rounded-lg transition ${!m.read ? "bg-[#EEF2FF]" : "hover:bg-[#F9FAFB]"}`}
              >
                <div className={`w-2 h-2 rounded-full shrink-0 ${!m.read ? "bg-[#1A56DB]" : "bg-transparent"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0D1B3E] truncate">{m.name}</p>
                  <p className="text-xs text-[#888] truncate">{m.subject}</p>
                </div>
                <span className="text-xs text-[#888] shrink-0 flex items-center gap-1">
                  <Clock className="w-3 h-3" />{m.date}
                </span>
              </motion.div>
            ))}
          </div>
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
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </AdminLayout>
);

export default AdminDashboard;
