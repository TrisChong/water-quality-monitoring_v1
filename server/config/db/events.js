import { log } from '../../utils/logger.js';

export const setupConnectionEvents = (mongoose) => {
  mongoose.connection.on('connecting', () => {
    log.info('Establishing connection to MongoDB...');
  });

  mongoose.connection.on('connected', () => {
    log.success('MongoDB connected successfully');
  });

  mongoose.connection.on('disconnected', () => {
    log.warn('MongoDB disconnected');
  });

  mongoose.connection.on('error', (err) => {
    log.error(`MongoDB connection error: ${err.message}`);
  });
};