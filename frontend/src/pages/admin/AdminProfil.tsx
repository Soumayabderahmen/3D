import { useState } from "react";
import { motion } from "framer-motion";
import { User, Save, Camera, Mail, Phone, MapPin, Shield } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

interface Profile {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  role: string;
  companyName: string;
  siret: string;
}

const AdminProfil = () => {
  const { user } = useAdminAuth();
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState<Profile>(() => {
    const s = localStorage.getItem("admin_profile");
    return s ? JSON.parse(s) : {
      name: "Administrateur",
      email: user?.email || "admin@3dservices.fr",
      phone: "06 09 99 17 36",
      address: "Paris, Île-de-France",
      avatar: "",
      role: "Super Admin",
      companyName: "3D Services",
      siret: "123 456 789 00012",
    };
  });

  const [passwords, setPasswords] = useState({ current: "", newPwd: "", confirm: "" });

  const handleSave = () => {
    localStorage.setItem("admin_profile", JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePasswordChange = () => {
    if (passwords.newPwd !== passwords.confirm) return alert("Les mots de passe ne correspondent pas");
    if (passwords.newPwd.length < 6) return alert("Le mot de passe doit faire au moins 6 caractères");
    // In a real app, this would call an API
    setPasswords({ current: "", newPwd: "", confirm: "" });
    alert("Mot de passe modifié avec succès");
  };

  const inputCls = "w-full px-3 py-2.5 border border-[#E5E7EB] rounded-lg text-sm focus:ring-2 focus:ring-[#1A56DB]/30 focus:border-[#1A56DB] outline-none";

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#0D1B3E]">Mon Profil</h1>
            <p className="text-sm text-[#888]">Gérez vos informations personnelles</p>
          </div>
          <motion.button whileTap={{ scale: 0.98 }} onClick={handleSave} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-bold transition ${saved ? "bg-[#16A34A]" : "bg-[#1A56DB] hover:bg-[#1347BE]"}`}>
            <Save className="w-4 h-4" /> {saved ? "Enregistré ✓" : "Enregistrer"}
          </motion.button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Avatar & Role card */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl border border-[#E5E7EB] p-6 text-center">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full bg-[#EEF2FF] flex items-center justify-center text-4xl mx-auto border-4 border-white shadow-lg">
                  {profile.avatar ? <img src={profile.avatar} alt="" className="w-full h-full rounded-full object-cover" /> : <User className="w-10 h-10 text-[#1A56DB]" />}
                </div>
                <label className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#1A56DB] flex items-center justify-center cursor-pointer hover:bg-[#1347BE] transition shadow-lg">
                  <Camera className="w-4 h-4 text-white" />
                  <input type="text" className="hidden" />
                </label>
              </div>
              <h3 className="font-bold text-[#0D1B3E]">{profile.name}</h3>
              <span className="inline-flex items-center gap-1 mt-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#EEF2FF] text-[#1A56DB]"><Shield className="w-3 h-3" /> {profile.role}</span>
              <div className="mt-4 space-y-2 text-left">
                <p className="text-xs text-[#888] flex items-center gap-2"><Mail className="w-3 h-3" /> {profile.email}</p>
                <p className="text-xs text-[#888] flex items-center gap-2"><Phone className="w-3 h-3" /> {profile.phone}</p>
                <p className="text-xs text-[#888] flex items-center gap-2"><MapPin className="w-3 h-3" /> {profile.address}</p>
              </div>
            </motion.div>
          </div>

          {/* Forms */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-xl border border-[#E5E7EB] p-6">
              <h2 className="text-base font-bold text-[#0D1B3E] mb-4">Informations personnelles</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Nom complet</label>
                  <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Email</label>
                  <input type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Téléphone</label>
                  <input value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Adresse</label>
                  <input value={profile.address} onChange={e => setProfile({ ...profile, address: e.target.value })} className={inputCls} />
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl border border-[#E5E7EB] p-6">
              <h2 className="text-base font-bold text-[#0D1B3E] mb-4">Informations entreprise</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Nom de l'entreprise</label>
                  <input value={profile.companyName} onChange={e => setProfile({ ...profile, companyName: e.target.value })} className={inputCls} />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">SIRET</label>
                  <input value={profile.siret} onChange={e => setProfile({ ...profile, siret: e.target.value })} className={inputCls} />
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white rounded-xl border border-[#E5E7EB] p-6">
              <h2 className="text-base font-bold text-[#0D1B3E] mb-4">Changer le mot de passe</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Mot de passe actuel</label>
                  <input type="password" value={passwords.current} onChange={e => setPasswords({ ...passwords, current: e.target.value })} className={inputCls} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Nouveau mot de passe</label>
                    <input type="password" value={passwords.newPwd} onChange={e => setPasswords({ ...passwords, newPwd: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Confirmer</label>
                    <input type="password" value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} className={inputCls} />
                  </div>
                </div>
                <motion.button whileTap={{ scale: 0.98 }} onClick={handlePasswordChange} className="px-6 py-2.5 rounded-lg bg-[#0D1B3E] text-white font-bold text-sm hover:bg-[#0A1530] transition">
                  Modifier le mot de passe
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
