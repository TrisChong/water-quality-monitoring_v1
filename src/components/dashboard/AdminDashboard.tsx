import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AdminNavigation from './navigation/AdminNavigation';
import SensorReadings from './sensors/SensorReadings';
import SensorManagement from './sensors/SensorManagement';
import { SensorData } from '../../types';
import { setupSensorSocket } from '../../utils/sensorSocket';

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const [sensorData, setSensorData] = useState<SensorData | null>(null);

  useEffect(() => {
    if (!token || user?.role !== 'admin') return;

    const socket = setupSensorSocket(token);
    socket.on('sensorData', setSensorData);

    return () => {
      socket.disconnect();
    };
  }, [token, user]);

  return (
    <div className="container mx-auto py-6">
      <AdminNavigation />
      <div className="space-y-6 mt-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Real-time Sensor Data</h2>
          <SensorReadings data={sensorData} />
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <SensorManagement />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;