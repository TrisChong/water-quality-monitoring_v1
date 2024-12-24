import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  to: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon: Icon, children }) => {
  return (
    <Link 
      to={to} 
      className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
    >
      <Icon size={20} />
      <span>{children}</span>
    </Link>
  );
};

export default NavLink;