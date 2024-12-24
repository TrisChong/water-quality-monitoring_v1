import React from 'react';
import { Activity, Droplet, Wind, Thermometer } from 'lucide-react';
import { SensorData } from '../../../types';

interface WaterQualityDataProps {
  data: SensorData | null;
}

const WaterQualityData: React.FC<WaterQualityDataProps> = ({ data }) => {
  const getStatusColor = (value: string) => {
    switch (value) {
      case 'OK':
        return 'text-green-500';
      case 'Warning':
        return 'text-yellow-500';
      case 'Alarm':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">TDS Level</h3>
          <Droplet className="h-6 w-6 text-blue-500" />
        </div>
        <p className={`text-2xl font-bold ${getStatusColor(data?.status || '')}`}>
          {data?.tdsLevel || '---'} ppm
        </p>
        <p className={`text-sm ${getStatusColor(data?.status || '')}`}>
          {data?.status || 'No Data'}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">pH Level</h3>
          <Activity className="h-6 w-6 text-purple-500" />
        </div>
        <p className={`text-2xl font-bold ${getStatusColor(data?.status || '')}`}>
          {data?.phLevel || '---'}
        </p>
        <p className={`text-sm ${getStatusColor(data?.status || '')}`}>
          {data?.status || 'No Data'}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Turbidity</h3>
          <Thermometer className="h-6 w-6 text-yellow-500" />
        </div>
        <p className={`text-2xl font-bold ${getStatusColor(data?.status || '')}`}>
          {data?.turbidity || '---'} NTU
        </p>
        <p className={`text-sm ${getStatusColor(data?.status || '')}`}>
          {data?.status || 'No Data'}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Flow Rate</h3>
          <Wind className="h-6 w-6 text-green-500" />
        </div>
        <p className={`text-2xl font-bold ${getStatusColor(data?.status || '')}`}>
          {data?.flowRate || '---'} L/min
        </p>
        <p className={`text-sm ${getStatusColor(data?.status || '')}`}>
          {data?.status || 'No Data'}
        </p>
      </div>

      {data?.status === 'Alarm' && (
        <div className="col-span-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Alert!</strong>
          <span className="block sm:inline"> Low water flow rate detected. Immediate action required.</span>
        </div>
      )}
    </div>
  );
};

export default WaterQualityData;