import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const Milestones: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-2xl p-8 mb-8 text-white animate-fadeIn">
          <h1 className="text-4xl font-bold mb-2 flex items-center">
            <svg className="w-10 h-10 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
            </svg>
            Project Milestones
          </h1>
          <p className="text-green-100 text-lg">Track progress and deadlines for your research projects</p>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 animate-slideDown">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-green-100 rounded-lg p-3 mr-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">About Milestones</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Milestones help you track important goals and deadlines within your research projects. 
                Each milestone represents a significant achievement or checkpoint in your project timeline.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                To view and manage milestones, please select a specific project first. 
                Milestones are organized by project to help you stay focused on specific research goals.
              </p>
              <Link
                to="/projects"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg font-medium"
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
            <div className="bg-green-100 rounded-lg p-3 w-fit mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Create Milestones</h3>
            <p className="text-gray-600">
              Define important checkpoints and goals for your research projects with clear deadlines.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow animate-fadeIn" style={{animationDelay: '0.1s'}}>
            <div className="bg-blue-100 rounded-lg p-3 w-fit mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Track Progress</h3>
            <p className="text-gray-600">
              Monitor the completion status of each milestone and keep your team aligned.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow animate-fadeIn" style={{animationDelay: '0.2s'}}>
            <div className="bg-purple-100 rounded-lg p-3 w-fit mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Set Deadlines</h3>
            <p className="text-gray-600">
              Establish clear timelines and ensure your research stays on schedule.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Milestones;
