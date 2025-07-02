import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface NavigationContextType {
  currentPage: string;
  previousPage: string;
  slideDirection: 'left' | 'right' | 'none';
  isTransitioning: boolean;
  navigateToPage: (page: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const pageOrder = ['/', '/tools', '/courses', '/resources', '/blog', '/contact'];

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);
  const [previousPage, setPreviousPage] = useState('');
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | 'none'>('none');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getPageIndex = (path: string) => {
    // Handle course detail pages
    if (path.startsWith('/courses/')) return pageOrder.indexOf('/courses');
    return pageOrder.indexOf(path);
  };

  const navigateToPage = (newPage: string) => {
    if (newPage === currentPage) return;

    const currentIndex = getPageIndex(currentPage);
    const newIndex = getPageIndex(newPage);

    if (currentIndex !== -1 && newIndex !== -1) {
      setIsTransitioning(true);
      setPreviousPage(currentPage);
      
      // Determine slide direction
      if (newIndex > currentIndex) {
        setSlideDirection('left'); // Slide left to show next page
      } else {
        setSlideDirection('right'); // Slide right to show previous page
      }

      // Start transition
      setTimeout(() => {
        setCurrentPage(newPage);
        
        // End transition
        setTimeout(() => {
          setIsTransitioning(false);
          setSlideDirection('none');
          setPreviousPage('');
        }, 500); // Match CSS transition duration
      }, 50);
    } else {
      // For non-sliding pages (like course details), just update immediately
      setCurrentPage(newPage);
      setSlideDirection('none');
      setIsTransitioning(false);
    }
  };

  useEffect(() => {
    // Update current page when location changes (for direct URL access)
    if (location.pathname !== currentPage && !isTransitioning) {
      setCurrentPage(location.pathname);
    }
  }, [location.pathname]);

  return (
    <NavigationContext.Provider value={{
      currentPage,
      previousPage,
      slideDirection,
      isTransitioning,
      navigateToPage
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};