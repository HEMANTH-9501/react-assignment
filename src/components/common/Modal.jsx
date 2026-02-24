import React from 'react';
import Button from './Button.jsx';

// Simple reusable modal with backdrop
const Modal = ({ open, title, children, onClose, actions }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 animate-[fadeIn_0.2s_ease-out]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            ✕
          </button>
        </div>
        <div className="mb-4 text-sm text-slate-700 dark:text-slate-200">
          {children}
        </div>
        <div className="flex justify-end gap-2">
          {actions ? (
            actions
          ) : (
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;

