import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useNavigation } from '../contexts/NavigationContext';
import LandingPage from './LandingPage';
import ToolsPage from './ToolsPage';
import CoursesPage from './CoursesPage';
import ResourcesPage from './ResourcesPage';
import BlogPage from './BlogPage';
import ContactPage from './ContactPage';
import CourseDetailPage from './CourseDetailPage';
import ProtectedRoute from './ProtectedRoute';

const SlidingContainer: React.FC = () => {
  const { currentPage, previousPage, slideDirection, isTransitioning } = useNavigation();

  const renderPage = (path: string) => {
    switch (path) {
      case '/':
        return <LandingPage />;
      case '/tools':
        return <ToolsPage />;
      case '/courses':
        return <CoursesPage />;
      case '/resources':
        return <ResourcesPage />;
      case '/blog':
        return <BlogPage />;
      case '/contact':
        return <ContactPage />;
      default:
        if (path.startsWith('/courses/')) {
          return (
            <ProtectedRoute>
              <CourseDetailPage />
            </ProtectedRoute>
          );
        }
        return <LandingPage />;
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Current Page */}
      <div
        className={`transition-transform duration-500 ease-in-out ${
          isTransitioning
            ? slideDirection === 'left'
              ? '-translate-x-full'
              : slideDirection === 'right'
              ? 'translate-x-full'
              : 'translate-x-0'
            : 'translate-x-0'
        }`}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={
            <ProtectedRoute>
              <CourseDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>

      {/* Previous Page (for transition) */}
      {isTransitioning && previousPage && (
        <div
          className={`absolute top-0 left-0 w-full transition-transform duration-500 ease-in-out ${
            slideDirection === 'left'
              ? 'translate-x-0'
              : slideDirection === 'right'
              ? 'translate-x-0'
              : 'translate-x-0'
          }`}
          style={{
            transform: slideDirection === 'left' 
              ? 'translateX(100%)' 
              : slideDirection === 'right'
              ? 'translateX(-100%)'
              : 'translateX(0)'
          }}
        >
          {renderPage(previousPage)}
        </div>
      )}

      {/* Next Page (sliding in) */}
      {isTransitioning && (
        <div
          className={`absolute top-0 left-0 w-full transition-transform duration-500 ease-in-out ${
            slideDirection === 'left'
              ? 'translate-x-0'
              : slideDirection === 'right'
              ? 'translate-x-0'
              : 'translate-x-0'
          }`}
          style={{
            transform: slideDirection === 'left'
              ? 'translateX(0)'
              : slideDirection === 'right'
              ? 'translateX(0)'
              : 'translateX(0)',
            zIndex: 10
          }}
        >
          {renderPage(currentPage)}
        </div>
      )}
    </div>
  );
};

export default SlidingContainer;