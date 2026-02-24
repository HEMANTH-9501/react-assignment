import React from 'react';
import clsx from 'clsx';

// Text input with label and error message
const Input = ({
  label,
  error,
  type = 'text',
  className = '',
  trailing,
  ...rest
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          className={clsx(
            'w-full rounded-lg border bg-white/80 dark:bg-slate-800/90 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 shadow-sm outline-none transition-all',
            'border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20',
            'dark:border-slate-600 dark:focus:border-primary-light',
            trailing && 'pr-10',
            error && 'border-red-500 focus:ring-red-100',
            className
          )}
          {...rest}
        />
        {trailing && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {trailing}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
};

export default Input;

