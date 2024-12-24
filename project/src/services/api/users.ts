import api from './axios';
import { User } from '../../types/auth';

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch users');
  }
};

export const deleteUser = async (userId: string): Promise<void> => {
  if (!userId) {
    throw new Error('User ID is required');
  }
  
  try {
    await api.delete(`/users/${userId}`);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to delete user');
  }
};