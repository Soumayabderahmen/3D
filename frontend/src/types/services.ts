// src/types/services.ts

export interface ServiceConfig {
  id: number;
  slug: string;
  title: string;
  icon: string;
  color_hex: string;
  color: string | null;
  badge: string | null;
  short_desc: string | null;
  long_desc: string | null;
  prestations: string[];
  order: number;
  active: boolean;
  sub_services_count?: number;
  sub_services?: SubServiceConfig[];
}

export interface SubServiceConfig {
  id: number;
  service_id: number;
  slug: string;
  title: string;
  icon: string;
  desc: string | null;
  long_desc: string | null;
  image: string | null;
  prestations: string[];
  sections: { title: string; text: string }[];
  order: number;
  active: boolean;
  service?: Pick<ServiceConfig, 'id' | 'slug' | 'title' | 'color_hex'>;
}

export type ServiceFormData = Omit<ServiceConfig, 'id' | 'sub_services_count' | 'sub_services'>;
export type SubServiceFormData = Omit<SubServiceConfig, 'id' | 'service'>;