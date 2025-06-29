import React, { useState } from 'react';
import { BookOpen, Moon, Sun, Focus, ArrowLeft, LogIn, UserPlus, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { isFocusMode, setIsFocusMode } = useApp();
  const { user, isAuthenticated, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Trang chủ' },
    { path: '/tools', label: 'Công cụ học tập' },
    { path: '/courses', label: 'Khóa học' },
    { path: '/resources', label: 'Tài nguyên' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Liên hệ' }
  ];

  const handleBackClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const getFirstName = (fullName: string) => {
    return fullName.split(' ')[0];
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 animate-fade-in-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center animate-fade-in-left">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3 animate-glow">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold font-poppins bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EduFocus
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8 animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium font-poppins transition-all duration-300 relative group ${
                  location.pathname === item.path
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full ${
                  location.pathname === item.path ? 'w-full' : ''
                }`}></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4 animate-fade-in-right">
            {/* Back button - only show when not on home page */}
            {location.pathname !== '/' && (
              <button
                onClick={handleBackClick}
                className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
                title="Quay lại"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}

            {/* Focus mode toggle - only show on tools page for authenticated users */}
            {location.pathname === '/tools' && isAuthenticated && (
              <button
                onClick={() => setIsFocusMode(!isFocusMode)}
                className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
                  isFocusMode
                    ? 'bg-purple-500 text-white animate-pulse'
                    : 'bg-purple-100 text-purple-600 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:hover:bg-purple-900/50'
                }`}
                title={isFocusMode ? 'Thoát chế độ tập trung' : 'Chế độ tập trung'}
              >
                <Focus className="h-5 w-5" />
              </button>
            )}
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110 hover:rotate-180"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Auth section */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
                >
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-8 h-8 rounded-full object-cover border-2 border-blue-200 dark:border-blue-700"
                  />
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white font-poppins">
                      Xin chào, {getFirstName(user.fullName)}!
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-inter">
                      {user.school}
                    </p>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* User dropdown menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 animate-fade-in-down">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.avatar}
                          alt={user.fullName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white font-poppins">
                            {user.fullName}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 font-inter">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3 font-inter">
                        <User className="h-4 w-4" />
                        <span>Hồ sơ cá nhân</span>
                      </button>
                      <button className="w-full px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3 font-inter">
                        <Settings className="h-4 w-4" />
                        <span>Cài đặt</span>
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 py-2">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center space-x-3 font-inter"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium font-poppins"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">Đăng nhập</span>
                </Link>
                
                <Link
                  to="/register"
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-medium font-poppins hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-glow"
                >
                  <UserPlus className="h-4 w-4" />
                  <span className="hidden sm:inline">Đăng ký</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;