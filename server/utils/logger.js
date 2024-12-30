// Simple logger without external dependencies
export const log = {
  info: (msg) => {
    console.log(`[INFO] ${msg}`);
  },
  success: (msg) => {
    console.log(`[SUCCESS] ${msg}`);
  },
  warn: (msg) => {
    console.log(`[WARN] ${msg}`);
  },
  error: (msg) => {
    console.log(`[ERROR] ${msg}`);
  }
};