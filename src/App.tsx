import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import ToolsPage from './components/ToolsPage';
import CoursesPage from './components/CoursesPage';
import ResourcesPage from './components/ResourcesPage';
import BlogPage from './components/BlogPage';
import ContactPage from './components/ContactPage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
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
                
                {/* Main app routes with header */}
                <Route path="/*" element={
                  <>
                    <Header />
                    <Routes>
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/tools" element={
                        <ProtectedRoute>
                          <ToolsPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/courses" element={
                        <ProtectedRoute>
                          <CoursesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/resources" element={
                        <ProtectedRoute>
                          <ResourcesPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/blog" element={<BlogPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                    </Routes>
                  </>
                } />
              </Routes>
            </div>
          </Router>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;