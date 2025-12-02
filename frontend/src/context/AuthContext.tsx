import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { UserRole } from '../types';

interface User {
  id: string;
  username: string;
  fullName: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Load user and token from localStorage on mount
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      try {
        // Check if token is expired
        const decoded: any = jwtDecode(savedToken);
        if (decoded.exp * 1000 > Date.now()) {
          setToken(savedToken);
          setUser(JSON.parse(savedUser));
        } else {
          // Token expired, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const hasRole = (roles: UserRole[]): boolean => {
    return user ? roles.includes(user.role) : false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
