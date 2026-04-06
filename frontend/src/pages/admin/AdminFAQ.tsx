// src/components/admin/AdminFAQ.tsx
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Save, HelpCircle, ChevronDown, Loader2 } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { faqApi } from '../../services/faq';

// ─── Types ──────────────────────────────
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  active: boolean;
  order: number;
}

type FAQPayload = Omit<FAQItem, 'id'>;

// ─── Composant Principal ─────────────────
const AdminFAQ = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<FAQItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const fetchFaqs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await faqApi.getAll();
      setFaqs(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchFaqs(); }, [fetchFaqs]);

  const handleDelete = async (id: number) => {
    if (!confirm('Supprimer cette question ?')) return;
    try {
      await faqApi.delete(id);
      setFaqs(prev => prev.filter(f => f.id !== id));
    } catch (e: any) { alert(e.message); }
  };

  const handleToggle = async (id: number) => {
    try {
      const updated = await faqApi.toggle(id);
      setFaqs(prev => prev.map(f => (f.id === id ? updated : f)));
    } catch (e: any) { alert(e.message); }
  };

  const handleSave = async (payload: FAQPayload & { id?: number }) => {
    try {
      if (editing) {
        const updated = await faqApi.update(editing.id, payload);
        setFaqs(prev => prev.map(f => (f.id === editing.id ? updated : f)));
      } else {
        const created = await faqApi.create(payload);
        setFaqs(prev => [...prev, created]);
      }
      setEditing(null);
      setShowForm(false);
    } catch (e: any) { alert(e.message); }
  };

  const sorted = [...faqs].sort((a, b) => a.order - b.order);

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0D1B3E]">FAQ</h1>
            <p className="text-sm text-[#888]">
              {faqs.filter(f => f.active).length} questions actives sur {faqs.length}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { setEditing(null); setShowForm(true); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#D97706] text-white text-sm font-bold hover:bg-[#B45309] transition"
          >
            <Plus className="w-4 h-4" /> Ajouter
          </motion.button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-200">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 text-[#D97706] animate-spin" />
          </div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence>
              {sorted.map((f, i) => (
                <motion.div
                  key={f.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div
                    className="flex items-center gap-3 p-4 cursor-pointer"
                    onClick={() => setExpandedId(expandedId === f.id ? null : f.id)}
                  >
                    <HelpCircle className={`w-5 h-5 shrink-0 ${f.active ? 'text-[#D97706]' : 'text-[#CCC]'}`} />
                    <p className="font-bold text-[#0D1B3E] text-sm flex-1">{f.question}</p>

                    {/* Toggle */}
                    <button
                      onClick={e => { e.stopPropagation(); handleToggle(f.id); }}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                        f.active ? 'bg-[#F0FDF4] text-[#16A34A]' : 'bg-gray-100 text-[#888]'
                      }`}
                    >
                      {f.active ? 'Actif' : 'Inactif'}
                    </button>

                    {/* Edit */}
                    <button
                      onClick={e => { e.stopPropagation(); setEditing(f); setShowForm(true); }}
                      className="p-2 rounded-lg hover:bg-[#EEF2FF] text-[#1A56DB] transition"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={e => { e.stopPropagation(); handleDelete(f.id); }}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <ChevronDown
                      className={`w-4 h-4 text-[#888] transition-transform ${expandedId === f.id ? 'rotate-180' : ''}`}
                    />
                  </div>

                  {/* Answer */}
                  <AnimatePresence>
                    {expandedId === f.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pl-12 text-sm text-[#555] leading-relaxed">
                          {f.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Form Modal */}
        <AnimatePresence>
          {showForm && (
            <FAQForm
              faq={editing}
              onSave={handleSave}
              onClose={() => { setShowForm(false); setEditing(null); }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AdminLayout>
  );
};

// ─── Formulaire ─────────────────────────
type FormState = Omit<FAQItem, 'id'> & { id?: number };

const FAQForm = ({
  faq,
  onSave,
  onClose,
}: {
  faq: FAQItem | null;
  onSave: (f: FormState) => Promise<void>;
  onClose: () => void;
}) => {
  const [form, setForm] = useState<FormState>(
    faq ?? { question: '', answer: '', active: true, order: 0 }
  );
  const [saving, setSaving] = useState(false);

  const inputCls =
    'w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#D97706]/30 focus:border-[#D97706] outline-none';

  const handleSubmit = async () => {
    if (!form.question.trim() || !form.answer.trim()) {
      alert('La question et la réponse sont obligatoires.');
      return;
    }
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-[#0D1B3E]">
            {faq ? 'Modifier' : 'Ajouter'} une question
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">
              Question
            </label>
            <input
              value={form.question}
              onChange={e => setForm({ ...form, question: e.target.value })}
              className={inputCls}
              placeholder="Ex : Quelles sont vos zones d'intervention ?"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">
              Réponse
            </label>
            <textarea
              value={form.answer}
              onChange={e => setForm({ ...form, answer: e.target.value })}
              rows={5}
              className={inputCls + ' resize-none'}
              placeholder="Rédigez la réponse ici…"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">
              Ordre d'affichage
            </label>
            <input
              type="number"
              min={0}
              value={form.order}
              onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
              className={inputCls}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-[#374151]">Actif</label>
            <button
              onClick={() => setForm({ ...form, active: !form.active })}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                form.active ? 'bg-[#16A34A]' : 'bg-[#E5E7EB]'
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  form.active ? 'left-[26px]' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={saving}
            className="w-full py-3 rounded-lg bg-[#D97706] text-white font-bold text-sm hover:bg-[#B45309] transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Enregistrement…' : 'Enregistrer'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminFAQ;