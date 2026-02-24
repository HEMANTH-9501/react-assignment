import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import ListPage from './pages/ListPage.jsx';
import DetailsPage from './pages/DetailsPage.jsx';
import PhotoPage from './pages/PhotoPage.jsx';
import ChartPage from './pages/ChartPage.jsx';
import MapPage from './pages/MapPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import Navbar from './components/layout/Navbar.jsx';
import PageContainer from './components/layout/PageContainer.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import ToastContainer from './components/common/ToastContainer.jsx';
import { useAuth } from './hooks/useAuth.js';

// Top-level app routes and layout
const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors">
      <Navbar />
      <PageContainer>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/list" replace /> : <LoginPage />
            }
          />
          <Route
            path="/list"
            element={
              <ProtectedRoute>
                <ListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/details/:id"
            element={
              <ProtectedRoute>
                <DetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/photo"
            element={
              <ProtectedRoute>
                <PhotoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chart"
            element={
              <ProtectedRoute>
                <ChartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <MapPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageContainer>
      <ToastContainer />
    </div>
  );
};

export default App;

