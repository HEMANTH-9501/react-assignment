import React from 'react';
import Input from '../common/Input.jsx';

// Search box + sort selector above list
const SearchAndSortBar = ({ search, onSearchChange, sortBy, onSortChange }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <div className="flex-1">
        <Input
          label="Search employee"
          placeholder="Search by name or city..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="w-full sm:w-52">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
          Sort by
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full rounded-lg border bg-white/80 dark:bg-slate-800/90 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 shadow-sm outline-none transition-all border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-600"
        >
          <option value="name">Name (A→Z)</option>
          <option value="salary">Salary (High→Low)</option>
          <option value="city">City (A→Z)</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndSortBar;

