import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Main Menu</h2>
      <div className="space-y-4">
        <button
          onClick={() => navigate('/monitor')}
          className="w-full p-2 bg-black text-emerald-400 rounded hover:bg-gray-800"
        >
          MONITOR MODE
        </button>
        <button
          onClick={() => navigate('/data-logger')}
          className="w-full p-2 bg-black text-emerald-400 rounded hover:bg-gray-800"
        >
          DATA LOGGER
        </button>
        <button
          onClick={() => navigate('/login')}
          className="w-full p-2 bg-emerald-400 text-white rounded hover:bg-emerald-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MainMenu;