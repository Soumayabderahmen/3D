// src/services/devisService.ts
import api from '../lib/axios';

// ─────────────────────────────────────────────────────────────
// Types alignés sur le modèle Laravel
// ─────────────────────────────────────────────────────────────
export type DevisStatut = 'nouveau' | 'en_cours' | 'traite' | 'annule';

export interface Devis {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  tel: string;
  service: string;
  place: string;
  volume?: string | null;
  departement: string;
  date_souhaitee: string;
  urgent: boolean;
  adresse: string;
  message: string;
  statut: DevisStatut;
  prix_estime?: string | null;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

// Réponse paginée Laravel (paginate(20))
export interface PaginatedDevis {
  data: Devis[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

// ─────────────────────────────────────────────────────────────
// GET /api/devis?page=N
// ─────────────────────────────────────────────────────────────
export const getDevis = async (page = 1): Promise<PaginatedDevis> => {
  const res = await api.get<PaginatedDevis>(`/admin/devis?page=${page}`);
  return res.data;
};

// ─────────────────────────────────────────────────────────────
// GET /api/devis/:id
// ─────────────────────────────────────────────────────────────
export const getDevisById = async (id: number): Promise<Devis> => {
  const res = await api.get<Devis>(`/admin/devis/${id}`);
  return res.data;
};

// ─────────────────────────────────────────────────────────────
// PATCH /api/devis/:id/statut
// ─────────────────────────────────────────────────────────────
export const updateStatut = async (id: number, statut: DevisStatut): Promise<void> => {
  await api.patch(`/admin/devis/${id}/statut`, { statut });
};

// ─────────────────────────────────────────────────────────────
// DELETE /api/devis/:id
// ─────────────────────────────────────────────────────────────
export const deleteDevis = async (id: number): Promise<void> => {
  await api.delete(`/admin/devis/${id}`);
};