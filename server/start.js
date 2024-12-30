import { createServer } from 'http';
import dotenv from 'dotenv';
import { log } from './utils/logger.js';
import createApp from './config/app.js';
import connectDB from './config/db.js';

dotenv.config();

const startServer = async () => {
  try {
    const { MONGODB_URI, PORT = 5000 } = process.env;
    
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is required');
    }

    // Connect to MongoDB
    await connectDB(MONGODB_URI);
    
    // Create Express app
    const app = createApp();
    
    // Create HTTP server
    const server = createServer(app);
    
    // Start server
    server.listen(PORT, () => {
      log.success(`Server running on port ${PORT}`);
    });

  } catch (error) {
    log.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
