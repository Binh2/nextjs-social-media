import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    global: true,
    environment: 'jsdom',
    setUpFile: './setupTest.js',
    include: [ ...configDefaults.include, '**/*.test.[jt]sx']
  },
})
