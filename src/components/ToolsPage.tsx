import React from 'react';
import { useApp } from '../contexts/AppContext';
import PomodoroTimer from './tools/PomodoroTimer';
import StickyNotes from './tools/StickyNotes';
import TodoList from './tools/TodoList';
import ProgressTracker from './tools/ProgressTracker';
import StudyCalendar from './tools/StudyCalendar';
import QuoteDisplay from './QuoteDisplay';

const ToolsPage: React.FC = () => {
  const { isFocusMode } = useApp();

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