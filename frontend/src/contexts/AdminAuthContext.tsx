import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import api from "../lib/axios";

interface AdminUser {
  id: number;
  email: string;
  name: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
};

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user,    setUser]    = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Vérifie le token au chargement
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      setLoading(false);
      return;
    }
    // Injecte le token et récupère l'utilisateur
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    api.get("/user")
      .then(({ data }) => setUser(data.user))
      .catch(() => {
        localStorage.removeItem("admin_token");
        delete api.defaults.headers.common["Authorization"];
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    // Plus besoin de csrf-cookie avec l'Option B
    const { data } = await api.post("/login", { email, password });
    
    // Stocke le token
    localStorage.setItem("admin_token", data.token);
    
    // Injecte le token dans axios pour les prochaines requêtes
    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    
    setUser(data.user);
  };

  const logout = async () => {
    await api.post("/api/logout");
    localStorage.removeItem("admin_token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AdminAuthContext.Provider>
  );
};