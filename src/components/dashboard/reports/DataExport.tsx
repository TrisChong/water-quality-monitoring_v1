import React, { useState } from 'react';
import { FileText, AlertCircle } from 'lucide-react';
import { exportReadings } from '../../../services/export/exportService';
import { downloadBlob } from '../../../utils/download';
import BackButton from '../../common/BackButton';
import { format } from 'date-fns';

const DataExport = () => {
  const [dateRange, setDateRange] = useState({
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(new Date(), 'yyyy-MM-dd')
  });
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState('');

  const handleExport = async () => {
    if (!dateRange.startDate || !dateRange.endDate) {
      setError('Please select both start and end dates');
      return;
    }

    try {
      setIsExporting(true);
      setError('');
      const { data, filename } = await exportReadings(dateRange);
      downloadBlob(data, filename);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export data');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-emerald-500" />
          <h2 className="text-xl font-bold">Export Report</h2>
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-400"
              disabled={isExporting}
              max={dateRange.endDate}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-400"
              disabled={isExporting}
              min={dateRange.startDate}
            />
          </div>
        </div>

        <button
          onClick={handleExport}
          disabled={isExporting || !dateRange.startDate || !dateRange.endDate}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 disabled:opacity-50"
        >
          <FileText size={20} />
          {isExporting ? 'Exporting...' : 'Export to Excel'}
        </button>
      </div>
    </div>
  );
};

export default DataExport;