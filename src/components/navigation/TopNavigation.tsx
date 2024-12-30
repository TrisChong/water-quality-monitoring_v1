import { Link, useLocation } from 'react-router-dom';
import { Activity, Users, Settings, UserCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const TopNavigation = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const isActive = (path: string) => 
    location.pathname === path ? 'text-emerald-600' : 'text-gray-600';

  if (!isAuthenticated) {
    return null; // Don't show navigation when not authenticated
  }

  return (
    <nav className="bg-white shadow-md p-2 sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-[425px] mx-auto">
        <Link to="/dashboard" className={`flex flex-col items-center ${isActive('/dashboard')}`}>
          <Activity size={20} />
          <span className="text-xs">Dashboard</span>
        </Link>
        
        {user?.role === 'admin' && (
          <Link to="/users" className={`flex flex-col items-center ${isActive('/users')}`}>
            <Users size={20} />
            <span className="text-xs">Users</span>
          </Link>
        )}
        
        {user?.role === 'admin' && (
          <Link to="/sensors" className={`flex flex-col items-center ${isActive('/sensors')}`}>
            <Settings size={20} />
            <span className="text-xs">Sensors</span>
          </Link>
        )}
        
        <Link to="/profile" className={`flex flex-col items-center ${isActive('/profile')}`}>
          <UserCircle size={20} />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default TopNavigation;