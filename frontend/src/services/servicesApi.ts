// src/api/servicesApi.ts
import api from "../lib/axios";
import type { ServiceConfig, SubServiceConfig, ServiceFormData, SubServiceFormData } from "../types/services";

// ── Services ──────────────────────────────────────────────────────

export const servicesApi = {
  list: () =>
    api.get<ServiceConfig[]>("/admin/services").then(r => r.data),

  get: (id: number) =>
    api.get<ServiceConfig>(`/admin/services/${id}`).then(r => r.data),

  create: (data: ServiceFormData) =>
    api.post<ServiceConfig>("/admin/services", data).then(r => r.data),

  update: (id: number, data: Partial<ServiceFormData>) =>
    api.put<ServiceConfig>(`/admin/services/${id}`, data).then(r => r.data),

  delete: (id: number) =>
    api.delete(`/admin/services/${id}`).then(r => r.data),

  reorder: (ids: number[]) =>
    api.patch("/admin/services/reorder", { ids }).then(r => r.data),
};

// ── Sub-services ──────────────────────────────────────────────────

export const subServicesApi = {
  list: (serviceId?: number) =>
    api.get<SubServiceConfig[]>("/admin/sub-services", {
      params: serviceId ? { service_id: serviceId } : undefined,
    }).then(r => r.data),

  get: (id: number) =>
    api.get<SubServiceConfig>(`/admin/sub-services/${id}`).then(r => r.data),

  create: (data: SubServiceFormData) =>
    api.post<SubServiceConfig>("/admin/sub-services", data).then(r => r.data),

  update: (id: number, data: Partial<SubServiceFormData>) =>
    api.put<SubServiceConfig>(`/admin/sub-services/${id}`, data).then(r => r.data),

  delete: (id: number) =>
    api.delete(`/admin/sub-services/${id}`).then(r => r.data),

  toggle: (id: number) =>
    api.patch<{ active: boolean }>(`/admin/sub-services/${id}/toggle`).then(r => r.data),

  reorder: (ids: number[]) =>
    api.patch("/admin/sub-services/reorder", { ids }).then(r => r.data),

  uploadImage: (file: File) => {
    const form = new FormData();
    form.append("image", file);
    return api.post<{ url: string }>("/admin/sub-services/upload-image", form, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then(r => r.data.url);
  },
};