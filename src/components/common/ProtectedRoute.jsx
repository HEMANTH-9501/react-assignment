import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

// Guard component to protect routes that require auth
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect unauthenticated users back to login
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;

