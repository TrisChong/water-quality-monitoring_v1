import React, { useState } from 'react';
import { FileText, Download, AlertCircle } from 'lucide-react';
import { exportReadings } from '../../../services/api/reports';
import BackButton from '../../common/BackButton';

const DataExport = () => {
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState('');

  const handleExport = async () => {
    if (!dateRange.start || !dateRange.end) {
      setError('Please select both start and end dates');
      return;
    }

    try {
      setIsExporting(true);
      setError('');
      const blob = await exportReadings(dateRange.start, dateRange.end);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `water-quality-report-${dateRange.start}-to-${dateRange.end}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export report');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-emerald-500" />
          <h2 className="text-2xl font-bold">Export Report</h2>
        </div>
        <BackButton />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center gap-2">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({...prev, start: e.target.value}))}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-400"
              disabled={isExporting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({...prev, end: e.target.value}))}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-400"
              disabled={isExporting}
            />
          </div>
        </div>

        <button
          onClick={handleExport}
          disabled={isExporting || !dateRange.start || !dateRange.end}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download size={20} />
          {isExporting ? 'Exporting...' : 'Export to Excel'}
        </button>
      </div>
    </div>
  );
};

export default DataExport;