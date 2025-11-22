import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Minimal config to run React with Vite.
export default defineConfig({
	server: {
		port: 5173,
		host: true
	},
	plugins: [
		react()
	]
})


