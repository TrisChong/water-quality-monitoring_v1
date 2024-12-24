import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Admin</h2>
      <div className="space-y-4">
        <button
          onClick={() => navigate('/add-sensor')}
          className="w-full p-2 bg-black text-emerald-400 rounded hover:bg-gray-800"
        >
          Add Sensor
        </button>
        <button
          onClick={() => {/* TODO: Implement delete sensor */}}
          className="w-full p-2 bg-black text-emerald-400 rounded hover:bg-gray-800"
        >
          Delete Sensor
        </button>
        <button
          onClick={() => navigate('/')}
          className="block text-red-500"
        >
          Back?
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;