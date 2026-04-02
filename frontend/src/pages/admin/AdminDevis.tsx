import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Trash2, X, FileText, Clock, CheckCircle2, XCircle, Filter } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

interface Devis {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  address: string;
  description: string;
  date: string;
  status: "pending" | "accepted" | "rejected";
  estimatedPrice?: string;
  notes?: string;
}

const defaultDevis: Devis[] = [
  { id: "1", name: "Marie Dupont", email: "marie@email.com", phone: "06 12 34 56 78", service: "Débarras Maison", address: "45 rue de Rivoli, Paris 1er", description: "Appartement 80m², 2 pièces encombrées", date: "2024-12-10", status: "pending" },
  { id: "2", name: "Jean Martin", email: "jean.m@email.com", phone: "06 98 76 54 32", service: "Nettoyage Diogène", address: "12 avenue Jean Jaurès, Boulogne", description: "Studio très insalubre, intervention urgente", date: "2024-12-08", status: "accepted", estimatedPrice: "1 200 €" },
  { id: "3", name: "Sophie Bernard", email: "sophie.b@email.com", phone: "07 11 22 33 44", service: "Débarras Cave", address: "8 rue des Lilas, Saint-Denis", description: "Cave 15m² pleine de cartons et meubles", date: "2024-12-05", status: "rejected", notes: "Hors zone" },
  { id: "4", name: "Pierre Lefebvre", email: "p.lefebvre@email.com", phone: "06 55 44 33 22", service: "Succession", address: "22 bd Haussmann, Paris 9e", description: "Succession appartement 120m², beaucoup de mobilier ancien", date: "2024-12-03", status: "pending" },
];

const statusConfig = {
  pending: { label: "En attente", color: "bg-[#FEF3C7] text-[#D97706]", icon: Clock },
  accepted: { label: "Accepté", color: "bg-[#F0FDF4] text-[#16A34A]", icon: CheckCircle2 },
  rejected: { label: "Refusé", color: "bg-red-50 text-red-500", icon: XCircle },
};

const AdminDevis = () => {
  const [devis, setDevis] = useState<Devis[]>(() => {
    const saved = localStorage.getItem("admin_devis");
    return saved ? JSON.parse(saved) : defaultDevis;
  });
  const [viewing, setViewing] = useState<Devis | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const save = (list: Devis[]) => { setDevis(list); localStorage.setItem("admin_devis", JSON.stringify(list)); };
  const handleDelete = (id: string) => save(devis.filter(d => d.id !== id));
  const handleStatusChange = (id: string, status: Devis["status"]) => save(devis.map(d => d.id === id ? { ...d, status } : d));
  const handleNotesUpdate = (id: string, notes: string) => save(devis.map(d => d.id === id ? { ...d, notes } : d));
  const handlePriceUpdate = (id: string, estimatedPrice: string) => save(devis.map(d => d.id === id ? { ...d, estimatedPrice } : d));

  const filtered = filter === "all" ? devis : devis.filter(d => d.status === filter);
  const counts = { all: devis.length, pending: devis.filter(d => d.status === "pending").length, accepted: devis.filter(d => d.status === "accepted").length, rejected: devis.filter(d => d.status === "rejected").length };

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0D1B3E]">Demandes de devis</h1>
            <p className="text-sm text-[#888]">{counts.pending} en attente sur {counts.all} demandes</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-4">
          {(["all", "pending", "accepted", "rejected"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${filter === f ? "bg-[#0D1B3E] text-white" : "bg-white border border-[#E5E7EB] text-[#888] hover:bg-[#F9FAFB]"}`}>
              {f === "all" ? "Tous" : statusConfig[f].label} ({counts[f]})
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-2">
          <AnimatePresence>
            {filtered.map((d, i) => {
              const sc = statusConfig[d.status];
              const Icon = sc.icon;
              return (
                <motion.div key={d.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ delay: i * 0.03 }} className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-full bg-[#EEF2FF] flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#1A56DB]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#0D1B3E] text-sm">{d.name}</p>
                    <p className="text-xs text-[#888] truncate">{d.service} — {d.address}</p>
                  </div>
                  <span className="text-xs text-[#888]">{d.date}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${sc.color}`}>
                    <Icon className="w-3 h-3" /> {sc.label}
                  </span>
                  <button onClick={() => setViewing(d)} className="p-2 rounded-lg hover:bg-[#EEF2FF] text-[#1A56DB] transition"><Eye className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(d.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition"><Trash2 className="w-4 h-4" /></button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {viewing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setViewing(null)}>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-[#0D1B3E]">Détail du devis</h2>
                  <button onClick={() => setViewing(null)} className="p-1 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-xs text-[#888] uppercase font-semibold">Client</p><p className="text-sm font-bold text-[#0D1B3E]">{viewing.name}</p></div>
                    <div><p className="text-xs text-[#888] uppercase font-semibold">Téléphone</p><p className="text-sm text-[#374151]">{viewing.phone}</p></div>
                    <div><p className="text-xs text-[#888] uppercase font-semibold">Email</p><p className="text-sm text-[#374151]">{viewing.email}</p></div>
                    <div><p className="text-xs text-[#888] uppercase font-semibold">Date</p><p className="text-sm text-[#374151]">{viewing.date}</p></div>
                  </div>
                  <div><p className="text-xs text-[#888] uppercase font-semibold">Service</p><p className="text-sm text-[#374151]">{viewing.service}</p></div>
                  <div><p className="text-xs text-[#888] uppercase font-semibold">Adresse</p><p className="text-sm text-[#374151]">{viewing.address}</p></div>
                  <div><p className="text-xs text-[#888] uppercase font-semibold">Description</p><p className="text-sm text-[#374151]">{viewing.description}</p></div>
                  <div>
                    <p className="text-xs text-[#888] uppercase font-semibold mb-1">Prix estimé</p>
                    <input value={viewing.estimatedPrice || ""} onChange={e => { handlePriceUpdate(viewing.id, e.target.value); setViewing({ ...viewing, estimatedPrice: e.target.value }); }} placeholder="Ex: 800 €" className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#1A56DB]/30" />
                  </div>
                  <div>
                    <p className="text-xs text-[#888] uppercase font-semibold mb-1">Notes internes</p>
                    <textarea value={viewing.notes || ""} onChange={e => { handleNotesUpdate(viewing.id, e.target.value); setViewing({ ...viewing, notes: e.target.value }); }} rows={3} placeholder="Notes..." className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#1A56DB]/30 resize-none" />
                  </div>
                  <div>
                    <p className="text-xs text-[#888] uppercase font-semibold mb-2">Statut</p>
                    <div className="flex gap-2">
                      {(["pending", "accepted", "rejected"] as const).map(s => {
                        const sc = statusConfig[s];
                        return (
                          <button key={s} onClick={() => { handleStatusChange(viewing.id, s); setViewing({ ...viewing, status: s }); }} className={`px-4 py-2 rounded-lg text-sm font-semibold transition border ${viewing.status === s ? sc.color + " border-current" : "border-[#E5E7EB] text-[#888] hover:bg-[#F9FAFB]"}`}>
                            {sc.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminDevis;
