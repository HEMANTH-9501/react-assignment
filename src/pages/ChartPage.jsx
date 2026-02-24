import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useEmployeeContext } from '../context/EmployeeContext.jsx';
import Button from '../components/common/Button.jsx';
import { getEmployeeName, getEmployeeSalary } from '../utils/employeeUtils.js';
import { formatCurrency } from '../utils/format.js';

// Bar chart of first 10 employee salaries
const ChartPage = () => {
  const { employees } = useEmployeeContext();
  const navigate = useNavigate();

  const chartData = useMemo(() => {
    if (!employees || !employees.length) return [];
    return employees
      .slice(0, 10)
      .map((emp, index) => ({
        name: getEmployeeName(emp, index).split(' ')[0] || `Emp ${index + 1}`,
        salary: getEmployeeSalary(emp) ?? 0
      }));
  }, [employees]);

  const hasData = chartData.some((item) => item.salary > 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Salary Overview
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Bar chart of the first 10 employees by salary.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate('/list')}>
          Back to List
        </Button>
      </div>

      <div className="rounded-2xl bg-white/90 dark:bg-slate-800/90 shadow-sm border border-slate-100 dark:border-slate-700/70 p-4 h-[320px]">
        {employees && employees.length > 0 ? (
          hasData ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  angle={-15}
                  textAnchor="end"
                  height={50}
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                />
                <YAxis
                  tickFormatter={(v) => (v >= 100000 ? `${v / 100000}L` : `${v / 1000}k`)}
                  tick={{ fontSize: 11, fill: '#6b7280' }}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 10
                  }}
                />
                <Bar
                  dataKey="salary"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Employee data loaded, but salary fields are not numeric. Please
              check the API response.
            </p>
          )
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No employee data available. Please open the list page first to load data.
          </p>
        )}
      </div>
    </div>
  );
};

export default ChartPage;

