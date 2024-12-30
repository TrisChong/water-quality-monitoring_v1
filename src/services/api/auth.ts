import axios from 'axios';
import { API_CONFIG } from '../../config/api';
import { LoginCredentials } from '../../types/auth';
import { handleApiError } from '../utils/errorHandler';

const api = axios.create(API_CONFIG);

export const login = async (credentials: LoginCredentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
