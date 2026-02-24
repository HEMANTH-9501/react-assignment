import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config for React + JSX + fast HMR
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
});

