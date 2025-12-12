import api from './api';

export const gradesService = {
  getAll: async (institutionId, studentId, subjectId) => {
    const response = await api.get(`/grades/${institutionId}/${studentId}/${subjectId}`);
    return response.data;
  },

  getOne: async (institutionId, studentId, subjectId, gradeId) => {
    const response = await api.get(`/grades/${institutionId}/${studentId}/${subjectId}/${gradeId}`);
    return response.data;
  },

  create: async (institutionId, studentId, subjectId, data) => {
    const response = await api.post(`/grades/${institutionId}/${studentId}/${subjectId}`, data);
    return response.data;
  },

  update: async (institutionId, studentId, subjectId, gradeId, data) => {
    const response = await api.put(`/grades/${institutionId}/${studentId}/${subjectId}/${gradeId}`, data);
    return response.data;
  },

  delete: async (institutionId, studentId, subjectId, gradeId) => {
    const response = await api.delete(`/grades/${institutionId}/${studentId}/${subjectId}/${gradeId}`);
    return response.data;
  }
};
