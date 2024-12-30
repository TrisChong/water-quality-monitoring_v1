import axios from 'axios';
import { API_CONFIG } from '../../config/api';

// Create API client instance
export const apiClient = axios.create({
  ...API_CONFIG,
  withCredentials: false // Disable credentials for now
});

// Add request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add CORS headers
    config.headers['Access-Control-Allow-Origin'] = '*';
    
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject(new Error('Network error - please check your connection'));
    }
    
    // Handle specific error cases
    switch (error.response.status) {
      case 401:
        return Promise.reject(new Error('Invalid email or password'));
      case 403:
        return Promise.reject(new Error('Access denied'));
      case 404:
        return Promise.reject(new Error('Service not found'));
      default:
        return Promise.reject(error.response.data?.message || 'An error occurred');
    }
  }
);