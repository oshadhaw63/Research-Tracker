import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  const isActive = (path: string) => location.pathname === path;

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-purple-500';
      case 'PI': return 'bg-blue-500';
      case 'MEMBER': return 'bg-green-500';
      case 'VIEWER': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-2 group">
              <div className="bg-white/10 p-2 rounded-lg group-hover:bg-white/20 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight">Research Tracker</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive('/dashboard')
                    ? 'bg-white/20 shadow-lg'
                    : 'hover:bg-white/10'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/projects"
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive('/projects')
                    ? 'bg-white/20 shadow-lg'
                    : 'hover:bg-white/10'
                }`}
              >
                Projects
              </Link>
              {user?.role === UserRole.ADMIN && (
                <Link
                  to="/admin"
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive('/admin')
                      ? 'bg-white/20 shadow-lg'
                      : 'hover:bg-white/10'
                  }`}
                >
                  Admin Panel
                </Link>
              )}
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all"
              >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                  {user?.fullName?.charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium">{user?.fullName}</div>
                  <div className={`text-xs px-2 py-0.5 rounded-full ${getRoleBadgeColor(user?.role || '')} inline-block mt-0.5`}>
                    {user?.role}
                  </div>
                </div>
                <svg className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-2xl py-2 text-gray-800 animate-fadeIn">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-medium text-gray-900">{user?.fullName}</p>
                    <p className="text-xs text-gray-500">{user?.username}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600 font-medium flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"/>
                    </svg>
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-slideDown">
            <Link to="/dashboard" className="block px-4 py-2 hover:bg-white/10 rounded">Dashboard</Link>
            <Link to="/projects" className="block px-4 py-2 hover:bg-white/10 rounded">Projects</Link>
            {user?.role === UserRole.ADMIN && (
              <Link to="/admin" className="block px-4 py-2 hover:bg-white/10 rounded">Admin Panel</Link>
            )}
            <div className="border-t border-white/20 mt-2 pt-2">
              <div className="px-4 py-2 text-sm">{user?.fullName} ({user?.role})</div>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-300 hover:bg-white/10 rounded">
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
