import { log } from './logger.js';

export const validateEnv = () => {
  const required = ['MONGODB_URI', 'JWT_SECRET', 'PORT'];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    log.error('Missing required environment variables:');
    missing.forEach(key => log.error(`- ${key}`));
    return false;
  }
  
  return true;
};