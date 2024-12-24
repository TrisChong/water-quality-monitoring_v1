import Reading from '../models/Reading.js';
import { log } from '../utils/logger.js';

const THRESHOLDS = {
  tds: { min: 0, max: 1000, warning: 800 },
  ph: { min: 6.5, max: 8.5 },
  turbidity: { min: 0, max: 10, warning: 8 },
  flowRate: { min: 1.5, max: 5 }
};

export const generateSensorData = () => {
  // Simulate sensor readings
  const tdsLevel = Math.floor(Math.random() * (1000 - 100) + 100);
  const phLevel = parseFloat((Math.random() * (8.5 - 6.5) + 6.5).toFixed(1));
  const turbidity = parseFloat((Math.random() * (10 - 0) + 0).toFixed(1));
  const flowRate = parseFloat((Math.random() * (5 - 1) + 1).toFixed(1));

  return {
    tdsLevel,
    phLevel,
    turbidity,
    flowRate,
    status: determineStatus({ tdsLevel, phLevel, turbidity, flowRate }),
    timestamp: new Date()
  };
};

export const determineStatus = (readings) => {
  const { tdsLevel, phLevel, turbidity, flowRate } = readings;
  
  // Check for alarm conditions
  if (
    flowRate < THRESHOLDS.flowRate.min ||
    phLevel < THRESHOLDS.ph.min ||
    phLevel > THRESHOLDS.ph.max
  ) {
    return 'Alarm';
  }

  // Check for warning conditions
  if (
    tdsLevel > THRESHOLDS.tds.warning ||
    turbidity > THRESHOLDS.turbidity.warning
  ) {
    return 'Warning';
  }

  return 'OK';
};

export const saveSensorReading = async (data) => {
  try {
    const reading = new Reading(data);
    await reading.save();
    return reading;
  } catch (error) {
    log.error(`Error saving sensor reading: ${error.message}`);
    throw error;
  }
};

export const handleSensorData = (socket) => {
  return setInterval(async () => {
    try {
      const data = generateSensorData();
      const reading = await saveSensorReading(data);
      
      // Emit data with status-specific event
      socket.emit('sensorData', reading);
      
      // Emit alerts for warning/alarm conditions
      if (reading.status !== 'OK') {
        socket.emit('waterQualityAlert', {
          type: reading.status.toLowerCase(),
          message: getAlertMessage(reading),
          reading
        });
      }
    } catch (error) {
      log.error(`Error handling sensor data: ${error.message}`);
    }
  }, 5000);
};

const getAlertMessage = (reading) => {
  const messages = [];
  
  if (reading.flowRate < THRESHOLDS.flowRate.min) {
    messages.push('Low water flow rate detected');
  }
  if (reading.tdsLevel > THRESHOLDS.tds.warning) {
    messages.push('High TDS level detected');
  }
  if (reading.turbidity > THRESHOLDS.turbidity.warning) {
    messages.push('High turbidity detected');
  }
  if (reading.phLevel < THRESHOLDS.ph.min || reading.phLevel > THRESHOLDS.ph.max) {
    messages.push('pH level out of safe range');
  }

  return messages.join('. ');
};