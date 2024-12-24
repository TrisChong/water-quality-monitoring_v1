import api from './axios';
import { ProfileFormData } from '../../types/profile';
import { User } from '../../types/auth';

export const updateProfile = async (data: ProfileFormData): Promise<User> => {
  try {
    const response = await api.put('/users/profile', data);
    
    if (!response?.data) {
      throw new Error('No response from server');
    }

    // If the response contains a user object directly
    if (response.data.user) {
      return response.data.user;
    }
    
    // If the response is the user object itself
    if (response.data._id) {
      return response.data;
    }

    throw new Error('Invalid response format');
    
  } catch (error: any) {
    console.error('Profile update error:', error.response || error);

    if (error.response?.status === 400) {
      throw new Error(error.response.data.message || 'Invalid profile data');
    }
    
    if (error.response?.status === 401) {
      throw new Error('Session expired. Please login again.');
    }

    throw new Error('Network error. Please check your connection and try again.');
  }
};