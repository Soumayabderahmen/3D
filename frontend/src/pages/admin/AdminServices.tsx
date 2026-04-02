import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save, Wrench } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  active: boolean;
}

const defaultServices: Service[] = [
  { id: "1", title: "Débarras Maison", description: "Débarras complet de maisons et appartements", icon: "🏠", active: true },
  { id: "2", title: "Débarras Cave & Garage", description: "Vidage de caves, greniers et garages", icon: "📦", active: true },
  { id: "3", title: "Débarras Succession", description: "Accompagnement pour les successions", icon: "🤝", active: true },
  { id: "4", title: "Nettoyage Diogène", description: "Nettoyage de logements insalubres", icon: "🌀", active: true },
  { id: "5", title: "Débarras Professionnel", description: "Locaux commerciaux et bureaux", icon: "🏢", active: true },
  { id: "6", title: "Nettoyage fin de chantier", description: "Remise en état après travaux", icon: "🧹", active: true },
  { id: "7", title: "Dératisation", description: "Traitement rats et souris", icon: "🐀", active: false },
  { id: "8", title: "Désinsectisation", description: "Traitement insectes nuisibles", icon: "🪳", active: true },
  { id: "9", title: "Désamiantage", description: "Retrait amiante certifié", icon: "⚠️", active: true },
];

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem("admin_services");
    return saved ? JSON.parse(saved) : defaultServices;
  });
  const [editing, setEditing] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);

  const save = (list: Service[]) => {
    setServices(list);
    localStorage.setItem("admin_services", JSON.stringify(list));
  };

  const handleDelete = (id: string) => {
    save(services.filter(s => s.id !== id));
  };

  const handleToggle = (id: string) => {
    save(services.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const handleSave = (s: Service) => {
    if (editing) {
      save(services.map(x => x.id === s.id ? s : x));
    } else {
      save([...services, { ...s, id: Date.now().toString() }]);
    }
    setEditing(null);
    setShowForm(false);
  };

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0D1B3E]">Services</h1>
            <p className="text-sm text-[#888]">{services.length} services configurés</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { setEditing(null); setShowForm(true); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1A56DB] text-white text-sm font-bold hover:bg-[#1347BE] transition"
          >
            <Plus className="w-4 h-4" /> Ajouter
          </motion.button>
        </div>

        <div className="grid gap-3">
          <AnimatePresence>
            {services.map((s, i) => (
              <motion.div
                key={s.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <span className="text-2xl">{s.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#0D1B3E] text-sm">{s.title}</p>
                  <p className="text-xs text-[#888] truncate">{s.description}</p>
                </div>
                <button
                  onClick={() => handleToggle(s.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition ${s.active ? "bg-[#F0FDF4] text-[#16A34A]" : "bg-gray-100 text-[#888]"}`}
                >
                  {s.active ? "Actif" : "Inactif"}
                </button>
                <button onClick={() => { setEditing(s); setShowForm(true); }} className="p-2 rounded-lg hover:bg-[#EEF2FF] text-[#1A56DB] transition">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(s.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {showForm && (
            <ServiceForm
              service={editing}
              onSave={handleSave}
              onClose={() => { setShowForm(false); setEditing(null); }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AdminLayout>
  );
};

const ServiceForm = ({ service, onSave, onClose }: { service: Service | null; onSave: (s: Service) => void; onClose: () => void }) => {
  const [form, setForm] = useState<Service>(service || { id: "", title: "", description: "", icon: "📦", active: true });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#0D1B3E]">{service ? "Modifier" : "Ajouter"} un service</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Icône (emoji)</label>
            <input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} className="w-20 px-3 py-2 border border-[#E5E7EB] rounded-lg text-center text-xl" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Titre</label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#1A56DB]/30 focus:border-[#1A56DB] outline-none" />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#1A56DB]/30 focus:border-[#1A56DB] outline-none resize-none" />
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => onSave(form)}
            className="w-full py-3 rounded-lg bg-[#1A56DB] text-white font-bold text-sm hover:bg-[#1347BE] transition flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" /> Enregistrer
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminServices;
