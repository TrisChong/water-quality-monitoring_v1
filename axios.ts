import axios from 'axios';
import { API_ENDPOINTS, API_CONFIG } from '../../config/api';
import { getToken } from '../storage/auth';

const api = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  ...API_CONFIG,
  // Remove withCredentials as it's causing CORS issues
  withCredentials: false
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Request made but no response
      return Promise.reject({ message: 'Network error - please check your connection' });
    } else {
      // Request setup error
      return Promise.reject({ message: 'Failed to make request' });
    }
  }
);

export default api;