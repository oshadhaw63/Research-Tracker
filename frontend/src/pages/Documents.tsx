import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const Documents: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-2xl shadow-2xl p-8 mb-8 text-white animate-fadeIn">
          <h1 className="text-4xl font-bold mb-2 flex items-center">
            <svg className="w-10 h-10 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
            Research Documents
          </h1>
          <p className="text-yellow-100 text-lg">Manage and share research papers, reports, and files</p>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 animate-slideDown">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-orange-100 rounded-lg p-3 mr-4">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">About Documents</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                The document management system allows you to upload, organize, and share research materials 
                including papers, reports, data files, and presentations.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Documents are organized by project to keep everything well-structured. 
                Please select a project to view and manage its associated documents.
              </p>
              <Link
                to="/projects"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl hover:from-yellow-700 hover:to-orange-700 transition-all shadow-md hover:shadow-lg font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
                View Projects
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow animate-fadeIn">
            <div className="bg-blue-100 rounded-lg p-3 w-fit mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Upload Files</h3>
            <p className="text-gray-600">
              Easily upload research papers, datasets, presentations, and other project materials.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow animate-fadeIn" style={{animationDelay: '0.1s'}}>
            <div className="bg-green-100 rounded-lg p-3 w-fit mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Download & Share</h3>
            <p className="text-gray-600">
              Download documents for offline access and share them with team members securely.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow animate-fadeIn" style={{animationDelay: '0.2s'}}>
            <div className="bg-purple-100 rounded-lg p-3 w-fit mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Organize</h3>
            <p className="text-gray-600">
              Keep all project-related documents organized and easily accessible in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
