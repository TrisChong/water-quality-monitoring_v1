import React, { useState } from 'react';
import { X } from 'lucide-react';
import { SensorType } from '../../../types/sensors';

interface AddSensorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (sensorData: { name: string; type: SensorType }) => Promise<void>;
}

const AddSensorModal: React.FC<AddSensorModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'TDS' as SensorType
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await onAdd(formData);
      setFormData({ name: '', type: 'TDS' }); // Reset form
    } catch (error) {
      console.error('Failed to add sensor:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Add New Sensor</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isSubmitting}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sensor Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-400"
              disabled={isSubmitting}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sensor Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as SensorType }))}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-400"
              disabled={isSubmitting}
            >
              <option value="TDS">TDS Sensor</option>
              <option value="pH">pH Sensor</option>
              <option value="Turbidity">Turbidity Sensor</option>
              <option value="Flow Rate">Flow Rate Sensor</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add Sensor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSensorModal;