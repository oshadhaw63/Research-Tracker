import api from './api';
import { ApiResponse, Milestone } from '../types';

export interface MilestoneRequest {
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  createdById: string;
}

export const milestoneService = {
  getMilestonesByProjectId: async (projectId: string): Promise<ApiResponse<Milestone[]>> => {
    const response = await api.get(`/projects/${projectId}/milestones`);
    return response.data;
  },

  createMilestone: async (projectId: string, data: MilestoneRequest): Promise<ApiResponse<Milestone>> => {
    const response = await api.post(`/projects/${projectId}/milestones`, data);
    return response.data;
  },

  updateMilestone: async (id: string, data: MilestoneRequest): Promise<ApiResponse<Milestone>> => {
    const response = await api.put(`/milestones/${id}`, data);
    return response.data;
  },

  deleteMilestone: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/milestones/${id}`);
    return response.data;
  },
};
