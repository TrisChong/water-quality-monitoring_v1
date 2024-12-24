import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface ReadingData {
  time: string;
  status: string;
  result: string;
}

const DataLogger = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  
  const readings: ReadingData[] = [
    { time: '02:00:00', status: 'OK', result: '7.0' },
    { time: '02:00:30', status: 'OK', result: '7.0' },
    { time: '02:01:00', status: 'OK', result: '7.0' },
    { time: '02:01:30', status: 'OK', result: '7.0' },
    { time: '02:02:00', status: 'OK', result: '7.0' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Data Logger</h2>
      
      <div className="mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>TDS</div>
        <div>pH</div>
        <div>Turbidity</div>
        <div>Flow Rate</div>
        <div>NA</div>
        <div>NA</div>
      </div>

      <table className="w-full">
        <thead>
          <tr>
            <th>Time</th>
            <th>Status</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {readings.map((reading, index) => (
            <tr key={index}>
              <td>{reading.time}</td>
              <td>{reading.status}</td>
              <td>{reading.result}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => {/* TODO: Implement export functionality */}}
        className="mt-4 px-6 py-2 bg-black text-emerald-400 rounded hover:bg-gray-800"
      >
        EXPORT REPORT
      </button>

      <button
        onClick={() => navigate('/')}
        className="block text-red-500 mt-4"
      >
        Back?
      </button>
    </div>
  );
};

export default DataLogger;