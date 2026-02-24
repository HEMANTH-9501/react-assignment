import React from 'react';
import { getEmployeeCity, getEmployeeName, getEmployeeSalary } from '../../utils/employeeUtils.js';
import { formatCurrency } from '../../utils/format.js';

// Clickable employee card used on list page
const EmployeeCard = ({ employee, index, onClick }) => {
  const name = getEmployeeName(employee);
  const city = getEmployeeCity(employee);
  const salary = getEmployeeSalary(employee);

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl bg-white/90 dark:bg-slate-800/90 shadow-sm hover:shadow-lg border border-slate-100 dark:border-slate-700/70 px-4 py-3 transition-all hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-semibold text-slate-900 dark:text-slate-50 truncate">
          {index + 1}. {name}
        </h3>
        <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-2 py-0.5 text-xs font-medium">
          {city}
        </span>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 truncate">
        Salary: {salary != null ? formatCurrency(salary) : 'N/A'}
      </p>
      <p className="text-[11px] text-slate-400">
        Tap to view full profile & capture photo
      </p>
    </button>
  );
};

export default EmployeeCard;

