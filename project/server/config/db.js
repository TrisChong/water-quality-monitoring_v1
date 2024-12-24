import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { log } from '../utils/logger.js';

dotenv.config();

const connectDB = async () => {
  try {
    log.info('Initializing MongoDB connection...');
    
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // Add database name if not in URI
    const uriWithDB = uri.includes('waterquality') ? uri : `${uri}/waterquality`;

    await mongoose.connect(uriWithDB, {
      serverSelectionTimeoutMS: 10000, // Increase timeout
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority'
    });

    log.success('MongoDB connected successfully');
    
    // Setup connection event handlers
    mongoose.connection.on('error', (err) => {
      log.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      log.warn('MongoDB disconnected. Attempting to reconnect...');
    });

    return mongoose.connection;

  } catch (error) {
    log.error('MongoDB Connection Failed');
    log.error(`Error Details: ${error.message}`);
    
    // Additional error information for common issues
    if (error.name === 'MongoServerSelectionError') {
      log.error('Connection timeout - possible causes:');
      log.error('1. Network connectivity issues');
      log.error('2. MongoDB Atlas cluster is not running');
      log.error('3. IP whitelist configuration issue');
    }
    
    throw error;
  }
};

export default connectDB;