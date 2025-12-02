export enum UserRole {
  ADMIN = 'ADMIN',
  PI = 'PI',
  MEMBER = 'MEMBER',
  VIEWER = 'VIEWER'
}

export enum ProjectStatus {
  PLANNING = 'PLANNING',
  ACTIVE = 'ACTIVE',
  ON_HOLD = 'ON_HOLD',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED'
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  role: UserRole;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  username: string;
  fullName: string;
  role: UserRole;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  pi: User;
  tags: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  createdBy: User;
}

export interface Document {
  id: string;
  projectId: string;
  title: string;
  description: string;
  urlOrPath: string;
  uploadedBy: User;
  uploadedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
