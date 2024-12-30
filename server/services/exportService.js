import ExcelJS from 'exceljs';
import { format } from 'date-fns';

export const generateExcelReport = async (readings) => {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Water Quality Monitoring System';
  workbook.created = new Date();

  const worksheet = workbook.addWorksheet('Water Quality Readings');

  // Add headers
  worksheet.columns = [
    { header: 'Date', key: 'date', width: 12 },
    { header: 'Time', key: 'time', width: 10 },
    { header: 'TDS Level (ppm)', key: 'tdsLevel', width: 15 },
    { header: 'pH Level', key: 'phLevel', width: 12 },
    { header: 'Turbidity (NTU)', key: 'turbidity', width: 15 },
    { header: 'Flow Rate (L/min)', key: 'flowRate', width: 15 },
    { header: 'Status', key: 'status', width: 10 }
  ];

  // Style header row
  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'E2F0D9' }
  };

  // Add data rows
  readings.forEach(reading => {
    const date = new Date(reading.timestamp);
    worksheet.addRow({
      date: format(date, 'yyyy-MM-dd'),
      time: format(date, 'HH:mm:ss'),
      tdsLevel: reading.tdsLevel,
      phLevel: reading.phLevel,
      turbidity: reading.turbidity,
      flowRate: reading.flowRate,
      status: reading.status
    });
  });

  // Style status column
  worksheet.getColumn('status').eachCell((cell, rowNumber) => {
    if (rowNumber > 1) {
      switch (cell.value) {
        case 'OK':
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'C6E0B4' } };
          break;
        case 'Warning':
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE699' } };
          break;
        case 'Alarm':
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF9999' } };
          break;
      }
    }
  });

  return await workbook.xlsx.writeBuffer();
};