import React from 'react';
import { LayoutDashboard, Box, Truck, Users, Settings, Building2, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: 'dashboard' | 'business-units' | 'customers') => void;
  currentView: string;
}

const Sidebar = ({ isOpen, onClose, onNavigate, currentView }: SidebarProps) => {
  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, view: 'dashboard' as const },
    { name: 'Business Units', icon: Building2, view: 'business-units' as const },
    { name: 'Customers', icon: Users, view: 'customers' as const },
    { name: 'Shipments', icon: Box, view: 'shipments' as const },
    { name: 'Fleet', icon: Truck, view: 'fleet' as const },
    { name: 'Settings', icon: Settings, view: 'settings' as const },
  ];

  const sidebarClasses = `
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:translate-x-0 lg:static fixed inset-y-0 left-0 z-50
    w-64 bg-white border-r border-gray-200 pb-4 flex flex-col
    transform transition-transform duration-200 ease-in-out
  `;

  return (
    <>
      <div className={sidebarClasses}>
        <div className="h-16 flex items-center justify-between px-4 lg:hidden">
          <span className="text-xl font-bold text-gray-900">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 px-2 space-y-1 mt-4">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                if (['dashboard', 'business-units', 'customers'].includes(item.view)) {
                  onNavigate(item.view as 'dashboard' | 'business-units' | 'customers');
                }
                onClose();
              }}
              className={`
                w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md
                ${currentView === item.view
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              <item.icon
                className={`
                  mr-3 h-5 w-5
                  ${currentView === item.view ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'}
                `}
              />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="px-4 mt-auto">
          <div className="bg-indigo-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Truck className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-indigo-600">Need Help?</p>
                <p className="text-sm text-indigo-500">Contact support</p>
              </div>
            </div>
          </div>
        </div>
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