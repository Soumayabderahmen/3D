import { useEffect, useState } from "react";
import api from "../lib/axios";

export type Service = {
   
        
       
  id: number;
  title: string;
  slug: string;
  emoji: string;
  badge:string;
  long_desc: string;
  short_desc: string;
  active: boolean;
  order: number;
  prestations: string[];
  color_hex: string;
  icon: string;
};

export function useServicesHome() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get<Service[]>("/services")
      .then(res => setServices(res.data))
      .catch(() => setError("Impossible de charger les services."))
      .finally(() => setLoading(false));
  }, []);

  return { services, loading, error };
}