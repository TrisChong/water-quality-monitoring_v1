import React from 'react';
import { Activity, Droplet, Wind, Thermometer } from 'lucide-react';
import { SensorData } from '../types';

interface DashboardProps {
  sensorData: SensorData;
}

const Dashboard: React.FC<DashboardProps> = ({ sensorData }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Water Quality Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">TDS Level</p>
              <p className={`text-2xl font-bold ${getStatusColor(sensorData.status)}`}>
                {sensorData.tdsLevel} ppm
              </p>
            </div>
            <Droplet className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">pH Level</p>
              <p className={`text-2xl font-bold ${getStatusColor(sensorData.status)}`}>
                {sensorData.phLevel}
              </p>
            </div>
            <Activity className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Turbidity</p>
              <p className={`text-2xl font-bold ${getStatusColor(sensorData.status)}`}>
                {sensorData.turbidity} NTU
              </p>
            </div>
            <Thermometer className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Flow Rate</p>
              <p className={`text-2xl font-bold ${getStatusColor(sensorData.status)}`}>
                {sensorData.flowRate} L/min
              </p>
            </div>
            <Wind className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;