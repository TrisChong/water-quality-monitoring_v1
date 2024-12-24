import { log } from '../../utils/logger.js';
import { createConnection } from './connection.js';

const connectDB = async (uri) => {
  if (!uri) {
    throw new Error('MongoDB URI is required');
  }

  try {
    const connection = await createConnection(uri);
    log.success(`Connected to database: ${connection.connection.name}`);
    return connection;
  } catch (error) {
    log.error('Failed to connect to MongoDB');
    log.error(error.message);
    throw error;
  }
};

export default connectDB;