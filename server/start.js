import app from './index.js';
import { createServer } from 'http';
import { configureSocket } from './config/socket.js';
import connectDB from './config/db/index.js';
import dotenv from 'dotenv';
import { log } from './utils/logger.js';

dotenv.config();

const startServer = async () => {
  try {
    const PORT = process.env.PORT || 5000;
    
    // Connect to MongoDB
    await connectDB(process.env.MONGODB_URI);
    
    // Create HTTP server
    const httpServer = createServer(app);
    
    // Configure WebSocket
    configureSocket(httpServer);
    
    // Start listening
    httpServer.listen(PORT, () => {
      log.success(`Server running on port ${PORT}`);
      log.info(`API available at http://localhost:${PORT}/api`);
    });

  } catch (error) {
    log.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();


