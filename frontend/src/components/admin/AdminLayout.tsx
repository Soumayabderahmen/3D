import {  useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/admin/login");
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex bg-[#F9FAFB]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8 max-w-[1200px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
