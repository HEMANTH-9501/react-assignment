import React, { createContext, useContext, useEffect, useState } from 'react';

// Theme context for dark/light mode
const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Initialize from localStorage or prefers-color-scheme
  useEffect(() => {
    const stored = localStorage.getItem('app_theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
    } else {
      const prefersDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Apply theme class to html element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

