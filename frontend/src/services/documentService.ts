import api from './api';
import { ApiResponse, Document } from '../types';

export interface DocumentRequest {
  title: string;
  description: string;
  urlOrPath: string;
  uploadedById: string;
}

export const documentService = {
  getDocumentsByProjectId: async (projectId: string): Promise<ApiResponse<Document[]>> => {
    const response = await api.get(`/projects/${projectId}/documents`);
    return response.data;
  },

  createDocument: async (projectId: string, data: DocumentRequest): Promise<ApiResponse<Document>> => {
    const response = await api.post(`/projects/${projectId}/documents`, data);
    return response.data;
  },

  deleteDocument: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/documents/${id}`);
    return response.data;
  },
};
