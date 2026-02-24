import React from 'react';

// Skeleton placeholder for loading list items
const SkeletonCard = () => (
  <div className="rounded-2xl bg-white/80 dark:bg-slate-800/80 shadow-sm p-4 animate-pulse">
    <div className="flex justify-between items-center mb-3">
      <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
      <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
    </div>
    <div className="h-3 w-48 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
    <div className="h-3 w-40 bg-slate-200 dark:bg-slate-700 rounded" />
  </div>
);

export default SkeletonCard;

