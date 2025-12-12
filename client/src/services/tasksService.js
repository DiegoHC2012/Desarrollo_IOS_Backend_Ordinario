import api from './api';

export const tasksService = {
  getAll: async (institutionId, studentId) => {
    const response = await api.get(`/tasks/${institutionId}/${studentId}`);
    return response.data;
  },

  getOne: async (institutionId, studentId, taskId) => {
    const response = await api.get(`/tasks/${institutionId}/${studentId}/${taskId}`);
    return response.data;
  },

  create: async (institutionId, studentId, data) => {
    const response = await api.post(`/tasks/${institutionId}/${studentId}`, data);
    return response.data;
  },

  update: async (institutionId, studentId, taskId, data) => {
    const response = await api.put(`/tasks/${institutionId}/${studentId}/${taskId}`, data);
    return response.data;
  },

  delete: async (institutionId, studentId, taskId) => {
    const response = await api.delete(`/tasks/${institutionId}/${studentId}/${taskId}`);
    return response.data;
  }
};
