import axios from 'axios';
import { ARDUINO_CONFIG } from './config';
import { SensorData } from '../../types/sensors';

class ArduinoService {
  private static instance: ArduinoService;
  private isConnected: boolean = false;

  private constructor() {}

  static getInstance(): ArduinoService {
    if (!ArduinoService.instance) {
      ArduinoService.instance = new ArduinoService();
    }
    return ArduinoService.instance;
  }

  async connect(): Promise<boolean> {
    try {
      const response = await axios.get(`${ARDUINO_CONFIG.HOST}${ARDUINO_CONFIG.ENDPOINTS.STATUS}`);
      this.isConnected = response.status === 200;
      return this.isConnected;
    } catch (error) {
      console.error('Failed to connect to Arduino:', error);
      this.isConnected = false;
      return false;
    }
  }

  async getSensorData(): Promise<SensorData | null> {
    if (!this.isConnected) {
      throw new Error('Arduino not connected');
    }

    try {
      const response = await axios.get(`${ARDUINO_CONFIG.HOST}${ARDUINO_CONFIG.ENDPOINTS.SENSOR_DATA}`);
      return response.data;
    } catch (error) {
      console.error('Failed to get sensor data:', error);
      return null;
    }
  }
}

export const arduinoService = ArduinoService.getInstance();