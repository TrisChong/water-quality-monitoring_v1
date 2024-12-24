import React from 'react';
import SensorReadingCard from './SensorReadingCard';
import { SensorData } from '../../../types/sensors';

interface SensorReadingsProps {
  data: SensorData | null;
}

const SensorReadings: React.FC<SensorReadingsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <SensorReadingCard
        title="TDS Level"
        value={data?.tdsLevel ?? null}
        unit="ppm"
        type="tds"
        status={data?.status ?? 'OK'}
      />
      <SensorReadingCard
        title="pH Level"
        value={data?.phLevel ?? null}
        unit=""
        type="ph"
        status={data?.status ?? 'OK'}
      />
      <SensorReadingCard
        title="Turbidity"
        value={data?.turbidity ?? null}
        unit="NTU"
        type="turbidity"
        status={data?.status ?? 'OK'}
      />
      <SensorReadingCard
        title="Flow Rate"
        value={data?.flowRate ?? null}
        unit="L/min"
        type="flowRate"
        status={data?.status ?? 'OK'}
      />

      {data?.status === 'Alarm' && (
        <div className="col-span-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Alert!</strong>
          <span className="block sm:inline"> Water quality parameters outside safe range. Please check the system.</span>
        </div>
      )}
    </div>
  );
};

export default SensorReadings;