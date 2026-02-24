import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { useToastContext } from '../context/ToastContext.jsx';

// Login screen with basic validation and password visibility toggle
const LoginPage = () => {
  const { login } = useAuth();
  const { showToast } = useToastContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.username) newErrors.username = 'Username is required';
    if (!form.password) newErrors.password = 'Password is required';
    if (form.username && form.username !== 'testuser') {
      newErrors.username = 'Username must be "testuser"';
    }
    if (form.password && form.password !== 'Test123') {
      newErrors.password = 'Password must be "Test123"';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate small delay for spinner
    setTimeout(() => {
      login(form.username);
      showToast('Logged in successfully', 'success');
      const redirectTo = location.state?.from?.pathname || '/list';
      navigate(redirectTo, { replace: true });
      setLoading(false);
    }, 700);
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50 mb-1">
            Welcome back 👋
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Sign in with the assignment credentials to access the dashboard.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white/90 dark:bg-slate-800/90 shadow-xl border border-slate-100 dark:border-slate-700/70 p-6 space-y-4"
        >
          <Input
            label="Username"
            placeholder="Enter username"
            value={form.username}
            onChange={(e) =>
              setForm((f) => ({ ...f, username: e.target.value }))
            }
            error={errors.username}
          />

          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            value={form.password}
            onChange={(e) =>
              setForm((f) => ({ ...f, password: e.target.value }))
            }
            error={errors.password}
            trailing={
              <button
                type="button"
                className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-100"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            }
          />

          <div className="text-xs text-slate-500 dark:text-slate-400 rounded-lg bg-slate-50 dark:bg-slate-900/60 px-3 py-2">
            <p className="font-semibold mb-1">Demo credentials</p>
            <p>
              Username: <code className="font-mono">testuser</code>
            </p>
            <p>
              Password: <code className="font-mono">Test123</code>
            </p>
          </div>

          <Button type="submit" className="w-full" loading={loading}>
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

