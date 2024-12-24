import { useState, useCallback, useEffect } from 'react';
import { ProfileFormData } from '../types/profile';
import { updateProfile } from '../services/api/profile';
import { useAuth } from '../contexts/AuthContext';

export const useProfileForm = () => {
  const { user, updateUserData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    username: '',
    email: '',
    phone: ''
  });

  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing || isLoading) return;
    
    try {
      setIsLoading(true);
      setError('');
      setSuccess('');
      
      const updatedUser = await updateProfile(formData);
      updateUserData(updatedUser);
      setSuccess('Profile updated successfully');
      
      // Wait a moment before closing edit mode
      setTimeout(() => {
        setIsEditing(false);
      }, 1500);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = useCallback(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        phone: user.phone || ''
      });
    }
    setIsEditing(false);
    setError('');
    setSuccess('');
  }, [user]);

  const handleFieldChange = useCallback((field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
    setSuccess('');
  }, []);

  return {
    formData,
    isEditing,
    isLoading,
    error,
    success,
    setIsEditing,
    handleSubmit,
    handleCancel,
    handleFieldChange
  };
};