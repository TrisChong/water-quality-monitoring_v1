import React from 'react';
import { User } from '../../../types/auth';

interface ProfileViewProps {
  user: User | null;
  onEdit: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onEdit }) => {
  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <div className="mt-1 p-2 bg-gray-50 rounded-md">{user.username}</div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <div className="mt-1 p-2 bg-gray-50 rounded-md">{user.email}</div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <div className="mt-1 p-2 bg-gray-50 rounded-md">{user.phone || 'Not provided'}</div>
        </div>
      </div>

      <button
        onClick={onEdit}
        className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600"
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ProfileView;