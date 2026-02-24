import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../common/Button.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useAuth } from '../../hooks/useAuth.js';

// Top navigation bar with theme toggle and logout
const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAuthPage = location.pathname === '/';

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 dark:border-slate-700/70 bg-white/80 dark:bg-slate-900/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to={isAuthenticated ? '/list' : '/'}
          className="flex items-center gap-2"
        >
          <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-lg font-bold">
            EI
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-slate-900 dark:text-slate-50">
              Employee Insights
            </span>
            <span className="text-xs text-slate-500">
              ReactJS Assignment Dashboard
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {user && (
            <span className="hidden sm:inline text-xs text-slate-500 dark:text-slate-300">
              Logged in as <span className="font-semibold">{user.username}</span>
            </span>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </Button>

          {isAuthenticated && !isAuthPage && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

