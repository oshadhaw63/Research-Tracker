import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { UserRole } from '../types';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'from-purple-500 to-purple-600';
      case 'PI': return 'from-blue-500 to-blue-600';
      case 'MEMBER': return 'from-green-500 to-green-600';
      case 'VIEWER': return 'from-gray-500 to-gray-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const quickActions = [
    {
      title: 'Projects',
      description: 'View and manage research projects',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
        </svg>
      ),
      gradient: 'from-blue-500 to-blue-600',
      link: '/projects',
      show: true,
    },
    {
      title: 'Milestones',
      description: 'Track project milestones and progress',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
        </svg>
      ),
      gradient: 'from-green-500 to-green-600',
      link: '/milestones',
      show: user?.role !== UserRole.VIEWER,
    },
    {
      title: 'Documents',
      description: 'Upload and manage documents',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
        </svg>
      ),
      gradient: 'from-yellow-500 to-orange-600',
      link: '/documents',
      show: user?.role !== UserRole.VIEWER,
    },
    {
      title: 'Admin Panel',
      description: 'Manage users and system settings',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
        </svg>
      ),
      gradient: 'from-purple-500 to-purple-600',
      link: '/admin',
      show: user?.role === UserRole.ADMIN,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center">
                <svg className="w-10 h-10 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                </svg>
                Welcome back, {user?.fullName}!
              </h1>
              <p className="text-blue-100 text-lg">Ready to make research progress today?</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className={`px-5 py-2.5 bg-gradient-to-r ${getRoleBadgeColor(user?.role || '')} rounded-full font-bold shadow-lg`}>
                {user?.role}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z"/>
            </svg>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.filter(action => action.show).map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 overflow-hidden transform hover:-translate-y-2"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${action.gradient} opacity-10 rounded-bl-full transform group-hover:scale-150 transition-transform duration-300`}></div>
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${action.gradient} text-white mb-4 shadow-lg`}>
                  {action.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{action.title}</h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
                <div className="mt-4 flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                  <span>Get Started</span>
                  <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Getting Started Guide */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-xl mr-4">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Getting Started Guide</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start p-4 bg-blue-50 rounded-xl">
                <div className="flex-shrink-0 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">1</div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Explore Projects</h4>
                  <p className="text-gray-600 text-sm">Browse through all research projects and find ones relevant to your work</p>
                </div>
              </div>
              {user?.role !== UserRole.VIEWER && (
                <div className="flex items-start p-4 bg-green-50 rounded-xl">
                  <div className="flex-shrink-0 bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Track Milestones</h4>
                    <p className="text-gray-600 text-sm">Create and monitor milestones to measure project progress effectively</p>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-4">
              {user?.role !== UserRole.VIEWER && (
                <div className="flex items-start p-4 bg-yellow-50 rounded-xl">
                  <div className="flex-shrink-0 bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Upload Documents</h4>
                    <p className="text-gray-600 text-sm">Share research papers, data, and resources with your team</p>
                  </div>
                </div>
              )}
              {(user?.role === UserRole.PI || user?.role === UserRole.ADMIN) && (
                <div className="flex items-start p-4 bg-purple-50 rounded-xl">
                  <div className="flex-shrink-0 bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-3">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Manage Projects</h4>
                    <p className="text-gray-600 text-sm">Create new projects, assign team members, and track overall progress</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
