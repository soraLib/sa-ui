import { defineConfig } from 'vite-plugin-windicss'

export default defineConfig({
  preflight: false,
  extract: {
    include: [
      '.vitepress/**/*.vue',
      'examples/**/*.vue',
    ],
  },
  theme: {
    extend: {
      colors: {
        primary: '#2e859c',
      },
    },
  },
})
