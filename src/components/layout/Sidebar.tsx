import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  PieChart, 
  Settings, 
  BarChart, 
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Habits', href: '/habits', icon: Activity },
    { name: 'Stats', href: '/stats', icon: BarChart },
    { name: 'Insights', href: '/insights', icon: PieChart },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-30 transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <Activity size={24} className="text-blue-600 mr-2" />
            <h1 className="text-lg font-bold text-gray-900">HabitTrack</h1>
          </div>
          
          <button 
            className="text-gray-500 hover:text-gray-700 md:hidden"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="mt-6 px-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => onClose()}
                >
                  <Icon 
                    size={20} 
                    className={`mr-3 ${
                      isActive(item.href) ? 'text-blue-600' : 'text-gray-500'
                    }`} 
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800">Tip of the day</h3>
            <p className="text-xs text-blue-600 mt-1">
              Small, consistent habits lead to big changes over time. Keep going!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;