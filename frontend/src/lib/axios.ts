// src/lib/axios.ts
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL ?? '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// ✅ Interceptor pour ajouter automatiquement le token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    // Méthode compatible Axios 1.x
    if (config.headers) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      } as any; // ⚠️ cast nécessaire
    }
  }
  return config;
});

export default api;
