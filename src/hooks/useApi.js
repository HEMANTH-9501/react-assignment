import { useEffect, useState, useCallback } from 'react';
import apiClient from '../services/api.js';

// Reusable API hook with loading and error handling
export const useApi = (config, auto = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(auto);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (overrideConfig = {}) => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient({
          ...config,
          ...overrideConfig
        });
        setData(response.data);
        return response.data;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [config]
  );

  useEffect(() => {
    if (auto) {
      execute();
    }
  }, [auto, execute]);

  return { data, loading, error, refetch: execute };
};

