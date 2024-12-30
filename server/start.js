import { createServer } from 'http';
import dotenv from 'dotenv';
import { log } from './utils/logger.js';
import createApp from './config/app.js';
import { configureSocket } from './config/socket.js';
import { connectDB } from './config/db/index.js';

dotenv.config();

const startServer = async () => {
  try {
    log.info('Starting server...');
    
    // Connect to MongoDB
    await connectDB(process.env.MONGODB_URI);
    
    // Create Express app
    const app = createApp();
    
    // Create HTTP server
    const httpServer = createServer(app);
    
    // Configure WebSocket
    configureSocket(httpServer);
    
    // Start server
    const PORT = process.env.PORT || 5000;
    httpServer.listen(PORT, () => {
      log.success(`Server running on port ${PORT}`);
      log.info(`API URL: http://localhost:${PORT}/api`);
    });

  } catch (error) {
    log.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();