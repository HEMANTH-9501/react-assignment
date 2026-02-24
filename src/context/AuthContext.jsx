import React, { createContext, useContext, useState, useEffect } from 'react';

// Simple auth context for login/logout and protected routes
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Restore auth state from localStorage for persistence
  useEffect(() => {
    const stored = localStorage.getItem('auth_user');
    if (stored) {
      setIsAuthenticated(true);
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = (username) => {
    const userData = { username };
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('auth_user', JSON.stringify(userData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Internal hook; public hook is in hooks/useAuth.js for separation
export const useAuthContext = () => useContext(AuthContext);

