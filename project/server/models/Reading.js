import mongoose from 'mongoose';

const readingSchema = new mongoose.Schema({
  tdsLevel: { 
    type: Number, 
    required: true,
    min: 0,
    max: 1000
  },
  phLevel: { 
    type: Number, 
    required: true,
    min: 0,
    max: 14
  },
  turbidity: { 
    type: Number, 
    required: true,
    min: 0,
    max: 100
  },
  flowRate: { 
    type: Number, 
    required: true,
    min: 0,
    max: 100
  },
  status: { 
    type: String, 
    enum: ['OK', 'Warning', 'Alarm'],
    required: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now,
    index: true
  }
});

// Add index for efficient querying
readingSchema.index({ timestamp: -1 });

export default mongoose.model('Reading', readingSchema);