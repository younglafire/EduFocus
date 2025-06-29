import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppProvider } from './contexts/AppContext';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import ToolsPage from './components/ToolsPage';
import CoursesPage from './components/CoursesPage';
import ResourcesPage from './components/ResourcesPage';
import BlogPage from './components/BlogPage';
import ContactPage from './components/ContactPage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <div className="font-poppins">
            <Routes>
              {/* Auth routes without header */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* Main app routes with header */}
              <Route path="/*" element={
                <>
                  <Header />
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/tools" element={<ToolsPage />} />
                    <Route path="/courses" element={<CoursesPage />} />
                    <Route path="/resources" element={<ResourcesPage />} />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                  </Routes>
                </>
              } />
            </Routes>
          </div>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;