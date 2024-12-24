import api from './axios';

export const exportReadings = async (startDate: string, endDate: string): Promise<Blob> => {
  try {
    const response = await api.get('/readings/export', {
      params: { startDate, endDate },
      responseType: 'blob',
      headers: {
        'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to export readings');
  }
};