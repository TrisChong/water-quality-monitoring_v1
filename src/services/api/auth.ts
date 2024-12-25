import api from './axios';
import { LoginCredentials, RegisterData } from '../../types/auth';

export const login = async (credentials: LoginCredentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Login failed');
  }
};

export const register = async (userData: RegisterData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Registration failed');
  }
};
