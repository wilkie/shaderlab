import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 9001,
  },
  // Use a relative path in generated HTML, absolute / doesn't work with github pages:
  base: "",
});
