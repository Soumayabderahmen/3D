import { useState, useEffect } from "react";
import { Save, Palette, ListChecks, Trash2, Plus, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import type { ServiceConfig, ServiceFormData } from "../../types/services";

// ─── Constantes ────────────────────────────────────────────────────
const ICON_OPTIONS = [
  { value: "Truck",       label: "🚛 Camion"   },
  { value: "Hammer",      label: "🔨 Marteau"  },
  { value: "ShieldAlert", label: "🛡️ Bouclier" },
  { value: "Sparkles",    label: "✨ Étoiles"  },
  { value: "Wrench",      label: "🔧 Clé"      },
  { value: "Trash2",      label: "🗑️ Poubelle" },
  { value: "Home",        label: "🏠 Maison"   },
  { value: "Building2",   label: "🏢 Immeuble" },
];

const COLOR_PRESETS = [
  "#1B4FD8", "#16A34A", "#DC2626", "#F59E0B",
  "#8B5CF6", "#EC4899", "#0D9488", "#EA580C",
];

const autoSlug = (s: string) =>
  s.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const EMPTY: ServiceFormData = {
  slug: "", title: "", icon: "Truck", color_hex: "#1B4FD8",
  color: "", badge: "", short_desc: "", long_desc: "",
  prestations: [""], order: 0, active: true,
};

// ─── Props ─────────────────────────────────────────────────────────
interface Props {
  open: boolean;
  service: ServiceConfig | null;
  onSave: (data: ServiceFormData, id?: number) => Promise<void>;
  onClose: () => void;
}

// ─── Component ─────────────────────────────────────────────────────
const ServiceFormModal = ({ open, service, onSave, onClose }: Props) => {
  const [form, setForm]     = useState<ServiceFormData>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const isEditing = !!service;

  // ── Sync avec les props ─────────────────────────────────────────
  useEffect(() => {
    if (service) {
      setForm({
        slug:        service.slug,
        title:       service.title,
        icon:        service.icon,
        color_hex:   service.color_hex,
        color:       service.color ?? "",
        badge:       service.badge ?? "",
        short_desc:  service.short_desc ?? "",
        long_desc:   service.long_desc ?? "",
        prestations: service.prestations?.length ? service.prestations : [""],
        order:       service.order,
        active:      service.active,
      });
    } else {
      setForm(EMPTY);
    }
    setErrors({});
  }, [service, open]);

  // ── Helpers ─────────────────────────────────────────────────────
  const set = <K extends keyof ServiceFormData>(k: K, v: ServiceFormData[K]) => {
    setForm(f => {
      const next = { ...f, [k]: v };
      if (k === "title" && !isEditing) next.slug = autoSlug(v as string);
      return next;
    });
    if (errors[k]) setErrors(e => { const n = { ...e }; delete n[k]; return n; });
  };

  const addPrestation    = () =>
    setForm(f => ({ ...f, prestations: [...f.prestations, ""] }));
  const removePrestation = (i: number) =>
    setForm(f => ({ ...f, prestations: f.prestations.filter((_, idx) => idx !== i) }));
  const updatePrestation = (i: number, val: string) =>
    setForm(f => ({ ...f, prestations: f.prestations.map((p, idx) => idx === i ? val : p) }));

  // ── Submit ──────────────────────────────────────────────────────
  const handleSubmit = async () => {
    setSaving(true);
    setErrors({});
    try {
      await onSave(
        { ...form, prestations: form.prestations.filter(p => p.trim()) },
        service?.id,
      );
    } catch (err: any) {
      if (err?.response?.status === 422) {
        const flat: Record<string, string> = {};
        Object.entries(err.response.data.errors ?? {}).forEach(
          ([k, v]: any) => { flat[k] = v[0]; }
        );
        setErrors(flat);
      }
    } finally {
      setSaving(false);
    }
  };

  const canSubmit = form.title.trim() !== "" && form.slug.trim() !== "" && !saving;

  // ── Render ──────────────────────────────────────────────────────
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle>
            {isEditing ? `Modifier — ${service?.title}` : "Ajouter un service"}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="mx-6 w-fit">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="content">Contenu & Prestations</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto px-6 py-4">

            {/* ── Onglet Général ── */}
            <TabsContent value="general" className="mt-0 space-y-4">

              {/* Titre */}
              <div className="space-y-1.5">
                <Label>Nom du service *</Label>
                <Input
                  value={form.title}
                  onChange={e => set("title", e.target.value)}
                  placeholder="Ex: Débarras"
                  className={errors.title ? "border-red-400 bg-red-50" : ""}
                />
                {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
              </div>

              {/* Slug */}
              <div className="space-y-1.5">
                <Label>Slug *</Label>
                <Input
                  value={form.slug}
                  onChange={e => set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                  placeholder="auto-généré depuis le titre"
                  className={`font-mono text-sm ${errors.slug ? "border-red-400 bg-red-50" : ""}`}
                  disabled={isEditing}
                />
                {isEditing && (
                  <p className="text-[11px] text-muted-foreground">
                    Le slug ne peut pas être modifié après création.
                  </p>
                )}
                {errors.slug && <p className="text-red-500 text-xs">{errors.slug}</p>}
              </div>

              {/* Icône */}
              <div className="space-y-1.5">
                <Label>Icône</Label>
                <Select value={form.icon} onValueChange={v => set("icon", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ICON_OPTIONS.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Badge */}
              <div className="space-y-1.5">
                <Label>Badge</Label>
                <Input
                  value={form.badge ?? ""}
                  onChange={e => set("badge", e.target.value)}
                  placeholder="Ex: Service principal"
                />
              </div>

              {/* Description courte */}
              <div className="space-y-1.5">
                <Label>Description courte</Label>
                <Textarea
                  value={form.short_desc ?? ""}
                  onChange={e => set("short_desc", e.target.value)}
                  rows={2}
                  className="resize-none"
                  placeholder="Résumé en 1-2 phrases..."
                />
              </div>

              {/* Couleur */}
              <div className="space-y-1.5">
                <Label className="flex items-center gap-1">
                  <Palette className="w-3.5 h-3.5" /> Couleur
                </Label>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {COLOR_PRESETS.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => set("color_hex", c)}
                      className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                        form.color_hex === c
                          ? "border-foreground scale-110 ring-2 ring-offset-2 ring-primary/30"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={form.color_hex}
                    onChange={e => set("color_hex", e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border border-border p-1"
                  />
                  <Input
                    value={form.color_hex}
                    onChange={e => set("color_hex", e.target.value)}
                    className={`w-28 font-mono text-sm ${errors.color_hex ? "border-red-400 bg-red-50" : ""}`}
                    placeholder="#1B4FD8"
                  />
                </div>
                {errors.color_hex && <p className="text-red-500 text-xs">{errors.color_hex}</p>}
              </div>

              {/* Ordre + Actif */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Ordre d'affichage</Label>
                  <Input
                    type="number"
                    min={0}
                    value={form.order}
                    onChange={e => set("order", Number(e.target.value))}
                  />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.active}
                      onChange={e => set("active", e.target.checked)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-medium">Service actif</span>
                  </label>
                </div>
              </div>

              {/* Aperçu */}
              <div className="border rounded-xl p-4 bg-muted/50">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Aperçu</p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: form.color_hex }}
                  >
                    {form.title.charAt(0) || "?"}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{form.title || "Nom du service"}</p>
                    {form.badge && (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                        style={{ backgroundColor: form.color_hex + "20", color: form.color_hex }}
                      >
                        {form.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* ── Onglet Contenu ── */}
            <TabsContent value="content" className="mt-0 space-y-4">

              {/* Description longue */}
              <div className="space-y-1.5">
                <Label>Description longue</Label>
                <Textarea
                  value={form.long_desc ?? ""}
                  onChange={e => set("long_desc", e.target.value)}
                  rows={6}
                  className="resize-none"
                  placeholder="Description détaillée du service (affichée sur la page publique)..."
                />
                <p className="text-[11px] text-muted-foreground">
                  Séparez les paragraphes par des doubles retours à la ligne.
                </p>
              </div>

              {/* Prestations */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-1">
                    <ListChecks className="w-3.5 h-3.5" /> Prestations incluses
                  </Label>
                  <Button type="button" variant="ghost" size="sm" onClick={addPrestation} className="h-7 text-xs">
                    <Plus className="w-3 h-3 mr-1" /> Ajouter
                  </Button>
                </div>
                <div className="space-y-2">
                  {form.prestations.map((p, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        value={p}
                        onChange={e => updatePrestation(i, e.target.value)}
                        placeholder={`Prestation ${i + 1}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removePrestation(i)}
                        className="shrink-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {form.prestations.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      Aucune prestation ajoutée
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>

          </div>
        </Tabs>

        {/* Footer */}
        <div className="p-6 pt-4 border-t">
          <Button onClick={handleSubmit} className="w-full" disabled={!canSubmit}>
            {saving
              ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sauvegarde...</>
              : <><Save className="w-4 h-4 mr-2" /> Enregistrer</>
            }
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceFormModal;