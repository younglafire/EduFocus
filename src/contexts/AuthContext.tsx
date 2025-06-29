import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  fullName: string;
  email: string;
  school: string;
  avatar?: string;
  joinedAt: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
}

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  school: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const savedUser = localStorage.getItem('edufocus_user');
        const sessionExpiry = localStorage.getItem('edufocus_session_expiry');
        
        if (savedUser && sessionExpiry) {
          const expiryDate = new Date(sessionExpiry);
          const now = new Date();
          
          if (now < expiryDate) {
            // Session is still valid
            const userData = JSON.parse(savedUser);
            // Ensure joinedAt is a Date object
            userData.joinedAt = new Date(userData.joinedAt);
            setUser(userData);
          } else {
            // Session expired, clear storage
            localStorage.removeItem('edufocus_user');
            localStorage.removeItem('edufocus_session_expiry');
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear corrupted data
        localStorage.removeItem('edufocus_user');
        localStorage.removeItem('edufocus_session_expiry');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication - in real app, validate credentials with your API
      if (email === 'demo@edufocus.vn' && password === 'demo123') {
        throw new Error('Email hoặc mật khẩu không chính xác');
      }
      
      // Mock user data - in real app, this would come from your API
      const userData: User = {
        id: '1',
        fullName: 'Nguyễn Văn An',
        email: email,
        school: 'Đại học Bách Khoa Hà Nội',
        avatar: 'https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg?auto=compress&cs=tinysrgb&w=100',
        joinedAt: new Date()
      };

      // Set session expiry (7 days from now)
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);

      // Save to localStorage
      localStorage.setItem('edufocus_user', JSON.stringify(userData));
      localStorage.setItem('edufocus_session_expiry', expiryDate.toISOString());

      setUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock user creation - in real app, this would come from your API
      const newUser: User = {
        id: Date.now().toString(),
        fullName: userData.fullName,
        email: userData.email,
        school: userData.school,
        avatar: 'https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg?auto=compress&cs=tinysrgb&w=100',
        joinedAt: new Date()
      };

      // Set session expiry (7 days from now)
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);

      // Save to localStorage
      localStorage.setItem('edufocus_user', JSON.stringify(newUser));
      localStorage.setItem('edufocus_session_expiry', expiryDate.toISOString());

      setUser(newUser);
    } catch (error) {
      throw new Error('Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('edufocus_user');
    localStorage.removeItem('edufocus_session_expiry');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};