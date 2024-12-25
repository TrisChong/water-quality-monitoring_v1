import axios from 'axios';
import { getToken } from '../storage/auth';
import { API_CONFIG } from './config';

// Create axios instance
const api = axios.create(API_CONFIG);

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    
    return Promise.reject(error.response?.data || error);
  }
);

export default api;
