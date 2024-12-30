export const SOCKET_CONFIG = {
  url: import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000',
  options: {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5
  }
};