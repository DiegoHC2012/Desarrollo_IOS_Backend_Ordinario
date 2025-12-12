import api from './api';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      // Cambiar la condición para que coincida con la respuesta del backend
      if (response.data.status === 200 && response.data.data) {
        const { token, user, student } = response.data.data;
        localStorage.setItem('token', token);
        localStorage. setItem('user', JSON.stringify(user));
        // Opcional: guardar también los datos del estudiante
        if (student) {
          localStorage.setItem('institutionId', student.institutionId);
          localStorage.setItem('studentId', student.id);
        }
        return { token, user };
      }
      throw new Error('Login failed');
    } catch (error) {
      throw error;
    }
  },

  register: async (email, password, name) => {
    try {
      const response = await api. post('/auth/register', { email, password, name });
      // Mismo cambio aquí
      if (response.data.status === 200 && response.data.data) {
        const { token, user, student } = response.data.data;
        localStorage.setItem('token', token);
        localStorage. setItem('user', JSON.stringify(user));
        if (student) {
          localStorage. setItem('institutionId', student.institutionId);
          localStorage.setItem('studentId', student.id);
        }
        return { token, user };
      }
      throw new Error('Registration failed');
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};
