import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import { AuthProvider } from './hooks/useAuth';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import LoginPage from './components/auth/LoginPage';
import RecoverPassword from './components/auth/RecoverPassword';
import AuthGuard from './components/auth/AuthGuard';
import UserMenu from './components/UserMenu';
import WarehouseSelector from './components/WarehouseSelector';
import BusinessUnitManagement from './components/BusinessUnitManagement';
import CustomerManagement from './components/CustomerManagement';
import CreateShipment from './components/shipment/CreateShipment';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AuthGuard>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/recover-password" element={<RecoverPassword />} />
            <Route
              path="/*"
              element={
                <ProtectedLayout>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard onNewShipment={() => {}} />} />
                    <Route path="/business-units" element={<BusinessUnitManagement />} />
                    <Route path="/customers" element={<CustomerManagement />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </ProtectedLayout>
              }
            />
          </Routes>
        </AuthGuard>
      </AuthProvider>
    </Router>
  );
}

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = React.useState('1');
  const [currentView, setCurrentView] = React.useState<'dashboard' | 'business-units' | 'customers'>('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={(view) => setCurrentView(view)}
        currentView={currentView}
      />

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">SwiftShip</span>
              </div>

              <div className="flex items-center space-x-4">
                <WarehouseSelector
                  value={selectedWarehouse}
                  onChange={setSelectedWarehouse}
                />
                
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-3 focus:outline-none"
                  >
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-indigo-600">JD</span>
                    </div>
                  </button>
                  
                  <UserMenu isOpen={isUserMenuOpen} onClose={() => setIsUserMenuOpen(false)} />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;