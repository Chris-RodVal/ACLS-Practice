import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: 'src/widgets/index.tsx',
        bible_popup: 'src/widgets/bible_popup.tsx',
        sidebar: 'src/widgets/sidebar.tsx',
      },
      output: {
        entryFileNames: '[name].js',
        format: 'es',
      },
    },
  },
  server: {
    port: 8095,
  },
});
