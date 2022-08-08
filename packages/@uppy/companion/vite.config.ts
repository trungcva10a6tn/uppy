// vite.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['./vitest/__tests__/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}', '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    globals: true,
  },
})
