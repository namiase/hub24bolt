import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Box, 
  Truck, 
  Users, 
  Settings, 
  Building2, 
  X,
  ChevronRight,
  MenuIcon,
  Eye,
  Plus,
  Package
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  name: string;
  icon: React.ElementType;
  path?: string;
  subItems?: {
    name: string;
    path: string;
    icon: React.ElementType;
  }[];
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMinimized, setIsMinimized] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const navigation: MenuItem[] = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { 
      name: 'Business Units', 
      icon: Building2,
      subItems: [
        { name: 'View All', path: '/business-units', icon: Eye },
        { name: 'Create New', path: '/business-units/create', icon: Plus },
      ]
    },
    { 
      name: 'Customers', 
      icon: Users,
      subItems: [
        { name: 'View All', path: '/customers', icon: Eye },
        { name: 'Create New', path: '/customers/create', icon: Plus },
      ]
    },
    { name: 'Shipments', icon: Box, path: '/shipments' },
    { name: 'Fleet', icon: Truck, path: '/fleet' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setExpandedItem(null);
  };

  const isExpanded = isHovered || !isMinimized;

  const sidebarClasses = `
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    ${isMinimized && !isHovered ? 'w-16' : 'w-64'}
    lg:translate-x-0 lg:static fixed inset-y-0 left-0 z-50
    bg-white border-r border-gray-200 pb-4 flex flex-col
    transform transition-all duration-200 ease-in-out
  `;

  return (
    <>
      <div 
        className={sidebarClasses}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="h-16 flex items-center justify-between px-4">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-indigo-600" />
            {isExpanded && (
              <span className="ml-2 text-xl font-bold text-gray-900">SwiftShip</span>
            )}
          </div>
          <button
            onClick={toggleMinimize}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 lg:block hidden"
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          {isOpen && !isMinimized && (
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 lg:hidden"
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>

        <nav className="flex-1 px-2 space-y-1 mt-4">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.subItems ? (
                <>
                  <button
                    onClick={() => setExpandedItem(expandedItem === item.name ? null : item.name)}
                    className={`
                      w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md
                      ${location.pathname.startsWith(item.path || '')
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }
                    `}
                  >
                    <item.icon
                      className={`
                        ${isMinimized && !isExpanded ? 'mr-0' : 'mr-3'}
                        h-5 w-5
                        ${location.pathname.startsWith(item.path || '') ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'}
                      `}
                    />
                    {isExpanded && (
                      <>
                        <span className="flex-1">{item.name}</span>
                        <ChevronRight
                          className={`h-4 w-4 transform transition-transform ${
                            expandedItem === item.name ? 'rotate-90' : ''
                          }`}
                        />
                      </>
                    )}
                  </button>
                  {isExpanded && expandedItem === item.name && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem.path}
                          onClick={() => handleNavigation(subItem.path)}
                          className={`
                            w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md
                            ${location.pathname === subItem.path
                              ? 'bg-indigo-50 text-indigo-600'
                              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                            }
                          `}
                        >
                          <subItem.icon className="h-4 w-4 mr-3 text-gray-400 group-hover:text-gray-500" />
                          {subItem.name}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => item.path && handleNavigation(item.path)}
                  className={`
                    w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md
                    ${location.pathname === item.path
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  <item.icon
                    className={`
                      ${isMinimized && !isExpanded ? 'mr-0' : 'mr-3'}
                      h-5 w-5
                      ${location.pathname === item.path ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'}
                    `}
                  />
                  {isExpanded && item.name}
                </button>
              )}
            </div>
          ))}
        </nav>

        {isExpanded && (
          <div className="px-4 mt-auto">
            <div className="bg-indigo-50 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Package className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-indigo-600">Need Help?</p>
                  <p className="text-sm text-indigo-500">Contact support</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;