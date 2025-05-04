import React from 'react';
import { ActivitySquare, MenuIcon } from 'lucide-react';

interface HeaderProps {
  openSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ openSidebar }) => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center">
        <button 
          className="mr-4 md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={openSidebar}
        >
          <MenuIcon size={24} />
        </button>
        
        <div className="flex items-center">
          <ActivitySquare size={28} className="text-blue-600 mr-2" />
          <h1 className="text-xl font-bold text-gray-900">HabitTrack</h1>
        </div>
      </div>
      
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-sm font-medium text-blue-600">JS</span>
        </div>
      </div>
    </header>
  );
};

export default Header;