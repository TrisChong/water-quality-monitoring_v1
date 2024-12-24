export const ARDUINO_CONFIG = {
  // Update this with your Arduino's IP address once connected
  HOST: 'http://192.168.1.200',  
  ENDPOINTS: {
    SENSOR_DATA: '/api/sensors',
    STATUS: '/api/status'
  },
  UPDATE_INTERVAL: 5000 // 5 seconds
};