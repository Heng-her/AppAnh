import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron/simple'

export default defineConfig({
  plugins: [
    vue(),
    electron({
      main: {
        entry: 'electron/main.ts',
        onstart(args) {
          args.startup()
        },
      },
      preload: {
        input: 'electron/preload.ts',
      },
    }),
  ],
  build: {
    // Ensure proper module handling
    target: 'esnext'
  }
})