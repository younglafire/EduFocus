import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  isFocusMode: boolean;
  setIsFocusMode: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFocusMode, setIsFocusMode] = useState(false);

  return (
    <AppContext.Provider value={{
      isFocusMode,
      setIsFocusMode
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