import axios from 'axios';
import { API_CONFIG, ENDPOINTS } from '../../config/api';
import { LoginCredentials } from '../../types/auth';
import { handleApiError } from '../utils/errorHandler';

const api = axios.create(API_CONFIG);

export const login = async (credentials: LoginCredentials) => {
  try {
    const response = await api.post(ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const register = async (data: any) => {
  try {
    const response = await api.post(ENDPOINTS.AUTH.REGISTER, data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};