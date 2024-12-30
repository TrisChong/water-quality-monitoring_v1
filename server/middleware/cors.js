import cors from 'cors';

const corsOptions = {
  origin: [
    'https://animated-mooncake-33899c.netlify.app',
    'https://water-quality-monitoring-v1.onrender.com',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'Content-Type']
};

export const corsMiddleware = cors(corsOptions);
