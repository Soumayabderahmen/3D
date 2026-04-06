export interface AdminProfile {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  avatar: string | null;
  avatar_url: string | null;
  role: string;
  company_name: string | null;
  siret: string | null;
}

export interface UpdateProfilePayload {
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  company_name: string;
  siret: string;
}

export interface UpdatePasswordPayload {
  current_password: string;
  password: string;
  password_confirmation: string;
}