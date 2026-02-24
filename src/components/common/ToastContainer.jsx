import React from 'react';
import { useToastContext } from '../../context/ToastContext.jsx';
import clsx from 'clsx';

// Visual container for toast messages
const ToastContainer = () => {
  const { toasts, removeToast } = useToastContext();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={clsx(
            'rounded-xl px-4 py-3 shadow-lg text-sm flex items-start gap-3 max-w-xs',
            'bg-white/95 dark:bg-slate-800/95 border',
            toast.type === 'error' && 'border-red-400 text-red-700 dark:text-red-200',
            toast.type === 'success' && 'border-emerald-400 text-emerald-700 dark:text-emerald-200',
            toast.type === 'info' && 'border-slate-300 text-slate-800 dark:text-slate-100'
          )}
        >
          <div className="flex-1">{toast.message}</div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-100"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;

