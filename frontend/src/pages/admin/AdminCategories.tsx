import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save, FolderTree, GripVertical } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon: string;
  active: boolean;
}

const defaultCategories: Category[] = [
  { id: "1", name: "Débarras", slug: "debarras", color: "#1A56DB", icon: "📦", active: true },
  { id: "2", name: "Nettoyage", slug: "nettoyage", color: "#16A34A", icon: "🧹", active: true },
  { id: "3", name: "Succession", slug: "succession", color: "#D97706", icon: "🤝", active: true },
  { id: "4", name: "Démolition", slug: "demolition", color: "#DC2626", icon: "🏗️", active: true },
  { id: "5", name: "Nuisibles", slug: "nuisibles", color: "#7C3AED", icon: "🐀", active: true },
  { id: "6", name: "Entretien Pro", slug: "entretien-pro", color: "#0891B2", icon: "🏢", active: false },
];

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem("admin_categories");
    return saved ? JSON.parse(saved) : defaultCategories;
  });
  const [editing, setEditing] = useState<Category | null>(null);
  const [showForm, setShowForm] = useState(false);

  const save = (list: Category[]) => { setCategories(list); localStorage.setItem("admin_categories", JSON.stringify(list)); };
  const handleDelete = (id: string) => save(categories.filter(c => c.id !== id));
  const handleToggle = (id: string) => save(categories.map(c => c.id === id ? { ...c, active: !c.active } : c));

  const handleSave = (c: Category) => {
    if (editing) { save(categories.map(x => x.id === c.id ? c : x)); }
    else { save([...categories, { ...c, id: Date.now().toString(), slug: c.name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") }]); }
    setEditing(null); setShowForm(false);
  };

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0D1B3E]">Catégories</h1>
            <p className="text-sm text-[#888]">{categories.length} catégories configurées</p>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setEditing(null); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#7C3AED] text-white text-sm font-bold hover:bg-[#6D28D9] transition">
            <Plus className="w-4 h-4" /> Ajouter
          </motion.button>
        </div>

        <div className="grid gap-3">
          <AnimatePresence>
            {categories.map((c, i) => (
              <motion.div key={c.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ delay: i * 0.04 }} className="bg-white border border-[#E5E7EB] rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                <GripVertical className="w-4 h-4 text-[#CCC] cursor-grab" />
                <span className="text-2xl">{c.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#0D1B3E] text-sm">{c.name}</p>
                  <p className="text-xs text-[#888]">/{c.slug}</p>
                </div>
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: c.color }} />
                <button onClick={() => handleToggle(c.id)} className={`px-3 py-1 rounded-full text-xs font-semibold transition ${c.active ? "bg-[#F0FDF4] text-[#16A34A]" : "bg-gray-100 text-[#888]"}`}>
                  {c.active ? "Actif" : "Inactif"}
                </button>
                <button onClick={() => { setEditing(c); setShowForm(true); }} className="p-2 rounded-lg hover:bg-[#EEF2FF] text-[#1A56DB] transition"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(c.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition"><Trash2 className="w-4 h-4" /></button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showForm && <CategoryForm category={editing} onSave={handleSave} onClose={() => { setShowForm(false); setEditing(null); }} />}
        </AnimatePresence>
      </motion.div>
    </AdminLayout>
  );
};

const CategoryForm = ({ category, onSave, onClose }: { category: Category | null; onSave: (c: Category) => void; onClose: () => void }) => {
  const [form, setForm] = useState<Category>(category || { id: "", name: "", slug: "", color: "#1A56DB", icon: "📦", active: true });
  const inputCls = "w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] outline-none";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#0D1B3E]">{category ? "Modifier" : "Ajouter"} une catégorie</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-[80px_1fr] gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Icône</label>
              <input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg text-center text-xl" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Nom</label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Couleur</label>
            <div className="flex items-center gap-3">
              <input type="color" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} className="w-10 h-10 rounded-lg border border-[#E5E7EB] cursor-pointer" />
              <input value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} className={inputCls} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#374151]">Actif</label>
            <button onClick={() => setForm({ ...form, active: !form.active })} className={`w-12 h-6 rounded-full transition-colors relative ${form.active ? "bg-[#16A34A]" : "bg-[#E5E7EB]"}`}>
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${form.active ? "left-[26px]" : "left-0.5"}`} />
            </button>
          </div>
          <motion.button whileTap={{ scale: 0.98 }} onClick={() => onSave(form)} className="w-full py-3 rounded-lg bg-[#7C3AED] text-white font-bold text-sm hover:bg-[#6D28D9] transition flex items-center justify-center gap-2">
            <Save className="w-4 h-4" /> Enregistrer
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminCategories;
