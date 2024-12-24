import axios from 'axios';
import { API_CONFIG } from './config';
import { LoginCredentials, RegisterData } from '../../types/auth';

const api = axios.create(API_CONFIG);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (credentials: LoginCredentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Login failed';
    throw new Error(message);
  }
};

export const register = async (userData: RegisterData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Registration failed';
    throw new Error(message);
  }
};