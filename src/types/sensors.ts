export type SensorType = 'TDS' | 'pH' | 'Turbidity' | 'Flow Rate';

export interface SensorData {
  tdsLevel: number;
  phLevel: number;
  turbidity: number;
  flowRate: number;
  timestamp: string;
  status: 'OK' | 'Warning' | 'Alarm';
}

export interface SensorStatus {
  _id: string;
  name: string;
  type: SensorType;
  status: 'Online' | 'Offline' | 'Warning';
  lastReading: string;
  createdAt: string;
  updatedAt: string;
}