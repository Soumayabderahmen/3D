import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Save, Calendar, MapPin } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  imageBefore?: string;
  imageAfter?: string;
}

const defaultArticles: Article[] = [
  { id: "1", title: "Débarras complet d'une maison à Boulogne", category: "Débarras", date: "2024-12-01", location: "Boulogne-Billancourt (92)", description: "Intervention complète sur 120m²" },
  { id: "2", title: "Nettoyage Diogène — Paris 18e", category: "Nettoyage", date: "2024-11-15", location: "Paris 18e", description: "Remise en état d'un studio très encombré" },
  { id: "3", title: "Succession — Vidage appartement Versailles", category: "Succession", date: "2024-11-01", location: "Versailles (78)", description: "Accompagnement famille pour succession" },
  { id: "4", title: "Débarras cave et garage à Saint-Denis", category: "Débarras", date: "2024-10-20", location: "Saint-Denis (93)", description: "Évacuation de 30m³ d'encombrants" },
];

const categories = ["Débarras", "Nettoyage", "Succession", "Démolition", "Nuisibles"];

const AdminActualites = () => {
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem("admin_articles");
    return saved ? JSON.parse(saved) : defaultArticles;
  });
  const [editing, setEditing] = useState<Article | null>(null);
  const [showForm, setShowForm] = useState(false);

  const save = (list: Article[]) => { setArticles(list); localStorage.setItem("admin_articles", JSON.stringify(list)); };
  const handleDelete = (id: string) => save(articles.filter(a => a.id !== id));

  const handleSave = (a: Article) => {
    if (editing) { save(articles.map(x => x.id === a.id ? a : x)); }
    else { save([{ ...a, id: Date.now().toString() }, ...articles]); }
    setEditing(null); setShowForm(false);
  };

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0D1B3E]">Actualités</h1>
            <p className="text-sm text-[#888]">{articles.length} articles publiés</p>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { setEditing(null); setShowForm(true); }} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#16A34A] text-white text-sm font-bold hover:bg-[#15803D] transition">
            <Plus className="w-4 h-4" /> Nouvel article
          </motion.button>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden">
          <div className="grid grid-cols-[1fr_120px_140px_100px] gap-4 px-5 py-3 border-b border-[#E5E7EB] bg-[#F9FAFB]">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#888]">Article</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#888]">Catégorie</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#888]">Date</span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#888]">Actions</span>
          </div>
          <AnimatePresence>
            {articles.map((a, i) => (
              <motion.div
                key={a.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ delay: i * 0.03 }}
                className="grid grid-cols-[1fr_120px_140px_100px] gap-4 px-5 py-4 border-b border-[#E5E7EB] last:border-0 hover:bg-[#F9FAFB] transition items-center"
              >
                <div className="min-w-0">
                  <p className="font-bold text-sm text-[#0D1B3E] truncate">{a.title}</p>
                  <p className="text-xs text-[#888] flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{a.location}</p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EEF2FF] text-[#1A56DB] w-fit">{a.category}</span>
                <span className="text-xs text-[#888] flex items-center gap-1"><Calendar className="w-3 h-3" />{a.date}</span>
                <div className="flex gap-1">
                  <button onClick={() => { setEditing(a); setShowForm(true); }} className="p-2 rounded-lg hover:bg-[#EEF2FF] text-[#1A56DB] transition"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(a.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition"><Trash2 className="w-4 h-4" /></button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showForm && (
            <ArticleForm article={editing} onSave={handleSave} onClose={() => { setShowForm(false); setEditing(null); }} />
          )}
        </AnimatePresence>
      </motion.div>
    </AdminLayout>
  );
};

const ArticleForm = ({ article, onSave, onClose }: { article: Article | null; onSave: (a: Article) => void; onClose: () => void }) => {
  const [form, setForm] = useState<Article>(article || { id: "", title: "", category: "Débarras", date: new Date().toISOString().split("T")[0], location: "", description: "", imageBefore: "", imageAfter: "" });
  const inputCls = "w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#16A34A]/30 focus:border-[#16A34A] outline-none";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#0D1B3E]">{article ? "Modifier" : "Nouvel"} article</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Titre</label>
            <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Catégorie</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inputCls}>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Date</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Lieu</label>
            <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className={inputCls} />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} className={inputCls + " resize-none"} />
          </div>
          {/* Before/After Images */}
          <div className="border border-dashed border-[#E5E7EB] rounded-xl p-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#374151]">📸 Images Avant / Après</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#888] mb-1 block">Image AVANT (URL)</label>
                <input value={form.imageBefore || ""} onChange={e => setForm({ ...form, imageBefore: e.target.value })} placeholder="https://..." className={inputCls} />
                {form.imageBefore && <img src={form.imageBefore} alt="Avant" className="mt-2 rounded-lg h-24 w-full object-cover border border-[#E5E7EB]" />}
              </div>
              <div>
                <label className="text-xs text-[#888] mb-1 block">Image APRÈS (URL)</label>
                <input value={form.imageAfter || ""} onChange={e => setForm({ ...form, imageAfter: e.target.value })} placeholder="https://..." className={inputCls} />
                {form.imageAfter && <img src={form.imageAfter} alt="Après" className="mt-2 rounded-lg h-24 w-full object-cover border border-[#E5E7EB]" />}
              </div>
            </div>
          </div>
          <motion.button whileTap={{ scale: 0.98 }} onClick={() => onSave(form)} className="w-full py-3 rounded-lg bg-[#16A34A] text-white font-bold text-sm hover:bg-[#15803D] transition flex items-center justify-center gap-2">
            <Save className="w-4 h-4" /> Enregistrer
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminActualites;
