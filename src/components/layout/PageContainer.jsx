import React from 'react';

// Shared page layout wrapper for consistent spacing
const PageContainer = ({ children }) => (
  <main className="flex-1">
    <div className="max-w-6xl mx-auto px-4 py-6">{children}</div>
  </main>
);

export default PageContainer;

