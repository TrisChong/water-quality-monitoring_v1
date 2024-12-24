import express from 'express';
import { auth } from '../middleware/auth.js';
import Reading from '../models/Reading.js';
import { log } from '../utils/logger.js';
import { generateExcelReport } from '../services/exportService.js';

const router = express.Router();

// Export readings to Excel
router.get('/export', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    const query = {
      timestamp: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    };

    const readings = await Reading.find(query).sort({ timestamp: 1 });
    
    if (readings.length === 0) {
      return res.status(404).json({ message: 'No readings found for the selected period' });
    }

    const buffer = await generateExcelReport(readings);

    // Set response headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=water-quality-report-${startDate}-to-${endDate}.xlsx`);
    
    // Send the file
    res.send(buffer);

  } catch (error) {
    log.error(`Error exporting readings: ${error.message}`);
    res.status(500).json({ message: 'Failed to export readings' });
  }
});

export default router;