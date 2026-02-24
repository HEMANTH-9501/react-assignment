import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button.jsx';

// Simple 404 page
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-6xl mb-3">🧭</div>
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
        Page not found
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-md">
        The page you are looking for does not exist. You may have followed an
        outdated link or typed the URL incorrectly.
      </p>
      <Link to="/list">
        <Button size="sm">Go to Employee List</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;

