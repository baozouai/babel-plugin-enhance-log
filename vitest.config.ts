import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: { coverage: { provider: 'c8', reporter: process.env.CI === 'true' ? 'lcovonly' : 'lcov' } },
})
