import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEmployeeContext } from '../context/EmployeeContext.jsx';
import { useToastContext } from '../context/ToastContext.jsx';
import Spinner from '../components/common/Spinner.jsx';
import Button from '../components/common/Button.jsx';
import CameraCapture from '../components/details/CameraCapture.jsx';
import { getEmployeeCity, getEmployeeId, getEmployeeName, getEmployeeSalary } from '../utils/employeeUtils.js';
import { formatCurrency, formatLabel } from '../utils/format.js';

// Detailed view of a single employee with camera capture
const DetailsPage = () => {
  const { id } = useParams();
  const { employees, updateEmployee, deleteEmployee } = useEmployeeContext();
  const { showToast } = useToastContext();
  const navigate = useNavigate();

  const employee = useMemo(() => {
    if (!employees || !employees.length) return null;
    return (
      employees.find((e, index) => getEmployeeId(e, index) === id) || null
    );
  }, [employees, id]);

  const [editFields, setEditFields] = useState(() => ({
    name: employee ? getEmployeeName(employee) : '',
    city: employee ? getEmployeeCity(employee) : '',
    salary: employee ? getEmployeeSalary(employee) || '' : '',
    role: employee ? employee.role || '' : '',
    department: employee ? employee.department || '' : ''
  }));

  if (!employees || !employees.length) {
    // No data loaded (e.g. direct navigation), send back to list
    return (
      <div>
        <Spinner label="Loading employee data..." />
        <p className="mt-4 text-xs text-slate-500">
          If this page does not load, please navigate from the employee list.
        </p>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/40 dark:border-red-700 px-4 py-4 text-sm text-red-700 dark:text-red-200">
        Employee not found. It might have been removed or the URL is invalid.
        <div className="mt-3">
          <Button size="sm" variant="outline" onClick={() => navigate('/list')}>
            Back to List
          </Button>
        </div>
      </div>
    );
  }

  const name = getEmployeeName(employee);
  const city = getEmployeeCity(employee);
  const salary = getEmployeeSalary(employee);

  const handleCapture = (imageData) => {
    updateEmployee(id, { photo: imageData });
    showToast('Photo captured successfully', 'success');
    navigate('/photo', {
      state: {
        imageData,
        employeeId: id,
        employeeName: name
      }
    });
  };

  const handleSaveUpdates = (e) => {
    e.preventDefault();
    const numericSalary = editFields.salary ? Number(editFields.salary) : undefined;
    updateEmployee(id, (current) => ({
      ...current,
      emp_name: editFields.name || current.emp_name,
      city: editFields.city || current.city,
      salary: numericSalary ?? current.salary,
      role: editFields.role || current.role,
      department: editFields.department || current.department
    }));
    showToast('Employee updated locally (in-memory only).', 'success');
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this employee? This is an in-memory delete for demo purposes.'
    );
    if (!confirmed) return;
    deleteEmployee(id);
    showToast('Employee deleted from local list.', 'success');
    navigate('/list');
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            {name}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {city} •{' '}
            {salary != null ? `Salary: ${formatCurrency(salary)}` : 'Salary: N/A'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate('/list')}>
            Back to List
          </Button>
        </div>
      </div>

      <section className="grid md:grid-cols-[1.2fr,1.3fr] gap-5">
        <div className="rounded-2xl bg-white/90 dark:bg-slate-800/90 shadow-sm border border-slate-100 dark:border-slate-700/70 p-4 space-y-3">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-3">
            Employee Details
          </h2>
          {employee.photo && (
            <div className="flex justify-center mb-2">
              <img
                src={employee.photo}
                alt={`${name} captured`}
                className="h-32 w-32 rounded-full object-cover shadow-md border border-slate-200 dark:border-slate-600"
              />
            </div>
          )}
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs">
            {Object.entries(employee).map(([key, value]) => (
              <div key={key} className="space-y-0.5">
                <dt className="text-slate-500 dark:text-slate-400">
                  {formatLabel(key)}
                </dt>
                <dd className="text-slate-900 dark:text-slate-100 break-all">
                  {String(value ?? '') || '—'}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 border-t border-slate-200 dark:border-slate-700 pt-3">
            <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Quick edit (local only)
            </h3>
            <form
              onSubmit={handleSaveUpdates}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]"
            >
              <div className="flex flex-col gap-1">
                <label className="text-slate-500 dark:text-slate-400">
                  Name
                </label>
                <input
                  className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-900/60 px-2 py-1 outline-none"
                  value={editFields.name}
                  onChange={(e) =>
                    setEditFields((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-slate-500 dark:text-slate-400">
                  City
                </label>
                <input
                  className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-900/60 px-2 py-1 outline-none"
                  value={editFields.city}
                  onChange={(e) =>
                    setEditFields((prev) => ({ ...prev, city: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-slate-500 dark:text-slate-400">
                  Salary (INR)
                </label>
                <input
                  type="number"
                  className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-900/60 px-2 py-1 outline-none"
                  value={editFields.salary}
                  onChange={(e) =>
                    setEditFields((prev) => ({
                      ...prev,
                      salary: e.target.value
                    }))
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-slate-500 dark:text-slate-400">
                  Department
                </label>
                <input
                  className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-900/60 px-2 py-1 outline-none"
                  value={editFields.department}
                  onChange={(e) =>
                    setEditFields((prev) => ({
                      ...prev,
                      department: e.target.value
                    }))
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-slate-500 dark:text-slate-400">
                  Role
                </label>
                <input
                  className="rounded-lg border border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-900/60 px-2 py-1 outline-none"
                  value={editFields.role}
                  onChange={(e) =>
                    setEditFields((prev) => ({ ...prev, role: e.target.value }))
                  }
                />
              </div>
              <div className="sm:col-span-2 flex justify-end mt-1">
                <Button size="sm" type="submit">
                  Save changes
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="rounded-2xl bg-white/90 dark:bg-slate-800/90 shadow-sm border border-slate-100 dark:border-slate-700/70 p-4">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-3">
            Capture Photo
          </h2>
          <CameraCapture onCapture={handleCapture} />
        </div>
      </section>
    </div>
  );
};

export default DetailsPage;

