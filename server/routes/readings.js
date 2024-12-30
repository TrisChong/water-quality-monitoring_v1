import express from 'express';
import { auth } from '../middleware/auth.js';
import Reading from '../models/Reading.js';
import { log } from '../utils/logger.js';

const router = express.Router();

// Get readings with pagination
router.get('/', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {
      timestamp: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    };

    const readings = await Reading.find(query)
      .sort({ timestamp: -1 });
    
    res.json(readings);
  } catch (error) {
    log.error(`Error fetching readings: ${error.message}`);
    res.status(500).json({ message: 'Failed to fetch readings' });
  }
});

// Add new reading
router.post('/', auth, async (req, res) => {
  try {
    const reading = new Reading(req.body);
    await reading.save();
    res.status(201).json(reading);
  } catch (error) {
    log.error(`Error saving reading: ${error.message}`);
    res.status(500).json({ message: 'Failed to save reading' });
  }
});

export default router;