import { useEffect, useState } from "react";
import api from "../lib/axios";

export type SubService = {
  id: number;
  service_id: number;
  slug: string;
  title: string;
  icon: string;
  desc: string;
  long_desc: string;
  image: string | null;
  prestations: string[];
  sections: any[];
  order: number;
  active: boolean;
};

export function useSubServices(serviceId?: number) {
  const [subServices, setSubServices] = useState<SubService[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!serviceId) return;

    setLoading(true);
    setError(null);

    api
      .get<SubService[]>("/sub-services", {
        params: { service_id: serviceId },
      })
      .then((res) => setSubServices(res.data))
      .catch(() => setError("Impossible de charger les sous-services."))
      .finally(() => setLoading(false));
  }, [serviceId]);

  return { subServices, loading, error };
}