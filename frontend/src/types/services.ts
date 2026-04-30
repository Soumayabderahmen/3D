// src/types/services.ts
import { useEffect, useState } from "react";
import api from "../lib/axios";
export interface ServiceConfig {
  id: number;
  slug: string;
  title: string;
  icon: string;
  color_hex: string;
  color: string | null;
  badge: string | null;
  short_desc: string | null;
  long_desc: string | null;
  prestations: string[];
  order: number;
  active: boolean;
  sub_services_count?: number;
  sub_services?: SubServiceConfig[];
}

export interface SubServiceConfig {
  id: number;
  service_id: number;
  slug: string;
  title: string;
  icon: string;
  desc: string | null;
  long_desc: string | null;
  image: string | null;
  prestations: string[];
  sections: { title: string; text: string }[];
  order: number;
  active: boolean;
  service?: Pick<ServiceConfig, 'id' | 'slug' | 'title' | 'color_hex'>;
}

export type ServiceFormData = Omit<ServiceConfig, 'id' | 'sub_services_count' | 'sub_services'>;
export type SubServiceFormData = Omit<SubServiceConfig, 'id' | 'service'>;export function useServiceConfig() {
  const [services, setServices] = useState<ServiceConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get<ServiceConfig[]>("/services")
      .then(res => setServices(res.data))
      .catch(() => setError("Impossible de charger les services."))
      .finally(() => setLoading(false));
  }, []);

  return { services, loading, error };
}