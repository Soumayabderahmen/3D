// src/hooks/useDevis.ts
import { useState, useEffect, useCallback } from 'react';
import {
  getDevis,
  updateStatut,
  deleteDevis,

} from '../services/Devisservice';
import type {   Devis,
  DevisStatut,
  PaginatedDevis, } from '../services/Devisservice';
export const useDevis = () => {
  const [devis, setDevis]         = useState<Devis[]>([]);
  const [pagination, setPagination] = useState<Omit<PaginatedDevis, 'data'> | null>(null);
  const [page, setPage]           = useState(1);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);

  // ── Charger la page courante ──────────────────────────────
  const fetchDevis = useCallback(async (p = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getDevis(p);
      const { data, ...meta } = res;
      setDevis(data);
      setPagination(meta);
      setPage(p);
    } catch (err) {
      setError('Impossible de charger les devis.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDevis(1);
  }, [fetchDevis]);

  // ── Changer le statut ──────────────────────────────────────
  const handleStatutChange = async (id: number, statut: DevisStatut) => {
    // Optimistic update
    setDevis(prev => prev.map(d => d.id === id ? { ...d, statut } : d));
    try {
      await updateStatut(id, statut);
    } catch (err) {
      // Rollback si erreur
      fetchDevis(page);
      setError('Erreur lors du changement de statut.');
      console.error(err);
    }
  };

  // ── Supprimer ─────────────────────────────────────────────
  const handleDelete = async (id: number) => {
    setDevis(prev => prev.filter(d => d.id !== id));
    try {
      await deleteDevis(id);
    } catch (err) {
      fetchDevis(page);
      setError('Erreur lors de la suppression.');
      console.error(err);
    }
  };

  return {
    devis,
    pagination,
    page,
    loading,
    error,
    fetchDevis,
    handleStatutChange,
    handleDelete,
  };
};