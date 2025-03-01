import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html')
      },
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: (assetInfo) => {
          // Keep the original path for icons
          if (assetInfo.name && assetInfo.name.startsWith('icons/')) {
            return assetInfo.name;
          }
          return `assets/[name].[ext]`;
        }
      }
    }
  },
  base: '',
  publicDir: 'public'
}); 