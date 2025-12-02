import api from './api';
import { ApiResponse, User } from '../types';

export const userService = {
  getAllUsers: async (): Promise<ApiResponse<User[]>> => {
    const response = await api.get('/users');
    return response.data;
  },

  getUserById: async (id: string): Promise<ApiResponse<User>> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  deleteUser: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  updateUserRole: async (id: string, role: string): Promise<ApiResponse<User>> => {
    const response = await api.put(`/users/${id}/role`, { role });
    return response.data;
  },
};
