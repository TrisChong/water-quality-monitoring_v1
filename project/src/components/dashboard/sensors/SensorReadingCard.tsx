import React from 'react';
import { Activity, Droplet, Wind, Thermometer } from 'lucide-react';

interface SensorReadingCardProps {
  title: string;
  value: number | null;
  unit: string;
  type: 'tds' | 'ph' | 'turbidity' | 'flowRate';
  status: 'OK' | 'Warning' | 'Alarm';
}

const SensorReadingCard: React.FC<SensorReadingCardProps> = ({
  title,
  value,
  unit,
  type,
  status
}) => {
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

  const getIcon = () => {
    switch (type) {
      case 'tds':
        return <Droplet className="h-8 w-8 text-blue-500" />;
      case 'ph':
        return <Activity className="h-8 w-8 text-purple-500" />;
      case 'turbidity':
        return <Thermometer className="h-8 w-8 text-yellow-500" />;
      case 'flowRate':
        return <Wind className="h-8 w-8 text-green-500" />;
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{title}</h3>
        {getIcon()}
      </div>
      <p className={`text-2xl font-bold ${getStatusColor(status)}`}>
        {value !== null ? `${value} ${unit}` : '---'}
      </p>
      <p className={`text-sm ${getStatusColor(status)}`}>
        Status: {status}
      </p>
    </div>
  );
};

export default SensorReadingCard;