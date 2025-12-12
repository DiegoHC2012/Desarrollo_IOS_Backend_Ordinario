import api from './api';

export const studentsService = {
  getAll: async (institutionId) => {
    const response = await api.get(`/student/all/${institutionId}`);
    return response.data;
  },

  getOne: async (institutionId, studentId) => {
    const response = await api.get(`/student/${institutionId}/${studentId}`);
    return response.data;
  },

  create: async (institutionId, studentId, data) => {
    const response = await api.post(`/student/${institutionId}/${studentId}`, data);
    return response.data;
  },

  update: async (institutionId, studentId, data) => {
    const response = await api.put(`/student/${institutionId}/${studentId}`, data);
    return response.data;
  },

  delete: async (institutionId, studentId) => {
    const response = await api.delete(`/student/${institutionId}/${studentId}`);
    return response.data;
  }
};
