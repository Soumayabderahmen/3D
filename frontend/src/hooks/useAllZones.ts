import { useEffect, useState } from "react";
import api from "../lib/axios";
import type { ZoneDetail } from "./useZoneDetail";

export function useAllZones() {
  const [arrondissements, setArrondissements] = useState<ZoneDetail[]>([]);
  const [villes, setVilles] = useState<ZoneDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<{ arrondissements: ZoneDetail[]; villes: ZoneDetail[] }>("/zones")
      .then((res) => {
        setArrondissements(res.data.arrondissements);
        setVilles(res.data.villes);
      })
      .catch(() => setError("Impossible de charger les zones."))
      .finally(() => setLoading(false));
  }, []);

  return { arrondissements, villes, loading, error };
}