import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { Activity, LogOut, UserCircle, FileText } from 'lucide-react';

const UserNavigation = () => {
  const { logout } = useAuth();

  return (
    <nav className="bg-white shadow-md rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link 
            to="/dashboard" 
            className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
          >
            <Activity size={20} />
            <span>Dashboard</span>
          </Link>
          <Link 
            to="/profile" 
            className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
          >
            <UserCircle size={20} />
            <span>Profile</span>
          </Link>
          <Link 
            to="/export" 
            className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
          >
            <FileText size={20} />
            <span>Export Report</span>
          </Link>
        </div>
        <button
          onClick={logout}
          className="flex items-center space-x-2 text-red-500 hover:text-red-600"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default UserNavigation;