import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { User, Save, Camera, Mail, Phone, MapPin, Shield, Loader2 } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { profileService } from "../../services/profileService";
import type { AdminProfile } from "../../types/profile";

const AdminProfil = () => {
  const { user: authUser } = useAdminAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile,    setProfile]    = useState<AdminProfile | null>(null);
  const [loading,    setLoading]    = useState(true);
  const [saving,     setSaving]     = useState(false);
  const [savedOk,    setSavedOk]    = useState(false);
  const [profileErr, setProfileErr] = useState<Record<string, string>>({});

  const [passwords,  setPasswords]  = useState({ current: "", newPwd: "", confirm: "" });
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdError,   setPwdError]   = useState<Record<string, string>>({});
  const [pwdOk,      setPwdOk]      = useState(false);

  const [avatarLoading, setAvatarLoading] = useState(false);

  // Charger le profil au mount
  useEffect(() => {
    profileService.getProfile()
      .then(setProfile)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    setProfileErr({});
    try {
      const updated = await profileService.updateProfile({
        name:         profile.name,
        email:        profile.email,
        phone:        profile.phone || "",
        address:      profile.address || "",
        role:         profile.role,
        company_name: profile.company_name || "",
        siret:        profile.siret || "",
      });
      setProfile(updated);
      setSavedOk(true);
      setTimeout(() => setSavedOk(false), 2500);
    } catch (err: any) {
      const errs = err.response?.data?.errors || {};
      const flat: Record<string, string> = {};
      Object.keys(errs).forEach(k => { flat[k] = errs[k][0]; });
      setProfileErr(flat);
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;
    setAvatarLoading(true);
    try {
      const avatarUrl = await profileService.updateAvatar(file);
      setProfile({ ...profile, avatar_url: avatarUrl });
    } catch {
      alert("Erreur lors de l'upload de l'avatar");
    } finally {
      setAvatarLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    setPwdError({});
    if (passwords.newPwd !== passwords.confirm) {
      setPwdError({ confirm: "Les mots de passe ne correspondent pas" });
      return;
    }
    setPwdLoading(true);
    try {
      await profileService.updatePassword({
        current_password:      passwords.current,
        password:              passwords.newPwd,
        password_confirmation: passwords.confirm,
      });
      setPasswords({ current: "", newPwd: "", confirm: "" });
      setPwdOk(true);
      setTimeout(() => setPwdOk(false), 2500);
    } catch (err: any) {
      const errs = err.response?.data?.errors || {};
      const flat: Record<string, string> = {};
      Object.keys(errs).forEach(k => { flat[k] = errs[k][0]; });
      setPwdError(flat);
    } finally {
      setPwdLoading(false);
    }
  };

  const inputCls = "w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#1A56DB]/30 focus:border-[#1A56DB] outline-none";
  const errCls   = "text-xs text-red-500 mt-1";

  if (loading) return (
    <AdminLayout>
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#1A56DB]" />
      </div>
    </AdminLayout>
  );

  if (!profile) return null;

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0D1B3E]">Mon Profil</h1>
            <p className="text-sm text-[#888]">Gérez vos informations personnelles</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-bold transition disabled:opacity-60 ${savedOk ? "bg-[#16A34A]" : "bg-[#1A56DB] hover:bg-[#1347BE]"}`}
          >
            {saving
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : <Save className="w-4 h-4" />
            }
            {saving ? "Enregistrement..." : savedOk ? "Enregistré ✓" : "Enregistrer"}
          </motion.button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Avatar & infos */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl border border-[#E5E7EB] p-6 text-center"
            >
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full bg-[#EEF2FF] flex items-center justify-center mx-auto border-4 border-white shadow-lg overflow-hidden">
                  {avatarLoading ? (
                    <Loader2 className="w-8 h-8 animate-spin text-[#1A56DB]" />
                  ) : profile.avatar_url ? (
                    <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-[#1A56DB]" />
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#1A56DB] flex items-center justify-center hover:bg-[#1347BE] transition shadow-lg"
                >
                  <Camera className="w-4 h-4 text-white" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
              <h3 className="font-bold text-[#0D1B3E]">{profile.name}</h3>
              <span className="inline-flex items-center gap-1 mt-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#EEF2FF] text-[#1A56DB]">
                <Shield className="w-3 h-3" /> {profile.role}
              </span>
              <div className="mt-4 space-y-2 text-left">
                <p className="text-xs text-[#888] flex items-center gap-2"><Mail className="w-3 h-3" /> {profile.email}</p>
                {profile.phone   && <p className="text-xs text-[#888] flex items-center gap-2"><Phone  className="w-3 h-3" /> {profile.phone}</p>}
                {profile.address && <p className="text-xs text-[#888] flex items-center gap-2"><MapPin className="w-3 h-3" /> {profile.address}</p>}
              </div>
            </motion.div>
          </div>

          {/* Formulaires */}
          <div className="lg:col-span-2 space-y-6">
            {/* Infos personnelles */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="bg-white rounded-xl border border-[#E5E7EB] p-6"
            >
              <h2 className="text-base font-bold text-[#0D1B3E] mb-4">Informations personnelles</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Nom complet</label>
                  <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className={inputCls} />
                  {profileErr.name && <p className={errCls}>{profileErr.name}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Email</label>
                  <input type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} className={inputCls} />
                  {profileErr.email && <p className={errCls}>{profileErr.email}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Téléphone</label>
                  <input value={profile.phone || ""} onChange={e => setProfile({ ...profile, phone: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Adresse</label>
                  <input value={profile.address || ""} onChange={e => setProfile({ ...profile, address: e.target.value })} className={inputCls} />
                </div>
              </div>
            </motion.div>

            {/* Infos entreprise */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white rounded-xl border border-[#E5E7EB] p-6"
            >
              <h2 className="text-base font-bold text-[#0D1B3E] mb-4">Informations entreprise</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Nom de l'entreprise</label>
                  <input value={profile.company_name || ""} onChange={e => setProfile({ ...profile, company_name: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">SIRET</label>
                  <input value={profile.siret || ""} onChange={e => setProfile({ ...profile, siret: e.target.value })} className={inputCls} />
                </div>
              </div>
            </motion.div>

            {/* Changer mot de passe */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="bg-white rounded-xl border border-[#E5E7EB] p-6"
            >
              <h2 className="text-base font-bold text-[#0D1B3E] mb-4">Changer le mot de passe</h2>

              {pwdOk && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg p-3 mb-4">
                  ✓ Mot de passe modifié avec succès
                </motion.div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Mot de passe actuel</label>
                  <input type="password" value={passwords.current} onChange={e => setPasswords({ ...passwords, current: e.target.value })} className={inputCls} />
                  {pwdError.current_password && <p className={errCls}>{pwdError.current_password}</p>}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Nouveau mot de passe</label>
                    <input type="password" value={passwords.newPwd} onChange={e => setPasswords({ ...passwords, newPwd: e.target.value })} className={inputCls} />
                    {pwdError.password && <p className={errCls}>{pwdError.password}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Confirmer</label>
                    <input type="password" value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} className={inputCls} />
                    {pwdError.confirm && <p className={errCls}>{pwdError.confirm}</p>}
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePasswordChange}
                  disabled={pwdLoading}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#0D1B3E] text-white font-bold text-sm hover:bg-[#0A1530] transition disabled:opacity-60"
                >
                  {pwdLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {pwdLoading ? "Modification..." : "Modifier le mot de passe"}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminProfil;