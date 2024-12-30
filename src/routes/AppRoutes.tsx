import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import UserDashboard from '../components/dashboard/UserDashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import UserProfile from '../components/dashboard/profile/UserProfile';
import Conclusion from '../components/pages/Conclusion';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/conclusion" element={<Conclusion />} />

      {/* Protected routes */}
      <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
      <Route path="/admin" element={<PrivateRoute requireAdmin><AdminDashboard /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;