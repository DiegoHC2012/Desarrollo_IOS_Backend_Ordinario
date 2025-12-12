import api from './api';

export const subjectsService = {
  getAll: async (institutionId, studentId) => {
    const response = await api.get(`/subjects/${institutionId}/${studentId}`);
    return response.data;
  },

  getOne: async (institutionId, studentId, subjectId) => {
    const response = await api.get(`/subjects/${institutionId}/${studentId}/${subjectId}`);
    return response.data;
  },

  create: async (institutionId, studentId, data) => {
    const response = await api.post(`/subjects/${institutionId}/${studentId}`, data);
    return response.data;
  },

  update: async (institutionId, studentId, subjectId, data) => {
    const response = await api.put(`/subjects/${institutionId}/${studentId}/${subjectId}`, data);
    return response.data;
  },

  delete: async (institutionId, studentId, subjectId) => {
    const response = await api.delete(`/subjects/${institutionId}/${studentId}/${subjectId}`);
    return response.data;
  }
};
