import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    resolve: {
      preserveSymlinks: true,
    },

    plugins: [react()],
    build: {
      outDir: 'build',
      rollupOptions: {
        input: './index.html',
      },
      sourcemap: false,
    },

    css: {
      modules: {
        generateScopedName: '[local]-[hash:base64:7]',
      },
    },
  });
};
