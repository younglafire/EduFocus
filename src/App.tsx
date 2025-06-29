import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import ToolsPage from './components/ToolsPage';
import CoursesPage from './components/CoursesPage';
import ResourcesPage from './components/ResourcesPage';
import BlogPage from './components/BlogPage';
import ContactPage from './components/ContactPage';
import { useApp } from './contexts/AppContext';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'tools':
        return <ToolsPage />;
      case 'courses':
        return <CoursesPage />;
      case 'resources':
        return <ResourcesPage />;
      case 'blog':
        return <BlogPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="font-poppins">
      <Header />
      {renderCurrentView()}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;