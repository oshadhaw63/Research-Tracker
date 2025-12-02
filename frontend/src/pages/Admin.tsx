import React, { useEffect, useState } from 'react';
import { userService } from '../services/userService';
import { User, UserRole } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getAllUsers();
      if (response.success && response.data) {
        setUsers(response.data);
      } else {
        setError(response.message || 'Failed to fetch users');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await userService.deleteUser(userId);
      if (response.success) {
        setUsers(users.filter(user => user.id !== userId));
        alert('User deleted successfully');
      } else {
        alert(response.message || 'Failed to delete user');
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete user');
    }
  };

  const handleEditRole = (userId: string, currentRole: UserRole) => {
    setEditingUserId(userId);
    setSelectedRole(currentRole);
  };

  const handleUpdateRole = async (userId: string) => {
    if (!selectedRole) return;

    try {
      const response = await userService.updateUserRole(userId, selectedRole);
      if (response.success && response.data) {
        setUsers(users.map(user => 
          user.id === userId ? response.data! : user
        ));
        setEditingUserId(null);
        setSelectedRole(null);
        alert('User role updated successfully');
      } else {
        alert(response.message || 'Failed to update user role');
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update user role');
    }
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setSelectedRole(null);
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'bg-red-100 text-red-800';
      case UserRole.PI:
        return 'bg-purple-100 text-purple-800';
      case UserRole.MEMBER:
        return 'bg-blue-100 text-blue-800';
      case UserRole.VIEWER:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl shadow-2xl p-8 mb-8 text-white animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
              <p className="text-red-100 text-lg">Manage users and system settings</p>
            </div>
            <svg className="w-16 h-16 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold text-gray-800">{users.length}</p>
              </div>
              <div className="bg-red-100 rounded-full p-3">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Admins</p>
                <p className="text-3xl font-bold text-gray-800">
                  {users.filter(u => u.role === UserRole.ADMIN).length}
                </p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">PIs</p>
                <p className="text-3xl font-bold text-gray-800">
                  {users.filter(u => u.role === UserRole.PI).length}
                </p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Members</p>
                <p className="text-3xl font-bold text-gray-800">
                  {users.filter(u => u.role === UserRole.MEMBER).length}
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">User Management</h2>
            <p className="text-gray-600 text-sm mt-1">View and manage all system users</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <p className="text-gray-500 text-lg font-medium">No users found</p>
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors animate-slideDown" style={{ animationDelay: `${index * 50}ms` }}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                            {user.fullName.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                            <div className="text-sm text-gray-500">ID: {user.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">@{user.username}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingUserId === user.id ? (
                          <div className="flex items-center space-x-2">
                            <select
                              value={selectedRole || user.role}
                              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                              className="text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value={UserRole.ADMIN}>ADMIN</option>
                              <option value={UserRole.PI}>PI</option>
                              <option value={UserRole.MEMBER}>MEMBER</option>
                              <option value={UserRole.VIEWER}>VIEWER</option>
                            </select>
                            <button
                              onClick={() => handleUpdateRole(user.id)}
                              className="text-green-600 hover:text-green-900 font-medium"
                            >
                              ✓
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="text-gray-600 hover:text-gray-900 font-medium"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <span 
                            onClick={() => user.role !== UserRole.ADMIN && handleEditRole(user.id, user.role)}
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === UserRole.ADMIN ? '' : 'cursor-pointer hover:opacity-80'} transition-opacity ${getRoleBadgeColor(user.role)}`}
                            title={user.role === UserRole.ADMIN ? 'Admin roles cannot be changed' : 'Click to edit role'}
                          >
                            {user.role}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {user.role !== UserRole.ADMIN ? (
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-900 font-medium transition-colors"
                          >
                            Delete
                          </button>
                        ) : (
                          <span className="text-gray-400 font-medium" title="Admin users cannot be deleted">
                            Protected
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
