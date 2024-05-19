import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  console.log("ENV VARS:" , env.API_URL)
  return {

    server: {

      define: {
        __APP_ENV__: env.APP_ENV,
      },

      proxy: {
        '/api': {
          target: env.API_URL,
          secure: false,
        },
      },
    },
  
    plugins: [react()],
  }
})
