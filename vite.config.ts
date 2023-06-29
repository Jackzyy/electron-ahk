import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  build: {
    outDir: `./dist/resource`
  },
  plugins: [
    vue(),
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
  ]
})
