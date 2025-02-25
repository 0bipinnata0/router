/// <reference types="vitest/config" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    watch: false,
  },
});
