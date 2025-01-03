import axios from 'axios';
import { API_CONFIG } from '../../config/api';

const api = axios.create(API_CONFIG);

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject(new Error('Network error - please check your connection'));
    }
    
    // Handle specific error cases
    switch (error.response.status) {
      case 401:
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        window.location.href = '/login';
        return Promise.reject(new Error('Session expired. Please login again.'));
      case 403:
        return Promise.reject(new Error('Access denied'));
      default:
        return Promise.reject(error.response.data?.message || 'An error occurred');
    }
  }
);

export default api;