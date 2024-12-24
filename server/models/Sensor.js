import mongoose from 'mongoose';

const sensorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['TDS', 'pH', 'Turbidity', 'Flow Rate']
  },
  status: {
    type: String,
    enum: ['Online', 'Offline', 'Warning'],
    default: 'Online'
  },
  lastReading: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create indexes without duplicates
sensorSchema.index({ createdAt: -1 });
sensorSchema.index({ type: 1, status: 1 });

export default mongoose.model('Sensor', sensorSchema);