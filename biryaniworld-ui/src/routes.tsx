import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layout Components
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import Menu from './pages/Menu';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Reservations from './pages/Reservations';
import Loyalty from './pages/Loyalty';
import Campaigns from './pages/Campaigns';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import MenuManagement from './pages/admin/MenuManagement';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/menu" element={<Menu />} />

      {/* Protected Routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reservations"
        element={
          <ProtectedRoute>
            <Reservations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/loyalty"
        element={
          <ProtectedRoute>
            <Loyalty />
          </ProtectedRoute>
        }
      />
      <Route
        path="/campaigns"
        element={
          <ProtectedRoute>
            <Campaigns />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={['ADMIN']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/menu"
        element={
          <ProtectedRoute roles={['ADMIN']}>
            <MenuManagement />
          </ProtectedRoute>
        }
      />

      {/* Default Routes */}
      <Route path="/" element={<Navigate to="/menu" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes; 