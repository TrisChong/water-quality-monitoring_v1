import express from 'express';
import cors from 'cors';
import { log } from './utils/logger.js';
import authRoutes from './routes/auth.js';
import readingsRoutes from './routes/readings.js';
import userRoutes from './routes/users.js';
import sensorRoutes from './routes/sensors.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// API Routes - all routes should be under /api
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