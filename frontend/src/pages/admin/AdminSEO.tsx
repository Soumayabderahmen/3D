import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Globe, FileText, AlertTriangle, CheckCircle,
  ChevronDown, ChevronUp, Save, RotateCcw, ExternalLink,
  Eye, EyeOff, ArrowRight, BarChart3, Target, Link2
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { getAllSEOPages, saveSEOForPath, calculateSEOScore, getRedirects, saveRedirects, type PageSEO } from "../../data/seo";
import { toast } from "sonner";

const AdminSEO = () => {
  const [pages, setPages] = useState<PageSEO[]>([]);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<PageSEO | null>(null);
  const [redirects, setRedirects] = useState<{ from: string; to: string }[]>([]);
  const [newRedirect, setNewRedirect] = useState({ from: "", to: "" });
  const [tab, setTab] = useState<"pages" | "redirections" | "audit">("pages");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setPages(getAllSEOPages());
    setRedirects(getRedirects());
  }, []);

  const openEditor = (page: PageSEO) => {
    setSelectedPath(page.path);
    setEditForm({ ...page });
  };

  const handleSave = () => {
    if (!editForm) return;
    saveSEOForPath(editForm.path, editForm);
    setPages(getAllSEOPages());
    setSelectedPath(null);
    toast.success("SEO sauvegardé");
  };

  const addRedirect = () => {
    if (!newRedirect.from || !newRedirect.to) return;
    const updated = [...redirects, newRedirect];
    setRedirects(updated);
    saveRedirects(updated);
    setNewRedirect({ from: "", to: "" });
    toast.success("Redirection ajoutée");
  };

  const removeRedirect = (i: number) => {
    const updated = redirects.filter((_, j) => j !== i);
    setRedirects(updated);
    saveRedirects(updated);
  };

  const filteredPages = pages.filter(p =>
    p.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const avgScore = pages.length > 0
    ? Math.round(pages.reduce((acc, p) => acc + calculateSEOScore(p).score, 0) / pages.length)
    : 0;

  const pagesWithIssues = pages.filter(p => calculateSEOScore(p).issues.length > 0).length;

  const inputCls = "w-full px-3 py-2.5 border border-border rounded-lg text-sm bg-background text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none";

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">SEO & Référencement</h1>
            <p className="text-sm text-muted-foreground">Gérez les meta tags, redirections et audit SEO</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-semibold uppercase mb-1"><Globe className="w-4 h-4" />Pages indexées</div>
            <p className="text-2xl font-bold text-foreground">{pages.filter(p => !p.noindex).length}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-semibold uppercase mb-1"><BarChart3 className="w-4 h-4" />Score moyen</div>
            <p className={`text-2xl font-bold ${avgScore >= 80 ? "text-green-600" : avgScore >= 50 ? "text-yellow-600" : "text-red-600"}`}>{avgScore}/100</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-semibold uppercase mb-1"><AlertTriangle className="w-4 h-4" />Pages avec problèmes</div>
            <p className="text-2xl font-bold text-foreground">{pagesWithIssues}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-semibold uppercase mb-1"><Link2 className="w-4 h-4" />Redirections</div>
            <p className="text-2xl font-bold text-foreground">{redirects.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-muted rounded-lg p-1 w-fit">
          {(["pages", "redirections", "audit"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
              {t === "pages" ? "Pages SEO" : t === "redirections" ? "Redirections" : "Audit global"}
            </button>
          ))}
        </div>

        {tab === "pages" && (
          <>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Rechercher une page..." className={inputCls + " pl-10 max-w-md"} />
            </div>

            <div className="space-y-2">
              {filteredPages.map(page => {
                const { score, issues } = calculateSEOScore(page);
                const isOpen = selectedPath === page.path;
                return (
                  <div key={page.path} className="bg-card rounded-xl border border-border overflow-hidden">
                    <button onClick={() => isOpen ? setSelectedPath(null) : openEditor(page)} className="w-full flex items-center gap-4 p-4 text-left hover:bg-muted/50 transition-colors">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${score >= 80 ? "bg-green-100 text-green-700" : score >= 50 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                        {score}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{page.title}</p>
                        <p className="text-xs text-muted-foreground">{page.path}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {page.noindex && <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-600 font-medium">noindex</span>}
                        {issues.length > 0 && <span className="text-xs px-2 py-0.5 rounded bg-yellow-100 text-yellow-700 font-medium">{issues.length} problème{issues.length > 1 ? "s" : ""}</span>}
                        {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && editForm && (
                        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                          <div className="p-4 border-t border-border space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Titre ({editForm.title?.length || 0}/60)</label>
                                <input value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} className={inputCls} />
                                {(editForm.title?.length || 0) > 60 && <p className="text-xs text-red-500 mt-1">Trop long — risque de troncature dans Google</p>}
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">URL canonique</label>
                                <input value={editForm.canonical || editForm.path} onChange={e => setEditForm({ ...editForm, canonical: e.target.value })} className={inputCls} />
                              </div>
                            </div>
                            <div>
                              <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Description ({editForm.description?.length || 0}/160)</label>
                              <textarea value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} rows={2} className={inputCls + " resize-none"} />
                              {(editForm.description?.length || 0) > 160 && <p className="text-xs text-red-500 mt-1">Trop longue — sera tronquée dans les résultats</p>}
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Mots-clés (séparés par des virgules)</label>
                                <input value={editForm.keywords?.join(", ") || ""} onChange={e => setEditForm({ ...editForm, keywords: e.target.value.split(",").map(k => k.trim()).filter(Boolean) })} className={inputCls} />
                              </div>
                              <div>
                                <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Image OG (URL)</label>
                                <input value={editForm.ogImage || ""} onChange={e => setEditForm({ ...editForm, ogImage: e.target.value })} className={inputCls} placeholder="https://..." />
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <label className="flex items-center gap-2 text-sm">
                                <input type="checkbox" checked={editForm.noindex || false} onChange={e => setEditForm({ ...editForm, noindex: e.target.checked })} className="rounded" />
                                <span className="text-muted-foreground">Exclure de l'indexation (noindex)</span>
                              </label>
                              <div className="flex gap-2">
                                <button onClick={() => setSelectedPath(null)} className="px-4 py-2 text-sm rounded-lg border border-border text-muted-foreground hover:bg-muted transition">Annuler</button>
                                <button onClick={handleSave} className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition flex items-center gap-2"><Save className="w-4 h-4" />Enregistrer</button>
                              </div>
                            </div>

                            {/* Preview */}
                            <div className="bg-muted rounded-lg p-4">
                              <p className="text-xs text-muted-foreground mb-2 font-semibold">Aperçu Google</p>
                              <div className="space-y-1">
                                <p className="text-[#1a0dab] text-base font-medium truncate">{editForm.title}</p>
                                <p className="text-[#006621] text-xs truncate">debarras3dservices.lovable.app{editForm.canonical || editForm.path}</p>
                                <p className="text-xs text-[#545454] line-clamp-2">{editForm.description}</p>
                              </div>
                            </div>

                            {/* Issues */}
                            {issues.length > 0 && (
                              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                <p className="text-xs font-semibold text-yellow-800 mb-2 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" />Suggestions d'amélioration</p>
                                <ul className="space-y-1">
                                  {issues.map((issue, i) => <li key={i} className="text-xs text-yellow-700">• {issue}</li>)}
                                </ul>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {tab === "redirections" && (
          <div className="space-y-4">
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="text-sm font-bold text-foreground mb-3">Ajouter une redirection 301</h3>
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">De (ancienne URL)</label>
                  <input value={newRedirect.from} onChange={e => setNewRedirect({ ...newRedirect, from: e.target.value })} placeholder="/ancienne-page" className={inputCls} />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground mb-3" />
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Vers (nouvelle URL)</label>
                  <input value={newRedirect.to} onChange={e => setNewRedirect({ ...newRedirect, to: e.target.value })} placeholder="/nouvelle-page" className={inputCls} />
                </div>
                <button onClick={addRedirect} className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold">Ajouter</button>
              </div>
            </div>

            {redirects.length > 0 ? (
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border bg-muted/50"><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">De</th><th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Vers</th><th className="px-4 py-3 w-20"></th></tr></thead>
                  <tbody>
                    {redirects.map((r, i) => (
                      <tr key={i} className="border-b border-border last:border-0">
                        <td className="px-4 py-3 font-mono text-xs">{r.from}</td>
                        <td className="px-4 py-3 font-mono text-xs text-primary">{r.to}</td>
                        <td className="px-4 py-3"><button onClick={() => removeRedirect(i)} className="text-xs text-red-500 hover:text-red-700">Supprimer</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">Aucune redirection configurée</p>
            )}
          </div>
        )}

        {tab === "audit" && (
          <div className="space-y-4">
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-primary" />Audit SEO Global</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-center mb-4">
                    <div className={`w-32 h-32 rounded-full border-8 flex items-center justify-center ${avgScore >= 80 ? "border-green-500" : avgScore >= 50 ? "border-yellow-500" : "border-red-500"}`}>
                      <span className="text-3xl font-black text-foreground">{avgScore}</span>
                    </div>
                  </div>
                  <p className="text-center text-sm text-muted-foreground">Score moyen sur {pages.length} pages</p>
                </div>
                <div className="space-y-3">
                  {pages.sort((a, b) => calculateSEOScore(a).score - calculateSEOScore(b).score).slice(0, 5).map(page => {
                    const { score, issues } = calculateSEOScore(page);
                    return (
                      <div key={page.path} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${score >= 80 ? "bg-green-100 text-green-700" : score >= 50 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{score}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">{page.path}</p>
                          <p className="text-[10px] text-muted-foreground">{issues.length} problème{issues.length > 1 ? "s" : ""}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-sm font-bold text-foreground mb-3">Checklist SEO technique</h3>
              <div className="space-y-2">
                {[
                  { check: true, label: "Balises meta title et description sur toutes les pages" },
                  { check: true, label: "Données structurées JSON-LD (LocalBusiness, Service, FAQ, BreadcrumbList)" },
                  { check: true, label: "Balises Open Graph et Twitter Cards" },
                  { check: true, label: "URLs canoniques définies" },
                  { check: true, label: "Sitemap.xml généré" },
                  { check: true, label: "Robots.txt configuré" },
                  { check: true, label: "HTML sémantique (H1 unique, structure cohérente)" },
                  { check: true, label: "Attributs alt sur les images" },
                  { check: true, label: "Lazy loading des images" },
                  { check: true, label: "Pages SEO locales par zone d'intervention" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-sm text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AdminLayout>
  );
};

export default AdminSEO;
