import cors from 'cors';
import { corsConfig } from '../config/cors.js';

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin || corsConfig.origin.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: corsConfig.credentials,
  methods: corsConfig.methods,
  allowedHeaders: corsConfig.allowedHeaders,
  exposedHeaders: corsConfig.exposedHeaders
});