import { User } from './auth';

export interface ProfileFormData {
  username: string;
  email: string;
  phone?: string;
}

export interface ProfileUpdateResponse {
  success: boolean;
  message?: string;
  user?: User;
}