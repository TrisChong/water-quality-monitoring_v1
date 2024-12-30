export const API_URL = import.meta.env.VITE_API_URL;

export const API_CONFIG = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
};

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register'
  }
};
