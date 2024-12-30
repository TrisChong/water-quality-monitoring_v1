import express from 'express';
import { corsMiddleware } from '../middleware/cors.js';
import { errorHandler } from '../middleware/errorHandler.js';
import routes from '../routes/index.js';
import { log } from '../utils/logger.js';

const createApp = () => {
  const app = express();
  
  // Enable CORS for all routes
  app.use(corsMiddleware);
  
  // Parse JSON bodies
  app.use(express.json());
  
  // Routes
  app.use('/api', routes);
  
  // Health check
  app.get('/health', (_, res) => {
    res.json({ status: 'ok' });
  });
  
  // Error handling
  app.use(errorHandler);
  
  return app;
};

export default createApp;
