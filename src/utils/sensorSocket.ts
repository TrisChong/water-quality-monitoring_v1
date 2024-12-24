import io from 'socket.io-client';

export const setupSensorSocket = (token: string) => {
  const socket = io(import.meta.env.VITE_API_URL.replace('/api', ''), {
    auth: { token }
  });

  return socket;
};