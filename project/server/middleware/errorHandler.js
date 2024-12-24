import { log } from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  log.error(`Error: ${err.message}`);
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      details: err.message
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      message: 'Authentication required'
    });
  }

  res.status(500).json({
    message: 'Internal server error'
  });
};