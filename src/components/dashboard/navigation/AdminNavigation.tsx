import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { Activity, LogOut, UserCircle, FileText, Users, Settings } from 'lucide-react';

const AdminNavigation = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-emerald-800 font-semibold' : 'text-emerald-600';
  };

  return (
    <nav className="bg-white shadow-md rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link 
            to="/admin" 
            className={`flex items-center space-x-2 ${isActive('/admin')} hover:text-emerald-700`}
          >
            <Activity size={10} />
            <span>Dashboard</span>
          </Link>
       
          <Link 
            to="/admin/export" 
            className={`flex items-center space-x-2 ${isActive('/admin/export')} hover:text-emerald-700`}
          >
            <FileText size={10} />
            <span>Export</span>
          </Link>
        </div>
        <button
          onClick={logout}
          className="flex items-center space-x-2 text-red-500 hover:text-red-600"
        >
          <LogOut size={10} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default AdminNavigation;
