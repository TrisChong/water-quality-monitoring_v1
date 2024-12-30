// Get the API URL from environment variables with fallback
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// API endpoints configuration
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/users/profile'
  },
  SENSORS: {
    BASE: '/sensors',
    READINGS: '/readings'
  },
  USERS: {
    BASE: '/users'
  }
} as const;

// API configuration object
export const API_CONFIG = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};