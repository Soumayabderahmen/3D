import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "./components/ui/sonner";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import Layout from "./components/layout/Layout";

import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import SubServiceDetail from "./pages/SubServiceDetail";
import ServiceSubRoute from "./pages/ServiceSubRoute";
import ZoneServiceDetail from "./pages/ZoneServiceDetail";
import ZonesIntervention from "./pages/ZonesIntervention";
import About from "./pages/About";
import Devis from "./pages/Devis";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import Actualites from "./pages/Actualites";
import ActualiteDetail from "./pages/ActualiteDetail";
import Tarifs from "./pages/Tarifs";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import NotFound from "./pages/NotFound";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminServices from "./pages/admin/AdminServices";
import AdminActualites from "./pages/admin/AdminActualites";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminChatbot from "./pages/admin/AdminChatbot";
import AdminTarifs from "./pages/admin/AdminTarifs";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminFAQ from "./pages/admin/AdminFAQ";
import AdminDevis from "./pages/admin/AdminDevis";
import AdminProfil from "./pages/admin/AdminProfil";
import AdminSubServices from "./pages/admin/AdminSubServices";
import AdminSEO from "./pages/admin/AdminSEO";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AdminAuthProvider>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/tarifs" element={<Layout><Tarifs /></Layout>} />
              <Route path="/services-debarras" element={<Navigate to="/services" replace />} />
              <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
              <Route path="/services/:serviceSlug/:subSlug" element={<ServiceSubRoute />} />
              <Route path="/services/:serviceSlug/:zoneSlug/:subServiceSlug" element={<ZoneServiceDetail />} />
              <Route path="/zones-intervention" element={<ZonesIntervention />} />
              <Route path="/qui-sommes-nous" element={<About />} />
              <Route path="/devis" element={<Devis />} />
              <Route path="/avis" element={<Reviews />} />
              <Route path="/avis-clients" element={<Navigate to="/avis" replace />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/actualites" element={<Actualites />} />
              <Route path="/actualites/:id" element={<ActualiteDetail />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/politique-de-confidentialite" element={<PolitiqueConfidentialite />} />
              {/* Admin */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/register" element={<AdminRegister />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/services" element={<AdminServices />} />
              <Route path="/admin/sous-services" element={<AdminSubServices />} />
              <Route path="/admin/actualites" element={<AdminActualites />} />
              <Route path="/admin/messages" element={<AdminMessages />} />
              <Route path="/admin/chatbot" element={<AdminChatbot />} />
              <Route path="/admin/tarifs" element={<AdminTarifs />} />
              <Route path="/admin/categories" element={<AdminCategories />} />
              <Route path="/admin/faq" element={<AdminFAQ />} />
              <Route path="/admin/devis" element={<AdminDevis />} />
              <Route path="/admin/profil" element={<AdminProfil />} />
              <Route path="/admin/seo" element={<AdminSEO />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AdminAuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
