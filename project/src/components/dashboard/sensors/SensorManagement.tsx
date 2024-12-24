import React, { useState, useEffect } from 'react';
import { Settings, Plus, Trash2 } from 'lucide-react';
import { getAllSensors, deleteSensor, addSensor } from '../../../services/api/sensors';
import { SensorStatus, SensorType } from '../../../types/sensors';
import AddSensorModal from './AddSensorModal';
import BackButton from '../../common/BackButton';

const SensorManagement = () => {
  const [sensors, setSensors] = useState<SensorStatus[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSensors();
  }, []);

  const fetchSensors = async () => {
    try {
      const data = await getAllSensors();
      setSensors(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch sensors');
    }
  };

  const handleAddSensor = async (sensorData: { name: string; type: SensorType }) => {
    try {
      await addSensor(sensorData);
      await fetchSensors();
      setIsAddModalOpen(false);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add sensor');
    }
  };

  const handleDeleteSensor = async (sensorId: string) => {
    if (!window.confirm('Are you sure you want to delete this sensor?')) {
      return;
    }

    try {
      await deleteSensor(sensorId);
      await fetchSensors();
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete sensor');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Settings className="h-6 w-6 text-emerald-500" />
          <h2 className="text-2xl font-bold">Sensor Management</h2>
        </div>
        <div className="flex items-center gap-4">
          <BackButton />
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600"
          >
            <Plus size={20} />
            Add Sensor
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Reading
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sensors.map((sensor) => (
              <tr key={sensor._id}>
                <td className="px-6 py-4 whitespace-nowrap">{sensor.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{sensor.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    sensor.status === 'Online' 
                      ? 'bg-green-100 text-green-800'
                      : sensor.status === 'Warning'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {sensor.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(sensor.lastReading).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDeleteSensor(sensor._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddSensorModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddSensor}
      />
    </div>
  );
};

export default SensorManagement;