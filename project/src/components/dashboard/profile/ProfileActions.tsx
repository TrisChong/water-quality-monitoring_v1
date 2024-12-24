import React from 'react';

interface ProfileActionsProps {
  isEditing: boolean;
  isLoading: boolean;
  onEdit: () => void;
  onCancel: () => void;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({
  isEditing,
  isLoading,
  onEdit,
  onCancel
}) => {
  return (
    <div className="flex gap-4 mt-6">
      {isEditing ? (
        <>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={onEdit}
          className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
        >
          Edit Profile
        </button>
      )}
    </div>
  );
};

export default ProfileActions;