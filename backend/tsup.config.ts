import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  noExternal: ['src/**/*.test.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
})