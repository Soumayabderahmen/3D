// src/services/chatbotConfigService.ts
import api from '../lib/axios';

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
export interface Suggestion {
  text: string;
  response: string;
}

export interface ChatbotConfig {
  id?: number;
  welcome_message: string;
  system_prompt: string;
  proactive_delay: number;
  proactive_message: string;
  suggestions: Suggestion[];
  max_messages: number;
  enabled: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  message: string;
  data: T | null;
}

// ─────────────────────────────────────────────────────────────
// GET /api/chatbot-config
// Récupère la configuration active (première ligne)
// ─────────────────────────────────────────────────────────────
export const getConfig = async (): Promise<ApiResponse<ChatbotConfig>> => {
  const res = await api.get<ApiResponse<ChatbotConfig>>('/chatbot-config');
  return res.data;
};

// ─────────────────────────────────────────────────────────────
// GET /api/chatbot-config/:id
// ─────────────────────────────────────────────────────────────
export const getConfigById = async (id: number): Promise<ApiResponse<ChatbotConfig>> => {
  const res = await api.get<ApiResponse<ChatbotConfig>>(`/chatbot-config/${id}`);
  return res.data;
};

// ─────────────────────────────────────────────────────────────
// POST /api/chatbot-config
// Crée la configuration pour la première fois
// ─────────────────────────────────────────────────────────────
export const createConfig = async (
  payload: Omit<ChatbotConfig, 'id' | 'created_at' | 'updated_at'>
): Promise<ApiResponse<ChatbotConfig>> => {
  const res = await api.post<ApiResponse<ChatbotConfig>>('/chatbot-config', payload);
  return res.data;
};

// ─────────────────────────────────────────────────────────────
// PUT /api/chatbot-config/:id
// Met à jour la configuration complète
// ─────────────────────────────────────────────────────────────
export const updateConfig = async (
  id: number,
  payload: Omit<ChatbotConfig, 'id' | 'created_at' | 'updated_at'>
): Promise<ApiResponse<ChatbotConfig>> => {
  const res = await api.put<ApiResponse<ChatbotConfig>>(`/chatbot-config/${id}`, payload);
  return res.data;
};

// ─────────────────────────────────────────────────────────────
// PATCH /api/chatbot-config/:id/toggle
// Active / désactive le chatbot sans toucher aux autres champs
// ─────────────────────────────────────────────────────────────
export const toggleConfig = async (id: number): Promise<ApiResponse<ChatbotConfig>> => {
  const res = await api.patch<ApiResponse<ChatbotConfig>>(`/chatbot-config/${id}/toggle`);
  return res.data;
};

// ─────────────────────────────────────────────────────────────
// DELETE /api/chatbot-config/:id
// ─────────────────────────────────────────────────────────────
export const deleteConfig = async (id: number): Promise<ApiResponse<null>> => {
  const res = await api.delete<ApiResponse<null>>(`/chatbot-config/${id}`);
  return res.data;
};

// ─────────────────────────────────────────────────────────────
// Helper : upsert (crée si inexistant, met à jour sinon)
// ─────────────────────────────────────────────────────────────
export const upsertConfig = async (
  config: ChatbotConfig
): Promise<ApiResponse<ChatbotConfig>> => {
  if (config.id) {
    return updateConfig(config.id, config);
  }
  return createConfig(config);
};