import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Layout from "../components/layout/Layout";
import api from "../lib/axios";
import SubServiceDetail from "./SubServiceDetail";
import ZonePage from "./ZonePage";

type SlugType = "sub-service" | "zone" | "not-found" | null;

const ServiceSubRoute = () => {
  const { serviceSlug, subSlug } = useParams<{ 
    serviceSlug: string; 
    subSlug: string 
  }>();
  
  const [slugType, setSlugType] = useState<SlugType>(null);

  useEffect(() => {
    if (!serviceSlug || !subSlug) return;

    // ← log pour confirmer les bons params
    console.log("resolve →", serviceSlug, subSlug);

    api
      .get<{ type: SlugType }>(`/services/${serviceSlug}/resolve/${subSlug}`)
      .then((res) => setSlugType(res.data.type))
      .catch(() => setSlugType("not-found"));
  }, [serviceSlug, subSlug]);

  if (slugType === null) return (
    <Layout>
      <div className="flex items-center justify-center py-40">
        <Loader2 className="w-8 h-8 animate-spin text-primary-accent" />
      </div>
    </Layout>
  );

  if (slugType === "not-found") return <Navigate to="/services" replace />;
  if (slugType === "sub-service") return <SubServiceDetail />;
  
  // ✅ ZonePage utilise useParams() directement
  // serviceSlug = "debarras", subSlug = "lyon-1" sont dans l'URL
  return <ZonePage />;
};

export default ServiceSubRoute;