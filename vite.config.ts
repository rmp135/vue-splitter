/// <reference types="vitest" />
import createVuePlugin from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import path from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  test: {
    environment: 'jsdom'
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/vue-splitter.vue'),
      formats: ['es'],
      name: 'VueSplitter'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        intro: 'import "./style.css";',
        globals: {
          vue: 'Vue',
        }
      }
    }
  },
  plugins: [
    createVuePlugin(),
    dts({ rollupTypes: true })
  ],
})