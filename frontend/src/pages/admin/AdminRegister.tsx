import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

const AdminRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) { setError("Le mot de passe doit contenir au moins 6 caractères"); return; }
    if (register(name, email, password)) {
      navigate("/admin");
    } else {
      setError("Un compte avec cet email existe déjà");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] relative overflow-hidden">
      <motion.div className="absolute top-[-100px] left-[-100px] w-[350px] h-[350px] rounded-full bg-[#D97706]/5" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 18, repeat: Infinity }} />
      <motion.div className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] rounded-full bg-[#1A56DB]/5" animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 14, repeat: Infinity }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-xl border border-[#E5E7EB] p-8">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className="w-16 h-16 rounded-2xl bg-[#16A34A] flex items-center justify-center mx-auto mb-6">
            <UserPlus className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-2xl font-extrabold text-[#0D1B3E] text-center mb-1">Créer un compte</h1>
          <p className="text-sm text-[#374151] text-center mb-8">Inscription administrateur</p>

          {error && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3 mb-4">
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Nom complet</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]/30 focus:border-[#16A34A] transition" placeholder="Votre nom" required />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]/30 focus:border-[#16A34A] transition" placeholder="admin@3dservices.fr" required />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] mb-1 block">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888]" />
                <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-10 py-3 rounded-lg border border-[#E5E7EB] text-sm focus:outline-none focus:ring-2 focus:ring-[#16A34A]/30 focus:border-[#16A34A] transition" placeholder="Min. 6 caractères" required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#374151]">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full py-3 rounded-lg bg-[#16A34A] text-white font-bold text-sm hover:bg-[#15803D] transition shadow-lg shadow-[#16A34A]/20">
              Créer mon compte
            </motion.button>
          </form>

          <p className="text-center text-sm text-[#888] mt-6">
            Déjà un compte ?{" "}
            <Link to="/admin/login" className="text-[#1A56DB] font-semibold hover:underline">Se connecter</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminRegister;
