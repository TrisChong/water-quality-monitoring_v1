import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthState, User, RegisterData } from '../types/auth';
import * as authApi from '../services/api/auth';
import * as authStorage from '../services/storage/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateUserData: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    token: null
  });
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = () => {
      const user = authStorage.getUser();
      const token = authStorage.getToken();
      if (user && token) {
        setState({ user, isAuthenticated: true, token });
      }
    };
    initAuth();
  }, []);

  const updateUserData = (user: User) => {
    setState(prev => ({ ...prev, user }));
    authStorage.setUser(user);
  };

  const login = async (email: string, password: string) => {
    try {
      const { token, user } = await authApi.login({ email, password });
      authStorage.setToken(token);
      authStorage.setUser(user);
      setState({
        user,
        isAuthenticated: true,
        token
      });
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Login failed');
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      const response = await authApi.register(userData);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    authStorage.clearAuth();
    setState({
      user: null,
      isAuthenticated: false,
      token: null
    });
    navigate('/login');
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};