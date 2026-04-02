import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Wrench, Newspaper, MessageSquare, Bot,
  DollarSign, LogOut, Shield, ChevronLeft, Menu, FolderTree,
  HelpCircle, FileText, User, Search
} from "lucide-react";
import { useState } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

const links = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "Sous-Services", href: "/admin/sous-services", icon: FolderTree },
  
  { label: "Actualités", href: "/admin/actualites", icon: Newspaper },
  { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { label: "Devis", href: "/admin/devis", icon: FileText },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Chatbot", href: "/admin/chatbot", icon: Bot },
  { label: "Tarifs", href: "/admin/tarifs", icon: DollarSign },
  { label: "SEO", href: "/admin/seo", icon: Search },
  { label: "Profil", href: "/admin/profil", icon: User },
];

const AdminSidebar = () => {
  const { pathname } = useLocation();
  const { user, logout } = useAdminAuth();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3 }}
      className="bg-[#0D1B3E] text-white flex flex-col min-h-screen sticky top-0 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1A56DB] flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm">3D Admin</span>
          </motion.div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded-lg hover:bg-white/10 transition">
          {collapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {links.map((l, i) => (
          <motion.div key={l.href} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
            <Link
              to={l.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive(l.href)
                  ? "bg-[#1A56DB] text-white shadow-lg shadow-[#1A56DB]/30"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <l.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{l.label}</span>}
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        {!collapsed && user && (
          <p className="text-xs text-white/40 mb-2 truncate">{user.email}</p>
        )}
        <button onClick={logout} className="flex items-center gap-2 text-sm text-white/50 hover:text-red-400 transition w-full px-3 py-2 rounded-lg hover:bg-white/5">
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Déconnexion</span>}
        </button>
        {!collapsed && (
          <Link to="/" className="block text-xs text-white/30 hover:text-white/60 mt-2 px-3 transition">
            ← Retour au site
          </Link>
        )}
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;
