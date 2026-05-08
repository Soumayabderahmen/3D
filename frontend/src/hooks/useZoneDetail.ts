import { useEffect, useState } from "react";
import api from "../lib/axios";

export type ZoneDetail = {
  id: number;
  type: "arrondissement" | "ville";
  slug: string;
  nom: string;
  num: number | null;
  dep: string;
  dist_km: number;
  quartiers: string[];
};

export function useZoneDetail(serviceSlug?: string, zoneSlug?: string) {
  const [zone, setZone] = useState<ZoneDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!serviceSlug || !zoneSlug) return;

    setLoading(true);
    setError(null);

    api
      .get<ZoneDetail>(`/services/${serviceSlug}/zones/${zoneSlug}`)
      .then((res) => setZone(res.data))
      .catch(() => setError("Zone introuvable."))
      .finally(() => setLoading(false));
  }, [serviceSlug, zoneSlug]);

  return { zone, loading, error };
}