import type { ServiceConfig } from "./services";

export interface Actualite {
  id: number;
  title: string;
  service_id: number;
  service?: ServiceConfig;       // relation eager-loaded
  date: string;
  location: string | null;
  description: string | null;
  image_before: string | null;
  image_after: string | null;
  published: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export type ActualiteFormData = Omit<Actualite, 'id' | 'created_at' | 'updated_at' | 'service'>;

export interface PaginatedActualites {
  data: Actualite[];
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}