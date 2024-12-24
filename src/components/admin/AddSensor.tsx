import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddSensor = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add Sensor</h2>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((num) => (
          <button
            key={num}
            className="w-full p-2 bg-black text-emerald-400 rounded hover:bg-gray-800"
          >
            Add Sensor
          </button>
        ))}
        <button
          onClick={() => navigate('/admin')}
          className="block text-red-500"
        >
          Back?
        </button>
      </div>
    </div>
  );
};

export default AddSensor;