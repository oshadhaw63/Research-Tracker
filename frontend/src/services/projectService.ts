import api from './api';
import { ApiResponse, Project } from '../types';

export interface ProjectRequest {
  title: string;
  summary: string;
  status: string;
  piId: string;
  tags: string;
  startDate: string;
  endDate: string;
}

export const projectService = {
  getAllProjects: async (): Promise<ApiResponse<Project[]>> => {
    const response = await api.get('/projects');
    return response.data;
  },

  getProjectById: async (id: string): Promise<ApiResponse<Project>> => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  createProject: async (data: ProjectRequest): Promise<ApiResponse<Project>> => {
    const response = await api.post('/projects', data);
    return response.data;
  },

  updateProject: async (id: string, data: ProjectRequest): Promise<ApiResponse<Project>> => {
    const response = await api.put(`/projects/${id}`, data);
    return response.data;
  },

  updateProjectStatus: async (id: string, status: string): Promise<ApiResponse<Project>> => {
    const response = await api.patch(`/projects/${id}/status`, { status });
    return response.data;
  },

  deleteProject: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
};
