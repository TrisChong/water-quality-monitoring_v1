import React from 'react';
import SensorReadingCard from './SensorReadingCard';
import { SensorData } from '../../../types/sensors';

interface SensorReadingsProps {
  data: SensorData | null;
}

const SensorReadings: React.FC<SensorReadingsProps> = ({ data }) => {
  return (
    <div className="space-y-4 max-w-[425px] mx-auto">
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
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Alert!</strong>
          <span className="block"> Water quality parameters outside safe range.</span>
        </div>
      )}
    </div>
  );
};

export default SensorReadings;