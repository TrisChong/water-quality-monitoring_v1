import { SensorData } from '../../types/sensors';
import { formatSensorData } from './exportService';

export const generateCSV = (data: SensorData[]): string => {
  const headers = ['Timestamp', 'TDS Level', 'pH Level', 'Turbidity', 'Flow Rate', 'Status'];
  const rows = data.map(reading => {
    const formatted = formatSensorData(reading);
    return [
      formatted.timestamp,
      formatted.tdsLevel,
      formatted.phLevel,
      formatted.turbidity,
      formatted.flowRate,
      formatted.status
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
};

export const downloadCSV = (csvContent: string, filename: string): void => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};