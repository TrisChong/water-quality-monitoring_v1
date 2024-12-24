import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import UserNavigation from './navigation/UserNavigation';
import SensorReadings from './sensors/SensorReadings';
import { SensorData } from '../../types';
import { setupSensorSocket } from '../../utils/sensorSocket';

const UserDashboard = () => {
  const { token } = useAuth();
  const [sensorData, setSensorData] = useState<SensorData | null>(null);

  useEffect(() => {
    if (!token) return;

    const socket = setupSensorSocket(token);
    socket.on('sensorData', setSensorData);

    return () => {
      socket.disconnect();
    };
  }, [token]);

  return (
    <div className="container mx-auto py-6">
      <UserNavigation />
      <div className="mt-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <SensorReadings data={sensorData} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;