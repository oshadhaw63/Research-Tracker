import api from './api';
import { ApiResponse, AuthResponse } from '../types';

export interface SignupRequest {
  username: string;
  password: string;
  fullName: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export const authService = {
  signup: async (data: SignupRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
};
