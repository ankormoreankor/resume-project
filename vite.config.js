import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    resolve: {
      alias: {
        '@root': resolve(__dirname),
        '@src': resolve('src'),
        '@components': resolve('src', 'components'),
        '@icons': resolve('src', 'components', 'icons'),
        '@hooks': resolve('src', 'hooks'),
        '@utils': resolve('src', 'utils'),
      },
      preserveSymlinks: true,
    },

    plugins: [react()],
    build: {
      target: 'esnext',
      outDir: 'build',
      rollupOptions: {
        input: './index.html',
      },
      commonjsOptions: {
        strictRequires: true,
      },
      sourcemap: false,
      minify: 'terser',
      terserOptions: {
        format: {
          comments: false,
        },
      },
    },

    css: {
      modules: {
        generateScopedName: '[local]-[hash:base64:7]',
      },
    },
  });
};
