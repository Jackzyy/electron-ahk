import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: `./dist/resource`
  },
  plugins: [
    vue(),
    VueDevTools(),
    electron([
      {
        entry: 'electron/main.ts',
        vite: { build: { outDir: 'dist/electron' } }
      },
      {
        entry: 'electron/preload.ts',
        onstart(options) {
          options.reload()
        },
        vite: { build: { outDir: 'dist/electron' } }
      }
    ]),
    renderer()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
