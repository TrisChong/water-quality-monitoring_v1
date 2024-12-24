import mongoose from 'mongoose';
import { log } from '../../utils/logger.js';
import { CONNECTION_OPTIONS } from './options.js';
import { validateMongoURI, validateConnection } from './validation.js';
import { setupConnectionEvents } from './events.js';

const MAX_RETRIES = 3;
const RETRY_INTERVAL = 5000;

export const createConnection = async (uri) => {
  let retries = MAX_RETRIES;

  while (retries > 0) {
    try {
      // Validate URI
      const validatedUri = validateMongoURI(uri);
      
      // Setup connection events
      setupConnectionEvents(mongoose);

      // Close existing connections
      if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
      }

      // Log connection attempt
      log.info(`Attempting MongoDB connection (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})...`);
      log.info(`Connection string: ${validatedUri.replace(/:[^:/@]+@/, ':****@')}`);

      // Connect to MongoDB
      const connection = await mongoose.connect(validatedUri, CONNECTION_OPTIONS);
      
      // Validate connection
      const isValid = await validateConnection(connection.connection);
      if (!isValid) {
        throw new Error('Failed to validate MongoDB connection');
      }

      return connection;

    } catch (error) {
      retries--;
      log.error(`Connection attempt failed (${MAX_RETRIES - retries}/${MAX_RETRIES})`);
      log.error(`Error: ${error.message}`);
      
      if (error.name === 'MongoServerSelectionError') {
        log.error('\nPossible issues:');
        log.error('1. IP not whitelisted in MongoDB Atlas');
        log.error('2. Invalid credentials');
        log.error('3. Network connectivity issues');
        log.error('4. MongoDB Atlas cluster is down');
      }

      if (retries > 0) {
        log.warn(`Retrying in ${RETRY_INTERVAL/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
      } else {
        throw error;
      }
    }
  }
};