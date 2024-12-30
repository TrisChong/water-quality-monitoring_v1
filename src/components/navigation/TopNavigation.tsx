import { Link, useLocation } from 'react-router-dom';
import { FileText, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const TopNavigation = () => {
  const location = useLocation();
  const { logout, isAuthenticated } = useAuth();

  const isActive = (path: string) => 
    location.pathname === path ? 'text-emerald-600' : 'text-gray-600';

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-white shadow-md py-2 sticky top-0 z-50">
      <div className="max-w-[425px] mx-auto flex justify-end items-center gap-4 px-4">
        <Link 
          to="/export" 
          className={`flex items-center gap-2 ${isActive('/export')}`}
        >
          <FileText size={20} />
          <span>Export Report</span>
        </Link>
        
        <button
          onClick={logout}
          className="flex items-center gap-2 text-red-500 hover:text-red-600"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default TopNavigation;
