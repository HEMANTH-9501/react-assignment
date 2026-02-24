import React from 'react';
import clsx from 'clsx';

// Reusable button with variants and loading state
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled,
  ...rest
}) => {
  const base =
    'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-primary text-white hover:bg-primary-dark focus:ring-primary dark:bg-primary-light dark:text-slate-900',
    outline:
      'border border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-700',
    ghost:
      'text-slate-700 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800'
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base'
  };

  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && (
        <span className="mr-2 h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
};

export default Button;

