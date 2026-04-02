import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MailOpen, Trash2, Eye, X, Clock, Phone, User } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

const defaultMessages: Message[] = [
  { id: "1", name: "Marie Dupont", email: "marie@email.com", phone: "06 12 34 56 78", subject: "Devis débarras maison 95m²", message: "Bonjour, je souhaite un devis pour le débarras complet de ma maison de 95m² à Boulogne. La maison est sur 2 étages avec cave. Merci.", date: "2024-12-18 14:30", read: false },
  { id: "2", name: "Jean Martin", email: "jean.martin@gmail.com", phone: "07 98 76 54 32", subject: "Question tarifs succession", message: "Suite au décès de ma mère, nous devons vider son appartement de 60m² dans le 15e. Pouvez-vous nous envoyer un devis ?", date: "2024-12-18 09:15", read: false },
  { id: "3", name: "Sophie Bernard", email: "sophie.b@outlook.fr", phone: "06 45 67 89 01", subject: "Débarras succession Versailles", message: "Appartement de 80m² à vider suite à succession. RDC avec accès facile. Disponible pour visite la semaine prochaine.", date: "2024-12-17 16:45", read: true },
  { id: "4", name: "Pierre Leroy", email: "p.leroy@free.fr", phone: "07 11 22 33 44", subject: "Nettoyage Diogène urgent", message: "Logement très encombré dans le 18e arrondissement. Situation urgente, propriétaire demande intervention rapide.", date: "2024-12-17 11:00", read: false },
  { id: "5", name: "Claire Moreau", email: "claire.m@yahoo.fr", phone: "06 55 66 77 88", subject: "Vidage cave + garage", message: "Cave de 15m² + garage de 20m² à vider à Nanterre. Beaucoup de vieux meubles et cartons.", date: "2024-12-16 08:20", read: true },
];

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem("admin_messages");
    return saved ? JSON.parse(saved) : defaultMessages;
  });
  const [viewing, setViewing] = useState<Message | null>(null);

  const save = (list: Message[]) => { setMessages(list); localStorage.setItem("admin_messages", JSON.stringify(list)); };
  const markRead = (id: string) => save(messages.map(m => m.id === id ? { ...m, read: true } : m));
  const handleDelete = (id: string) => save(messages.filter(m => m.id !== id));
  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0D1B3E]">Messages</h1>
            <p className="text-sm text-[#888]">{unreadCount} non lu{unreadCount > 1 ? "s" : ""} sur {messages.length}</p>
          </div>
          {unreadCount > 0 && (
            <button onClick={() => save(messages.map(m => ({ ...m, read: true })))} className="text-sm text-[#1A56DB] font-semibold hover:underline">
              Tout marquer comme lu
            </button>
          )}
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
          <AnimatePresence>
            {messages.map((m, i) => (
              <motion.div
                key={m.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`flex items-center gap-4 px-5 py-4 border-b border-[#E5E7EB] last:border-0 cursor-pointer transition ${!m.read ? "bg-[#EEF2FF]/50" : "hover:bg-[#F9FAFB]"}`}
                onClick={() => { markRead(m.id); setViewing(m); }}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${!m.read ? "bg-[#1A56DB]" : "bg-[#E5E7EB]"}`}>
                  {!m.read ? <Mail className="w-4 h-4 text-white" /> : <MailOpen className="w-4 h-4 text-[#888]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm truncate ${!m.read ? "font-bold text-[#0D1B3E]" : "font-medium text-[#374151]"}`}>{m.name}</span>
                    {!m.read && <span className="w-2 h-2 rounded-full bg-[#1A56DB] shrink-0" />}
                  </div>
                  <p className="text-sm text-[#374151] truncate">{m.subject}</p>
                  <p className="text-xs text-[#888] truncate">{m.message}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-[#888] flex items-center gap-1"><Clock className="w-3 h-3" />{m.date.split(" ")[0]}</span>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(m.id); }} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Detail modal */}
        <AnimatePresence>
          {viewing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setViewing(null)}>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-[#0D1B3E]">{viewing.subject}</h2>
                  <button onClick={() => setViewing(null)} className="p-1 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-[#374151]"><User className="w-4 h-4 text-[#1A56DB]" />{viewing.name}</div>
                  <div className="flex items-center gap-2 text-sm text-[#374151]"><Mail className="w-4 h-4 text-[#1A56DB]" />{viewing.email}</div>
                  <div className="flex items-center gap-2 text-sm text-[#374151]"><Phone className="w-4 h-4 text-[#1A56DB]" />{viewing.phone}</div>
                  <div className="flex items-center gap-2 text-xs text-[#888]"><Clock className="w-3 h-3" />{viewing.date}</div>
                </div>
                <div className="bg-[#F9FAFB] rounded-lg p-4 text-sm text-[#374151] leading-relaxed">
                  {viewing.message}
                </div>
                <div className="flex gap-3 mt-6">
                  <a href={`mailto:${viewing.email}`} className="flex-1 py-2.5 rounded-lg bg-[#1A56DB] text-white text-sm font-bold text-center hover:bg-[#1347BE] transition">Répondre par email</a>
                  <a href={`tel:${viewing.phone.replace(/\s/g, "")}`} className="flex-1 py-2.5 rounded-lg border-2 border-[#1A56DB] text-[#1A56DB] text-sm font-bold text-center hover:bg-[#EEF2FF] transition">Appeler</a>
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
