import express from 'express';
import { auth, requireAdmin } from '../middleware/auth.js';
import Sensor from '../models/Sensor.js';
import { log } from '../utils/logger.js';

const router = express.Router();

// Get all sensors
router.get('/', auth, async (req, res) => {
  try {
    const sensors = await Sensor.find().sort({ createdAt: -1 });
    res.json(sensors);
  } catch (error) {
    log.error(`Error fetching sensors: ${error.message}`);
    res.status(500).json({ message: 'Failed to fetch sensors' });
  }
});

// Add new sensor (admin only)
router.post('/', [auth, requireAdmin], async (req, res) => {
  try {
    const { name, type } = req.body;
    
    if (!name || !type) {
      return res.status(400).json({ message: 'Name and type are required' });
    }

    const existingSensor = await Sensor.findOne({ name });
    if (existingSensor) {
      return res.status(400).json({ message: 'A sensor with this name already exists' });
    }

    const sensor = new Sensor({
      name,
      type,
      status: 'Online',
      lastReading: new Date()
    });

    await sensor.save();
    log.success(`New sensor added: ${name} (${type})`);
    res.status(201).json(sensor);
  } catch (error) {
    log.error(`Error adding sensor: ${error.message}`);
    res.status(500).json({ message: 'Failed to add sensor' });
  }
});

// Delete sensor (admin only)
router.delete('/:id', [auth, requireAdmin], async (req, res) => {
  try {
    const sensor = await Sensor.findById(req.params.id);
    if (!sensor) {
      return res.status(404).json({ message: 'Sensor not found' });
    }

    await sensor.deleteOne();
    log.success(`Sensor deleted: ${sensor.name}`);
    res.json({ message: 'Sensor deleted successfully' });
  } catch (error) {
    log.error(`Error deleting sensor: ${error.message}`);
    res.status(500).json({ message: 'Failed to delete sensor' });
  }
});

export default router;