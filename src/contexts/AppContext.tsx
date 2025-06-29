import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  isFocusMode: boolean;
  setIsFocusMode: (value: boolean) => void;
  currentView: 'landing' | 'tools' | 'courses' | 'resources' | 'blog' | 'contact';
  setCurrentView: (view: 'landing' | 'tools' | 'courses' | 'resources' | 'blog' | 'contact') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [currentView, setCurrentView] = useState<'landing' | 'tools' | 'courses' | 'resources' | 'blog' | 'contact'>('landing');

  return (
    <AppContext.Provider value={{
      isFocusMode,
      setIsFocusMode,
      currentView,
      setCurrentView
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};