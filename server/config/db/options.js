export const CONNECTION_OPTIONS = {
  serverSelectionTimeoutMS: 30000,  // Increased timeout
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
  maxPoolSize: 10,
  minPoolSize: 0,
  family: 4,
  retryWrites: true,
  w: 'majority',
  autoIndex: true,
  heartbeatFrequencyMS: 10000,
  // Add retry logic
  retryReads: true,
  retryWrites: true,
  // Add server monitoring
  monitorCommands: true,
  // Add connection pool settings
  maxIdleTimeMS: 30000,
  maxConnecting: 2,
};