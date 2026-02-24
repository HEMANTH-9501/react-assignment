import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { EmployeeProvider } from './context/EmployeeContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';

// Root render with all providers and React Router
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <EmployeeProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </EmployeeProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>
);

