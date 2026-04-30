import { useEffect, useState } from "react";
import api from "../lib/axios";

export type Service = {
  id: number;
  title: string;
  slug: string;
  emoji: string;
  description: string;
  active: boolean;
  order: number;
};

export function useServices() {
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