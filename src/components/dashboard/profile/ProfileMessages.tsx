import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface ProfileMessagesProps {
  error?: string;
  success?: string;
}

export const ProfileMessages: React.FC<ProfileMessagesProps> = ({ error, success }) => {
  return (
    <>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center gap-2">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded flex items-center gap-2">
          <CheckCircle size={20} />
          <span>{success}</span>
        </div>
      )}
    </>
  );
};