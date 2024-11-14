import React, { useRef, useEffect } from 'react';
import { User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserMenu = ({ isOpen, onClose }: UserMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleLogout = () => {
    onClose();
    logout();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    >
      <div className="py-1" role="menu">
        <div className="px-4 py-2 border-b">
          <p className="text-sm font-medium text-gray-900">John Doe</p>
          <p className="text-sm text-gray-500">john@example.com</p>
        </div>
        
        <a
          href="#"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          <User className="mr-3 h-4 w-4 text-gray-400" />
          Tu Perfil
        </a>

        <a
          href="#"
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
        >
          <Settings className="mr-3 h-4 w-4 text-gray-400" />
          Configuración
        </a>

        <div className="border-t">
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
            role="menuitem"
          >
            <LogOut className="mr-3 h-4 w-4 text-red-400" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;