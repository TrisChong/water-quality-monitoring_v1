export interface SensorData {
  tdsLevel: number;
  phLevel: number;
  turbidity: number;
  flowRate: number;
  timestamp: string;
  status: 'OK' | 'Warning' | 'Alarm';
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  phone?: string;
}

export interface Sensor {
  id: string;
  type: 'TDS' | 'pH' | 'Turbidity' | 'Flow Rate';
  location: string;
  lastReading?: number;
  status: 'OK' | 'Warning' | 'Alarm';
}