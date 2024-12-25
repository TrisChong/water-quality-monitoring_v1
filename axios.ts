import axios from 'axios';
import { API_URL } from '../../config/constants';
import { getToken } from '../storage/auth';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getToken();
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
    // Handle network errors
    if (!error.response) {
      return Promise.reject(new Error('Network error - please check your connection'));
    }
    
    // Handle API errors
    const message = error.response.data?.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

export default api;