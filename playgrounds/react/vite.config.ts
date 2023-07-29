import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['enhance-log', {
          splitBy: '\n',

        }]],
      },
    }),
    Inspect(),
  ],
})
