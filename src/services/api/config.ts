// Get the API URL from environment variables, fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Remove /api suffix from VITE_API_URL if it exists
const baseURL = API_URL.endsWith('/api') 
  ? API_URL 
  : `${API_URL}/api`;

export const API_CONFIG = {
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
};