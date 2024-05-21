import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {

    server: {

      define: {
        __APP_ENV__: env.APP_ENV,
      },

      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: env.VITE_API_SECURE === 'true',
        },
      },
    },
  
    plugins: [react()],
  }
})
