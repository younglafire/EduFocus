import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import { NavigationProvider } from './contexts/NavigationContext';
import Header from './components/Header';
import SlidingContainer from './components/SlidingContainer';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <NavigationProvider>
            <Router>
              <div className="font-poppins">
                <Routes>
                  {/* Auth routes without header - redirect if already logged in */}
                  <Route path="/login" element={
                    <ProtectedRoute requireAuth={false}>
                      <LoginPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/register" element={
                    <ProtectedRoute requireAuth={false}>
                      <RegisterPage />
                    </ProtectedRoute>
                  } />
                  
                  {/* Main app routes with sliding navigation */}
                  <Route path="/*" element={
                    <>
                      <Header />
                      <SlidingContainer />
                    </>
                  } />
                </Routes>
              </div>
            </Router>
          </NavigationProvider>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;