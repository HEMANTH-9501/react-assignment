import axios from 'axios';

// Central Axios instance for consistent configuration
const apiClient = axios.create({
  baseURL: 'https://backend.jotish.in/backend_dev',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

// Example response interceptor for logging / global errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Could plug in global error handling or logging here
    return Promise.reject(error);
  }
);

export default apiClient;

