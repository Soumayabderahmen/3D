import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AdminUser {
  email: string;
  name: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
};

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("admin_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (email: string, password: string) => {
    const admins = JSON.parse(localStorage.getItem("admin_accounts") || "[]");
    const found = admins.find((a: any) => a.email === email && a.password === password);
    if (found) {
      const u = { email: found.email, name: found.name };
      setUser(u);
      localStorage.setItem("admin_user", JSON.stringify(u));
      return true;
    }
    // Default admin
    if (email === "admin@3dservices.fr" && password === "admin123") {
      const u = { email, name: "Administrateur" };
      setUser(u);
      localStorage.setItem("admin_user", JSON.stringify(u));
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string) => {
    const admins = JSON.parse(localStorage.getItem("admin_accounts") || "[]");
    if (admins.find((a: any) => a.email === email)) return false;
    admins.push({ name, email, password });
    localStorage.setItem("admin_accounts", JSON.stringify(admins));
    const u = { email, name };
    setUser(u);
    localStorage.setItem("admin_user", JSON.stringify(u));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("admin_user");
  };

  return (
    <AdminAuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
