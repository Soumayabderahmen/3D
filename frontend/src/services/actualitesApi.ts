import api from "../lib/axios";
import type { Actualite, ActualiteFormData, PaginatedActualites } from "../types/actualites";

export const actualitesApi = {
  list: (params?: { page?: number; service_id?: number; search?: string; published?: boolean }) =>
    api.get<PaginatedActualites>("/admin/actualites", { params }).then(r => r.data),

  get: (id: number) =>
    api.get<Actualite>(`/admin/actualites/${id}`).then(r => r.data),

  create: (data: ActualiteFormData) =>
    api.post<Actualite>("/admin/actualites", data).then(r => r.data),

  update: (id: number, data: Partial<ActualiteFormData>) =>
    api.put<Actualite>(`/admin/actualites/${id}`, data).then(r => r.data),

  delete: (id: number) =>
    api.delete(`/admin/actualites/${id}`).then(r => r.data),

  toggle: (id: number) =>
    api.patch<{ published: boolean }>(`/admin/actualites/${id}/toggle`).then(r => r.data),

  uploadImage: (file: File): Promise<string> => {
    const form = new FormData();
    form.append("image", file);
    return api.post<{ url: string }>("/admin/actualites/upload-image", form, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then(r => r.data.url);
  },
};