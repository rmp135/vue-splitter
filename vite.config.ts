/// <reference types="vitest" />
import createVuePlugin from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'jsdom'
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/vue-splitter.vue'),
      name: 'VueSplitter',
      fileName: (format) => `vue-splitter.${format}.js`,
      formats: ['iife', 'cjs', 'es'],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [
    createVuePlugin()
  ],
})