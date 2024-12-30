import { Link, useLocation } from 'react-router-dom';
import { Users, Settings, UserCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const TopNavigation = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const isActive = (path: string) => 
    location.pathname === path ? 'text-emerald-600' : 'text-gray-600';

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-white shadow-md py-2 sticky top-0 z-50">
      <div className="max-w-[425px] mx-auto grid grid-cols-3 gap-2">
        {user?.role === 'admin' && (
          <Link 
            to="/users" 
            className={`flex flex-col items-center justify-center ${isActive('/users')}`}
          >
            <Users size={20} />
            <span className="text-xs mt-1">Users</span>
          </Link>
        )}
        
        {user?.role === 'admin' && (
          <Link 
            to="/sensors" 
            className={`flex flex-col items-center justify-center ${isActive('/sensors')}`}
          >
            <Settings size={20} />
            <span className="text-xs mt-1">Sensors</span>
          </Link>
        )}
        
        <Link 
          to="/profile" 
          className={`flex flex-col items-center justify-center ${isActive('/profile')}`}
        >
          <UserCircle size={20} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default TopNavigation;
