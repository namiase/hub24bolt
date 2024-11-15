import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (
    username: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  recoverPassword: (
    email: string
  ) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('authToken');
  });
  const navigate = useNavigate();

  // Mock API calls - replace with actual implementations
  const login = useCallback(async (username: string, password: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (username === 'admin' && password === 'password') {
        const token = 'mock-token';
        localStorage.setItem('authToken', token);
        setIsAuthenticated(true);
        return { success: true };
      }

      return { success: false, error: 'Usuario o contraseña incorrectos' };
    } catch (error) {
      return {
        success: false,
        error: error ?? 'Error al intentar iniciar sesión',
      };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/login');
  }, [navigate]);

  const recoverPassword = useCallback(async (email: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (email.includes('@')) {
        return { success: true };
      }

      return { success: false, error: 'Correo o usuario incorrecto' };
    } catch (error) {
      console.log(error);
      return { success: false, error: 'Error al procesar la solicitud' };
    }
  }, []);

  useEffect(() => {
    // Check token validity on mount
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, recoverPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
