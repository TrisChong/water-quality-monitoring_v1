import React, { useState, useEffect } from 'react';
import { Users, AlertCircle } from 'lucide-react';
import { User } from '../../../types/auth';
import { getAllUsers, deleteUser } from '../../../services/api/users';
import BackButton from '../../common/BackButton';
import UserTable from './UserTable';
import { UserTableHeader } from './UserTableHeader';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      await deleteUser(userId);
      await fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading users...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-emerald-500" />
          <h2 className="text-2xl font-bold">User Management</h2>
        </div>
        <BackButton />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center gap-2">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <UserTable 
        users={users} 
        onDeleteUser={handleDeleteUser} 
      />
    </div>
  );
};

export default UserManagement;