// API configuration
export const API_ENDPOINTS = {
  BASE_URL: import.meta.env.VITE_API_URL,
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register'
  }
} as const;

export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json'
  }
} as const;