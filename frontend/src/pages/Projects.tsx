import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { Project, ProjectStatus, UserRole } from '../types';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: '',
    summary: '',
    status: ProjectStatus.PLANNING,
    tags: '',
    startDate: '',
    endDate: ''
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectService.getAllProjects();
      if (response.success) {
        setProjects(response.data || []);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await projectService.createProject({
        ...projectForm,
        status: projectForm.status.toString(),
        piId: '' // Backend will use authenticated user
      });
      if (response.success && response.data) {
        setProjects([...projects, response.data]);
        setShowCreateModal(false);
        setProjectForm({
          title: '',
          summary: '',
          status: ProjectStatus.PLANNING,
          tags: '',
          startDate: '',
          endDate: ''
        });
        alert('Project created successfully!');
      } else {
        alert(response.message || 'Failed to create project');
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to create project');
    }
  };

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.PLANNING:
        return 'bg-gray-100 text-gray-800';
      case ProjectStatus.ACTIVE:
        return 'bg-blue-100 text-blue-800';
      case ProjectStatus.ON_HOLD:
        return 'bg-yellow-100 text-yellow-800';
      case ProjectStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      case ProjectStatus.ARCHIVED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center">
                <svg className="w-10 h-10 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
                Research Projects
              </h1>
              <p className="text-blue-100 text-lg">View and manage all research projects</p>
            </div>
            {(user?.role === UserRole.ADMIN || user?.role === UserRole.PI) && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold flex items-center shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                </svg>
                Create Project
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg mb-6 flex items-start">
            <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Projects Yet</h3>
            <p className="text-gray-600 mb-6">There are no research projects in the system yet.</p>
            {(user?.role === UserRole.ADMIN || user?.role === UserRole.PI) && (
              <p className="text-gray-500 text-sm">Contact an administrator or PI to create a new project.</p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
              >
                {/* Project Header */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold flex-1">{project.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)} bg-white/20 text-white`}>
                      {project.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-blue-100 text-sm line-clamp-2">{project.summary}</p>
                </div>

                {/* Project Body */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Tags */}
                  {project.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.split(',').map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Dates */}
                  <div className="space-y-2 mb-6 text-sm text-gray-600">
                    {project.startDate && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span>Start: {new Date(project.startDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    {project.endDate && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span>End: {new Date(project.endDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto space-y-2">
                    <Link
                      to={`/projects/${project.id}`}
                      className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg font-medium"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Section */}
        {projects.length > 0 && (
          <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3 mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Click "View Details" to:</h3>
                <ul className="space-y-1 text-gray-700">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    View project milestones and track progress
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Upload and manage project documents
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    See full project information and updates
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
              <h2 className="text-2xl font-bold">Create New Project</h2>
            </div>
            
            <form onSubmit={handleCreateProject} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Project Title *</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter project title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Summary *</label>
                <textarea
                  required
                  value={projectForm.summary}
                  onChange={(e) => setProjectForm({...projectForm, summary: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Brief project description"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status *</label>
                <select
                  required
                  value={projectForm.status}
                  onChange={(e) => setProjectForm({...projectForm, status: e.target.value as ProjectStatus})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={ProjectStatus.PLANNING}>Planning</option>
                  <option value={ProjectStatus.ACTIVE}>Active</option>
                  <option value={ProjectStatus.ON_HOLD}>On Hold</option>
                  <option value={ProjectStatus.COMPLETED}>Completed</option>
                  <option value={ProjectStatus.ARCHIVED}>Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
                <input
                  type="text"
                  value={projectForm.tags}
                  onChange={(e) => setProjectForm({...projectForm, tags: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="AI, ML, Research (comma separated)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={projectForm.startDate}
                    onChange={(e) => setProjectForm({...projectForm, startDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">End Date *</label>
                  <input
                    type="date"
                    required
                    value={projectForm.endDate}
                    onChange={(e) => setProjectForm({...projectForm, endDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-medium"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
