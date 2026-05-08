import { useEffect, useState } from "react";
import api from "../lib/axios";

export type SubServiceDetail = {
  id: number;
  slug: string;
  title: string;
  icon: string;
  desc: string;
  long_desc: string;
  image: string | null;
  prestations: string[];
  sections: { title: string; text: string }[] | null;
  order: number;
  active: boolean;
  service: {
    id: number;
    slug: string;
    title: string;
  };
};

export function useSubServiceDetail(slug?: string) {
  const [subService, setSubService] = useState<SubServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    api
      .get<SubServiceDetail>(`/sub-services/${slug}`)
      .then((res) => setSubService(res.data))
      .catch(() => setError("Sous-service introuvable."))
      .finally(() => setLoading(false));
  }, [slug]);

  return { subService, loading, error };
}