import express from 'express';
import { log } from './utils/logger.js';
import { corsMiddleware } from './middleware/cors.js';
import authRoutes from './routes/auth.js';
import readingsRoutes from './routes/readings.js';
import userRoutes from './routes/users.js';
import sensorRoutes from './routes/sensors.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Apply CORS middleware
app.use(corsMiddleware);

// Parse JSON bodies
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/readings', readingsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sensors', sensorRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling
app.use(errorHandler);

// Handle 404
app.use((req, res) => {
  log.warn(`Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ message: 'Route not found' });
});

export default app;