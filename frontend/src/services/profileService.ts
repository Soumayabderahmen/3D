import api from '../lib/axios';
import type { UpdateProfilePayload, UpdatePasswordPayload } from '../types/profile';

export const profileService = {
  getProfile: async () => {
    const { data } = await api.get('/profile');
    return data.user;
  },

  updateProfile: async (payload: UpdateProfilePayload) => {
    const { data } = await api.put('/profile', payload);
    return data.user;
  },

  updateAvatar: async (file: File) => {
    const form = new FormData();
    form.append('avatar', file);
    const { data } = await api.post('/profile/avatar', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.avatar_url;
  },

  updatePassword: async (payload: UpdatePasswordPayload) => {
    const { data } = await api.put('/profile/password', payload);
    return data.message;
  },
};