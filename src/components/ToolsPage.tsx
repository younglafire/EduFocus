import React from 'react';
import { X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import PomodoroTimer from './tools/PomodoroTimer';
import StickyNotes from './tools/StickyNotes';
import TodoList from './tools/TodoList';
import ProgressTracker from './tools/ProgressTracker';
import StudyCalendar from './tools/StudyCalendar';
import QuoteDisplay from './QuoteDisplay';

const ToolsPage: React.FC = () => {
  const { isFocusMode, setIsFocusMode } = useApp();

  if (isFocusMode) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Chế độ tập trung
            </h1>
            <button
              onClick={() => setIsFocusMode(false)}
              className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              title="Thoát chế độ tập trung"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <PomodoroTimer />
            </div>
            <div className="lg:col-span-1">
              <TodoList />
            </div>
            <div className="lg:col-span-1">
              <StickyNotes />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Công cụ học tập thông minh
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Tập hợp các công cụ giúp bạn quản lý thời gian, ghi chú, theo dõi tiến độ và tổ chức học tập hiệu quả
          </p>
        </div>

        <div className="mb-8">
          <QuoteDisplay />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <PomodoroTimer />
          <TodoList />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <StickyNotes />
          <StudyCalendar />
        </div>

        <div className="mb-8">
          <ProgressTracker />
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;