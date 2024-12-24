import app from './index.js';
import { createServer } from 'http';
import { createConnection } from './config/db/connection.js';
import dotenv from 'dotenv';
import { log } from './utils/logger.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '..', '.env') });

const startServer = async () => {
  try {
    log.divider();
    log.info('Starting server...');
    
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // Ensure database name is in URI
    const uriWithDB = uri.includes('waterquality') ? uri : `${uri}/waterquality`;
    
    // Connect to MongoDB
    log.info('Initializing MongoDB connection...');
    await createConnection(uriWithDB);
    
    // Start HTTP server
    const httpServer = createServer(app);
    const PORT = process.env.PORT || 5000;
    
    httpServer.listen(PORT, () => {
      log.success(`Server running on port ${PORT}`);
      log.divider();
    });

    // Handle server shutdown
    process.on('SIGTERM', () => {
      log.info('SIGTERM received. Shutting down gracefully...');
      httpServer.close(() => {
        log.info('HTTP server closed');
        process.exit(0);
      });
    });

  } catch (error) {
    log.error('Failed to start server:');
    log.error(error.message);
    log.error(error.stack);
    process.exit(1);
  }
};

startServer();