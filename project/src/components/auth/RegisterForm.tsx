import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types/auth';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    role: 'user' as UserRole
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Register New Account</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          required
          className="w-full p-2 border rounded"
          value={formData.username}
          onChange={(e) => setFormData(prev => ({...prev, username: e.target.value}))}
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
        />
        <input
          type="tel"
          placeholder="Phone (optional)"
          className="w-full p-2 border rounded"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full p-2 border rounded"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
        />
        <select
          value={formData.role}
          onChange={(e) => setFormData(prev => ({...prev, role: e.target.value as UserRole}))}
          className="w-full p-2 border rounded"
        >
          <option value="user">User</option>
          <option value="admin">Administrator</option>
        </select>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full p-2 bg-emerald-400 text-white rounded hover:bg-emerald-500 disabled:opacity-50"
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="w-full p-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;