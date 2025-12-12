import api from './api';

export const announcementsService = {
  getAll: async (institutionId) => {
    const response = await api.get(`/announcements/${institutionId}`);
    return response.data;
  },

  getOne: async (institutionId, announcementId) => {
    const response = await api.get(`/announcements/${institutionId}/${announcementId}`);
    return response.data;
  },

  create: async (institutionId, data) => {
    const response = await api.post(`/announcements/${institutionId}`, data);
    return response.data;
  },

  update: async (institutionId, announcementId, data) => {
    const response = await api.put(`/announcements/${institutionId}/${announcementId}`, data);
    return response.data;
  },

  delete: async (institutionId, announcementId) => {
    const response = await api.delete(`/announcements/${institutionId}/${announcementId}`);
    return response.data;
  }
};
