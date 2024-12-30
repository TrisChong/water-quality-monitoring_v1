import { AxiosError } from 'axios';

export const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      return new Error('Invalid email or password');
    }
    
    if (error.response?.status === 403) {
      return new Error('Access forbidden');
    }

    if (error.code === 'ERR_NETWORK') {
      return new Error('Network error - please check your connection');
    }

    return new Error(error.response?.data?.message || 'An unexpected error occurred');
  }

  return error instanceof Error ? error : new Error('An unexpected error occurred');
};