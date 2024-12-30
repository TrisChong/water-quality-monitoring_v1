// Server-side CORS configuration
export const corsConfig = {
  origin: [
    'https://water-quality-monitoring.onrender.com',
    'http://localhost:5173'
  ],
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'Content-Type']
};