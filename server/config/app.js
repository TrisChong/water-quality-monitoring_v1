import express from 'express';
import { corsMiddleware } from '../middleware/cors.js';
import { errorHandler } from '../middleware/errorHandler.js';
import routes from '../routes/index.js';
import { log } from '../utils/logger.js';

const createApp = () => {
  const app = express();
  
  // Middleware
  app.use(express.json());
  app.use(corsMiddleware);
  
  // Routes
  app.use('/api', routes);
  
  // Health check
  app.get('/health', (_, res) => {
    res.json({ status: 'ok' });
  });
  
  // Handle 404
  app.use((req, res) => {
    log.warn(`Route not found: ${req.method} ${req.url}`);
    res.status(404).json({ message: 'Route not found' });
  });
  
  // Error handling
  app.use(errorHandler);
  
  return app;
};

export default createApp;