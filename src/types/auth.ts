export type UserRole = 'user' | 'admin';

export interface User {
  _id: string;
  username: string;
  email: string;
  role: UserRole;
  phone?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole;
}