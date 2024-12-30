import { Server } from 'socket.io';
import { log } from '../utils/logger.js';
import { verifyToken } from '../middleware/auth.js';

export const configureSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      credentials: true
    }
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication required'));
    }
    
    try {
      const user = verifyToken(token);
      socket.user = user;
      next();
    } catch (err) {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    log.success(`Client connected: ${socket.id}`);
    
    socket.on('disconnect', () => {
      log.warn(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};