import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SensorData } from '../../types';

interface MonitorModeProps {
  sensorData: SensorData;
}

const MonitorMode: React.FC<MonitorModeProps> = ({ sensorData }) => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Water Monitoring Mode</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>TDS Level</div>
          <div className={`font-bold ${sensorData.status === 'OK' ? 'text-green-500' : 'text-red-500'}`}>
            {sensorData.tdsLevel}
          </div>
          
          <div>pH Level</div>
          <div className={`font-bold ${sensorData.status === 'OK' ? 'text-green-500' : 'text-red-500'}`}>
            {sensorData.phLevel}
          </div>
          
          <div>Turbidity</div>
          <div className={`font-bold ${sensorData.status === 'Warning' ? 'text-yellow-500' : 'text-green-500'}`}>
            {sensorData.turbidity}
          </div>
          
          <div>Flow Rate</div>
          <div className={`font-bold ${sensorData.status === 'Alarm' ? 'text-red-500' : 'text-green-500'}`}>
            {sensorData.flowRate}
          </div>
        </div>
        
        <button
          onClick={() => navigate('/data-logger')}
          className="mt-4 px-6 py-2 bg-black text-emerald-400 rounded hover:bg-gray-800"
        >
          READ ONLY
        </button>
        
        <button
          onClick={() => navigate('/')}
          className="block text-red-500 mt-4"
        >
          Back?
        </button>
      </div>
    </div>
  );
};

export default MonitorMode;