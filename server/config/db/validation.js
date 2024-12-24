import { log } from '../../utils/logger.js';

export const validateMongoURI = (uri) => {
  if (!uri) {
    throw new Error('MongoDB URI is not defined');
  }

  const validUri = uri.startsWith('mongodb+srv://') || uri.startsWith('mongodb://');
  if (!validUri) {
    throw new Error('Invalid MongoDB URI format');
  }

  return uri;
};

export const validateConnection = async (connection) => {
  try {
    await connection.db.command({ ping: 1 });
    return true;
  } catch (error) {
    log.error('Connection validation failed:', error.message);
    return false;
  }
};