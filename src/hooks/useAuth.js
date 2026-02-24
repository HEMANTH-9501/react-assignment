import { useAuthContext } from '../context/AuthContext.jsx';

// Public hook wrapper so consumers don't import context directly
export const useAuth = () => {
  const ctx = useAuthContext();
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};

