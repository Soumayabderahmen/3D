import { useState, useCallback } from "react";
import { SERVICES } from "../data/services";
import type { SubService } from "../data/services";
const STORAGE_KEY = "admin_services_data";

export type AdminSubService = SubService & {
  id: string;
  parentSlug: string;
  active: boolean;
  order: number;
};

export type AdminServiceData = {
  subServices: AdminSubService[];
};

function getDefaultSubServices(): AdminSubService[] {
  const result: AdminSubService[] = [];
  SERVICES.forEach((service) => {
    service.subServices?.forEach((sub, i) => {
      result.push({
        ...sub,
        id: `${service.slug}-${sub.slug}`,
        parentSlug: service.slug,
        active: true,
        order: i,
      });
    });
  });
  return result;
}

function loadData(): AdminSubService[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return getDefaultSubServices();
}

function saveData(data: AdminSubService[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useServicesData() {
  const [subServices, setSubServices] = useState<AdminSubService[]>(loadData);

  const update = useCallback((newData: AdminSubService[]) => {
    setSubServices(newData);
    saveData(newData);
  }, []);

  const addSubService = useCallback((sub: Omit<AdminSubService, "id" | "order">) => {
    const newSub: AdminSubService = {
      ...sub,
      id: `${sub.parentSlug}-${sub.slug}-${Date.now()}`,
      order: subServices.filter(s => s.parentSlug === sub.parentSlug).length,
    };
    update([...subServices, newSub]);
  }, [subServices, update]);

  const updateSubService = useCallback((id: string, data: Partial<AdminSubService>) => {
    update(subServices.map(s => s.id === id ? { ...s, ...data } : s));
  }, [subServices, update]);

  const deleteSubService = useCallback((id: string) => {
    update(subServices.filter(s => s.id !== id));
  }, [subServices, update]);

  const getByParent = useCallback((parentSlug: string) => {
    return subServices
      .filter(s => s.parentSlug === parentSlug)
      .sort((a, b) => a.order - b.order);
  }, [subServices]);

  const resetToDefaults = useCallback(() => {
    const defaults = getDefaultSubServices();
    update(defaults);
  }, [update]);

  return { subServices, addSubService, updateSubService, deleteSubService, getByParent, resetToDefaults };
}

// Static version for frontend pages (non-hook)
export function getStoredSubServices(parentSlug: string): SubService[] {
  const data = loadData();
  return data
    .filter(s => s.parentSlug === parentSlug && s.active)
    .sort((a, b) => a.order - b.order)
    .map(({ id, parentSlug: _p, active: _a, order: _o, ...rest }) => rest);
}
