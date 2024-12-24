import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import UserDashboard from '../components/dashboard/UserDashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import UserProfile from '../components/dashboard/profile/UserProfile';
import DataExport from '../components/dashboard/reports/DataExport';
import UserManagement from '../components/dashboard/users/UserManagement';
import SensorManagement from '../components/dashboard/sensors/SensorManagement';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />

      {/* User routes */}
      <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
      <Route path="/export" element={<PrivateRoute><DataExport /></PrivateRoute>} />
      
      {/* Admin routes */}
      <Route path="/admin" element={<PrivateRoute requireAdmin><AdminDashboard /></PrivateRoute>} />
      <Route path="/admin/users" element={<PrivateRoute requireAdmin><UserManagement /></PrivateRoute>} />
      <Route path="/admin/sensors" element={<PrivateRoute requireAdmin><SensorManagement /></PrivateRoute>} />
      <Route path="/admin/profile" element={<PrivateRoute requireAdmin><UserProfile /></PrivateRoute>} />
      <Route path="/admin/export" element={<PrivateRoute requireAdmin><DataExport /></PrivateRoute>} />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;