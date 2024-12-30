import axios from 'axios';
import { API_CONFIG, ENDPOINTS } from '../../config/api';
import { handleApiError } from '../utils/errorHandler';

const api = axios.create(API_CONFIG);

export const getReadings = async (startDate: string, endDate: string) => {
  try {
    const response = await api.get(ENDPOINTS.READINGS.BASE, {
      params: { startDate, endDate }
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const addReading = async (data: any) => {
  try {
    const response = await api.post(ENDPOINTS.READINGS.BASE, data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};