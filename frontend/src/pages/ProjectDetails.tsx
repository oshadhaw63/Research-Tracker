import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { milestoneService, MilestoneRequest } from '../services/milestoneService';
import { documentService, DocumentRequest } from '../services/documentService';
import { Project, Milestone, Document, UserRole, ProjectStatus } from '../types';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [project, setProject] = useState<Project | null>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'milestones' | 'documents'>('overview');
  
  // Modals
  const [showEditProject, setShowEditProject] = useState(false);
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [showAddDocument, setShowAddDocument] = useState(false);
  
  // Forms
  const [projectForm, setProjectForm] = useState({
    title: '',
    summary: '',
    status: ProjectStatus.PLANNING,
    tags: '',
    startDate: '',
    endDate: ''
  });
  
  const [milestoneForm, setMilestoneForm] = useState<MilestoneRequest>({
    title: '',
    description: '',
    dueDate: '',
    isCompleted: false,
    createdById: user?.id || ''
  });
  
  const [documentForm, setDocumentForm] = useState<DocumentRequest>({
    title: '',
    description: '',
    urlOrPath: '',
    uploadedById: user?.id || ''
  });

  useEffect(() => {
    if (id) {
      fetchProjectDetails();
      fetchMilestones();
      fetchDocuments();
    }
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      setLoading(true);
      const response = await projectService.getProjectById(id!);
      if (response.success) {
        setProject(response.data);
        setProjectForm({
          title: response.data.title,
          summary: response.data.summary,
          status: response.data.status,
          tags: response.data.tags,
          startDate: response.data.startDate,
          endDate: response.data.endDate
        });
      }
    } catch (error) {
      // Error handling done by component
    } finally {
      setLoading(false);
    }
  };

  const fetchMilestones = async () => {
    try {
      const response = await milestoneService.getMilestonesByProjectId(id!);
      if (response.success) {
        setMilestones(response.data || []);
      }
    } catch (error) {
      // Error handling done by component
    }
  };

  const fetchDocuments = async () => {
    try {
      const response = await documentService.getDocumentsByProjectId(id!);
      if (response.success) {
        setDocuments(response.data || []);
      }
    } catch (error) {
      // Error handling done by component
    }
  };

  const handleDeleteMilestone = async (milestoneId: string) => {
    if (window.confirm('Are you sure you want to delete this milestone?')) {
      try {
        await milestoneService.deleteMilestone(milestoneId);
        fetchMilestones();
      } catch (error) {
        console.error('Error deleting milestone:', error);
      }
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await documentService.deleteDocument(documentId);
        fetchDocuments();
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    }
  };

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await projectService.updateProject(id!, { ...projectForm, piId: project!.pi.id });
      await fetchProjectDetails();
      setShowEditProject(false);
      alert('Project updated successfully!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to update project');
    }
  };

  const handleAddMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await milestoneService.createMilestone(id!, { ...milestoneForm, createdById: user!.id });
      await fetchMilestones();
      setShowAddMilestone(false);
      setMilestoneForm({
        title: '',
        description: '',
        dueDate: '',
        isCompleted: false,
        createdById: user?.id || ''
      });
      alert('Milestone created successfully!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to create milestone');
    }
  };

  const handleAddDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await documentService.createDocument(id!, { ...documentForm, uploadedById: user!.id });
      await fetchDocuments();
      setShowAddDocument(false);
      setDocumentForm({
        title: '',
        description: '',
        urlOrPath: '',
        uploadedById: user?.id || ''
      });
      alert('Document uploaded successfully!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to upload document');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Not Found</h2>
          <button
            onClick={() => navigate('/projects')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <button
          onClick={() => navigate('/projects')}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-700 font-medium"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back to Projects
        </button>

        {/* Project Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-3">{project.title}</h1>
              <p className="text-blue-100 text-lg mb-4">{project.summary}</p>
              <div className="flex flex-wrap gap-4 items-center">
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">
                  Status: {project.status}
                </span>
                {project.pi && (
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">
                    PI: {project.pi.fullName}
                  </span>
                )}
              </div>
            </div>
            {(user?.role === UserRole.ADMIN || user?.role === UserRole.PI) && (
              <button
                onClick={() => setShowEditProject(true)}
                className="ml-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                Edit Project
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-8 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('milestones')}
                className={`px-8 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'milestones'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Milestones ({milestones.length})
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`px-8 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'documents'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Documents ({documents.length})
              </button>
            </nav>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Project Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Start Date</label>
                      <p className="text-gray-800 font-medium">
                        {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'Not set'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">End Date</label>
                      <p className="text-gray-800 font-medium">
                        {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Not set'}
                      </p>
                    </div>
                  </div>
                </div>

                {project.tags && (
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.split(',').map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Milestones Tab */}
            {activeTab === 'milestones' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Project Milestones</h3>
                  {(user?.role === UserRole.ADMIN || user?.role === UserRole.PI) && (
                    <button
                      onClick={() => setShowAddMilestone(true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                      </svg>
                      Add Milestone
                    </button>
                  )}
                </div>

                {milestones.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                    <p className="text-gray-500 text-lg">No milestones yet</p>
                    <p className="text-gray-400 text-sm mt-2">Create milestones to track project progress</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {milestones.map((milestone) => (
                      <div key={milestone.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-gray-800 mb-2">{milestone.title}</h4>
                            <p className="text-gray-600 mb-3">{milestone.description}</p>
                            <div className="flex items-center text-sm text-gray-500">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                              </svg>
                              Due: {new Date(milestone.dueDate).toLocaleDateString()}
                            </div>
                          </div>
                          {(user?.role === UserRole.ADMIN || user?.role === UserRole.PI) && (
                            <button
                              onClick={() => handleDeleteMilestone(milestone.id)}
                              className="ml-4 text-red-600 hover:text-red-700"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Project Documents</h3>
                  {(user?.role === UserRole.ADMIN || user?.role === UserRole.PI || user?.role === UserRole.MEMBER) && (
                    <button
                      onClick={() => setShowAddDocument(true)}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                      </svg>
                      Upload Document
                    </button>
                  )}
                </div>

                {documents.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                    </svg>
                    <p className="text-gray-500 text-lg">No documents yet</p>
                    <p className="text-gray-400 text-sm mt-2">Upload documents to share with your team</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {documents.map((doc) => (
                      <div key={doc.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center">
                            <div className="bg-blue-100 rounded-lg p-2 mr-3">
                              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                              </svg>
                            </div>
                          </div>
                          {(user?.role === UserRole.ADMIN || user?.role === UserRole.PI) && (
                            <button
                              onClick={() => handleDeleteDocument(doc.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                              </svg>
                            </button>
                          )}
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-1 truncate">{doc.title}</h4>
                        {doc.description && (
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{doc.description}</p>
                        )}
                        <div className="text-xs text-gray-500">
                          {doc.uploadedBy && <p>By: {doc.uploadedBy.fullName}</p>}
                          <p>Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}</p>
                        </div>
                        {doc.urlOrPath && (
                          <a
                            href={doc.urlOrPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                            </svg>
                            Download
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Edit Project Modal */}
        {showEditProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">Edit Project</h2>
              <form onSubmit={handleUpdateProject} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Summary</label>
                  <textarea
                    value={projectForm.summary}
                    onChange={(e) => setProjectForm({...projectForm, summary: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({...projectForm, status: e.target.value as ProjectStatus})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {Object.values(ProjectStatus).map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={projectForm.tags}
                    onChange={(e) => setProjectForm({...projectForm, tags: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={projectForm.startDate}
                      onChange={(e) => setProjectForm({...projectForm, startDate: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      value={projectForm.endDate}
                      onChange={(e) => setProjectForm({...projectForm, endDate: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowEditProject(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Update Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Milestone Modal */}
        {showAddMilestone && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Add Milestone</h2>
              <form onSubmit={handleAddMilestone} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={milestoneForm.title}
                    onChange={(e) => setMilestoneForm({...milestoneForm, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={milestoneForm.description}
                    onChange={(e) => setMilestoneForm({...milestoneForm, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={milestoneForm.dueDate}
                    onChange={(e) => setMilestoneForm({...milestoneForm, dueDate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={milestoneForm.isCompleted}
                    onChange={(e) => setMilestoneForm({...milestoneForm, isCompleted: e.target.checked})}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-700">Mark as Completed</label>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddMilestone(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Create Milestone
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Document Modal */}
        {showAddDocument && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full">
              <h2 className="text-2xl font-bold mb-6">Upload Document</h2>
              <form onSubmit={handleAddDocument} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={documentForm.title}
                    onChange={(e) => setDocumentForm({...documentForm, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={documentForm.description}
                    onChange={(e) => setDocumentForm({...documentForm, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL or File Path</label>
                  <input
                    type="text"
                    value={documentForm.urlOrPath}
                    onChange={(e) => setDocumentForm({...documentForm, urlOrPath: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                    placeholder="https://example.com/document.pdf or /path/to/file.pdf"
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowAddDocument(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                  >
                    Upload Document
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
