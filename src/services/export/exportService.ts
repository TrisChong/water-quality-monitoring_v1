import { format } from 'date-fns';
import api from '../api/axios';
import { ENDPOINTS } from '../api/endpoints';
import { ExportOptions, ExportResponse } from './types';

export const exportReadings = async (options: ExportOptions): Promise<ExportResponse> => {
  try {
    const response = await api.get(ENDPOINTS.READINGS.EXPORT, {
      params: { 
        startDate: format(new Date(options.startDate), 'yyyy-MM-dd'),
        endDate: format(new Date(options.endDate), 'yyyy-MM-dd')
      },
      responseType: 'blob'
    });
    
    if (!response.data) {
      throw new Error('No data received from server');
    }

    const filename = `water-quality-report-${format(new Date(options.startDate), 'yyyyMMdd')}-${format(new Date(options.endDate), 'yyyyMMdd')}.xlsx`;
    
    return {
      data: response.data,
      filename
    };
  } catch (error: any) {
    console.error('Export error:', error);
    if (error.response?.status === 404) {
      throw new Error('Export service is currently unavailable');
    }
    throw new Error('Failed to export data. Please try again.');
  }
};