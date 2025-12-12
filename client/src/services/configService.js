import api from './api';

export const configService = {
  get: async (institutionId) => {
    const response = await api.get(`/whitelabel/${institutionId}`);
    return response.data;
  },

  create: async (institutionId, data) => {
    const response = await api.post(`/whitelabel/${institutionId}`, data);
    return response.data;
  },

  update: async (institutionId, data) => {
    const response = await api.put(`/whitelabel/${institutionId}`, data);
    return response.data;
  }
};