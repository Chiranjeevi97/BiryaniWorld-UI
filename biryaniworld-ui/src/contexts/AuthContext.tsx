import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../store/slices/authSlice';

export interface User {
  customerId: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem('token');
    return !!token;
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // TODO: Validate token with backend
      // For now, we'll just set a mock user
      const mockUser = {
        customerId: 1,
        name: 'Test User',
        email: 'test@example.com',
        role: 'USER'
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      dispatch(loginSuccess(mockUser));
      localStorage.setItem('user', JSON.stringify(mockUser));
    }
    setLoading(false);
  }, [dispatch]);

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, error: null, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 