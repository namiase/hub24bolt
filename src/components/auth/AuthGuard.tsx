import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface AuthGuardProps {
  children: React.ReactNode;
}

const publicRoutes = ['/login', '/recover-password'];

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const isPublicRoute = publicRoutes.includes(location.pathname);

    if (!isAuthenticated && !isPublicRoute) {
      // Redirect to login if not authenticated and trying to access protected route
      navigate('/login');
    } else if (isAuthenticated && isPublicRoute) {
      // Redirect to dashboard if already authenticated and trying to access public route
      navigate('/dashboard');
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return <>{children}</>;
};

export default AuthGuard;