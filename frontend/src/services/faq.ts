// src/services/faq.ts
import api from '../lib/axios';
import type { FAQItem } from '../pages/admin/AdminFAQ';

type FAQPayload = Omit<FAQItem, 'id'>;

export const faqApi = {
  getAll: async (): Promise<FAQItem[]> => {
    const res = await api.get('/faqs');
    return res.data;
  },
  create: async (payload: FAQPayload): Promise<FAQItem> => {
    const res = await api.post('/faqs', payload);
    return res.data;
  },
  update: async (id: number, payload: Partial<FAQPayload>): Promise<FAQItem> => {
    const res = await api.put(`/faqs/${id}`, payload);
    return res.data;
  },
  toggle: async (id: number): Promise<FAQItem> => {
    const res = await api.patch(`/faqs/${id}/toggle`);
    return res.data;
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/faqs/${id}`);
  },
  reorder: async (ids: number[]): Promise<void> => {
    await api.post('/faqs/reorder', { ids });
  },
};