// API and environment constants
export const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/api$/, '') || 'http://localhost:5000';
export const API_URL = `${API_BASE_URL}/api`;

export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register'
} as const;