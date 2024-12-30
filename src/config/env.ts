// Environment variables type definitions
interface ImportMetaEnv {
  VITE_API_URL: string;
}

// Default values for environment variables
const defaults = {
  VITE_API_URL: 'http://localhost:5000/api'
};

// Get environment variable with fallback
const getEnvVar = (key: keyof ImportMetaEnv): string => {
  return import.meta.env[key] || defaults[key];
};

// Export validated environment variables
export const env = {
  VITE_API_URL: getEnvVar('VITE_API_URL')
} as const;