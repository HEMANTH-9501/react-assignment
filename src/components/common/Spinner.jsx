import React from 'react';

// Centered spinner for full-page loading
const Spinner = ({ label }) => (
  <div className="flex flex-col items-center justify-center py-16 text-slate-500">
    <span className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3" />
    {label && <p className="text-sm">{label}</p>}
  </div>
);

export default Spinner;

