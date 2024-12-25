import api from './axios';
import { API_ENDPOINTS } from '../../config/api';
import { LoginCredentials, RegisterData } from '../../types/auth';

export const login = async (credentials: LoginCredentials) => {
  try {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  } catch (error: any) {
    const message = error.message || 'Login failed. Please try again.';
    throw new Error(message);
  }
};

export const register = async (userData: RegisterData) => {
  try {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  } catch (error: any) {
    const message = error.message || 'Registration failed. Please try again.';
    throw new Error(message);
  }
};