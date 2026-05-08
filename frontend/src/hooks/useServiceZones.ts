import { useEffect, useState } from "react";
import api from "../lib/axios";

export type Zone = {
  id: number;
  type: "arrondissement" | "ville";
  slug: string;
  nom: string;
  num: number | null;
  dep: string;
  dist_km: number;
  quartiers: string[];
};

export type ServiceZones = {
  service: string;
  arrondissements: Zone[];
  villes: Zone[];
};

export function useServiceZones(serviceSlug?: string) {
  const [data, setData] = useState<ServiceZones | null>(null);
  const [loading, setLoading] = useState(false); // ← false par défaut
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!serviceSlug) return; // ← loading reste false, pas de blocage

    setLoading(true);
    setError(null);

    api
      .get<ServiceZones>(`/services/${serviceSlug}/zones`)
      .then((res) => setData(res.data))
      .catch(() => setError("Impossible de charger les zones."))
      .finally(() => setLoading(false));
  }, [serviceSlug]);

  return {
    arrondissements: data?.arrondissements ?? [],
    villes: data?.villes ?? [],
    loading,
    error,
  };
}