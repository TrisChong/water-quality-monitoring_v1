import api from './axios';
import { SensorStatus, SensorType } from '../../types/sensors';

interface AddSensorData {
  name: string;
  type: SensorType;
}

export const getAllSensors = async (): Promise<SensorStatus[]> => {
  try {
    const response = await api.get('/sensors');
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to fetch sensors';
    console.error('Error fetching sensors:', message);
    throw new Error(message);
  }
};

export const addSensor = async (data: AddSensorData): Promise<SensorStatus> => {
  try {
    const response = await api.post('/sensors', data);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to add sensor';
    console.error('Error adding sensor:', message);
    throw new Error(message);
  }
};

export const deleteSensor = async (sensorId: string): Promise<void> => {
  try {
    await api.delete(`/sensors/${sensorId}`);
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to delete sensor';
    console.error('Error deleting sensor:', message);
    throw new Error(message);
  }
};