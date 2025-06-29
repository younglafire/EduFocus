import React from 'react';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';
import PomodoroTimer from './tools/PomodoroTimer';
import StickyNotes from './tools/StickyNotes';
import TodoList from './tools/TodoList';
import ProgressTracker from './tools/ProgressTracker';
import StudyCalendar from './tools/StudyCalendar';
import QuoteDisplay from './QuoteDisplay';

const ToolsPage: React.FC = () => {
  const { isFocusMode } = useApp();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Show login prompt for non-authenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Công cụ học tập thông minh
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Tập hợp các công cụ giúp bạn quản lý thời gian, ghi chú, theo dõi tiến độ và tổ chức học tập hiệu quả
            </p>
          </div>

          {/* Login prompt */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl border border-gray-100 dark:border-gray-700 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="h-10 w-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
              Đăng nhập để sử dụng công cụ
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 font-inter">
              Các công cụ học tập thông minh chỉ dành cho thành viên đã đăng nhập
            </p>

            {/* Preview of tools */}
            <div className="grid md:grid-cols-3 gap-6 mb-8 opacity-60">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 font-poppins">Pomodoro Timer</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-inter">Quản lý thời gian học hiệu quả</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 font-poppins">Todo List</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-inter">Theo dõi công việc cần làm</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 font-poppins">Progress Tracker</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-inter">Theo dõi tiến độ học tập</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center font-poppins"
              >
                <span className="mr-2">Đăng nhập ngay</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-8 py-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 font-poppins"
              >
                Tạo tài khoản mới
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${isFocusMode ? 'pt-20' : 'pt-20'} pb-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isFocusMode && (
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Công cụ học tập thông minh
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Tập hợp các công cụ giúp bạn quản lý thời gian, ghi chú, theo dõi tiến độ và tổ chức học tập hiệu quả
            </p>
          </div>
        )}

        {isFocusMode && (
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Chế độ tập trung
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Tập trung vào việc học với giao diện tối giản
            </p>
          </div>
        )}

        {!isFocusMode && (
          <div className="mb-8">
            <QuoteDisplay />
          </div>
        )}

        <div className={`grid ${isFocusMode ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-8 mb-8`}>
          <PomodoroTimer />
          <TodoList />
          {isFocusMode && <StickyNotes />}
        </div>

        {!isFocusMode && (
          <>
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <StickyNotes />
              <StudyCalendar />
            </div>

            <div className="mb-8">
              <ProgressTracker />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ToolsPage;