import mongoose from 'mongoose';
import { log } from '../../utils/logger.js';

const CONNECTION_OPTIONS = {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
  maxPoolSize: 10,
  retryWrites: true,
  w: 'majority'
};

export const connectDB = async (uri) => {
  try {
    if (!uri) {
      throw new Error('MongoDB URI is required');
    }

    // Ensure database name is included
    const uriWithDB = uri.includes('waterquality') ? uri : `${uri}/waterquality`;

    // Connect to MongoDB
    const connection = await mongoose.connect(uriWithDB, CONNECTION_OPTIONS);
    
    log.success('MongoDB connected successfully');
    log.info(`Connected to database: ${connection.connection.name}`);
    
    return connection;
  } catch (error) {
    log.error('MongoDB connection failed:', error.message);
    throw error;
  }
};